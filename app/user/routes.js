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
      // TODO: Handle errors based on 400/500 status codes
      res.status(500).json({ error: err.message });
    });
});

export default router;
