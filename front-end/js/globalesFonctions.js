// => prix total / oursons
function subTotal (idTeddie,priceUnitTeddie,quantityOfTeddie){
    var  subTotalTeddie = parseInt(priceUnitTeddie * quantityOfTeddie) ;
    var  subTotalElement = document.getElementById("subTotal_" + idTeddie);
    subTotalElement.textContent = subTotalTeddie /100 + "€"; 
    return subTotalTeddie ;    
    
};


// => Nombre totale d'articles
function  numberArticles (quantityOfTeddie) {
    totalArticles = totalArticles + parseInt(quantityOfTeddie);
    var numberItemElement = document.getElementById("numberItem");
    numberItemElement.textContent = "Votre panier contient : " + totalArticles + " articles ";
};


// => Prix total commande 
function totalPriceOfTeddie (subTotalTeddie) {
    totalPrice = totalPrice + parseInt(subTotalTeddie);
    var priceOfTeddieElement = document.getElementById("priceOfTeddies");
    priceOfTeddieElement.textContent = "Le montant total de votre commande s'élève à : " + totalPrice/100 + "€" ;  
   
};



// => Supprimer un ourson 
function deleteTeddie (idTeddie){
    let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));
    let index = findIndexTeddieStorage (idTeddie,itemsTeddies)
    itemsTeddies.splice(index,1);
    console.log(itemsTeddies)

    if (itemsTeddies.length == 0 ) {
       localStorage.removeItem("selectTeddies");
    } else {
    
    localStorage.setItem("selectTeddies" , JSON.stringify (itemsTeddies));
   
    }
     window.location.reload ()
}

// Fonction qui permet de mettre à jour le localStorage
function updateStorageTeddie (idTeddie,quantity) {
    let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));
    let index = findIndexTeddieStorage (idTeddie,itemsTeddies)
    itemsTeddies[index].quantity = quantity;
    localStorage.setItem("selectTeddies" , JSON.stringify (itemsTeddies));
    
}

function findIndexTeddieStorage(idTeddie,itemsTeddies){
    
    for (let index = 0;index < itemsTeddies.length; index++) {
        let id = itemsTeddies[index].id ;
        if (id === idTeddie) {
          return  index       
        }
    }
};