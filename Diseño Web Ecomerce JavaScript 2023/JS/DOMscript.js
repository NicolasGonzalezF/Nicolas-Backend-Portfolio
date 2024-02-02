
/* Mi Proyecto es una recreacion del ABD(bayero) de animal crossing, es similar
a un cajero automatico, sin embargo tiene dos metodos de pago, puntos 
de fidelidad o con la moneda del juego "Bayas" o en ingles "Bells" */
/*changelog

Se cambiaron los productos a ser objetos con un solo product create.
Se cambio el metodo de seleccion a solo necesitar la posicion del producto sin necesidad de un case para cada uno
Se añadio metodo de busqueda al nook shooping
Se añadieron mas productos al nook shopping
Se añadio metodo de ordenar productos del nook shopping
Se añadieron mas loops en caso de querer seguir comprando dentro de lista ordenada o en una busqueda
Se aprovechan los NaN como parametros de salida o se agarran antes de generar error.
Se desactivo el log in para mayor facilidad de probar el codigo

changelog 0.1
-Se cambio el metodo de inicio de seccion de prompts a inputs, adicionalmente se dio la opcion de 
guardar en el usuario o borrar la informacion guardada
-Se nueve ek codigo del menu para mejor lecura

changelog 1.0
-Se reemplazaron todos los alert y confrim por sweet alerts y tosty
-Se crearon archivos json para servir como "base de datos" de archivos nook miles
-Se re mapearon los id de los botones para envez de tener numeros tengan la funcion del boton + el nombre del objeto referenciado
-Se reemplazaron los botones por imagenes con informacion de costo, id, nombres para elementos nook miles y nook shop.
-Se cambiaron multiples metodos de compra y reedencion de millas.
-Se creo una lista de compras la cual puede ser almacendada en el tipo de storage ya sea local como session storage
  para que se pueda mantener la lista de compras aun asi se cierre la paguina o se vaya a otro menu.
*/
//**clase plantilla de objetos */
class product {
  constructor(inCar,idNum, nombre, precio, currency, image) {
    //**name es un nombre reservado por eso toca en español */
    this.idNum = idNum;
    this.nombre = nombre;
    this.precio = precio;
    this.currency = currency;
    this.image = image;
    this.inCar=inCar;
  }
}

/** variables productos miles 
const milesProducts = [
  new product(
    0,'leaf'+Math.floor(Math.random() * 1000),
    "Traveling ticket",
    300,
    "Miles",
    "Fly ticket reedem in airport"
  ),
  new product(
    0,'leaf'+Math.floor(Math.random() * 1000),
    "DIY Workbench",
    200,
    "Miles",
    "Make your own tools with this DIY workbench recipe"
  ),
  new product(
    0,'leaf'+Math.floor(Math.random() * 1000),
    "Sun Hat",
    3000,
    "Miles",
    "Protect your head from this harsh summer days, only available in yellow"
  ),
  new product(
    0,'leaf'+Math.floor(Math.random() * 1000),
    "Froggie chair",
    400,
    "Miles",
    "Sit comfy in this state of the art froggie chair ribbit"
  ),
  new product(
    0,'leaf'+Math.floor(Math.random() * 1000),
    "Leaf umbrella",
    500,
    "Miles",
    "Rain rain go away with this classic nature desing umbrella"
  ),
];*/
/**variables de productos nookstore */
const storeProducts=[
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Book',290,"bells","https://acnhcdn.com/latest/FtrIcon/FtrBookOpened_Remake_3_0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'World Map',640,"bells","https://acnhcdn.com/latest/FtrIcon/FtrWorldMap_Remake_1_0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Rain Hat',880,"bells","https://acnhcdn.com/latest/FtrIcon/CapHatSchool1.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Bandage',140,"bells","https://acnhcdn.com/latest/FtrIcon/AccessoryMouthBandageSkin.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'MVP Tee',640,"bells","https://acnhcdn.com/latest/FtrIcon/TopsTexTopTshirtsHMvp0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'No.2 Shirt',560,"bells","https://acnhcdn.com/latest/FtrIcon/TopsTexTopTshirtsHTwo0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Demin Skirt',1120,"bells","https://acnhcdn.com/latest/FtrIcon/BottomsTexSkirtBoxDenim0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Rain Boots',290,"bells","https://acnhcdn.com/latest/FtrIcon/ShoesKneeRainboots0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'wet Suit',3000,"bells","https://acnhcdn.com/latest/FtrIcon/TopsTexMarinesuitNormalNGreco0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Fox Mask',1400,"bells","https://acnhcdn.com/latest/FtrIcon/CapMaskFox1.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Love Song',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_LoveSong.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Metalica',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Metal.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Sonata',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Sonata.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Fiesta',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Salsa.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Luigi Hat',1500,"bells","https://acnhcdn.com/latest/FtrIcon/CapHatLuigi0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Mario Hat',1500,"bells","https://acnhcdn.com/latest/FtrIcon/CapHatMario0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Mario Shoes',1500,"bells","https://acnhcdn.com/latest/FtrIcon/ShoesLowcutMario0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Luigi Shoes',1500,"bells","https://acnhcdn.com/latest/FtrIcon/ShoesLowcutLuigi0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Wario Shoes',1500,"bells","https://acnhcdn.com/latest/FtrIcon/ShoesLowcutWario0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Space boots',4300,"bells","https://acnhcdn.com/latest/FtrIcon/ShoesKneeSpaceWhite.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Wario Hat',1500,"bells","https://acnhcdn.com/latest/FtrIcon/CapHatWario0.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Disco',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Disco.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Folk',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Minyo.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Aloha',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Aloha.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album BubbleGum',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Idol.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'K.K Album Blues',3200,"bells","https://acnhcdn.com/latest/FtrIcon/mjk_Blues.png"),
  new product(0,'leaf'+Math.floor(Math.random() * 1000),'Throne',800000,"bells","https://acnhcdn.com/latest/FtrIcon/FtrThrone_Remake_3_0.png")
];
///////////////////**/// */
const villager = "ABD-Debug"; /*USARIO Y CONTRASEÑA PRE DEFINIDO */
const password = "1234";
let miles = 8000;
let bells = 150000;
let authorize = 2;



