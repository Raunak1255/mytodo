const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/ToDoRoutes");

const cors = require("cors");

const app = express();
// const PORT = process.env.PORT || 5000;
const DEFAULT_PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);


function startServer(port) {
  app.listen(port, () => {
    console.log(`Listening at ${port}...`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying another port...`);
      startServer(port + 1); // Try next port
    } else {
      console.error(`Error starting server: ${err.message}`);
    }
  });
}

startServer(DEFAULT_PORT);

// app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
