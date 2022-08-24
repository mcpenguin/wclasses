import ICourseCode from '../types/ICourseCode'

// converts a course string in the form of {subjectCode}{catalogNumber}
// into [subjectCode, catalogNumber]

export default function splitCourse (courseString: string): ICourseCode {
  let subjectCode = ''
  let i: number = 0
  // whilst the character is not a number, add it to the subjectCode
  while (courseString.charAt(i).toUpperCase() !== courseString.charAt(i).toLowerCase()) {
    subjectCode += courseString[i]
    i++
  }
  // the catalog number is the rest of the string
  const catalogNumber = courseString.substring(i)
  return { subjectCode: subjectCode.toUpperCase(), catalogNumber }
}
