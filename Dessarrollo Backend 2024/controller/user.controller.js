import {Router} from "express";
//import UserDAO from "../dao/users.dao.js";
//import CartsDAO from "../dao/carts.dao.js";
import * as Users from "../Services/UserService.js"
import * as Cart from "../Services/CartService.js"

/////////////////////////errors
import CustomError from "../utils/Custom.error.js";
import * as InfoError from "../utils/info.error.js"
import EnumError from "../utils/enum.error.js";
//////////////////////////
import "dotenv/config.js";
import { createHash, isValidPassword } from "../utils.js";
import io from "../app.js"
//////////////////
import {  authToken,
    authorization,
    generateToken,
    passportCall, } from "../utils.js";
/////////////////

//const Users = new UserDAO();
//const Cart = new CartsDAO();
const UserRouter = Router();
/////////////// register 
UserRouter.post("/register",async (req,res)  => {
  const { name,last_name, email,age,password } = req.body;
    try {
      //console.log(user)
      if (!name || !email || !password){
        
      CustomError.createError({
        name:"User creation error",
        cause:InfoError.generateUserRegErrorInfo({name,last_name,email,age}),
        message:"Error creating the user",
        code:EnumError.USER_ERROR
      });
      res.redirect("/register");
      return;
    }
    let user = await Users.getUser(email);
      if (user) {
        CustomError.createError({
          name:"User creation error",
          cause:"User already exist in database",
          message:"Error creating the user",
          code:EnumError.USER_ERROR
        });        
        res.redirect("/register")
        return;
      }else{
       ////////////////////////////////////////////
      const today = new Date();
      const birthYear = parseInt(age.substring(0, 4));
      const currentYear = today.getFullYear();
      const current_age = currentYear - birthYear;
      if(current_age< 18){
        CustomError.createError({
          name:"User creation error",
          cause:InfoError.generateUserAgeErrorInfo(),
          message:"Error creating the user",
          code:EnumError.USER_ERROR
        });
        res.redirect("/login");
        return;
      }
      //////////////////////////////////////////////
      //console.log("attempting savingcart")
       //para despues de la revision de sgunda entrega
      const newCart = await Cart.addCart(name)
      const newUser = {
        name,
        last_name,
        email,
        age:current_age,
        password: createHash(password),
        cart_id:newCart._id
      };
      //console.log("saving",newUser)
      let result = await Users.addUser(newUser)
      req.logger.debug("Success Creating user")
      res.redirect("/login")}
    } catch (error) {
      req.logger.error(error)
      res.redirect("/register")
    }
});

UserRouter.get("/current", async (req,res) =>{
      if(req.session.user===undefined){
        CustomError.createError({
          name:"User Session error",
          cause:InfoError.generateUserSesErrorInfo(),
          message:"Session has closed",
          code:EnumError.ROUTING_ERROR
        });        
        res.redirect("/")
        return;
    }
    
    let user_data=req.user.user
    //res.send({ status: "success", payload: req.user });
    let data = {
      layout: "profile",
      user: user_data,
    };
    req.logger.debug("Current user",user_data)
    io.emit("current_user",user_data);
    res.render("index", data);
  })

//////////////////////log in - out//////////
UserRouter.post("/login",async (req,res) =>{
    
    try {
      const { email,password} =req.body;
      //console.log(email)
      if(email === process.env.ADMIN_EMAIL & password ===process.env.ADMIN_PASSWORD){
        req.session.user={name:"ADM1NC0DR",
                          email:process.env.ADMIN_EMAIL,
                          role:"ADMIN"};
        req.session.admin =true
        //console.log(req.session.admin)
        let user = req.session.user;
        io.emit("current_user",req.session.user);
        io.emit("log_success")
        //console.log("pong")
        res.redirect("/profile")
      }else{
        
        let user = await Users.getUser(email);
        if (!user){
          //console.log("User or password incorrect");
          //await io.emit("somethig_wrong") //para despues
          CustomError.createError({
            name:"User Log Error",
            cause:InfoError.generateUserLogError(),
            message:"Error while logging in",
            code:EnumError.USER_ERROR
          });
          return res.redirect("/login")
          //res.status(501).json({error:"User or password incorrect"})
          }
      else if (!isValidPassword(user, password)){
        CustomError.createError({
          name:"User Log Error",
          cause:InfoError.generateUserLogError(),
          message:"Error while logging in",
          code:EnumError.USER_ERROR
        });
        return res.redirect("/login")
        }
      else{
          req.logger.info("User id found connecting")
          user.password=undefined;
          user.role="User"
          //console.log("User is:",user)
          req.session.user=user;
          req.session.admin=false; 
      
          io.emit("current_user",req.session.user);
          io.emit("log_success")
          res.redirect("/profile")
      }
    }
    } catch (error) {
      req.logger.error(error)
      return res.redirect("/");
    }
  } )

  UserRouter.post("/logout", async (req,res) =>{
    try{
        if(req.session.user){
            delete req.session.user;
            req.session.destroy((error)=>{
            if (error){
                req.logger.fatal("error clossing current session",error);
                res.status(500).send("Error clossing session",error)
            }else{
                req.logger.info("Session has been closed")
                res.redirect("/")
            }
        })}
      
    }catch (error){
        req.logger.fatal("Error clossing session",error);
        res.status(500).send("Error clossing session")
    }
  }
  )

  UserRouter.post("/recovery",async (req, res) => {
    try {
      const { email, password } = req.body;
  
      /////////change for a fuction in users
      //console.log("new pass",createHash(password))
      userServices.resetPass(email,createHash(password))
      res.redirect("/");
    } catch (error) {
      console.error("Error al recuperar contraseña", error);
      res.status(500).send("Error al cerrar la sesión");
    }
  });

  export default UserRouter;
