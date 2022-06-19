import { Response, Request } from "express"
import Course from "../../models/Course"
import ICourse from "../../types/ICourse"
import IUWFlowCourse from "../../types/IUWFlowCourse"
import { GetInfoForCourseFromUWFlow } from "../../helpers/uwflow"
import splitCourse from "../../helpers/splitCourse"
import Class from "../../models/Class"
import ICourseCode from "../../types/ICourseCode"

export const GetAllCourseCodes = async (req: Request, res: Response):
Promise<void> => {
    try {
        const courses: ICourse[] = await Course.find();
        res.status(200).json(courses.map(courseCode => {return {
            subjectCode: courseCode.subjectCode, 
            catalogNumber: courseCode.catalogNumber}})
        )
    }
    catch (err) {
        throw err
    }
}

export const GetInfoForCourse = async (req: Request, res: Response):
Promise<void> => {
    try {
        const dataAboutCourseFromDB: null | ICourse = await Course.findOne({
            "subjectCode": req.params.subjectCode,
            "catalogNumber": req.params.catalogNumber
        });
        const dataAboutCourseFromDBAsObject = dataAboutCourseFromDB?.toObject();

        const dataAboutCourseFromUWFlow: IUWFlowCourse = await GetInfoForCourseFromUWFlow(req.params.subjectCode, req.params.catalogNumber);

        // coreqs/antireqs are in the form "A, B, C, D." or "A, B, C"
        const dataAboutCourse = {
            ...dataAboutCourseFromDBAsObject,
            prerequisitesAsString: dataAboutCourseFromUWFlow.prereqs,
            corequisites: dataAboutCourseFromUWFlow.coreqs
                ?.replace(".", "") 
                .split(",")      
                .map(coreq => splitCourse(coreq)),
            antirequisites: dataAboutCourseFromUWFlow.antireqs
                ?.split(", ")
                .map(antireq => splitCourse(antireq)),
            postrequisites: dataAboutCourseFromUWFlow.postrequisites
                ?.map(postreq => splitCourse(postreq.postrequisite.code)),
            ...dataAboutCourseFromUWFlow.rating
        }

        res.status(200).json(dataAboutCourse);
    }
    catch (err) {
        throw err;
    }
}

