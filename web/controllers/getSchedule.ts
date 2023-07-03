import clientPromise from "@lib/mongodb";

export default async function(subjectCode?: string, catalogNumber?: string, term?: string): Promise<any> {
  try {
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
    const sections: {[key: string]: any[]} = {}
    for (const c of result) {
      if (!sections[c.term]) {
        sections[c.term] = [];
      }
      sections[c.term].push(c);
    }
    return sections;
  }
  catch (err) {
    throw err;
  }
}
