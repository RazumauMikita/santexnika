const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const root = path.join(__dirname, "out");

app.use(express.static(root, { extensions: ["html"] }));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(root, "404.html"), (error) => {
    if (error) {
      res.status(404).end();
    }
  });
});

const server = http.createServer(app);

if ("SOCKET" in process.env) {
  const socket = process.env.SOCKET;

  if (fs.existsSync(socket)) {
    fs.unlinkSync(socket);
  }

  server.listen(socket, () => {
    fs.chmodSync(socket, 0o660);
    console.log(`Listening ${socket}`);
  });
} else if ("PORT" in process.env) {
  const hostname = process.env.INSTANCE_HOST;
  const port = process.env.PORT;

  server.listen(port, hostname, () => {
    console.log(`Listening http://${hostname}:${port}/`);
  });
} else {
  console.error("SOCKET or PORT environment variable is required");
  process.exit(1);
}
