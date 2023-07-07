import { TermCode } from "@utils/termCode";
import { UW_API_LINK } from "../constants";
import Course from "@models/Course";

const UW_API_KEY = process.env.UW_API_KEY || "";

async function getCourseAsync(subjectCode?: string, catalogNumber?: string): Promise<Course[] | undefined> {
  try {
    const courses = await fetch(`${UW_API_LINK}/Courses/${TermCode.getCurrentTermCode()}/${subjectCode}`, {
      headers: {
        'X-API-KEY': UW_API_KEY
      }
    })
    const json: Course[] = await courses.json();
    const result = json.filter((c: Course) => c.catalogNumber === catalogNumber);
    return result;
  } catch (e) {
    console.error(e);
    return;
  }
}

export default getCourseAsync;
