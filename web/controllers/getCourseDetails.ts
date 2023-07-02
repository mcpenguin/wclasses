import clientPromise from "@lib/mongodb";

export default async function(subjectCode?: string, catalogNumber?: string): Promise<any> {
  try {
    const client = await clientPromise;
    const db = client.db("waterloo");
    const courses = db.collection("courses");

    let query = {
      ...(subjectCode ? {subjectCode} : {}),
      ...(catalogNumber ? {catalogNumber} : {})
    }
    const result = await courses
        .find(query)
        .toArray();
    return result;
  } catch (e) {
    console.error(e);
  }
}
