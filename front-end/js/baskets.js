/* VARIABLES GLOBALES */
var totalPrice = 0 ;
var totalArticles = 0 ;

/* RECUPÉRATION DE L'ID "BASKET" */
const basket = document.getElementById("basket");

/* CHARGEMENT DU 1IER et 2IEME TABLEAU DÉS LE CHARGEMENT DU CODE JS */
tablesBasket ()
resumeTab ()

/* RECUPERATION DU LOCAL STORAGE */
let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));

/* MISE EN PLACE D' UNE BOUCLE POUR APPLIQUER TOUTE LES MODIFS A TOUT LES OURSONS */
for (let i = 0;i < itemsTeddies.length; i++) {

    
/* CREATION D'UNE VARIABLE POUR L'INCORPORER À L'URL DE LA REQUETE */ 
    var id =  itemsTeddies[i].id 

/* REQUETE XMLHTTPREQUEST */
    var request = new XMLHttpRequest();                                         

    request.onreadystatechange = function () {                                  

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

            const response = JSON.parse (this.responseText)                 
            tablesItems(response);  
                          
        }; 
    }; 

    request.open ("GET" , "http://localhost:3000/api/teddies/"+id);             
    request.send();

/* FONCTON QUI PERMET D'INCORPORER LES ÉLÉMENTS DANS LE  PREMIER TABLEAU */    
        function tablesItems (tablesBasket)  {

            const tableContent = document.getElementById("tableContent");

            let trBody = document.createElement("tr");
            trBody.setAttribute("class" , "table-dark table-striped table-hover");
            tableContent.appendChild(trBody);

// => MISE EN PLACE DES IMAGES
            let thImgTeddie = document.createElement ("th");
            thImgTeddie.setAttribute("scope" , "row");
            trBody.appendChild(thImgTeddie);
                let imgItemTeddie = document.createElement("img");
                imgItemTeddie.setAttribute ("class" , "image__teddies__product"); 
                imgItemTeddie.setAttribute ("src" , tablesBasket.imageUrl);
                imgItemTeddie.setAttribute("alt","image d'un ours en peluche");
                thImgTeddie.appendChild(imgItemTeddie);

// => MISE EN PLACE DES NOMS
            let tdNameTeddie = document.createElement ("td");
            trBody.appendChild(tdNameTeddie);
                let nameItemTeddie = document.createElement("p");
                nameItemTeddie.textContent = tablesBasket.name;
                tdNameTeddie.appendChild(nameItemTeddie);

// => MISE EN PLACE DES PRIX UNITAIRE
            let tdPriceUnitTeddie = document.createElement ("td");
            trBody.appendChild(tdPriceUnitTeddie);
                let priceUnitTeddie = document.createElement ("p");
                priceUnitTeddie.setAttribute ("id" , "priceUnit_"+ tablesBasket._id)
                priceUnitTeddie.textContent = tablesBasket.price/100 + " €",
                tdPriceUnitTeddie.appendChild(priceUnitTeddie);

// => MISE EN PLACE DES QUANTITÉS DE TEDDIE
            let tdQuantityTeddie = document.createElement ("td");
            trBody.appendChild(tdQuantityTeddie);
                let quantityOfTeddie = document.createElement ("p");
                quantityOfTeddie.setAttribute("id" , "quantity_"+ tablesBasket._id)
                quantityOfTeddie.textContent = "Quantités :" + itemsTeddies[i].quantity;
                tdQuantityTeddie.appendChild(quantityOfTeddie);  

// => PRIX TOTAL PAR OURSONS 
            let tdSubTotalTeddie = document.createElement ("td");
            trBody.appendChild(tdSubTotalTeddie);
                let subTotalTeddie = document.createElement ("p")
                subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id)
                tdSubTotalTeddie.appendChild(subTotalTeddie)
                var subTotalOfTeddies = subTotal(tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity);


