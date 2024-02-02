import { getLogger } from "../../logger/factory.js";

export const addLogger=async(req,res,next)=>{
    try{
    const {logger} =await getLogger();
    req.logger=logger;
    req.logger.info(
        `${req.method} en ${req.url} -${new Date().toLocaleDateString()}`
    );
    next();
    }catch(error){
       
        console.log(error)
    }
}