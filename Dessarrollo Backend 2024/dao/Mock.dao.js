import MockedProuduct from "./models/ProdMock.model.js";

class MockDAO{
    constructor(){}

    async getAll(){
        try{
        return await MockedProuduct.find();}
        catch(error){
            throw error;
        }
    }

    async getByID(id){
        try{
            return await MockedProuduct.findById(id)
        }catch(error){
            console.log(error);
        }
    }

    async addProduct(productInfo){
        try{
            return await MockedProuduct.create(productInfo);
        }catch(error){
            throw error;
        }
    }
    async updateProduct(id,productInfo){
        try{
            return await MockedProuduct.updateOne({_id:id},{$set: productInfo})
        }catch(error){
            throw error;
        }
    }
    async removeProduct(id){
        try{
            return await MockedProuduct.deleteOne({_id:id})
        }catch(error){
            throw error;
        }
    }

    ///////////////Paguinate
    async paginate(query){
        //console.log("wait wat",query[0],query[1])
        return await MockedProuduct.paginate(query[0],query[1])
    }
}
export default MockDAO;