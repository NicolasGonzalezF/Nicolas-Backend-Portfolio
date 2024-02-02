import userModel from "./models/user.model.js";
import UserDTO from "./DTOs/user.dto.js";
class UserDAO{
    constructor() {}
    async getUser(username){
        try{
            return await userModel.findOne({ email: username });
        }
        catch(error){
            throw error;
        }
    }

    async addUser(newUser){
        try{
            const newuserInfo=new UserDTO(newUser)
            return await userModel.create(newuserInfo);
        }catch(error){
            throw error
        }
    }
    async resetPass(email,pass){
        console.log("resseting")
    return await userModel.updateOne({ email }, { password: pass });
    }
}

export default UserDAO;