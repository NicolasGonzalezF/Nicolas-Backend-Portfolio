import MockDAO from "../dao/Mock.dao.js"

const Mocked = new MockDAO();

const getAll =()=>{
    return Mocked.getAll();
}
const getByID=(id)=>{
    return Mocked.getByID(id);
}
const paginate=(query)=>{
    return Mocked.paginate(query);
}
const addProduct=(newProduct)=>{
    return Mocked.addProduct(newProduct)
}
export {getAll,getByID,paginate,addProduct}