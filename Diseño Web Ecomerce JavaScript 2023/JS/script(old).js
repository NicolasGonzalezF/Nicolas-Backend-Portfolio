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

*/
const villager = "ABD"; /*USARIO Y CONTRASEÑA PRE DEFINIDO */
const password = "1234";
let miles = 8000;
let bells = 150000;
let authorize = false;
let service;

console.log("switched to other file")

function logon() {
  /*Funcion de log in con usuario y contraseña de 3 intentos*/

  let attempts = 3;
  while (authorize === false) {
    let userImputName = prompt(
      "Welcome to the ABD terminal \n please provide your username: "
    );
    let userImputPass;
    if (userImputName === villager) {
      while (attempts !== 0) {
        userImputPass = prompt("Please provide a password");
        if (userImputPass === password) {
          alert("Log in Successful");
          authorize = true;
          break;
        } else {
          alert("Password doesnt match the user please try again");
          attempts -= 1;
          console.log(attempts);
        }
      }
      if (attempts === 0) {
        alert(
          "Sorry for security reasons your account is now in lockdown \n please contact nook-inc"
        );
        break; /* break para poder sacar del codigo  ya que puede que le demos infinitas oportunidades
                de inicio de session con usuario pero no podemos darle multiples con contraseña*/
      }
    } else {
      alert("User not found ,please try again");
    }
  }
}
/*///////////////////////*/ ///////////////////////

class product {
  constructor(idNum, nombre, precio, currency, description) {
    //**name es un nombre reservado por eso toca en español */
    this.idNum = idNum;
    this.nombre = nombre;
    this.precio = precio;
    this.currency = currency;
    this.description = description;
  }
}

const milesProducts = [
  new product(
    Math.floor(Math.random() * 100),
    "Traveling ticket",
    300,
    "Miles",
    "Fly ticket reedem in airport"
  ),
  new product(
    Math.floor(Math.random() * 100),
    "DIY Workbench",
    200,
    "Miles",
    "Make your own tools with this DIY workbench recipe"
  ),
  new product(
    Math.floor(Math.random() * 100),
    "Sun Hat",
    3000,
    "Miles",
    "Protect your head from this harsh summer days, only available in yellow"
  ),
  new product(
    Math.floor(Math.random() * 100),
    "Froggie chair",
    400,
    "Miles",
    "Sit comfy in this state of the art froggie chair ribbit"
  ),
  new product(
    Math.floor(Math.random() * 100),
    "Leaf umbrella",
    500,
    "Miles",
    "Rain rain go away with this classic nature desing umbrella"
  ),
];

