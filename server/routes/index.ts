import { Router } from "express"

import * as classes from "../controllers/classes";
import * as courses from "../controllers/courses";
import * as professor from "../controllers/professor";

const router: Router = Router();

router.get("/courses/details/:subjectCode/:catalogNumber", 
courses.GetInfoForCourse);

router.get('/courses/termOfferings/:subjectCode/:catalogNumber',
classes.GetTermsCourseWasOffered);

router.get("/courses/schedule/:subjectCode/:catalogNumber", classes.GetScheduleForCourse);
router.get("/courses/schedule/:subjectCode/:catalogNumber/:termCode", classes.GetScheduleForCourseWithTermCode);

router.get("/professor/classesTaught/:firstName/:lastName", professor.GetClassesProfessorHasTaught);

export default router;
