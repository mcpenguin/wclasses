export class Time {
  hours: string;
  mins: string;

  constructor(timeObject: {hours: string, mins: string}) {
    this.hours = timeObject.hours;
    this.mins = timeObject.mins;
  }

  toString() {
    return `${this.hours.toString().padStart(2, "0")}:${this.mins.toString().padStart(2, "0")}`;
  }
}
