/* Fonction pour le  prix total par oursons de la page basket.js */ 
function subTotal (idTeddie,priceUnitTeddie,quantityOfTeddie){

    var  subTotalTeddie = parseInt(priceUnitTeddie * quantityOfTeddie) ;                                                //=> ParseInt le résultat de la multiplication

    var  subTotalElement = document.getElementById("subTotal_" + idTeddie);                                             //=> On récupère l' ID 

    subTotalElement.textContent = subTotalTeddie /100 + "€";                                                            //=> On lui attribut un contenu

    return subTotalTeddie ;                                                                                             //=> Retourne la variable
};


/* Fonction pour le nombre total d'articles de la page basket.js */ 
function  numberArticles (quantityOfTeddie) {

    totalArticles = totalArticles + parseInt(quantityOfTeddie);                                                         //=> ParseInt le résultat de l'addition

    var numberItemElement = document.getElementById("numberItem");                                                      //=> On récupère l'ID

    numberItemElement.textContent = "Votre panier contient : " + totalArticles + " articles ";                          //=> On lui attribut un contenu
};


/* Fonction pour le  prix total de la commande de la page basket.js */ 
function totalPriceOfTeddie (subTotalTeddie) {

    totalPrice = totalPrice + parseInt(subTotalTeddie);                                                                 //=> ParseInt le résultat de l'addition

    var priceOfTeddieElement = document.getElementById("priceOfTeddies");                                               //=> On récupère l'ID

    priceOfTeddieElement.textContent = "Le montant total de votre commande s'élève à : " + totalPrice/100 + "€" ;       //=> On lui attribut un contenu
};


/* Fonction pour supprimer un ourson de la page basket.js */ 
function deleteTeddie (idTeddie){

    let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));                                               //=> On récupère le contenu du localStorage

    let index = findIndexTeddieStorage (idTeddie,itemsTeddies)                                                          //=> on appelle la fonction "findIndexTeddieStorage"

    itemsTeddies.splice(index,1);                                                                                       //=> On supprime dans l'"itemsTeddies"

    if (itemsTeddies.length == 0 ) {                                                                                    //=> Si l'itemsTeddies est égal à zéro 

       localStorage.removeItem("selectTeddies");                                                                        //=> On supprime "selectTeddies"

    } else {                                                                                                            //=> Sinon
    
        localStorage.setItem("selectTeddies" , JSON.stringify (itemsTeddies));                                          //=> On met à jour le localStorage
   
    }

     window.location.reload ()                                                                                          //=> On recharge la page 
}


/* Fonction qui permet de mettre à jour le localStorage de la page basket.js */ 

function updateStorageTeddie (idTeddie,quantity) {

    let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));                                               //=> On récupère le contenu du localStorage

    let index = findIndexTeddieStorage (idTeddie,itemsTeddies)                                                          //=> On appelle la fonction "findIndexTeddieStorage"

    itemsTeddies[index].quantity = quantity;                                                                            //=> On associe la quantité à "quantity" présent dans le localStorage

    localStorage.setItem("selectTeddies" , JSON.stringify (itemsTeddies));                                              //=> On met à jour le localStorage
    
}


/* Fonction qui permet de rechercher un ourson dans le localStorage de la page basket.js */ 
function findIndexTeddieStorage(idTeddie,itemsTeddies){
    
    for (let index = 0;index < itemsTeddies.length; index++) {                                                          //=> On fait une boucle sur "itemsTeddies"
        let id = itemsTeddies[index].id ;                                                                               //=> On crée une variable et on y associe l'index
        if (id === idTeddie) {                                                                                          //=> Si l'"id" est égal à "idteddie"
          return  index                                                                                                 //=> On retourne l'index
        }
    }
};


