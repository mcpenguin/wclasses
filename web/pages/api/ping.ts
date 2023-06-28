import clientPromise from "@lib/mongodb";

const ping = async (req, res) => {
  try {
      const client = await clientPromise;
      const db = client.db("waterloo");

      const movies = await db
          .collection("movies")
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();

      res.json(movies);
  } catch (e) {
      console.error(e);
  }
};

export default ping;
