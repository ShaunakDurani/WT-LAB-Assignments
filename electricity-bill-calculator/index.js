const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const billingRoutes = require("./routes/billing");

const app = express();

// Middleware (must come before routes)
app.use(cors());
app.use(bodyParser.json()); // Parse JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parse form-urlencoded

app.use(express.static("public"));
app.use("/api", billingRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
