require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const fileRoute = require("./routes/fileRoutes");
require("./config/db");

app.use(cors({
      origin: "http://localhost:5173",
      credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api", [userRoute, fileRoute]);

app.listen(process.env.PORT, () => console.log("listening on port 8080"));