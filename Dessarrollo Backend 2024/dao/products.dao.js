import Product from "./models/products.model.js"

class ProductsDAO{
    constructor(){}

    async getAll(){
        try{
        return await Product.find();}
        catch(error){
            throw error;
        }
    }

    async getByID(id){
        try{
            return await Product.findById(id)
        }catch(error){
            console.log(error);
        }
    }

    async addProduct(productInfo){
        try{
            return await Product.create(productInfo);
        }catch(error){
            throw error;
        }
    }
    async updateProduct(id,productInfo){
        try{
            return await Product.updateOne({_id:id},{$set: productInfo})
        }catch(error){
            throw error;
        }
    }
    async removeProduct(id){
        try{
            return await Product.deleteOne({_id:id})
        }catch(error){
            throw error;
        }
    }

    ///////////////Paguinate
    async paginate(query){
        //console.log("wait wat",query[0],query[1])
        return await Product.paginate(query[0],query[1])
    }
}

export default ProductsDAO;