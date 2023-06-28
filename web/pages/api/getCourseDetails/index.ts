import clientPromise from "@lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import getCourseDetails from "@controllers/getCourseDetails";

// Get course details based on subject code and catalog number
// Query parameters:
// 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subjectCode = <string | undefined>req.query.subjectCode;
    const catalogNumber = <string | undefined>req.query.catalogNumber;
    const courses = await getCourseDetails(subjectCode, catalogNumber);
    res.status(200).json(courses);
  } catch (e) {
      console.error(e);
  }
};
