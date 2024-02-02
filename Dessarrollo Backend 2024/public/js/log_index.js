const socket = io();

console.log("cart connected")
socket.on("current_user", (data)=>{
  console.log("sending",data)
  socket.emit("update_user",data)
})
socket.on("log_success",()=>{
  socket.emit("gater_cart")
})