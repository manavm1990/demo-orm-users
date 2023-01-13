import { Router } from "express";
import userController from "./controller.js";

const router = Router();

router.post("/", (req, res) => {
  userController
    .create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (
        err.message.includes("notNull Violation") ||
        err.message.includes("Validation error")
      ) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
});

export default router;
