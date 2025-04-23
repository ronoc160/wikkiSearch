const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const wikipediaRoutes = require("../API/src/routes/wikipediaRoutes");
app.use("/api/wikipedia", wikipediaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
