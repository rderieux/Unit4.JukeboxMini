const express = require("express");
const app = express();
const PORT = 3000;

// morgan is logging middleware maintained by the Expressjs team
// see: https://expressjs.com/en/resources/middleware/morgan.html
app.use(require("morgan")("dev"));

app.use(express.json());

app.use("/users", require("./api/users"));

// 404 handling middleware
app.use((req, res, next) => {
  next({
    status: 404,
    message: "The endpoint you are trying to reach does not exist.",
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke on the server side.");
});

app.listen(PORT, () => {
  console.log(`Listening on port#: ${PORT}...`);
});
