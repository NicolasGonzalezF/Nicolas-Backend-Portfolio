import {Router} from "express";

const router =Router();

router.get("/",(req,res)=>{
    try{
    //req.logger.log("fatal","uhh scary");
    req.logger.debug("Debug msg only Devs can see this");
    req.logger.http("Http msg only Devs can see it");
    req.logger.info("Info msg");
    req.logger.warn("Warning msg");
    req.logger.error("ERROR MESSAGE SENDING TO LOGER");
    req.logger.fatal("FATAL ERROR ☢️")
    res.json({message:"salutations"})
}
    catch(error){
        console.log(error)
    }
})

export default router;