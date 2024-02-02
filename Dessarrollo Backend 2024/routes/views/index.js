import express from "express";

const router =express.Router()


router.get("/",(req,res)=>{
    if(req.session.user===undefined){
        res.redirect("/login")
        return;
    }
    else{
        res.redirect("/api/products")
    }

})

export default router