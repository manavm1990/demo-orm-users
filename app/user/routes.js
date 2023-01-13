import { Router } from "express";
import userController from "./controller.js";

const router = Router();

router.post("/", (req, res) => {
  userController
    .create(req.body)
    .then((user) => {
      res.status(201).json({ message: `User ${user.username} created` });
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

router.post("/login", async (req, res) => {
  // We ask the controller to do stuff that needs access to the database
  const foundUser = await userController.show(req.body.username);

  // We ask the model to do stuff that doesn't need access to the database
  // * Use conditional chaining to avoid a TypeError when 'foundUser' is null
  const isAuth = await foundUser?.isValidPassword(req.body.password);

  if (foundUser && isAuth) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

export default router;
