// Type for course information

interface Course {
  subjectCode: string
  catalogNumber: string
  courseId: string
  associatedAcademicCareer: string
  associatedAcademicGroupCode: string
  associatedAcademicOrgCode: string
  title: string
  description: string
  gradingBasis: string
  courseComponentCode: string
  enrollConsentCode: string
  enrollConsentDescription: string
  dropConsentCode: string
  dropConsentDescription: string
}

export default Course;
