import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("I am running at 8080");
});

const MONGO_URI =
  "mongodb+srv://karthikm:karthik@cluster0.sqcmitt.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;

mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (err: Error) => console.log(err));