let logiBtn=document.getElementById("login-btn");
let regBtn=document.getElementById("registerBtn");
let nukeBtn=document.getElementById("nukeBtn");
let Rmbr=document.getElementById("remember");


let attempts = 3;

let savedData = JSON.parse(localStorage.getItem('userInfo'));
let tempData=   JSON.parse(sessionStorage.getItem('userInfo'));

let storing=""

//**funciones del json del json */

function logon(e,sData,storing){
  /*Funcion de log in con usuario y contraseña de 3 intentos*/
  let usrnInput=(document.getElementById("userAdress").value);
  
  let passInput= (document.getElementById("passwordKey").value)
  /**console.log(passInput);*/
 if(villager!==usrnInput){
    Toastify({
      text: "Sorry the username is not registered",
      gravity: "top",
      position:"center",
      className: "info",
      style: {
        background: "red",
      }
    }).showToast();
    }
  else if(usrnInput==""){
    Toastify({
      text: "Please fill both boxes",
      gravity: "top",
      position:"center",
      className: "info",
      style: {
        background: "#7a673f",
      }
    }).showToast();
  }
  else if(passInput==""){
    Toastify({
      text: "Please fill both boxes",
      gravity: "top",
      position:"center",
      className: "info",
      style: {
        background: "#7a673f",
      }
    }).showToast();
  }
    else if(password!==passInput){
      attempts=attempts-1;
      Toastify({
        text: "Oh no some information was incorrect attempts left: "+attempts,
        gravity: "top",
        position:"center",
        className: "info",
        style: {
          background: "red",
        }
      }).showToast();
      
      console.log(attempts);
      if(attempts<1){
        document.getElementById("menu").innerHTML =
        `
        <div class="login__cancel">
          <p class="login__paragraph">We are sorry, please reload the page </p>
          </div>`
      }
    }
    else if(usrnInput===villager && passInput===password){
      let userInfo=""
      console.log(sData.bells);

      if(sData.bells>=0){
        userInfo={"user": usrnInput,"pass": passInput,
        "bells": sData.bells,"miles":sData.miles};
      }else{console.log("you had info but we ignored it")
        userInfo={
        "user": usrnInput,"pass": passInput,
        "bells": bells,"miles":miles
      }}
      console.log("SAVING INSIDE")
      console.log(storing)
      storing.setItem('userInfo',JSON.stringify(userInfo));
      location.reload();
      mainMenu(userInfo); 
      }
  }
  
