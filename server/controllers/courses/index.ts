import { Response, Request } from "express"
import Course from "../../models/Course"
import ICourse from "../../types/ICourse"

export const GetInfoForCourse = async (req: Request, res: Response):
Promise<void> => {
    try {
        const course: null | ICourse = await Course.findOne({
            "subjectCode": req.params.subjectCode,
            "catalogNumber": req.params.catalogNumber
        });
        res.status(200).json({course});
    }
    catch (err) {
        res.status(400).json({err});
    }
}


