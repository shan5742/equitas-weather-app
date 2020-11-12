const express = require("express");
const cors = require("cors");

const app = express();
const axios = require("axios");
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Express to serve production assets
  app.use(express.static("client/build"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/weather", async (req, res) => {
  let response;
  try {
    response = await axios.get(
      "https://www.metaweather.com/api/location/44544"
    );
  } catch (e) {
    res.status(404).send();
  }
  res.status(200).send(response.data);
});

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);