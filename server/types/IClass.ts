import { Date, Document } from "mongoose";

interface ISection extends Document {
    type: string,
    num: string
}

interface ICampusLocation extends Document {
    first: string,
    second: string
}

interface IHoursMins extends Document {
    hours: number,
    mins: number,
}

interface ITime extends Document {
    startTime: IHoursMins,
    endTime: IHoursMins,
    days: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'][],
}

export default interface IClass extends Document {
    term: string,
    level: ["UG", "G"],
    dateUpdated: Date,
    subjectCode: string,
    catalogNumber: string,
    units?: string,
    title: string,
    notes?: string,
    classNumber: string,
    section?: ISection,
    campusLocation?: ICampusLocation,
    enrolCap: number,
    enrolTotal: number,
    time?: ITime,
    buildingCode?: string,
    roomNumber?: string,
    instructor?: string
}