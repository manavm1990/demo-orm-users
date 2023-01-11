import express from "express";
import config from "./config.js";
import userRouter from "./user/routes.js";

const app = express();

// Logical OR short-circuits if the first value is truthy
const PORT = config.port || 3000;

app.use(express.json());

app.use("/api/users", userRouter);

app.use((_, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
