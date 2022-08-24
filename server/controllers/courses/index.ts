import { Response, Request } from "express"
import Course from "../../models/Course"
import ICourse from "../../types/ICourse"
import IUWFlowCourse from "../../types/IUWFlowCourse"
import { GetInfoForCourseFromUWFlow } from "../../helpers/uwflow"
import splitCourse from "../../helpers/splitCourse"
import ICourseWithUWFlowData from "../../types/ICourseWithUWFlowData"
import ICourseCode from "../../types/ICourseCode"

const AddUWFlowInfoToCoursesFromDB = async (courses: ICourse[]): Promise<any> => {
    let result = [];
    for (const course of courses) {
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
        result.push(dataAboutCourse);
    }
    return result;
}

export const GetAllCourseCodes = async (req: Request, res: Response):
    Promise<void> => {
    try {
        const courses: ICourse[] = await Course.find();
        res.status(200).json(courses.map(courseCode => {
            return {
                subjectCode: courseCode.subjectCode,
                catalogNumber: courseCode.catalogNumber
            }
        })
        )
    }
    catch (err) {
        throw err
    }
}

// takes in query params
// courses: ICourseCode[]
export const GetInfoForCourses = async (req: Request, res: Response):
    Promise<void> => {
    const courses = req.body.courses as unknown as ICourseCode[];
    try {
        const dataAboutCoursesFromDB: null | ICourse[] = await Course.find({
            $or: courses
        });
        const coursesWithUWFlowData: ICourseWithUWFlowData = await AddUWFlowInfoToCoursesFromDB(
            dataAboutCoursesFromDB.map(x => x.toObject())
        );

        res.status(200).json(coursesWithUWFlowData);
    }
    catch (err) {
        throw err;
    }
}

