const express = require("express");
const app = express();
app.use(express.json());

let users = [];

app.post("/update", (req, res) => {
  const { user, status } = req.body;
  users = users.filter(u => u.user !== user); // remove old
  users.push({ user, status, time: Date.now() });
  res.json({ success: true });
});

app.get("/get", (req, res) => {
  const now = Date.now();
  users = users.filter(u => now - u.time < 30000); // remove inactive after 30s
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
