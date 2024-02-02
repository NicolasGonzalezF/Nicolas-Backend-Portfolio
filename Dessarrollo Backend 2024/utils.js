import multer from 'multer';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from "passport";
const storage = multer.diskStorage({
    destination: './public/img' // Carpeta donde se guardarán los archivos
      ,
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const filename = file.originalname;
        cb(null, filename);
    }
});
import "dotenv/config.js";
export const uploader = multer({ storage });

import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//////////////////hashing de las contraseñas
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);


export default __dirname;
////////////////////////////////////
const KEYSECRET = "TheDemonSeeksKnowledge"
export const generateToken =  ( user ) =>{
  const token =  jwt.sign({user},KEYSECRET,{expiresIn:'1d'});
  return token;
}

export const authToken = (req,res,next) =>{
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).send({status:"error",error:"Unauthorized"})
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  jwt.verify(token,KEYSECRET,(error,credentials)=>{
      console.log(error);
      if(error) return res.status(401).send({status:"error",error:"Unauthorized"})
      req.user = credentials.user;
      next();
  })
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages?.info, messages: info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};



export const authorization = (role) => {
  return async (req, res, next) => {
   
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.user.role != role)
      return res.status(403).send({ error: "No Permissions" });

    next();
  };
};
