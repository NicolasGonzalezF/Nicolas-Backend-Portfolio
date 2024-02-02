import ProductsDAO from "../dao/products.dao.js"

const product = new ProductsDAO();

const getAll =()=>{
    return product.getAll();
}
const getByID=(id)=>{
    return product.getByID(id);
}
const addProduct=(product_info)=>{
    return product.addProduct(product_info);
}

const updateProduct=(id,product_info)=>{
    return product.updateProduct(id,product_info);
}
const removeProduct=(id)=>{
    return product.removeProduct(id);
}
const paginate=(query)=>{
    return product.paginate(query);
}
export {getAll,getByID,addProduct,removeProduct,updateProduct,paginate}