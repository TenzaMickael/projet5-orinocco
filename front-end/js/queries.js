/* Requette XMLHttpRequest de la page getTeddies.js */

function getAllTeddies (){       

    var request = new XMLHttpRequest();                                                 //=> Crée une requete XMLHttRequest

    request.onreadystatechange = function(){                                            //=> Au changement de onreadystatechange :

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){              //=> Si son changement est égal à une requete réussis et un status de 200 :

        const response = JSON.parse(this.responseText);                                 //=> Créer une constante que l'on parse dans un JSON en string

            for (let index = 0 ; index < response.length ; index++) {                   //=> On crée une boucle pour récupérer les donnée de l'API

                teddies(response[index]);                                               //=> On met la reponse dans le parametre de la fonction "teddies"
            }  
        }
    };

    request.open("GET" ,"http://localhost:3000/api/teddies");                           //=> On lance la requete sur cette url 
    request.send();                                                                     //=> On donne l'ordre de lancer la requete
}


/* Requette XMLHttpRequest de la page productTeddies.js */

function getOneTeddie (id) {

    var request = new XMLHttpRequest();                                                 //=> Crée une requete XMLHttRequest

    request.onreadystatechange = function () {                                          //=> Au changement de onreadystatechange :

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {             //=> Si son changement est égal à une requete réussis et un status de 200 :

            const response = JSON.parse (this.responseText)                             //=> Créer une constante que l'on parse dans un JSON en string

            productTeddies (response);                                                  //=> On met la reponse dans le parametre de la fonction "productTeddies" 
        };
    };
    request.open ("GET" , "http://localhost:3000/api/teddies/"+id);                     //=> On lance la requete sur cette url 
    request.send();                                                                     //=> On donne l'ordre de lancer la requete 

}


/* Requette XMLHttpRequest de la page basket.js */

function postOfTeddie (order) {

    var request = new XMLHttpRequest();                                                 //=> Crée une requete XMLHttRequest

    request.onreadystatechange = function () {                                          //=> Au changement de onreadystatechange :
          
        if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {           //=> Si son changement est égal à une requete réussis et un status de 201 :
 
                const response = JSON.parse(this.responseText);                         //=> Création d'une constante que l'on parse

                var orderId = response.orderId                                          //=> Création d'une variable qui contient dans la reponse le numéro de commande

                var totalPriceCommand = totalPrice/100                                  //=> On divise par 100 le prix total
                
                var confirmOrder = {                                                    //=> Création d'une variable 
                    orderId ,                                                           //=> Le numéro de commande
                    totalPriceCommand                                                   //=> Le prix total de la commande
                }

                deleteTeddie(itemsTeddies);                                             //=> Appelle de la fonction deleteTeddie
                
                sessionStorage.setItem("resumeCommand",JSON.stringify (confirmOrder));  //=> On crée le sessionStorage avec à l'intérieur les information pour le client 
             
               window.location = "./confirm.html";                                      //=> On redirige l'utilisateur vers la page de confirmation
        }   
    };

    request.open("POST" ,"http://localhost:3000/api/teddies/order");                    //=> On lance la requete sur cette url 
    request.setRequestHeader("Content-Type", "application/json");                       //=> Edite le header de la requete POST
    request.send(JSON.stringify(order));                                                //=> On donne l'ordre de lancer la requete
}