interface CourseRatingUWFlowData {
  liked: number;
  clear: number;
  engaging: number;
  filled_count: number;
  comment_count: number;
}

interface ProfUWFlowData {
  rating: CourseRatingUWFlowData;
}

export default ProfUWFlowData;
