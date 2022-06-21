import { Document } from "mongoose";
import ICourse from './ICourse';
import ICourseCode from "./ICourseCode";

export default interface ICourseWithUWFlowData extends ICourse {
    prerequisitesAsString?: string,
    corequisites?: ICourseCode[],
    antirequisites?: ICourseCode[],
    postrequisites?: ICourseCode[],
    liked: number,
    easy: number,
    useful: number,
    filled_count: number,
    comment_count: number,
}

