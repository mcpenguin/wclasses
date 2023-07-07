import clientPromise from "@lib/mongodb";
import Class from "@models/Class";

// returns {termcode: <list of classes>}
async function getClassesAsync(subjectCode?: string, catalogNumber?: string, term?: string): Promise<{[key: string]: Class[]}> {
  const client = await clientPromise;
  const db = client.db("waterloo");
  const classes = db.collection("classes");

  const query = {
    ...(subjectCode ? {subjectCode} : {}),
    ...(catalogNumber ? {catalogNumber} : {}),
    ...(term ? {term} : {})
  }
  const result = await classes
    .find(query)
    .sort({
      term: 1,
      'section.type': 1,
      'section.num': 1,
    })
    .toArray();
  // group the different sections by termcode
  const sections: {[key: string]: Class[]} = {}
  for (const c of result) {
    const cc = <Class><unknown>c;
    if (!sections[cc.term]) {
      sections[cc.term] = [];
    }
    sections[cc.term].push(cc);
  }
  return sections;
}

export default getClassesAsync;
