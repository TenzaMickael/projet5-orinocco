
//Import de l'ID "basket" dans le code html 

const basket = document.getElementById("basket");
console.log(basket)

//Requete XMLHttpRequest pour récupérer l'API des oursons

var request = new XMLHttpRequest();                                         

request.onreadystatechange = function () {                                  

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

        const response = JSON.parse (this.responseText)                 
        basketTeddies (response); 
        console.log(response)                                        
    };
};
request.open ("GET" , "http://localhost:3000/api/teddies/");             
request.send();   



//Import du localStorage

let selectTeddies = JSON.parse(localStorage.getItem("selectTeddies"));
console.log(localStorage)

function basketTeddies (data){};