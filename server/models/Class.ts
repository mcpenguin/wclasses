import { model, Schema } from "mongoose"
import IClass from "../types/IClass";

const SectionSchema: Schema = new Schema({
    type: {
        type: String,
        required: true,
    },
    num: {
        type: String,
        required: true,
    }
})

const CampusLocationSchema: Schema = new Schema({
    first: {
        type: String,
        required: true,
    },
    second: {
        type: String,
        required: true
    }
})

const HoursMinsSchema: Schema = new Schema({
    hours: {
        type: Number,
        required: true,
    },
    mins: {
        type: Number,
        required: true,
    }
})

// schema for time object
const TimeSchema: Schema = new Schema({
    startTime: {
        type: HoursMinsSchema,
        required: true,
    },
    endTime: {
        type: HoursMinsSchema,
        required: true,
    },
    days: { 
        type: [String],
        required: true,
    },
})

const ClassSchema: Schema = new Schema({
    term: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    dateUpdated: {
        type: Date,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
    },
    units: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
    classNumber: {
        type: String,
        required: true,
    },
    section: {
        type: SectionSchema,
        required: false,
    },
    campusLocation: {
        type: CampusLocationSchema,
        required: false,
    },
    enrolCap: {
        type: Number,
        required: true,
    },
    enrolTotal: {
        type: Number,
        required: true,
    },
    time: {
        type: TimeSchema,
        required: false,
    },
    buildingCode: {
        type: String,
        required: false,
    },
    roomNumber: {
        type: String,
        required: false,
    },
    instructor: {
        type: String,
        required: false,
    }
}
)

export default model<IClass>('Class', ClassSchema, 'courses');
