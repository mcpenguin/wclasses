import { Date, Document } from 'mongoose'
import ICourseCode from './ICourseCode'

enum Day { 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su' };

interface ISection extends Document {
  type: string
  num: string
}

interface ICampusLocation extends Document {
  first: string
  second: string
}

interface IHoursMins extends Document {
  hours: number
  mins: number
}

interface ITime extends Document {
  startTime: IHoursMins
  endTime: IHoursMins
  days: Day[]
}

export default interface IClass extends Document, ICourseCode {
  term: string
  level: ['UG', 'G']
  dateUpdated: Date
  units?: string
  title: string
  notes?: string
  classNumber: string
  section?: ISection
  campusLocation?: ICampusLocation
  enrolCap: number
  enrolTotal: number
  time?: ITime
  buildingCode?: string
  roomNumber?: string
  instructor?: string
}
