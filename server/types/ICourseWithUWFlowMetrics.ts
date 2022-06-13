import { Document } from "mongoose";
import ICourse from './ICourse';
import ICourseCode from "./ICourseCode";

export default interface ICoursewithUWFlowMetrics extends ICourse, Document {
    prerequisitesAsString: string,
    corequisites: ICourseCode[],
    antirequisites: ICourseCode[],
    postrequisites: ICourseCode[],
    liked: number,
    easy: number,
    useful: number,
    numberRated: number,
    numberCommented: number,
}

