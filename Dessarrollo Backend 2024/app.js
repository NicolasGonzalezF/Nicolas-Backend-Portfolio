import express from "express";
import compression from"express-compression";
import  {Server}  from "socket.io";
import socketserv from "./socketinteract.js";
import handlebars from 'express-handlebars'
import path from 'path';
import __dirname from './utils.js';
import session from 'express-session';
import cors from "cors"
import mongoConnect from "./db/db.mongo.js"
import MongoStore from 'connect-mongo'
import "dotenv/config.js";
//////////////// imports from DES8
import cookieParser from 'cookie-parser'
/////////////////
import router from "./routes/router.js"
/////////////manejo de errores y logger//////////
import errorHandler from "./middlewares/errors/handle.errors.js"
import {addLogger} from "./middlewares/logger/logger.middleware.js";
///////////////////
const app = express();
const port =3000;
app.use(compression({
    broli:{enable:true,zlib:{}}
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//app.use(morgan("dev"))
mongoConnect();

///////////Extra sets & use///////
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
//////////////sessions config
app.use(session({
    secret:process.env.hash,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        ttl: 4*120,
        autoRemove:"native"    
    }),
}));
////////////router here for sessions
app.use(addLogger);
router(app);

////////////manejo de error //////////
/*
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something went wrong here");
})*/
//////////////////coneccion a los puertos
const httpServer =app.listen(port,()=>{
    console.log(`Current port ${port}`)
})
const io = new Server(httpServer);
socketserv(io);
app.use(errorHandler)

export default io