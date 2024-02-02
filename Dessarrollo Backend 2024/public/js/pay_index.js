const socket = io();
console.log("cart access connected")
//socket.emit("gater_cart")
socket.on("current_user", (data)=>{
  console.log("sending",data)
  socket.emit("update_user",data)
})

//////////////////////////////////////////////////
//////////////mostrar el carrito
let add = document.getElementsByClassName("add_cart")
let remove = document.getElementsByClassName("remove_cart")
socket.on("cart_updated", (data,why) => {
  const usercartDiv = document.getElementById("usercart");
  let inner_text = ``;
  inner_text += `<h1>Total: ${data[1].total} bells</h1>
  <form  action="/api/ticket/${data[1]._id}/" method ="get">
  <button type="submit">Pay Now</button>
  </form>
  <form  action="/api/cart/${data[1]._id}/" method ="get">
  <button type="submit">Cancel!!</button>
  </form>
  --------------------------------------------`;

  for (let product in data[1].products) {
    let pointer = data[1].products[product];
    inner_text += `
      <ul id=${pointer.product}>
        <img src="${pointer.thumbnail}" style="width:150px; border:1px solid black; "alt="https://dodo.ac/np/images/a/af/Leaf_NH_Icon.png">
        <h1>Name: ${pointer.name}</h2>
        <h3>Price: ${pointer.price} Bells</h3>
        <h3>Quantity: ${pointer.quantity}</h3>
      </ul>`;
  }

  usercartDiv.innerHTML=(inner_text);
  
});




socket.on('redirect',function(destination){
    window.location.href=destination;
})
///////////////////////////

socket.on("not_enough",()=>{
    const errorMessage = {
        title: "Oh no :(",
        text: "It seems we dont have enough of the selected item in stock.",
        icon: "error"
      };
    
      Swal.fire(errorMessage);
})

////////////////////swal generico

socket.on("somethig_wrong",()=>{
  console.log("wrong")
  Swal.fire({
    position: "top-end",
    icon: "Error",
    title: "Something went wrong please check the info submited and try again",
    showConfirmButton: false,
    timer: 1500
  });
})