const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Lead CRM API Running...");
});
app.use("/api/leads", require("./routes/leadRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});