import CourseUWFlowData from "@models/CourseUWFlowData";
import { UW_FLOW_API_LINK } from "../constants";
import axios from "axios";

async function getCourseUWFlowDetailsAsync(
  subjectCode: string,
  catalogNumber: string
): Promise<CourseUWFlowData | undefined> {
  try {
    const lowerSubjectCode = subjectCode.toLowerCase();
    const lowerCatalogNumber = catalogNumber.toLowerCase();
    const courseCode = `${lowerSubjectCode}${lowerCatalogNumber}`;

    const params = {
      operationName: "getCourse",
      query:
        "query getCourse($code: String) {\n  course(where: {code: {_eq: $code}}) {\n ...CourseRating\n    __typename\n  }\n} fragment CourseRating on course {\n  id\n  rating {\n    liked\n    easy\n    useful\n    filled_count\n    comment_count\n \n  }\n  __typename\n}\n",
      variables: {
        code: courseCode,
      },
    };
    const courseData = (await axios.post(UW_FLOW_API_LINK, params)).data.data;
    return courseData.course[0].rating;
  } catch (e) {
    console.error(e);
    return;
  }
}

export default getCourseUWFlowDetailsAsync;
