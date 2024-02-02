import {Router} from "express"
//import ProductsDAO from "../dao/products.dao.js"
import * as product from "../Services/ProductService.js"
import io from "../app.js"
/////////////////////////errors
import CustomError from "../utils/Custom.error.js";
import * as InfoError from "../utils/info.error.js"
import EnumError from "../utils/enum.error.js";
//////////////////////////

//const product = new ProductsDAO();
const ProuductRouter = Router();

ProuductRouter.post("/edit_items",async(req,res)=>{
    const{showName,_id,title,description,code,price,stock,category}=req.body;
    try{
    if(_id==='' && (showName ==="delete" ||showName==="true")){
        CustomError.createError({
            name:"Product error",
            cause:InfoError.generateProductUpdateErrorInfo(_id),
            message:"There has been an error updating",
            code:EnumError.PRODUCT_ERROR,
          });
          req.logger.warn("Error while udpating items")                
          res.redirect("/api/products/edit_items")
          return;
    }
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
    //console.log("ping pong")
    //console.log(showName)
    if(showName==="delete"){//////////eliminar producto
        try{
        const ID_delete= await product.removeProduct(_id);
        //console.log("Item by ID:",_id," has been deleted")
        req.logger.debug(`Item by ID:${_id} has been deleted`)
        res.redirect("/api/products/edit_items")
        }catch(error){
            CustomError.createError({
                name:"Product error",
                cause:InfoError.generateProductUpdateErrorInfo(_id),
                message:"There has been an error with the request Item not Found",
                code:EnumError.PRODUCT_ERROR,
              });        
              res.redirect("/api/products/edit_items")
              return;
        }
    }
    else if(showName==="true"){///////////editing item
        //console.log("ping")
        req.logger.debug("Editing item")
        const old_info=await product.getByID(_id)
        //console.log("old",old_info)
        const new_info={
            title:title||old_info.title,
            description:description||old_info.description,
            code:code||old_info.code,
            price:price||old_info.price,
            stock:stock||old_info.stock,
            category:category||old_info.category,
            thumbnail:old_info.thumbnail||"https://dodo.ac/np/images/a/af/Leaf_NH_Icon.png"

        }
        //console.log("New Info",new_info)
        req.logger.debug("Item has been updated to: ",new_info)
        const update = await product.updateProduct(_id,new_info)
        res.redirect("/api/products/edit_items")
        return;
    }
    else{////////adding new item
        //console.log(req.body)
        //console.log("pong")
        const new_info={
            title:title||"DummyItem",
            description:description||"Hey its a dummy item",
            code:code||"DUMMY_ITEM",
            price:price||"69",
            stock:stock||"69",
            category:category||"655b92be363b19dfbd005b5b",
            thumbnail:'https://dodo.ac/np/images/a/af/Leaf_NH_Icon.png'

        }
        //console.log(new_info)
        req.logger.debug("Item has been added:", new_info);
        const new_item= await product.addProduct(new_info)
        res.redirect("/api/products/edit_items")
        return;
    }}
    catch(error){
        CustomError.createError({
            name:"Product error",
            cause:InfoError.generateProductUpdateErrorInfo(_id),
            message:"There has been an error updating",
            code:EnumError.PRODUCT_ERROR,
          });        
          res.redirect("/api/products/edit_items")
          return;
    }
})
ProuductRouter.get("/edit_items",async (req,res)=>{
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

    let page = parseInt(req.query.page);
    if(!page) page=1;
    const products = await product.paginate([{},{page,limit:10,lean:true}])
    products.prevLink = products.hasPrevPage?`http://localhost:3000/api/products/edit_items/?page=${products.prevPage}`:'';
    products.nextLink = products.hasNextPage?`http://localhost:3000/api/products/edit_items/?page=${products.nextPage}`:'';
    products.isValid= !(page<=0||page>products.totalPages)
    const current_user=req.session.user

    res.render('index',{
        layout:'edit_item',products,current_user})
})
ProuductRouter.get("/:id",async (req,res)=>{
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

    const {id} =req.params;
    const Product = await product.getByID(id)
    res.status(200).json({status:"Sucess",message:product})
})
ProuductRouter.post("/",async (req,res)=>{
    try{
        
        const productinfo={
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            category:req.body.price,
            thumbnail:req.body.thumbnail||"https://dodo.ac/np/images/a/af/Leaf_NH_Icon.png",
            visible:req.body.visible||true
        }
        const newProduct = await product.addProduct(productinfo)
        res.status(200).json({status:"Sucess",message:newProduct})
    }catch(error){
        CustomError.createError({
            name:"Product error",
            cause:InfoError.generateProductUpdateErrorInfo(),
            message:"There has been an error updating",
            code:EnumError.PRODUCT_ERROR,
          });        
          res.redirect("/api/products/edit_items")
          return;
    }
})

ProuductRouter.get('/', async (req,res)=>{  
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
    
        let current_user=req.session.user;
        let isAdmin =req.session.admin;
        //console.log(isAdmin)
        ///////////usario actual//
        io.emit("current_user",current_user);
        //console.log("current user",req.session.user)
        let page = parseInt(req.query.page);
        if(!page) page=1;
        let query =req.query
       // console.log(query)
        const value_query =Object.values(query)[0]
        const name_query =Object.keys(query)[0]
        let has_query=false
        let products = await product.paginate([{},{page,limit:10,lean:true}])
        if(name_query==="limit" ){
            has_query=true
            //console.log("reprogram")
            products =await product.paginate([{},{page,limit:value_query,lean:true}]) //limit de resultados en pantalla
        }
        else if (name_query ==="sort"){
            has_query=true
            //console.log("sorthing asc dsc")
            if(value_query==="asc"){
                products =await product.paginate([{},{page,limit:10,lean:true,sort:{price:1}}])
            }else{products =await product.paginate([{},{page,limit:10,lean:true,sort:{price:-1}}])
            }
        }
        else if (Object.values(query).length>=2){
            has_query=true
            //console.log("categorizing")
            products = await product.paginate([query,{page,limit:10,lean:true}])
        }
        else if (name_query ==="category"){
            //console.log("by cateogry")
            products = await product.paginate([query,{page,limit:10,lean:true}])
        }
        else{
            has_query=false
            //console.log("notthing")
            products = await product.paginate([{},{page,limit:10,lean:true}])
        }
        ////////////////////////only missing limit but real limit and a normal query
        if (has_query){
            products.prevLink = products.hasPrevPage?`http://localhost:3000/api/products/?${name_query}=${value_query}&page=${products.prevPage}`:'';
            products.nextLink = products.hasNextPage?`http://localhost:3000/api/products/?${name_query}=${value_query}&page=${products.nextPage}`:'';
        }else{
        products.prevLink = products.hasPrevPage?`http://localhost:3000/api/products/?page=${products.prevPage}`:'';
        products.nextLink = products.hasNextPage?`http://localhost:3000/api/products/?page=${products.nextPage}`:'';}
        products.isValid= !(page<=0||page>products.totalPages)
        //console.log("valid?", products.isValid)
        //console.log(products)
       
        /////////////////almacenzar el usario/////////
        //console.log("current",req.session.user._id)
        res.render('index',{
                layout:'products'
                ,products,current_user,isAdmin})

    }catch(error){res.status(500).json({message:error.message})}

})

export {ProuductRouter}; //exportar la clase 
