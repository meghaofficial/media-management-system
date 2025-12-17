require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
require("./db");

app.use(cors({
      origin: "http://localhost:5173",
      credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api", userRoute);

app.listen(8080, () => console.log("listening on port 8080"));