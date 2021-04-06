
let orderId = document.getElementById ("orderId");                                      //=> On récupère l'id "orderId"

let orderPrice = document.getElementById ("orderPrice");                                //=> On récupère l'id "orderPrice"

let orderConfirm = JSON.parse(sessionStorage.getItem("resumeCommand"));                 //=> On récupère le sessionStorage


document.getElementById("orderId").innerHTML = orderConfirm.orderId;                    //=> On lui attribut un contenu
document.getElementById("orderPrice").innerHTML = orderConfirm.totalPriceCommand;       //=> On lui attribut un contenu

