import { Response, Request } from "express"
import Course from "../../models/Course"
import ICourse from "../../types/ICourse"
import IUWFlowCourse from "../../types/IUWFlowCourse"
import { GetInfoForCourseFromUWFlow } from "../../helpers/uwflow"
import ICourseWithUWFlowData from "../../types/ICourseWithUWFlowData"
import splitCourse from "../../helpers/splitCourse"
import { stringify } from "querystring"
import Class from "../../models/Class"

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

        res.status(200).json({
            data: dataAboutCourse,
        });
    }
    catch (err) {
        throw err;
    }
}

