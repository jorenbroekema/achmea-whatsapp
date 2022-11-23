const path = require("path");
const fs = require("fs");
const express = require("express");
const whatsapp = require("whatsapp-chat-parser");

const port = 3000;
const dataFileName = "chat.txt";

const app = express();

// serve static files in this folder
app.use(express.static(path.resolve(__dirname)));

app.get("/chat", (req, res) => {
  const fileContents = fs.readFileSync(dataFileName, "utf-8");

  whatsapp.parseString(fileContents).then((messages) => {
    res.json(messages);
    // Content-type: application/json
    // body: JSON.stringify(messages)
  });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
