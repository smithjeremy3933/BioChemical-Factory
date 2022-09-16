require("./models/User");
require("./models/Group");
require("./models/GroupChatPost");
require("./models/GroupChatComment")
const express = require("express");
const mongoKey = require("./keys/Keys")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const groupRoutes = require("./routes/groupRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(groupRoutes);
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message })
})

mongoUri = mongoKey;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.log("Error connecting to mongo".err);
});


app.get("/", requireAuth, (req, res) => {
    res.send('This is the server for the BioChemical Factory!!');
  });
  
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
