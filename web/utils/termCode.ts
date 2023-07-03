export class TermCode {
  code: string;

  constructor(code: string) {
    this.code = code;
  }

  getName(): string {
    let season = {'1': 'Winter', '5': 'Spring', '9': 'Fall'}[this.code[3]]
    return `${season} ${parseInt(this.code.slice(0,3)) + 1900}`
  }

  static getTermCode(date: Date) {
    let yearTermcode = date.getUTCFullYear() - 1900
    let monthTermcode;
    if (date.getUTCMonth() < 5) {
      monthTermcode = 1;
    }
    else if (date.getUTCMonth() < 9) {
      monthTermcode = 5;
    }
    else {
      monthTermcode = 9;
    }
    return `${yearTermcode}${monthTermcode}`;
  }

  static getCurrentTermCode() {
    return TermCode.getTermCode(new Date());
  }
}
