import { Document } from "mongoose";

export default interface ICourse extends Document {
    courseId: string,
    associatedAcademicCareer: string,
    associatedAcademicGroupCode: string,
    associatedAcademicOrgCode: string,
    subjectCode: string,
    catalogNumber: string,
    title: string,
    description: string,
    gradingBasis: string,
    courseComponentCode: string,
    enrollConsentCode: string,
    enrollConsentDescription: string,
    dropConsentCode: string,
    dropConsentDescription: string,
}

