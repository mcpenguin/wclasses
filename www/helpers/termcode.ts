export const parseTermCode = (termCode: string): string => {
  const season = {'1': 'Winter', '5': 'Spring', '9': 'Fall'}[termCode[3]]
  return `${season} ${parseInt(termCode.substring(0, 3)) + 1900}`;
}