/*/////////////////////// funcion de la tienda miles///////////////////////*/
function nookMiles(storage,storing,data) {
 let milesData =data;
 let message = "";
console.log("heello "+ milesData)
 for (i = 0; i < milesData.length; i++) {//crea la lista de objetos fuera para que no tenga problemas creando duplicados
  message+=
  `
  <div class="menu__item">
      <h2 class="item__name" >`+ milesData[i].nombre +`</h2>
      <img src="`+milesData[i].image+`" alt="" class="item__image">
      <h1 class="item__description">`+milesData[i].description+`</h1>
      <h1 class="item__price">`+milesData[i].precio+` `+milesData[i].currency+`</h1>

      <button class="reedem__btn" id=`+i+`>Reedem now</button>  

</div> 
  `
 }   
  function reloadMenu(){
  
  document.getElementById("menu").outerHTML =
  `
  <section class="product" id="menu">
  <h1 class="menu__title"> Nook Miles reedeming shop</h>
  <div class="menu__finances">
      <h3 class="miles">`+storage.miles +` Miles</h3>
  </div> 
  <button class="menu__btn" id="backMenu">Main menu</button>
  <section class="item__cards" id="selectProduct">
  `
       
  document.getElementById("selectProduct").innerHTML =message+`</section> </section>`;
  console.log("menu reloaded")

  /**/////////////////// */
  let selectItem=document.getElementById('selectProduct');
  console.log(selectItem);
  selectItem.addEventListener('click',(event)=>{
      const btnon=event.target;
      const btnonID=btnon.id;
      console.log("hello this is "+ btnonID +" "+milesData[btnonID].nombre);
      /*
      let selection =confirm("reedem "+milesData[btnonID].nombre+ " for "+milesData[btnonID].precio+" miles?");
      Sweet alert para confirmar la compra de el producto*/

      Swal.fire({
        title: 'Do you wish to reedem this item?',
        text:'Cost '+milesData[btnonID].precio + ' miles',
        showCancelButton: true,
        imageUrl: ''+milesData[btnonID].image+'',
        imageWidth: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#30ac7c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'I want it!'

      }).then((result) => {
        if (result.isConfirmed) {       
        console.log("User has this amount of miles"+storage.miles)
        /*En este caso cambio el alert por dos deciones del sweet alert */
        if(milesData[btnonID].precio>storage.miles){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You don´t have enough miles!',
            confirmButtonText: 'Oh no'
          })
          storing.setItem('userInfo',JSON.stringify(storage));}
          else {
            storage.miles=storage.miles-milesData[btnonID].precio;
            storing.setItem('userInfo',JSON.stringify(storage));
            Swal.fire(
              'Thank you','We will ship this item soon'); 
            reloadMenu();
      }  
    }})
      /* 

      if(selection==true){
        console.log(storage.miles)
        if(milesData[btnonID].precio>storage.miles){
          alert("Sorry you dont have enought miles");
          storing.setItem('userInfo',JSON.stringify(storage));}
          else {
            storage.miles=storage.miles-milesData[btnonID].precio;
            storing.setItem('userInfo',JSON.stringify(storage));
            reloadMenu();
      }}*/
    });

  backMenu.addEventListener('click',()=>{
    mainMenu(storage,storing);
    });}
  reloadMenu();
}
/**menu para la tienda de items */
function order(selection,catalogList){
  let orderArray=catalogList.slice(0);
switch (selection) {
  case "1":
    return orderArray.sort((b,a)=>b.precio -a.precio);
  case "2":
    return orderArray.sort((a,b)=>b.precio -a.precio);
  case "3":
    let descendingArray= orderArray.sort((b,a)=>b.nombre.localeCompare(a.nombre));
   return descendingArray;
  case "4":
    let ascendingArray= orderArray.sort((a,b)=>b.nombre.localeCompare(a.nombre));
   return ascendingArray;
   default:
    alert("Invalid selection");
    break;
}
}
//////////////////////////////
function findItem(query,catalog){
  const filtrado= catalog.filter(catalog=>catalog.nombre.includes(query));
  return filtrado;
  }

