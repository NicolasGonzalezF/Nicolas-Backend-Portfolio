import mongoose from 'mongoose'

const {Schema,model}=mongoose;
const cartsSchema =new Schema({
    username: {type:String,ref:"user" ,required:true,ref:"users"},
    products:[{
        product: {type:Schema.Types.ObjectId,ref:"Products"},
        name:{type:String,ref:"Products"},
        thumbnail:{type:String},
        price:{type:Number,ref:"Products"},
        quantity:{type:Number, default: 0},
        _id:{type:Schema.Types.ObjectId,ref:"Products"}
    }],
    total: {type:Number, default: 0}
});
/*
const cartsSchema =new Schema({
    username: {type:String ,required:true},
    products:{
        type:[{
            product:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products"
            }],
        
        }]
    },
    total: {type:Number, default: 0}
});
*/

const CartModel= model ("Cart",cartsSchema);
/*
const agregateDuplicate = async () =>{
    const agregation=[
        {
          $unwind: '$products'
        },
        {
          $group: {
            _id: '$products.product',
            quantity: { $sum: '$products.quantity' },
            cart: { $push: '$$ROOT' }
          }
        },
        {
          $match: {
            quantity: { $gt: 1 }
          }
        }
      ];
      const duplicatedProducts= await Cart.agregate(agregation)
      return duplicatedProducts;
}
*/

export default CartModel;