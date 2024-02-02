import UserDAO from "../dao/users.dao.js";

const Users = new UserDAO();

const getUser=(username)=>{
    return Users.getUser(username);
}

const addUser=(user_info)=>{
    return Users.addUser(user_info);
}
const resetPass=(email,password)=>{
    return Users.resetPass(email,password);
}

export { getUser,addUser,resetPass}