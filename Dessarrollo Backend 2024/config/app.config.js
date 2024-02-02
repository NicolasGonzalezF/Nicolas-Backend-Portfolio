import "dotenv/config.js";


export const appConfig ={
    //environment:"production"
    environment: process.env.FACTORY || "production"
}