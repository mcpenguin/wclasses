import { Response, Request } from "express"
import Course from "../../models/Course"
import ICourse from "../../types/ICourse"
import IUWFlowCourse from "../../types/IUWFlowCourse"
import { GetInfoForCourseFromUWFlow } from "../../helpers/uwflow"
import splitCourse from "../../helpers/splitCourse"
import ICourseWithUWFlowData from "../../types/ICourseWithUWFlowData"

const AddUWFlowInfoToCourseFromDB = async (course: ICourse): Promise<any> => {
    const dataAboutCourseFromUWFlow: IUWFlowCourse = await GetInfoForCourseFromUWFlow(course.subjectCode, course.catalogNumber);

    // coreqs/antireqs are in the form "A, B, C, D." or "A, B, C"
    const dataAboutCourse = {
        ...course,
        prerequisitesAsString: dataAboutCourseFromUWFlow?.prereqs,
        corequisites: dataAboutCourseFromUWFlow?.coreqs
            ?.replace(".", "") 
            .split(",")      
            .map(coreq => splitCourse(coreq)),
        antirequisites: dataAboutCourseFromUWFlow?.antireqs
            ?.split(", ")
            .map(antireq => splitCourse(antireq)),
        postrequisites: dataAboutCourseFromUWFlow?.postrequisites
            ?.map(postreq => splitCourse(postreq.postrequisite.code)),
        ...dataAboutCourseFromUWFlow?.rating
    }
    return dataAboutCourse;
}

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
        const course: ICourseWithUWFlowData = await AddUWFlowInfoToCourseFromDB(
            dataAboutCourseFromDB!.toObject()
        );

        res.status(200).json(course);
    }
    catch (err) {
        throw err;
    }
}

