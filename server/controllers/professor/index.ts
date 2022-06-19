import { Response, Request } from "express"
import IClass from "../../types/IClass"
import Class from "../../models/Class"
import IProfessor from "../../types/IProfessor"
import { GetInfoForProfessorFromUWFlow } from "../../helpers/uwflow"

export const GetInfoForProfessor = async (req: Request, res: Response):
Promise<void> => {
	try {
		const dataAboutProfessor: IProfessor = await GetInfoForProfessorFromUWFlow(req.params.firstName, req.params.lastName);
		res.status(200).json(dataAboutProfessor);
	}
	catch (err) {
		throw err;
	}
}

export const GetClassesProfessorHasTaught = async (req: Request, res: Response):
Promise<void> => {
	try {
		const classes: IClass[] = await Class.find({
			"instructor": `${req.params.lastName},${req.params.firstName}`,
			...(req.query.term == null ? {} : {term: req.query.term})
		});
		res.status(200).json(classes);
	}
	catch (err) {
		throw err;
	}
}
