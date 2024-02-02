import express from "express";
import io from "../../app.js"
const router = express.Router();

router.get("/", (req, res) => {
  if(req.session.user===undefined){
    console.log("oh no, the session expired")
    res.redirect("/")
    return;
  }
  let data = {
    layout: "profile",
    user: req.session.user,
  };
  let email =req.session.user.email;
  req.logger.debug("Current user "+email)
  io.emit("current_user",req.session.user);
  res.render("index", data);
});

export default router;