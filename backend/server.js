const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//8070 port eken open krnn ehem berinm current thiyena port ekakin open krnn
const port = process.env.port || 8000;

//Used cors dependency
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8000"],
  })
);
//used body parser dependency
app.use(bodyParser.json()); //Meka use karanne JSON format eken Request yawana hinda

const url = process.env.MONGODB_URL;

//These options help ensure a more reliable, efficient, and up-to-date connection to the MongoDB database using Mongoose.
mongoose.connect(url, {
  useNewUrlParser: true, //This option instructs Mongoose to use the new URL parser when connecting to the MongoDB server
  useUnifiedTopology: true, //This option enables the use of the new MongoDB driver's unified topology engine
});

const mongoDBstore = new MongoDBStore({
  uri: url,
  collection: "sessions",
});

app.use(
  session({
    name: "mySessionCookie",
    secret: "mySecretKey",
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: false,
    },
  })
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const userRouter = require("./routes/userRoutes");

app.use("/user", userRouter);
