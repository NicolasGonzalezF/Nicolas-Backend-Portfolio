import CartModel from "./models/carts.model.js"

class CartsDAO {
    constructor(){}
    //////////////
    async emptyCart(id,cart_info){

        return await CartModel.updateOne({_id:id},{$set:cart_info})
    }
    /////////////
    async getCart(user){
        try{
            const cart=(await CartModel.find({username:`${user}`}))[0]
            return cart
        }catch(error){
            throw error;
        }
    }

    async addCart(name){
        const cart =new CartModel({username:name});
        return await cart.save();   
    }
    async updateOne(info,cart){
        const upcart = await CartModel.updateOne(info,cart)
        return upcart;
    }
}

export default CartsDAO;