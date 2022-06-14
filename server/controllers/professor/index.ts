import { Response, Request } from "express"
import IClass from "../../types/IClass"
import Class from "../../models/Class"

export const GetClassesProfessorHasTaught = async (req: Request, res: Response):
Promise<void> => {
	try {
		const classes: IClass[] = await Class.find({
			"instructor": `${req.params.lastName},${req.params.firstName}`
		});
		res.status(200).json({classes});
	}
	catch (err) {
		throw err;
	}
}
