import 'dotenv/config'

import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 8000

app.use(cors())
app.use(express.json());
app.use(routes)

const uri: string = process.env.MONGO_READER_URL ?? ""

if (uri !== "") {
  mongoose.connect(uri)
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      )
      )
      .catch(error => {
          throw error
      })
}
else {
  console.log("Invalid URI");
}

