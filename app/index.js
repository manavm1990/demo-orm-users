import express from "express";
import config from "./config.js";
import userRouter from "./user/routes.js";

const app = express();

// Logical OR short-circuits if the first value is truthy
const PORT = config.port || 3000;

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
