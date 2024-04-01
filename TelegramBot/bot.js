const express = require('express');
const PORT = process.env.PORT || 4004;
const app = express();

// Parse JSON bodies
app.use(express.json());

// POST route
app.post("*", async(req, res) => {
  console.log(req.body);
  res.send(await handler(req));
});

// GET route
app.get("*", async(req, res) => {
  console.log("Request received");
  res.send(await handler(req));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
