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


/* Fonctions pour les tableaux sur la page basket.js*/

function updateTeddieItem (idTeddie,nQuantity) {                                                                        //=> Fonction qui sert a afficher les infos dans le deuxième tableau
 
    /***** Ajouter +1 a la quantité de l'ourson sélectionner *****/           
    var quantityElement = document.getElementById ("quantity_" + idTeddie);                                             //=> On récupère l' ID "quantity" + "idTeddie"
    var quantity = parseInt (quantityElement.innerHTML)+nQuantity;                                                      //=> On transforme "quantityElement" + nQuantity
    quantityElement.innerHTML = quantity;                                                                               //=> On lui attribut le contenu


    /***** Appeller la fonction pour mettre à jours chaque lignes de l'ourson *****/
    var priceUnitTeddie = parseInt (document.getElementById ("priceUnit_"+idTeddie) .innerHTML)*100;                    //=> On transforme l'ID "priceUnit" + "idTeddie" et on le divise par 100
    subTotal (idTeddie,priceUnitTeddie,quantity);                                                                       //=> On appelle la fonction "subtotal"


    /***** Mettre a jour le prix total *****/    
    totalPriceOfTeddie (priceUnitTeddie * nQuantity);                                                                   //=> On appelle la fonction "totalPriceOfTeddie"


    /***** mettre a jour le nb d'article total *****/
    numberArticles (nQuantity);                                                                                         //=> On appelle la fonction "numberArticles"


    /***** Mettre a jour le localStorage *****/
    updateStorageTeddie (idTeddie,quantity);                                                                            //=> On appelle la fonction "updateStorageTeddie"

    if (quantity === 0 ) {                                                                                              //=> Si la quantité est à zéro
       
       deleteTeddie (idTeddie);                                                                                         //=> On appelle le fonction "deleteTeddie"
    }  
    
};



