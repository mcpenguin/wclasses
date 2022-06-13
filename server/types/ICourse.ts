import { Document } from "mongoose";
import ICourseCode from "./ICourseCode";

export default interface ICourse extends Document, ICourseCode {
    courseId: string,
    associatedAcademicCareer: string,
    associatedAcademicGroupCode: string,
    associatedAcademicOrgCode: string,
    title: string,
    description: string,
    gradingBasis: string,
    courseComponentCode: string,
    enrollConsentCode: string,
    enrollConsentDescription: string,
    dropConsentCode: string,
    dropConsentDescription: string,
}

