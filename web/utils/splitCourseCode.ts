// given a course code <subjectCode><catalogNumber>, return [subjectCode, catalogNumber]

function splitCourseCode(courseCode: string): [string, string] {
  let subjectCode = ""
  let i = 0;
  while (isNaN(parseInt(courseCode[i], 10))) {
    subjectCode += courseCode[i];
    i++;
  }
  const catalogNumber = courseCode.substring(i);
  return [subjectCode.toUpperCase(), catalogNumber.toUpperCase()];
}

export default splitCourseCode;
