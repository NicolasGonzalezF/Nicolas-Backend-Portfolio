import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let data = {
    layout: "recoverypassword",
  };
  res.render("index", data);
});

export default router;