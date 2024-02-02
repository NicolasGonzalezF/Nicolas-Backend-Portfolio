import {Router} from "express";
//import CartsDAO from "../dao/carts.dao.js";
import * as carts from "../Services/CartService.js"

import io from '../app.js'

/////////////////////////errors
import CustomError from "../utils/Custom.error.js";
import * as InfoError from "../utils/info.error.js"
import EnumError from "../utils/enum.error.js";
//////////////////////////

const cartRouter = Router();
//const carts=new CartsDAO()

cartRouter.get("/",async (req, res)=>{
    if(req.session.user===undefined){
        CustomError.createError({
          name:"User Session error",
          cause:InfoError.generateUserSesErrorInfo(),
          message:"Session has closed",
          code:EnumError.ROUTING_ERROR
        });
        req.logger.warn("Session has expired, redirecting")        
        res.redirect("/")
        return;
    }
    try{
        const current_id =req.session.user._id
        res.redirect(`/api/cart/${current_id}`)

    }catch(error){
        res.status(501).json({message:error.message})//////replace the error
    }
})
cartRouter.get("/:cid",async(req,res)=>{
    try{
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
    if(req.params.cid==="ticket"){
        //console.log("oop")
        res.redirect("/api/cart/ticket")
    }
    //console.log(req.params)
    const current_user=req.session.user
    const user_name=req.session.user.name
    const cart= await carts.getCart(req.session.user.name)
    const products = cart.products
    //console.log("cart found",cart)
    res.render('index',{
        layout:'cart'
        ,cart,current_user})
    }catch(error){
        CustomError.createError({
            name:"User Session error",
            cause:InfoError.generateRoutingErrorInfo(),
            message:"Acess denied",
            code:EnumError.ROUTING_ERROR
          });        
          res.redirect("/")
    }
})
cartRouter.get("/:cid/payment",async(req,res)=>{
    if(req.session.user===undefined){
        CustomError.createError({
          name:"User Session error",
          cause:InfoError.generateRoutingErrorInfo(),
          message:"Acess denied",
          code:EnumError.ROUTING_ERROR
        });        
        res.redirect("/")
        return;
    }
    const current_user=req.session.user
    const cart= await carts.getCart(req.session.user.name)
    const products = cart.products
    //console.log("Lets go pay",cart)
    req.logger.http("Proceeding to transaction of items")
    res.render('index',{
        layout:'payment'
        ,cart,current_user})
})
/*
cartRouter.get("/:cid/ticket",async(req,res)=>{
    console.log("payment yime")
    res.status(201).json({Message:"success"})
})*/
export default cartRouter;