import { Router } from "express"

import * as classes from "../controllers/classes";

const router: Router = Router();

router.get("/courses/schedule/:subjectCode/:catalogNumber", classes.GetScheduleForCourse);
router.get("/courses/schedule/:subjectCode/:catalogNumber/:termCode", classes.GetScheduleForCourseWithTermCode);

export default router;