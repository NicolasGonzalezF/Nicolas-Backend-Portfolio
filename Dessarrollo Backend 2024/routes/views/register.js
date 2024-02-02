import express from "express";

const regRouter=express.Router();

regRouter.get("/",(req,res)=>{
    let data ={
        layout:"register"}
        res.render("index",data)
})

export default regRouter