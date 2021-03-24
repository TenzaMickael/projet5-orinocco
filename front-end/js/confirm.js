let orderName = document.getElementById("orderName");
let orderId = document.getElementById ("orderId");
let orderPrice = document.getElementById ("orderPrice");

let orderConfirm = JSON.parse(sessionStorage.getItem("order"));

console.log(orderConfirm)
document.getElementById("orderName").innerHTML = orderConfirm.contact.lastName;
document.getElementById("orderId").innerHTML = orderConfirm.orderId;
document.getElementById("orderName").innerHTML = orderConfirm.products.price;