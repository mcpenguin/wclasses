import CourseUWFlowData from "@models/CourseUWFlowData";
import { UW_FLOW_API_LINK } from "../constants";
import axios from "axios";
import splitCourseCode from "@utils/splitCourseCode";

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
        "query getCourse($code: String) {\n  course(where: {code: {_eq: $code}}) {\n ...CourseRating\n  ...CourseRequirements  __typename\n  }\n} fragment CourseRequirements on course {\n  id\n  antireqs\n  prereqs\n  coreqs\n  postrequisites {\n    postrequisite {\n      id\n      code\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n} fragment CourseRating on course {\n  id\n  rating {\n    liked\n    easy\n    useful\n    filled_count\n    comment_count\n \n  }\n}\n",
      variables: {
        code: courseCode,
      },
    };
    const courseData = (await axios.post(UW_FLOW_API_LINK, params)).data.data.course[0];
    // convert postreq code into [subjectCode, catalogNumber] instead
    const parsedCourseData = {
      ...courseData,
      postrequisites: courseData.postrequisites.map((x: any) => {
          const [subjectCode, catalogNumber] = splitCourseCode(x.postrequisite.code);
          return {
            courseCode: {
              subjectCode, catalogNumber
            },
            name: x.postrequisite.name
          }
        }
      )
    }
    return parsedCourseData;
  } catch (e) {
    console.error(e);
    return;
  }
}

export default getCourseUWFlowDetailsAsync;
