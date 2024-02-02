import { appConfig } from "../config/app.config.js";

export const getLogger =async()=>{
    let response;

    switch (appConfig.environment){
        case "development":
            console.log("MODE:dev");
            response =await import("./dev.logger.js");
            break;
        case "production":
            console.log("MODE:prod");
            response =await import("./prod.logger.js");
            break;
        default:
            break;
    }
    return response;
};