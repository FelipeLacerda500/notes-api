require("dotenv/config");
require("express-async-errors");

// const migrationsRun = require("./database/sqlite/migrations");
const sqliteConnection = require("./database/sqlite");
const AppError = require("../src/utils/AppError");
const uploadConfig = require("../src/configs/upolad");
const express = require("express");
const routes = require("./routes");

// migrationsRun();
sqliteConnection();

const app = express(); // Objeto que representa o app (framework) express
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

const PORT = process.env.SERVER_PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
