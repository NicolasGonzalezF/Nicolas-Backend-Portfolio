import CartsDAO from "../dao/carts.dao.js";

const carts=new CartsDAO()

const getCart=(user)=>{
     return carts.getCart(user);
}
const emptyCart=(id,cart_info)=>{
    return carts.emptyCart(id,cart_info);
}

const updateOne=(info,cart)=>{
    return carts.updateOne(info,cart)
}
const addCart=(username)=>{
    return carts.addCart(username)
}
export {getCart,emptyCart,updateOne,addCart}