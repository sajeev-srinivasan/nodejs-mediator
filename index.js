const express = require("express");
const axios = require("axios");

const app = express();
const port = 80;

app.use(express.json());

app.post("/make-api-call", async (req, res) => {
  try {
    const requestData = req.body;
    console.log("----------", requestData);

    const headers = {
      Host: "delayed-service-1-svc.default.svc.cluster.local",
    };

    const response = await axios.get(
      "http://delayed-service-1-svc.default.svc.cluster.local/sleep/5",
      { headers }
    );
    console.log("----------", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error making API call:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
