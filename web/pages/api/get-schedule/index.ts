import getSchedule from "@controllers/getSchedule";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const subjectCode = <string | undefined>req.query.subjectCode;
  const catalogNumber = <string | undefined>req.query.catalogNumber;
  const term = <string>req.query.term;
  if (!subjectCode || !catalogNumber || !term) {
    res.status(500).json({error: 'Missing one of query parameters: subjectCode, catalogNumber, term'});
  }
  const schedule = await getSchedule(subjectCode, catalogNumber, term);
  res.status(200).json(schedule);
}
