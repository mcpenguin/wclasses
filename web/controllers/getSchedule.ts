import clientPromise from "@lib/mongodb";

export default async function(subjectCode?: string, catalogNumber?: string, term?: string): Promise<any> {
  try {
    const client = await clientPromise;
    const db = client.db("waterloo");
    const classes = db.collection("classes");

    let query = {
      ...(subjectCode ? {subjectCode} : {}),
      ...(catalogNumber ? {catalogNumber} : {}),
      ...(term ? {term} : {})
    }
    const result = await classes
      .find(query)
      .toArray();
    return result;
  }
  catch (err) {
    throw err;
  }
}
