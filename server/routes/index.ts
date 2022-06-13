import { Router } from "express"

import * as classes from "../controllers/classes";
import * as courses from "../controllers/courses";

const router: Router = Router();

router.get("/courses/details/:subjectCode/:catalogNumber", 
courses.GetInfoForCourse);

router.get("/courses/schedule/:subjectCode/:catalogNumber", classes.GetScheduleForCourse);
router.get("/courses/schedule/:subjectCode/:catalogNumber/:termCode", classes.GetScheduleForCourseWithTermCode);

export default router;