class UserDTO{
    constructor(userInfo){
        this.name=userInfo?.name;
        this.last_name=userInfo?.last_name;
        this.email=userInfo?.email;
        this.age=userInfo?.age;
        this.password=userInfo?.password;
        this.cart_id=userInfo?.cart_id;
    }
}
export default UserDTO;