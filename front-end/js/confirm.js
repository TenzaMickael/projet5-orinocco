
let orderId = document.getElementById ("orderId");
let orderPrice = document.getElementById ("orderPrice");

let orderConfirm = JSON.parse(sessionStorage.getItem("resumeCommand"));

console.log(orderConfirm)

document.getElementById("orderId").innerHTML = orderConfirm.orderId;
document.getElementById("orderPrice").innerHTML = orderConfirm.totalPriceCommand;

