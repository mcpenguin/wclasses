import { Response, Request } from "express"
import Class from "../../models/Class"
import IClass from "../../types/IClass"

export const GetScheduleForCourse = async (req: Request, res: Response):
Promise<void> => {
    try {
        const classes: IClass[] = await Class.find({
            subjectCode: req.params.subjectCode,
            catalogNumber: req.params.catalogNumber,
            ...(req.query.term == null ? {} : {term: req.query.term})
        });
        res.status(200).json({classes});
    }
    catch (err) {
        throw err;
    }
}

export const GetTermsCourseWasOffered = async (req: Request, res: Response): 
Promise<void> => {
    try {
        const classes: IClass[] = await Class.find({
            subjectCode: req.params.subjectCode,
            catalogNumber: req.params.catalogNumber
        });
        let terms: string[] = classes
            .filter(c => c.enrolTotal != 0)
            .map(c => c.term);
        let uniqueTerms: string[] = [...new Set(terms)];
        res.status(200).json({terms: uniqueTerms});
    }
    catch (err) {
        throw err;
    }
}
