/* Requette de la page getTeddies.js */

function getAllTeddies (){
    var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        const response = JSON.parse(this.responseText);
        for (let index = 0 ; index < response.length ; index++) {
            teddies(response[index]);   
        }  
    }
};
request.open("GET" ,"http://localhost:3000/api/teddies");
request.send();
}


//REQUETE POUR RÉCUPÉRER L'ID DE L'OURSON SÉLECTIONNER SUR LA PAGE D'ACCEUIL page produit
function getOneTeddie (id) {
    var request = new XMLHttpRequest();                                         //=> Lance une requete XMLHttRequest

request.onreadystatechange = function () {                                  //=> Au changement de onreadystatechange :

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     //=> Si son changement est égal à une requete réussis et un status de 200 :

        const response = JSON.parse (this.responseText)                     //=> Créer une constante que l'on parse dans un JSON en string
        productTeddies (response);                                          //=> ProductTeddies c'est le nom de la futur fonction 
    };
};
request.open ("GET" , "http://localhost:3000/api/teddies/"+id);             //=> On lance la requete sur cette url 
request.send();                                                             //=> On donne l'ordre de lance la requete 

}


function postOfTeddie (order) {
    var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          
            if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
 
                const response = JSON.parse(this.responseText);

                var orderId = response.orderId
                var totalPriceCommand = totalPrice/100
                
                var confirmOrder = {
                    orderId ,
                    totalPriceCommand
                }
                deleteTeddie(itemsTeddies);
                
                sessionStorage.setItem("resumeCommand",JSON.stringify (confirmOrder));
             
               // order = JSON.parse(sessionStorage.getItem('order'));
               // console.log(order)
               window.location = "./confirm.html";  
            }
           
       
};
request.open("POST" ,"http://localhost:3000/api/teddies/order");
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(order)); 
}