export class Time {
  hours: number;
  mins: number;

  constructor(timeObject: {hours: number, mins: number}) {
    this.hours = timeObject.hours;
    this.mins = timeObject.mins;
  }

  toString() {
    return `${this.hours.toString().padStart(2, "0")}:${this.mins.toString().padStart(2, "0")}`;
  }
}
