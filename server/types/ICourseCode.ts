import { Document } from "mongoose";

export default interface ICourseCode extends Document {
    subjectCode: string,
    catalogNumber: string,
}