import moongoose from "mongoose"
import  config  from "../config/env.config.js"

const mongoConnect = async() =>{
    try{
        await moongoose.connect(config.db);
        console.log("DataBase ON");
    }catch(error){
        console.log("oops",error);
    }
}

export default mongoConnect;