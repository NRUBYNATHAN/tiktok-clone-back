import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
//app config
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
//DB config
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!  ");

//api endpoints
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post("/addposts", async function (request, response) {
  const data = request.body;
  console.log(data);
  const post = await client.db("tiktok").collection("posts").insertOne(data);
  console.log(post);
  response.send(post);
});

app.get("/getposts", async function (request, response) {
  const result = await client
    .db("tiktok")
    .collection("posts")
    .find({})
    .toArray();
  response.send(result);
});
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
