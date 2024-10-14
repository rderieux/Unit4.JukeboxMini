const express = require("express");
const app = express();
const PORT = 3000;

// morgan is logging middleware maintained by the Expressjs team
// see: https://expressjs.com/en/resources/middleware/morgan.html
app.use(require("morgan")("dev"));

app.use(express.json());

app.use("/users", require("./api/users"));

app.listen(PORT, () => {
  console.log(`Listening on port#: ${PORT}...`);
});
