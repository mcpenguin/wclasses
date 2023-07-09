import CourseUWFlowData from "@models/CourseUWFlowData";
import { UW_FLOW_API_LINK } from "../constants";
import axios from "axios";
import splitCourseCode from "@utils/splitCourseCode";

async function getProfUWFlowDetailsAsync(
  firstName: string,
  lastName: string
): Promise<CourseUWFlowData | undefined> {
  try {
    const name = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

    const params = {
      operationName: "getProf",
      query: "query getProf($code: String) {\n  prof(where: {code: {_eq: $code}}) {\n    ...ProfRating\n    __typename\n  }\n}fragment ProfRating on prof {\n  id\n  rating {\n    liked\n    clear\n    engaging\n    filled_count\n    comment_count}\n}\n",
      variables: {
        code: name,
      },
    };
    const profData = (await axios.post(UW_FLOW_API_LINK, params)).data.data.prof[0];
    return profData;
  } catch (e) {
    console.error(e);
    return;
  }
}

export default getProfUWFlowDetailsAsync;
