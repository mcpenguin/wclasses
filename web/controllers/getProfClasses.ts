import clientPromise from "@lib/mongodb";
import Class from "@models/Class";

// Returns list of classes that given prof has taught
async function getProfClassesAsync(firstName: string, lastName: string): Promise<{[key: string]: Class[]}> {
  const client = await clientPromise;
  const db = client.db("waterloo");
  const classes = db.collection("classes");

  const query = {
    instructor: {
      $regex: `${lastName},.*${firstName}`,
      $options: "i",
    }
  }
  const result = await classes
    .find(query)
    .sort({
      term: -1,
      subjectCode: 1,
      catalogNumber: 1,
    })
    .toArray();
  // group together by first term code, then by subject code, then by catalog number
  // {"{term code} {subject code} {catalogNumber": [<class info>]}
  const grouped: {[key: string]: Class[]} = {}
  for (const c of result) {
    const cc = <Class><unknown>c
    const key = `${cc.term} ${cc.subjectCode} ${cc.catalogNumber}`
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(cc);
  }

  return grouped;
}

export default getProfClassesAsync;