// => AJOUTER OU SUPPRIMER UN OURSON
    let tdAddOrRemove = document.createElement ("td");
    trBody.appendChild(tdAddOrRemove);

   let btnAddTeddie = document.createElement ("btn");
   tdAddOrRemove.appendChild(btnAddTeddie);                   
   btnAddTeddie.setAttribute("class","btn btn-primary btn-sm");                                             
   btnAddTeddie.setAttribute("id","btnAdd");                                    
   btnAddTeddie.setAttribute("type","button");                                                                                                                           
   btnAddTeddie.textContent=" + ";    
   addTeddieItem(tablesBasket._id);

   let btnRemoveTeddie = document.createElement ("btn");
   tdAddOrRemove.appendChild(btnRemoveTeddie);                   
   btnRemoveTeddie.setAttribute("class","btn btn-primary btn-sm");                                             
   btnRemoveTeddie.setAttribute("id","btnRemove");                                    
   btnRemoveTeddie.setAttribute("type","button");                                                                                                                              
   btnRemoveTeddie.textContent=" - "; 

/* REMPLISSAGE DU 2IEME TABLEAU */    

// => Calcul nombre total d'articles 
                numberArticles (itemsTeddies[i].quantity);
    
// => Calcul prix total des dépenses 
                totalPriceOfTeddie (subTotalOfTeddies)
  
        };
};

/* CRÉATION DES ÉLÉMENTS DU 2IEME TABLEAU */ 
function resumeTab (){
    let resumeCommand = document.createElement ("h3");
    resumeCommand.textContent = "Résumé de vos commandes";
    basket.appendChild(resumeCommand);

    let tableContent = document.createElement ("table");
    tableContent.setAttribute("class" , "table table-bordered border-red");
    basket.appendChild(tableContent);
   
    let tHeadSecondTab = document.createElement("tbody");
    tableContent.appendChild(tHeadSecondTab);

    let trNumberItemsTeddie = document.createElement ("tr");
    tableContent.appendChild(trNumberItemsTeddie);

    let numberItemTeddie = document.createElement ("p");
    numberItemTeddie.setAttribute ("id" , "numberItem");
    trNumberItemsTeddie.appendChild (numberItemTeddie);

    let trTotalPriceTeddie = document.createElement ("tr");
    tableContent.appendChild(trTotalPriceTeddie);

    let totalPriceTeddies= document.createElement ("p");
    totalPriceTeddies.setAttribute ("id" , "priceOfTeddies");
    trTotalPriceTeddie.appendChild(totalPriceTeddies)
}

/* CRÉATION DES ÉLÉMENTS DU 1IER TABLEAU */
function tablesBasket () {

    let tables = [" Miniature " , " Nom " , " Prix unitaire " , " Quantités " ," Prix total " , " Ajouter ou supprimer " ] ;

    const basket = document.getElementById("basket");

    let productBasket = document.createElement("main");
    productBasket.setAttribute ("class" , "cards__item__thumb_1");      
    basket.appendChild(productBasket);

    let teddiesTables = document.createElement("table");
    teddiesTables.setAttribute("class" , "table table-bordered border-dark");
    productBasket.appendChild(teddiesTables);
        
    let tHead = document.createElement("thead");
    teddiesTables.appendChild(tHead);

    let trTables = document.createElement("tr");
    trTables.setAttribute ("class", "table-primary")
    tHead.appendChild(trTables);

    for (let i = 0;i < tables.length; i++) {
            
        let thTables = document.createElement("th")
        thTables.setAttribute("scope", "col");  
        thTables.setAttribute ("class", "table-primary")
        trTables.appendChild(thTables);
        thTables.textContent = tables[i]; 
    }   
    let tBody = document.createElement("tbody") 
        tBody.setAttribute("id","tableContent");
        teddiesTables.appendChild(tBody); 
}; 



/* FONCTIONS GLOBALES */

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

// => Ajouter un teddie
function addTeddieItem (btnAdd,quantityOfTeddie) {

    var btnAdd = document.getElementById("btnAdd")
    //var quantity= document.getElementById("quantity_") ;
    


 btnAdd.addEventListener('click', function (event){
        event.preventDefault();   
 
       console.log(quantityOfTeddie);
       
    });
};




   

    