function seachbar(){
  document.getElementById("menu").outerHTML =
  `<section class="product" id="menu">
  <h1 class="menu__title"> Welcome to the catalog <br>Popular right now: Albums,Shoes,Hats</h1>
  <div class="menu__finances" id="selectProduct">
  <input type="seach" placeholder="im looking for.." class="login__input" id="lookingFor">
  <button type="submit" id="seachNow" class="login__cta">Search</button>
  <br><button class="menu__btn" id="backMenu">Main menu</button></div>`
}
function findItem(query,catalog){
  const filtrado= catalog.filter(catalog=>catalog.nombre.includes(query));
  return filtrado;
  }

/////////////////////////////////////////////////////////////////
function loadMenu(storage,orderList,storing){
  /////////////////////////funcion de ventana de pago general/////////////////
      function paymentView(totalPrice){
        console.log("ready");
        console.log(storage.bells)
        console.log("your total is" + (totalPrice))
            Swal.fire({
              title: 'Do you wish to pay now?',
              text:'Cost '+totalPrice + ' bells',
              showCancelButton: true,
              confirmButtonColor: '#30ac7c',
              cancelButtonColor: '#d33',
              confirmButtonText: 'I want it!'
  
            }).then((result) => {
              if (result.isConfirmed) {       
              console.log("User has this amount of bells"+storage.bells)
              /*En este caso cambio el alert por dos deciones del sweet alert */
  
              if(totalPrice>storage.bells){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'You don´t have enough bells!',
                  confirmButtonText: 'Oh no'
                })}
                else {
                  storage.bells=storage.bells-totalPrice;
                  console.log("check out this "+ storage.bells)
                  console.log("saving in" + storing)
                  storing.setItem('userInfo',JSON.stringify(storage));
                  Swal.fire(
                    'Thank you','We will ship this item soon'); 
                  //////////////////////////borrar el carrro/////////
                  storing.removeItem('itemsinCar');
                  reloadMenu(orderList);
  
            }  
          }})
  
  
      }
   /////////////////////////////////////////////////////////////////////////////////////////////
    let message = "";
    for (i = 0; i < orderList.length; i++) { //saco la lista automatica para que no la exienda en la actualizacion de datos
      message+=
  
     /* `<input type=checkbox class="menu__btn" id=`+i+` value= `+orderList[i].precio+`><span class="label">`+orderList[i].nombre + "- price: "+orderList[i].precio+" bells"+ `</span> </input>`
    Now we replace with the new buttons */  
   `<div class="shopItem">
      <img src=`+orderList[i].image +`
          class="shopItem__img">
      <div class="shopItem__info">
          <h2 class="shopItem__name">`+orderList[i].nombre+`</h2>        
          <h1 class="shopItem__price" >`+orderList[i].precio+` bells</h1>
          <h1 class="shopItem__id">id: `+orderList[i].idNum +`</h1>
          <button class="menu__btn" id="b`+orderList[i].nombre+`">Buy now</button>
          <button class="menu__btn"  id="C`+orderList[i].nombre+`">Add to Card</button>
      </div>
    </div> `
    };       
    function reloadMenu(orderList){
       document.getElementById("menu").outerHTML =
      `<section class="product" id="menu">
      <h1 class="menu__title"> Nook shop<br>Please select an item <br>Scroll to see more</h1>
      <div class="menu__finances">
      <button class="menu__btn" id="backMenu">Main menu</button>
          <h3 class="bells">`+storage.bells +` bells</h3>
          <br><p>Total Price: <span id="totalPrice">$0.00</span></p>
      <button class="menu__btn" id="payNow">Pay now</button>
      <h2 class="menu__car">This are the items in the 🛒car </h2>
      <div class="car" id="shopCar"> </div>
     
      <section class="shopItems"id="selectProduct">`
  
      document.getElementById("selectProduct").innerHTML=message+` </section></section>`;
  
      console.log("menu reloaded")
  
  
      /////
      let currentList=JSON.parse(storing.getItem('itemsinCar'));
      let shoppingCar=[];
      const itemsinCar=[];
      let totalPrice = 0;
  
      if(currentList !==null){////////////si el usuario tiene algo en el carrito cargarlo///////////////////
        let totalAmount=document.getElementById('totalPrice');
        console.log("Loading previus items");
  
        for(let i=0;i<currentList.length;i++){
          console.log(currentList[i].item);
          itemsinCar.push(currentList[i])
          shoppingCar.push(currentList[i].item); 
          let carButtons=`
          <div class="shopItemCar" id="incar`+currentList[i].item+`">
            <img src=`+currentList[i].img +`
                class="shopItem__img">
            <div class="shopItem__info">
                <h2 class="shopItem__name" >`+currentList[i].item+`🛒x`+currentList[i].quantity+`</h2>        
                <h1 class="shopItem__price">`+(currentList[i].price*currentList[i].quantity)+` bells</h1>
                <button class="removecar"id="R`+currentList[i].item+`">Remove</button>
            </div>
          </div>` 
          document.getElementById('shopCar').innerHTML+=carButtons; 
          totalPrice += parseFloat(currentList[i].price*currentList[i].quantity);
        }
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
        };
      ////////creamos el evento que escucha un click en la seccion de productos/////////////////
      let selectItem=document.getElementById('selectProduct');
      selectItem.addEventListener('click',(event)=>{
        const btnon=event.target;
        const btnname=Array.from(btnon.id)[0];
        const btnitem=btnon.id.replace(btnname,"");
        console.log("hello this is "+btnname+" item pointed "+ btnitem);
        let totalAmount=document.getElementById('totalPrice');
            if(btnname=="b"){///////////////////////////////metodo de pago directo
              console.log("lets go pay")
              const item=orderList.find(item =>item.nombre===btnitem);
              console.log(item)
              paymentView(item.precio);
            }
            else if (btnname=="C") {//////////////////reconoconozemos si el boton escogido es el de aladir al carrito
              const item=orderList.find(item =>item.nombre===btnitem);
              console.log(item)
             let iteminCar="";
              if(item){//////////////////////busco el item al que esta apuntando
              iteminCar={"item":item.nombre,
                              "img":item.image,
                             "price":item.precio,
                             "quantity":1,
                              "totalinCar":item.precio}}
  
              totalPrice += parseFloat(item.precio);
              let isInCar=shoppingCar.includes(btnitem);
              let carButtons=`
              <div class="shopItemCar" id="incar`+btnitem+`">
                <img src=`+iteminCar.img +`
                    class="shopItem__img">
                <div class="shopItem__info">
                    <h2 class="shopItem__name" >`+iteminCar.item+`🛒x`+iteminCar.quantity+`</h2>        
                    <h1 class="shopItem__price">`+(iteminCar.price*iteminCar.quantity)+` bells</h1>
                    <button class="removecar"id="R`+iteminCar.item+`">Remove</button>
                </div>
              </div>`
            //////////////////eventos para añadir al carrito en caso tal de que no este
           if(currentList==null || isInCar==false){
              console.log("Item not in the car");
               shoppingCar.push(btnitem);
  
               itemsinCar.push(iteminCar);
  
               storing.setItem('itemsinCar',JSON.stringify(itemsinCar));
               currentList=JSON.parse(storing.getItem('itemsinCar'));
               /////////////////     
  
               document.getElementById('shopCar').innerHTML+=carButtons;
              }
              //////////////////eventos para añadir al carrito en caso tal de que este dentro entonces cambia envez de sumar
              else{
                let tempList=JSON.parse(storing.getItem('itemsinCar'));
                tempList.forEach(element => {
                  if(element.item==item.nombre){
                  let turn = tempList.indexOf(element);
                  tempList[turn].quantity+=1;
                  tempList[turn].totalinCar=tempList[turn].quantity*tempList[turn].price
                   console.log("need to update"); 
                }
                });
                storing.setItem('itemsinCar',JSON.stringify(tempList));
                document.getElementById('incar'+btnitem).outerHTML=carButtons;
  
              }
            } //////////////////total re definido dentro del codigo
          console.log(totalPrice)
          totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
          reloadMenu(orderList);
          //console.log("inside the shoppingcar:"+shoppingCar);
        });
  /////////////////////////////evento para sacar elementos del carrito////////////////////////////////////////////////////////////////
        let insideCar=document.getElementById('shopCar');
        insideCar.addEventListener('click',(event)=>{
          const btnon=event.target;
          const btnname=Array.from(btnon.id)[0];
          const btnitem=btnon.id.replace(btnname,"");
          console.log("hello this is "+btnname+" item pointed "+ btnitem);
           let totalAmount=document.getElementById('totalPrice');
           if(btnname=="R"){
            const item=orderList.find(item =>item.nombre===btnitem);////encontremos el elemento que estamos buscando sacar
            console.log("we found this item if you want to remove")
            console.log(item)
          ///////////metodo para sacar de la lista
            totalPrice -= parseFloat(item.precio);
            let carButtons=""
            let tempList=JSON.parse(storing.getItem('itemsinCar'));
                  tempList.forEach(element => {
                    if(element.item==item.nombre){
                    let turn = tempList.indexOf(element);
                        if(tempList[turn].quantity==1){ ////considero la posibilidad de que el elemento sea el ultimo en salir
                        tempList.splice(turn,1);
                        let removeThis="";
                        shoppingCar.forEach(element => {
                          if(element==item.nombre){
                            removeThis=shoppingCar.indexOf(element);
                          }
                          shoppingCar.splice(removeThis,1);
                        });
                        storing.setItem('itemsinCar',JSON.stringify(tempList));        
                        currentList=JSON.parse(storing.getItem('itemsinCar'));
                        document.getElementById('incar'+btnitem).outerHTML='';
                    }/////////////////////////////////////////
                        else{
                        tempList[turn].quantity-=1;
                        tempList[turn].totalinCar=tempList[turn].quantity*tempList[turn].price
                        console.log("need to update");
                        carButtons=`
                          <div class="shopItemCar" id="incar`+tempList[turn].item+`">
                            <img src=`+tempList[turn].img +`
                                class="shopItem__img">
                            <div class="shopItem__info">
                                <h2 class="shopItem__name" >`+tempList[turn].item+`🛒x`+tempList[turn].quantity+`</h2>        
                                <h1 class="shopItem__price">`+(tempList[turn].price*tempList[turn].quantity)+` bells</h1>
                                <button class="removecar"id="R`+tempList[turn].item+`">Remove</button>
                            </div>
                          </div>` 
                          storing.setItem('itemsinCar',JSON.stringify(tempList));    
                          document.getElementById('incar'+btnitem).outerHTML=carButtons;
                      }}
                  });
          /////////////////
          totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
          reloadMenu(orderList)
    }})
  ////////////////////////////////////////EVENTO PARA PAGAR-LA LISTA//////////////////////////////////////////////////////
        payNow.addEventListener('click',()=>{
          paymentView(totalPrice)
  });
  ///////////////////////////Evento para pagar un solo item ////////////////////////
        backMenu.addEventListener('click',()=>{
          location.reload();
          });
          };
    reloadMenu(orderList);
  }////////////////////////////
