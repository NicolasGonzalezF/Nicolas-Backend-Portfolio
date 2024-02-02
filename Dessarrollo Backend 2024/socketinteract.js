import * as Cart from "./Services/CartService.js"
import * as Product from "./Services/ProductService.js"


/////////////////////////errors
import CustomError from "./utils/Custom.error.js";
import * as InfoError from "./utils/info.error.js"
import EnumError from "./utils/enum.error.js";
//////////////////////////
//////////////////interaccion sockets

const socketserv=(io)=>{
    let current_user="";
    let role=""
    io.on('connection',async(socket)=>{
        
        socket.on("update_user", (data)=>{
        //console.log("current user",data);
            current_user=data.name;
            role=data.role
        })
        
    ///////////////////////////////////////////////////////Manejo del carro en socket io  
            let user=current_user;
            //console.log('Cart Ready',user)
            const preload_cart = (await Cart.getCart(user))
            if(preload_cart === undefined){
                //console.log("cart not found")
            }
            else if(preload_cart.products.length >0){
                //console.log("items found")
                socket.emit("cart_updated",[{username:`${user}`},preload_cart])
            }else{socket.emit("list_user",{username:`${user}`})} 
        //////////////////////////////////////socket para añadir del carro
        
        socket.on("add_to_cart",async (data)=>{
        try{
            //console.log(role)
            if(role==="ADMIN"){/////////tecnicamente mi middleware esta en /profile porque actualiza el rol a admin
                socket.emit("ADMIN");
                return;
            }else{
            let user =current_user
            //console.log(user)
            const get_cart= (await Cart.getCart(user))
            //console.log("reading",data)
            //console.log(get_cart)
            const product = (await Product.getByID(data))
            //console.log("Item selected",product)
            let total =get_cart.total
            ///////////////////Encontrar los duplicados dentro del carro, primero se mira el carro luego se verifica su id
            const Current_products = get_cart.products
            //console.log(Current_products) //iteramos dentro de los productos para sacar su id
            let index=get_cart.products.findIndex(x=>{
                return JSON.stringify(x.product)===`"${data}"`});
            if(index > -1){
                //console.log("duplication at index",index)
                let duplicated_item = get_cart.products[index]
                if (product.stock > duplicated_item.quantity){
                    get_cart.products[index].quantity=duplicated_item.quantity+1;
                    let new_total=0
                    for(let item in get_cart.products){
                        new_total+= get_cart.products[index].price*get_cart.products[index].quantity}
                    get_cart.total = new_total;
                }
                else{
                    socket.emit("not_enough")
                }}
            else{
            ////////// en caso tal de no ser un duplicado>
            //primero hacer update a los items
            get_cart.products.push({product:product,name:product.title,thumbnail:product.thumbnail,price:product.price,quantity:1})
            }
            let new_total=0
                    for(let item in get_cart.products){
                        new_total+= get_cart.products[item].price*get_cart.products[item].quantity}
            get_cart.total = new_total;
            //console.log(`item added to cart` , product)
            const result = await Cart.updateOne({
                username:`${user}`},
                get_cart
                );
            //console.log(get_cart)
            socket.emit("cart_updated",[{username:`${user}`},get_cart])}/////end of else
        }catch(error){
                CustomError.createError({
                  name:"Cart error",
                  cause:InfoError.generateCartErrorInfo(),
                  message:"error accessing cart",
                  code:EnumError.CART_ERROR
                });        
                return;
        }})
        ///////////////////////////////////////////socket para borrar del carro
        socket.on("remove_from_cart",async (data)=>{
        try{
            let user =current_user
            const get_cart= (await Cart.getCart(user))
            const product = (await Product.getByID(data))

            const total =get_cart.total
            //console.log(data)
            //_-----------------------------------------
            const index=get_cart.products.findIndex(x=>{
                return JSON.stringify(x.product)===`"${data}"`});
            //console.log(index)
            let item_incart = get_cart.products[index];
            //console.log(item_incart.quantity);
            if(item_incart.quantity >1){
                get_cart.products[index].quantity=item_incart.quantity-1;
            }else{
                get_cart.products.splice(index,1)
            }
            //////////////////////////////
            let new_total=0
                    for(let item in get_cart.products){
                        new_total+= get_cart.products[item].price*get_cart.products[item].quantity}
            get_cart.total = new_total;
            const result =  Cart.updateOne({
                username:`${user}`},
                get_cart
                );
                //console.log(get_cart)
                socket.emit("cart_updated",[{username:`${user}`},get_cart])
            }catch(error)
            {CustomError.createError({
                name:"Cart error",
                cause:InfoError.generateCartErrorInfo(),
                message:"error accessing cart",
                code:EnumError.CART_ERROR
              });        
              return;}
        
            })
        
        ///////////////////////////////////////sorting
        socket.on('sort_now', async (data) => {
            //console.log("Received", data);
            if(data[1]==="ALL"){
                const redirectURL = `/api/products/`;
                socket.emit('redirect', redirectURL);

            }else{
            const redirectURL = `/api/products/?${data[0]}=${data[1]}`;
            socket.emit('redirect', redirectURL);}
        });
    })
    ///////////////////////////////////
}
export default socketserv