const storeProducts=[
  new product(Math.floor(Math.random() * 100),'Book',290,"bells"),
  new product(Math.floor(Math.random() * 100),'World Map',640,"bells"),
  new product(Math.floor(Math.random() * 100),'Rain Hat',880,"bells"),
  new product(Math.floor(Math.random() * 100),'Bandage',140,"bells"),
  new product(Math.floor(Math.random() * 100),'MVP Tee',640,"bells"),
  new product(Math.floor(Math.random() * 100),'No.2 Shirt',560,"bells"),
  new product(Math.floor(Math.random() * 100),'Demin Skirt',1120,"bells"),
  new product(Math.floor(Math.random() * 100),'Rain Boots',290,"bells"),
  new product(Math.floor(Math.random() * 100),'wet Suit',3000,"bells"),
  new product(Math.floor(Math.random() * 100),'Squid Hat',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Love Song',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Metalica',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Sonata',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Fiesta',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'Luigi Hat',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'Mario Hat',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'Mario Shoes',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'Luigi Shoes',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'Wario Shoes',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'Shiny Boots',290,"bells"),
  new product(Math.floor(Math.random() * 100),'Wario Hat',1500,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Disco',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Folk',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Aloha',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album BubbleGum',3200,"bells"),
  new product(Math.floor(Math.random() * 100),'K.K Album Blues',3200,"bells"),

];
/*Por alguna razon no me colapsa en el visual estudio ////////////////////////////////////////////////////// */
function nookMiles() {
  let message = "";
  let product = 69;
  let shopCar=0;
  for (i = 0; i < milesProducts.length; i++) {
    message +=
      i +
      1 +
      " " +
      milesProducts[i].nombre +
      " " +
      milesProducts[i].precio +
      " " +
      milesProducts[i].currency +
      "\n";
  }

  
  //console.log(milesProducts);
  while (product > 0) {
    product = parseInt(
      prompt(
        "Welcome to the nook mileage \nYour current balance is :" +
          miles +
          " miles. " +
          "\nThe following products are available for reedeming \n" +
          message +
          "\n Please select from the options avobe or press 0 for main menu"
      )
    );
    console.log(product);
  if (product==0){
    break;
    
  }
  else if(isNaN(product)){
    alert("invalid input please try again")
  }
    else if (0<product <= milesProducts.length) {
      
      /*console.log("i shoudnt exist");*/
      selection = confirm(
        milesProducts[product - 1].description+
          "\n reedeem " +
          milesProducts[product - 1].nombre +
          " for " +
          milesProducts[product - 1].precio +
          " " +
          milesProducts[product - 1].currency +
          " ?"
      );
        console.log(selection);
        if(milesProducts[product-1].precio>miles|| shopCar>miles){
          alert("Sorry you dont have enought miles");
          break;
        }

        if(selection==true){
          shopCar+=milesProducts[product-1].precio;
          moreProducts = prompt("Do you wish to add another item?"+"\n current miles "+miles +" miles"+" \n current total is "+shopCar+ " (Y/N)").toUpperCase()
          if(moreProducts=="Y"){
            if(milesProducts[product-1].precio>miles|| shopCar>miles){
              alert("Sorry you dont have enought miles");
              break;
            }
            alert("please select another item");
          }else{
            miles-=shopCar;
            shopCar=0;
            alert("Thank you for your purchase, your new balance is "+miles+" miles");
          }
        }

      }

    else{
      alert("Sorry we dont have that product, please try again");
    }

    /*
    switch (product) {
      case "1":
        yesOrno = prompt("Reedem traveling ticket for 300 miles? (y/n)");
        if (yesOrno === "y" || yesOrno === "Y") {
          if (miles < 300) {
            alert("Sorry not enought miles");
            break;
          } else {
            miles -= 300;
            alert("Thank you for your purchase, your balance is " + miles);
            break;
          }
        } else if (yesOrno === "n" || yesOrno === "N") {
          break;
        } else {
          alert("invalid input please try again");
        }
      case "2":
        yesOrno = prompt("Reedem DIY workbench recipe 200 miles? (y/n)");
        if (yesOrno === "y" || yesOrno === "Y") {
          if (miles < 200) {
            alert("Sorry not enought miles");
            break;
          } else {
            miles -= 200;
            alert("Thank you for your purchase, your balance is " + miles);
            break;
          }
        } else if (yesOrno === "n" || yesOrno === "N") {
          break;
        } else {
          alert("invalid input please try again");
        }
      case "3":
        yesOrno = prompt("Reedem nifty sunhat 3000 miles? (y/n)");
        if (yesOrno === "y" || yesOrno === "Y") {
          if (miles < 3000) {
            alert("Sorry not enought miles");
            break;
          } else {
            miles -= 3000;
            alert("Thank you for your purchase, your balance is " + miles);
            break;
          }
        } else if (yesOrno === "n" || yesOrno === "N") {
          break;
        } else {
          alert("invalid input please try again");
        }
    }
    */
  }
  
}
/*Por alguna razon no me colapsa en el visual estudio ////////////////////////////////////////////////////// 
misma funcion pero con monedas normales*/
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
///////////////////////////////
function shopping() {
  let exitNow=false;
  let totalNow="";
  let backToMain="\nor press 0 to go back to main menu \n";
  let shopCar=0;
  let product = 69;
  let activeCancel=false;
  while (product != 0) {
    selection= prompt("Wellcome to nook shooping, please select order of catalog display \n1 cheapest first \n2 most expensive first \n3 Acending name \n4 Decended name "
    +"\n5 Beging product search \n0 Back to main menu");
    if(selection==0){
      break;
    }
    else if(selection==5){
      let itemSelect= (prompt("Welcome to the catalog, theres new K.K Album songs, new Hats and new shoes \n, please input the name of what you are looking for:"));
      let correctCase= itemSelect.charAt(0).toUpperCase(); //metodo para evitar entren minusculas 
      let remainLetter=itemSelect.slice(1);
      let newQuery=correctCase+remainLetter;
      let catFind=findItem(newQuery,storeProducts);
      console.log(catFind);

      let message = "";
    for (i = 0; i < catFind.length; i++) {
      message +=
        i +
        1 +
        " " +
        catFind[i].nombre +
        " " +
        catFind[i].precio +
        " " +
        catFind[i].currency +
        "\n";
    }
while(exitNow==false){
    product=parseInt(prompt("This are the following resutls \n"+ message+ totalNow+ backToMain));

    if(activeCancel==true && isNaN(product)){
      alert("Car is now empty");
      break;
    }
    else if(isNaN(product)){
     
     alert("invalid selection try again");
    }
    else if(product==0){
      bells-=shopCar;
      alert("Your balance is "+bells +" bells");
      break;
    }
    else if(0<product <= catFind.length){

    selection = confirm(
      catFind[product - 1].description+
        "\n reedeem " +
        catFind[product - 1].nombre +
        " for " +
        catFind[product - 1].precio +
        " " +
        catFind[product - 1].currency +
        " ?"
    );

    if(selection==true){
      shopCar+=catFind[product-1].precio;
      totalNow="\nYour current total in car is " +shopCar +" bells" +"\npress 0 to pay or press any letter to cancel";
      activeCancel=true;
      backToMain="";
      moreProducts = prompt("Do you wish to add another item?"+"\n current balance "+bells +" bells"+" \n current total is "+shopCar+ " bells (Y/N)").toUpperCase()
      if(moreProducts=="Y"){
        if(catFind[product-1].precio>bells ||shopCar>bells){
          alert("Sorry you dont have enought bells");
          break;
        }
        alert("please select another item");
      }else{
        bells-=shopCar;
        alert("Thank you for your purchase, your new balance is "+bells+" bells");
        exitNow=true;
        totalNow=0;
        shopCar=0;
      }
  }}
  
}

///////////////////////////////////////////////////////////////////////////////////    
    }else{
    const orderedShopping= order(selection,storeProducts);

    let message = "";
    for (i = 0; i < orderedShopping.length; i++) {
      message +=
        i +
        1 +
        " " +
        orderedShopping[i].nombre +
        " " +
        orderedShopping[i].precio +
        " " +
        orderedShopping[i].currency +
        "\n";
    }
    
    while(exitNow==false){
    product =parseInt(prompt("Your current balance is "+bells+" bells"+totalNow+"\nPlease select from the following items "+backToMain +"\n"+message));

    ////////////////////////
    if(product==0){
      bells-=shopCar;
      alert("Your balance is "+bells +" bells");
      break;
    }
    else if(isNaN(product)){
      alert("Sorry invalid input")
    }
    else if (0<product <= orderedShopping.length){
    
    selection = confirm(
      orderedShopping[product - 1].description+
        "\n reedeem " +
        orderedShopping[product - 1].nombre +
        " for " +
        orderedShopping[product - 1].precio +
        " " +
        orderedShopping[product - 1].currency +
        " ?"
    );
      //console.log(selection);
      if(orderedShopping[product-1].precio>bells || shopCar>bells){
        alert("Sorry you dont have enought bells");
        break;
      }
      if(selection==true){
        shopCar+=orderedShopping[product-1].precio;
        totalNow="\nYour current total in car is " +shopCar +" bells" +"\npress 0 to pay";
        backToMain="";
        moreProducts = prompt("Do you wish to add another item?"+"\n current balance "+bells +" bells"+" \n current total is "+shopCar+ " bells (Y/N)").toUpperCase()
        if(moreProducts=="Y"){
          if(orderedShopping[product-1].precio>bells || shopCar>bells){
            alert("Sorry you dont have enought bells");
            break;
          }
          alert("please select another item");
        }else{
          bells-=shopCar;
          alert("Thank you for your purchase, your new balance is "+bells+" bells");
          exitNow=true;
          totalNow=0;
        }
    }}
    
 
    } //*internal while*/ 
  }
  return bells;
}}

