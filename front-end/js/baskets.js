
//Import de l'ID "basket" dans le code html 

const basket = document.getElementById("basket");


//Requete XMLHttpRequest pour récupérer l'API des oursons

var request = new XMLHttpRequest();                                         

request.onreadystatechange = function () {                                  

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

        const response = JSON.parse (this.responseText)                 
        basketTeddies (response); 
                                               
    };
};
request.open ("GET" , "http://localhost:3000/api/teddies/");             
request.send();   






function basketTeddies (data){

    let productBasket = document.createElement("main");
    productBasket.setAttribute ("class" , "cards__item__thumb");      
    basket.appendChild(productBasket);

    productBasket.textContent= data.imageUrl;
    

//Import du sessionStorage

let selectTeddies = JSON.parse(sessionStorage.getItem("selectTeddies"));
console.log(selectTeddies)


};

