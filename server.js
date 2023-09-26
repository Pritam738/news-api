//server.js
const logger = require('./logger');

const PORT = process.env.PORT || 3000;

const app = require("./app");
app.listen(PORT, () => {
  logger.info("server is listening at port 3000...");
});