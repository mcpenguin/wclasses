import axios from "axios";
import IUWFlowCourse from "../types/IUWFlowCourse";
import IProfessor from "../types/IProfessor";

export const UWFLOW_API_URL = "https://uwflow.com/graphql";

// Get information about a course
export const GetInfoForCourseFromUWFlow = async (subjectCode: string, catalogNumber: string): Promise<IUWFlowCourse> => {
    const payload = {
        operationName: "getCourse",
        variables: {"code": `${subjectCode.toLowerCase()}${catalogNumber.toLowerCase()}`},
        query: "query getCourse($code: String, $user_id: Int) { course(where: {code: {_eq: $code}}) { ...CourseInfo ...CourseSchedule ...CourseRequirements ...CourseRating __typename } }  fragment CourseInfo on course { id code name description profs_teaching { prof { id code name rating { liked comment_count __typename } __typename } __typename } __typename }  fragment CourseSchedule on course { id sections { id enrollment_capacity enrollment_total class_number section_name term_id updated_at meetings { days start_date end_date start_seconds end_seconds location prof { id code name __typename } is_closed is_cancelled is_tba __typename } exams { date day end_seconds is_tba location section_id start_seconds __typename } __typename } __typename }  fragment CourseRequirements on course { id antireqs prereqs coreqs postrequisites { postrequisite { id code name __typename } __typename } __typename }  fragment CourseRating on course { id rating { liked easy useful filled_count comment_count __typename } __typename }"
    }
    const response = await axios.post(UWFLOW_API_URL, payload);
    return (response.data.data.course)[0];
}

export const GetInfoForProfessorFromUWFlow = async (firstName: string, lastName: string): Promise<IProfessor> => {
    const payload = {
        operationName: "getProf",
        variables: {"code": `${firstName.toLowerCase()}_${lastName.toLowerCase()}`},
        query: "query getProf($code: String) { prof(where: {code: {_eq: $code}}) { ...ProfInfo ...ProfCoursesTaught ...ProfRating __typename } }  fragment ProfInfo on prof { id name code __typename }  fragment ProfCoursesTaught on prof { id prof_courses { course { id code __typename } __typename } __typename }  fragment ProfRating on prof { id rating { liked clear engaging filled_count comment_count __typename } __typename } "
    }
    const response = await axios.post(UWFLOW_API_URL, payload);
    return (response.data.data.prof)[0];
}
