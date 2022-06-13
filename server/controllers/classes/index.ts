import { Response, Request } from "express"
import Class from "../../models/Class"
import IClass from "../../types/IClass"

export const GetScheduleForCourse = async (req: Request, res: Response):
Promise<void> => {
    try {
        const classes: IClass[] = await Class.find({
            subjectCode: req.params.subjectCode,
            catalogNumber: req.params.catalogNumber
        });
        res.status(200).json({classes});
    }
    catch (err) {
        res.status(400).json({err});
    }
}

export const GetScheduleForCourseWithTermCode = async (req: Request, res: Response):
Promise<void> => {
    try {
        console.log(req.params);
        const classes: IClass[] = await Class.find({
            term: req.params.termCode,
            subjectCode: req.params.subjectCode,
            catalogNumber: req.params.catalogNumber
        });
        res.status(200).json({classes});
    }
    catch (err) {
        res.status(400).json({err});
    }
}