import EnumError from "../../utils/enum.error.js";

export default (error,req,res,next)=>{
    console.log(error.cause);
    switch(error.code){
        case EnumError.USER_ERROR:
            res.json({error:error.name});
            break;
        case EnumError.CART_ERROR:
            res.json({error:error.name})
            break;
        case EnumError.PRODUCT_ERROR:
            res.json({error:error.name})
            break;
        case EnumError.ROUTING_ERROR:
            res.json({error:error.name})
            break;
        case EnumError.DATABASE_ERROR:
            res.json({error:error.name})
            break;
      default:
      res.json({ error: 'Unhandled error' })
  }
}