function shopping(storage,storing) {
  console.log("reporting on shopping")
  console.log(storing)
  let orderList=[];
  function filtrMenu(){
    document.getElementById("menu").outerHTML =
    `<section class="product" id="menu">
    <h1 class="menu__title"> Wellcome to nook shooping, please select order of catalog display</h1>
    <div class="menu__finances" id="selectProduct">
    <button class="menu__btn" id="1">Cheapest first</button>
    <button class="menu__btn" id="2">Most expensive first</button>
    <button class="menu__btn" id="3">Acending name</button>
    <button class="menu__btn" id="4">Decended name</button>
    <button class="menu__btn" id="5">Product search</button>
    <br><button class="menu__btn" id="backMenu">Main menu</button></div>
    `
  /////////////now listening for the buttons...
    let selectItem=document.getElementById('selectProduct');
    console.log(selectItem);
    selectItem.addEventListener('click',(event)=>{
        const btnon=event.target;
        const btnonID=btnon.id;
        console.log("hello this is "+ btnonID);
        if(btnonID<=4){
        orderList=order(btnonID,storeProducts);
        console.log(orderList)
      loadMenu(storage,orderList,storing)}
      //////////////this gives me the search options
      else if (btnonID == 5){
        let searchquer="";
        console.log("beging search");
        seachbar();
        backMenu.addEventListener('click',()=>{
          location.reload();
          });
        seachNow.addEventListener('click',()=>{
          searchquer=document.getElementById('lookingFor').value;
          console.log(searchquer);
          let correctCase= searchquer.charAt(0).toUpperCase(); //metodo para evitar entren minusculas 
          let remainLetter=searchquer.slice(1);
          let newQuery=correctCase+remainLetter;
          console.log(newQuery);
          let catFind=findItem(newQuery,storeProducts);
          loadMenu(storage,catFind,storing);
        })       
      }

    })

    backMenu.addEventListener('click',()=>{
      mainMenu(storage);
      });
}

///////////////////////////////////////////////////
  filtrMenu();

}
////// una simple funcion de añadir fondos
function updateAmount(operation,amount,storage,storing){
  if(operation==1){
    console.log("current: "+storage.bells);
    if(amount+storage.bells>999999){
      Toastify({
        text: "This account cant hold more than 999.999 bells",
        gravity: "top",
        position:"center",
        className: "info",
        style: {
          background: "red",
        }
      }).showToast();
    }
    else{
    

    Swal.fire({
      title: 'Do you wish to deposit this?',
      text:'deposit '+amount + ' bells',
      showCancelButton: true,
      confirmButtonColor: '#30ac7c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save!'

    }).then((result) => {
      if (result.isConfirmed) { 
        storage.bells=storage.bells+amount;
        storing.setItem('userInfo',JSON.stringify(storage)); 
        ATM(storage,storing);    
      };
    });}
    //////
  }
  else{
    if(amount>storage.bells){
      Toastify({
        text: "It seems you dont have enough bells in this account",
        gravity: "top",
        position:"center",
        className: "info",
        style: {
          background: "red",
        }
      }).showToast();
    }
    else{
      //////////////////////////////////////////////////
      console.log("current: "+storage.bells);
      Swal.fire({
        title: 'Do you wish to withdrawal this?',
        text:'withdrawalt '+amount + ' bells',
        showCancelButton: true,
        confirmButtonColor: '#30ac7c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Gimme'
  
      }).then((result) => {
        if (result.isConfirmed) { 
          storage.bells=storage.bells-amount;
          storing.setItem('userInfo',JSON.stringify(storage));
          ATM(storage,storing);    
        };
      });
  }
}

}
/////////////////////menu del ATM que carga botones y hace trigger a las funciones
function ATM(storage,storing){
  function reloadMenu(){
  document.getElementById("menu").outerHTML =
  `<section class="product" id="menu">
  <h1 class="menu__title"> Wellcome to the ATM <br>Current amount</h>
  <div class="menu__finances">
  <h3 class="bells">`+storage.bells+ ` Bells</h3></div> 
  <input type="number" min="0" placeholder="Define the amount " class="login__input" id="amount">
  <div class="login__buttongroup">
  <button class="menu__btn" id=deposit>Deposit some bells </button>
  <button class="menu__btn" id=withdraw> Witdrawl some bells</button>
  <br><button class="menu__btn" id="backMenu">Main menu</button>
  </div>
  </section>`
  
  backMenu.addEventListener('click',()=>{
    location.reload();
    });
  deposit.addEventListener('click',()=>{
    let amount=parseInt(document.getElementById("amount").value);
    if(isNaN(amount)){amount=0}
    console.log(amount)
    //console.log("ready");
    updateAmount(1,amount,storage,storing);
    console.log("amount updated")
  });
  withdraw.addEventListener('click',()=>{
    let amount=parseInt(document.getElementById("amount").value);
    if(isNaN(amount)){amount=0}
    console.log(amount)
    //console.log("ready");
    updateAmount(0,amount,storage,storing);
    reloadMenu();
  });
}
reloadMenu();
}
/**Menu nuevo para log in, en este mira si hay info dentro del local storage que se relacione con un usuario
esto dado que el usuario haya marcado la casilla de remember me y hace log in en automatico o
si en caso tal de estar trabajando en la paguina que al recargar no se log out*/




