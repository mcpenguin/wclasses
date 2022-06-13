import { model, Schema } from "mongoose"
import ICourse from "../types/ICourse"

const CourseSchema: Schema = new Schema({
    courseId: {
        type: String,
        required: true,
    },
    associatedAcademicCareer: {
        type: String,
        required: true,
    },
    associatedAcademicGroupCode: {
        type: String,
        required: true,
    },
    associatedAcademicOrgCode: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
    },
    catalogNumber: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    gradingBasis: {
        type: String,
        required: true,
    },
    courseComponentCode: {
        type: String,
        required: true,
    },
    enrollConsentCode: {
        type: String,
        required: true,
    },
    enrollConsentDescription: {
        type: String,
        required: true,
    },
    dropConsentCode: {
        type: String,
        required: true,
    },
    dropConsentDescription: {
        type: String,
        required: true,
    }
})

export default model<ICourse>("Course", CourseSchema, "courses")

