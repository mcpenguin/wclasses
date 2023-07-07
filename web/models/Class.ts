// Type for class information

enum Day { 'M', 'T', 'W', 'Th', 'F', 'Sa', 'Su' };

interface Section {
  interface: string
  num: string
}

interface CampusLocation {
  first: string
  second: string
}

interface HoursMins {
  hours: number
  mins: number
}

interface Time {
  startTime: HoursMins
  endTime: HoursMins
  days: Day[]
}

interface Class {
  term: string
  subjectCode: string
  catalogNumber: string
  level: ['UG', 'G']
  dateUpdated: Date
  units?: string
  title: string
  notes?: string
  classNumber: string
  section?: Section
  campusLocation?: CampusLocation
  enrolCap: number
  enrolTotal: number
  time?: Time
  buildingCode?: string
  roomNumber?: string
  instructor?: string
}

export default Class
