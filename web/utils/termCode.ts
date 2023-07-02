export class TermCode {
  code: string;

  constructor(code: string) {
    this.code = code;
  }

  getName(): string {
    let season = {'1': 'Winter', '5': 'Spring', '9': 'Fall'}[this.code[3]]
    return `${season} ${parseInt(this.code.slice(0,3)) + 1900}`
  }
}
