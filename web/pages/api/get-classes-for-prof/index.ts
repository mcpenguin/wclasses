import clientPromise from "@lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

// Get course details based on subject code and catalog number
// Query parameters:
// 
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
      const client = await clientPromise;
      const db = client.db("waterloo");
      const courses = db.collection("classes");

      const result = await courses
        .find({
            "instructor": `${req.query.lastName},${req.query.firstName}`,
          ...(req.query.term == null ? {} : {term: req.query.term})
        })
        .toArray();
      
      res.status(200);
      res.json(result);
  } catch (e) {
      console.error(e);
  }
};
