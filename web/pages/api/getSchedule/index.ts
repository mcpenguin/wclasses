import clientPromise from "@lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("waterloo");
    const classes = db.collection("classes");

    const result = await classes.find({
      subjectCode: req.query.subjectCode,
      catalogNumber: req.query.catalogNumber,
      ...(req.query.term == null ? {} : {term: req.query.term})
    })
      .toArray();
    res.status(200).json(result);
  }
  catch (err) {
    throw err;
  }
}