function mainMenu(storage,storing){
  console.log("main menu reportying")
  console.log(storing)

  console.log("Changing to main menu");
  document.getElementById("Styles").outerHTML =
  `<link rel="stylesheet" href="./CCS3/menustyles.css" id="Styles">`
  let currentMenu =
    `<section class="menu" id="menu">
    <h2 class="menu__title"> Welcome `+storage.user+` to the ABD terminal <br> please select from the following menu</h2>
    <div class="menu__finances">
            <h3 class="bells">`+storage.bells+ ` Bells</h3>
            <h3 class="miles">`+storage.miles+ ` Miles</h3>
        </div> 

    <div class="menu__selection">
        <button class="menu__btn" id="milesbtn">Nook miles catalog</button>
        <br> 
        <button class="menu__btn" id="bellsbtn">Nook Shopping</button>
        <br>              
        <button class="menu__btn" id="ATMbtn">Bell ATM</button>
        <br> 
        <button class="menu__btn" id="logOut">LogOut</button>
  </div> 
  </section>`
  document.getElementById("menu").outerHTML =currentMenu;
  
///** variables del menu principal creadas dentro porque si se crean antes del menu entra en valor null*/
  let logOout=document.getElementById("logOut");
  let milesbtn=document.getElementById("milesbtn");
  let bellsbtn=document.getElementById("bellsbtn"); 
  let ATMbtn=document.getElementById("ATMbtn");
  /** *////
  milesbtn.addEventListener('click',()=>{
    console.log("reedeming miles");
    console.log("Loading miles items...");
    fetch("./JSON/productsMiles.json")
    .then(response=>response.json())
    .then(data =>{
      nookMiles(storage,storing,data);
    });

  });

  /**/// */
  bellsbtn.addEventListener('click',()=>{
    console.log("lets go shopping");
    console.log(storing)
    shopping(storage,storing);
  });
  ATMbtn.addEventListener('click',()=>{
    console.log("accessing savings");
    ATM(storage,storing);
  });


  logOout.addEventListener('click',()=>{
    console.log("leaving so soon?");
    storage.pass='';
    storage.user='';
    console.log("why");
    let RmbrLast=JSON.parse(localStorage.getItem('check'));
    console.log(RmbrLast)
    if(RmbrLast){
      console.log("cleaning")
      localStorage.setItem('userInfo',JSON.stringify(storage));
      localStorage.setItem('check',false)}
      else{
    sessionStorage.setItem('userInfo',JSON.stringify(storage));
    localStorage.clear()}
    location.reload();
  });
  }
