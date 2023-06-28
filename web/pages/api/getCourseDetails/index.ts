import clientPromise from "@lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

// Get course details based on subject code and catalog number
// Query parameters:
// 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
      const client = await clientPromise;
      const db = client.db("waterloo");
      const courses = db.collection("courses");

      const subjectCode = req.query.subjectCode;
      if (!subjectCode) {
        res.status(500);
        res.json({error: 'Please specify the subject code using in the query: subjectCode'})
        return;
      }
      const catalogNumber = req.query.catalogNumber;
      if (!catalogNumber) {
        res.status(500);
        res.json({error: 'Please specify the catalog number using in the query: catalogNumber'})
      }

      const result = await courses
          .find({subjectCode, catalogNumber})
          .toArray();
      
      res.status(200);
      res.json(result);
  } catch (e) {
      console.error(e);
  }
};