/*//////////////////////////////////////////// funciones de un cajero normal 
aseguramos que el codigo no acepte valores negativos ni que se retire mas de lo que esta en el banco */
function withdrawl() {
  let yesorno = prompt(
    "Your current balance is :" +
      bells +
      "\nDo you wish to withdrawl some bells? (y/n)"
  );
  let isDone = "n";
  let withdrawl;
  if (yesorno === "y" || yesorno === "Y") {
    while (isDone !== "n" || isDone !== "y") {
      withdrawl = parseInt(prompt("How many bells ?"));
      if (withdrawl > bells) {
        alert("Sorry not enough bells");
        break;
      } else if (withdrawl < 0) {
        alert("Invalid Amount");
        break;
      }
      isDone = prompt("Are you sure (y/n)");
      bells -= withdrawl;
      alert("Your new balance is " + bells);
      break;
    }
  } else if (yesorno === "n" || yesorno === "N") {
  } else {
    alert("invalid input, please try again");
  }
  return bells;
}
/**/ //////////////////////////////////////////// */
function deposit() {
  let yesorno = prompt(
    "Your current balance is :" +
      bells +
      "\nDo you wish to deposit some bells? (y/n)"
  );
  let isDone = "n";
  let deposit;
  if (yesorno === "y" || yesorno === "Y") {
    while (isDone !== "n" || isDone !== "y") {
      deposit = parseInt(prompt("How many bells ?"));
      if (deposit < 0) {
        alert("Invalid Amount");
        break;
      }
      isDone = prompt("Are you sure (y/n)");
      bells += deposit;
      alert("Your new balance is " + bells);
      break;
    }
  } else if (yesorno === "n" || yesorno === "N") {
  } else {
    alert("invalid input, please try again");
  }
  return bells;
}
/**/ ////////////////////////////////////////////////////////////// */
alert("Welcome Debug tester we have disabled the log-in manager for your convinience");
/*logon()/*invocar a la funcion que nos diga si autoriza el inicio de session o no, cambiando entonces lo que vamos  a mostrar dentro del body */

if (authorize === true) {
  let link = document.createElement("LogIn");
  document.getElementsByTagName("HEAD")[0].appendChild(link);
  document.getElementById("LogIn").innerHTML =
    '<p class="paragraph">Thank you for your patronage </p>';
} else {
  document.getElementById("LogIn").innerHTML =
    '<p class="paragraph">We are sorry, please reload the page </p>';
}

while (authorize === true && service != "x" && service != "X") {
  service = prompt(
    "Welcome to the ABD Terminal\n"
    +"Please  select from the following services \n1 Reedeem Nook Miles(NEW Stuff) \n2 Nook shooping(NEW Stuff) \n3 Withdrawl Bells\n4 Deposit Bells \nx End Session"
  );
  switch (service) {
    case "1":
      nookMiles(miles);
      console.log(miles);
      break;
    case "2":
      shopping();
      console.log(bells);
      break;
    case "3":
      withdrawl();
      console.log(bells);
      break;
    case "4":
      deposit();
      console.log(bells);
      break;
  }
  console.log("Yep im still here ");
}

alert("Logging off....");
