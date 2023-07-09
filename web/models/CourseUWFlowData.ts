interface CourseRatingUWFlowData {
  liked: number;
  easy: number;
  useful: number;
  filled_count: number;
  comment_count: number;
}

interface UWFlowPostrequisite {
  courseCode: {
    subjectCode: string;
    catalogNumber: string;
  }
  name: string;
}

interface CourseUWFlowData {
  rating: CourseRatingUWFlowData;
  antireqs: string | null;
  prereqs: string | null;
  coreqs: string | null;
  postrequisites: UWFlowPostrequisite[]
}

export default CourseUWFlowData;
