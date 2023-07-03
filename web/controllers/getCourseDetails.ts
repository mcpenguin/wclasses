import { TermCode } from "@utils/termCode";
import { UW_API_LINK } from "../constants";

const UW_API_KEY = process.env.UW_API_KEY || "";

export default async function(subjectCode?: string, catalogNumber?: string): Promise<any> {
  try {
    const courses = await fetch(`${UW_API_LINK}/Courses/${TermCode.getCurrentTermCode()}/${subjectCode}`, {
      headers: {
        'X-API-KEY': UW_API_KEY
      }
    })
    const result = (await courses.json()).filter((c: any) => c.catalogNumber === catalogNumber);
    return result;
  } catch (e) {
    console.error(e);
  }
}