/** funcion que me permite que al cargar la paguina mire si hay datos guardados para evitar log in o si se recarga o cierra mantega sesion*/
function autologin(savedData,tempData){
  /*console.log("recived")*/
  console.log("ateempting autloging")
  console.log(tempData)
  if(savedData !==null){ 
    if(savedData.user==villager && savedData.pass ==password){
      
      console.log("Welcome back");
      mainMenu(savedData,localStorage);
    }else{console.log("not found in local")}
  }
  console.log("second condigiontal");
  if(false){}
  else if( tempData !==null){

    if(tempData.user==villager && tempData.pass ==password){
      console.log("Temp Back");
      mainMenu(tempData,sessionStorage);
    }else{console.log("not found in session")}
  }
  }
////////////////

let sData="";
logiBtn.addEventListener('click',(e)=>{
  e.preventDefault();
let savedData = JSON.parse(localStorage.getItem('userInfo'));
let tempData=   JSON.parse(sessionStorage.getItem('userInfo'));
  console.log(savedData)
  console.log(tempData)
  if(savedData==undefined){
    if(tempData==undefined){
      console.log("huh")
      sData={"bells":-1};
    //*console.log(sData)*/ 
    }
      else{
    sData=tempData;}
  }
  else{
  sData=savedData;}
  //console.log("whyim null"+ sData)
  if (JSON.parse(localStorage.getItem('check'))){
    console.log("local storage");

    logon(e,sData,localStorage);}
  else{
  console.log("session storage");
  logon(e,sData,sessionStorage);
}

  
  }); 
regBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  Toastify({
    text: "comming soon---",
    gravity: "top",
    position:"center",
    className: "info",
    style: {
      background: "#cc9900",
    }
  }).showToast();

})

nukeBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  
  localStorage.clear();
  sessionStorage.clear();
  sData={"bells":-1};
 Toastify({
    text: "Sparkling clean",
    gravity: "top",
    position:"center",
    className: "info",
    style: {
      background: "red",
    }
  }).showToast();
  setTimeout(()=>{location.reload()},500);
  
})
autologin(savedData,tempData);
let checkLoad=JSON.parse(localStorage.getItem('check'));

window.addEventListener('load',()=>{
  console.log("check on first")
  console.log(Rmbr.check);
  localStorage.setItem('check',Rmbr.checked)
  if(checkLoad){localStorage.setItem('check',true)}
});  
Rmbr.addEventListener('change',()=>{
    console.log("check on first")
    console.log(Rmbr.check);
    localStorage.setItem('check',Rmbr.checked)});
/**/ ////////////////////////////////////////////////////////////// */

