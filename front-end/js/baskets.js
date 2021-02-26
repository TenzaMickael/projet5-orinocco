
var totalPrice = 0 ;
var totalArticles = 0 ;

const basket = document.getElementById("basket");

tablesBasket ()

let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));

for (let i = 0;i < itemsTeddies.length; i++) {

    

    var id =  itemsTeddies[i].id 

    var request = new XMLHttpRequest();                                         

    request.onreadystatechange = function () {                                  

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

            const response = JSON.parse (this.responseText)                 
            tablesItems(response);  
                          
        }; 
    }; 

    request.open ("GET" , "http://localhost:3000/api/teddies/"+id);             
    request.send();
       
        
    
        function tablesItems (tablesBasket)  {

            const secondTables = document.getElementById("secondTables");

            let trBody = document.createElement("tr");
            trBody.setAttribute("class" , "table-dark table-striped table-hover");
            secondTables.appendChild(trBody);

            let thImgTeddie = document.createElement ("th");
            thImgTeddie.setAttribute("scope" , "row");
            trBody.appendChild(thImgTeddie);
                let imgItemTeddie = document.createElement("img");
                imgItemTeddie.setAttribute ("class" , "image__teddies__product"); 
                imgItemTeddie.setAttribute ("src" , tablesBasket.imageUrl);
                imgItemTeddie.setAttribute("alt","image d'un ours en peluche");
                thImgTeddie.appendChild(imgItemTeddie);

            let tdNameTeddie = document.createElement ("td");
            trBody.appendChild(tdNameTeddie);
                let nameItemTeddie = document.createElement("p");
                nameItemTeddie.textContent = tablesBasket.name;
                tdNameTeddie.appendChild(nameItemTeddie);

            let tdPriceUnitTeddie = document.createElement ("td");
            trBody.appendChild(tdPriceUnitTeddie);
                let priceUnitTeddie = document.createElement ("p");
                priceUnitTeddie.setAttribute ("id" , "priceUnit_"+ tablesBasket._id)
                priceUnitTeddie.textContent = tablesBasket.price/100 + " €",
                tdPriceUnitTeddie.appendChild(priceUnitTeddie);

            let tdQuantityTeddie = document.createElement ("td");
            trBody.appendChild(tdQuantityTeddie);
                let quantityOfTeddie = document.createElement ("p");
                quantityOfTeddie.setAttribute("id" , "quantity_"+ tablesBasket._id)
                quantityOfTeddie.textContent = "Quantités :" + itemsTeddies[i].quantity;
                tdQuantityTeddie.appendChild(quantityOfTeddie);  
                
               
             
            let tdSubTotalTeddie = document.createElement ("td");
            trBody.appendChild (tdSubTotalTeddie);
                let subTotalTeddie = document.createElement ("p")
                subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id)
                tdSubTotalTeddie.appendChild(subTotalTeddie)
                subTotal(tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity)
        };
};

    let resumeCommand = document.createElement ("h3");
    resumeCommand.textContent = "Résumé de vos commandes";
    basket.appendChild(resumeCommand);

    let secondTables = document.createElement ("table");
    secondTables.setAttribute("class" , "table table-bordered border-dark");
    basket.appendChild(secondTables);

    let tHeadSecondTab = document.createElement("tbody");
    secondTables.appendChild(tHeadSecondTab);

    let trNumberItemsTeddie = document.createElement ("tr");
    secondTables.appendChild(trNumberItemsTeddie);

    let numberItemTeddie = document.createElement ("p");
    numberItemTeddie.setAttribute ("id" , "numberItem_"+ tablesBasket._id)
    //numberItemTeddie.textContent = "essais";
    trNumberItemsTeddie.appendChild (numberItemTeddie);
    numberArticles(tablesBasket._id,itemsTeddies.quantity)



function subTotal (idTeddie,priceUnitTeddie,quantityOfTeddie){
    var subTotalTeddie = parseInt(priceUnitTeddie * quantityOfTeddie) 
   var subTotalElement = document.getElementById("subTotal_" + idTeddie);
   subTotalElement.textContent = subTotalTeddie /100 + "€";
}


function numberArticles (idTeddie,quantityOfTeddie){
    var numberItemsTeddie = parseInt(quantityOfTeddie * idTeddie)
    var numberItemsElement = document.getElementById ("numberItem_" + idTeddie);
    numberItemsElement.textContent = numberItemsTeddie;
}





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
        tBody.setAttribute("id","secondTables");
        teddiesTables.appendChild(tBody);
 
}; 
  

 
//1) Aller chercher le sessionStorage
//2) Faire une boucle pour récupérer les ids
    //3) Faire une requete pour récupérer les oursons par rapport à leur ID => avec l'URL 
    //4) Retranscrire les infos en injectant dans le code HTML avec les paramètres qui y corresponde 

//faire une fonction avec en parametre la réponse de la requete 

//la fonction sert à injecter le code html avec des cartes pour chaque oursons pour la page 


// Pour quantité total et total price mettre in id pour pouvoir gerer l'ourson quand on ajoute ou on supprime.

// ex : quantity-id de l'ourson => le changer avec inerHtml  








   

    

    //Import du sessionStorage







