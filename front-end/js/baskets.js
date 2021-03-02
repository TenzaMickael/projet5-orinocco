
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

            //IMAGES
            let thImgTeddie = document.createElement ("th");
            thImgTeddie.setAttribute("scope" , "row");
            trBody.appendChild(thImgTeddie);
                let imgItemTeddie = document.createElement("img");
                imgItemTeddie.setAttribute ("class" , "image__teddies__product"); 
                imgItemTeddie.setAttribute ("src" , tablesBasket.imageUrl);
                imgItemTeddie.setAttribute("alt","image d'un ours en peluche");
                thImgTeddie.appendChild(imgItemTeddie);

            //NOM
            let tdNameTeddie = document.createElement ("td");
            trBody.appendChild(tdNameTeddie);
                let nameItemTeddie = document.createElement("p");
                nameItemTeddie.textContent = tablesBasket.name;
                tdNameTeddie.appendChild(nameItemTeddie);

            //PRIX UNITAIRE
            let tdPriceUnitTeddie = document.createElement ("td");
            trBody.appendChild(tdPriceUnitTeddie);
                let priceUnitTeddie = document.createElement ("p");
                priceUnitTeddie.setAttribute ("id" , "priceUnit_"+ tablesBasket._id)
                priceUnitTeddie.textContent = tablesBasket.price/100 + " €",
                tdPriceUnitTeddie.appendChild(priceUnitTeddie);

            //QUANTITÉ DE TEDDIE
            let tdQuantityTeddie = document.createElement ("td");
            trBody.appendChild(tdQuantityTeddie);
                let quantityOfTeddie = document.createElement ("p");
                quantityOfTeddie.setAttribute("id" , "quantity_"+ tablesBasket._id)
                quantityOfTeddie.textContent = "Quantités :" + itemsTeddies[i].quantity;
                tdQuantityTeddie.appendChild(quantityOfTeddie);  
               

            //PRIS TOTAL PAR OURSONS 
            let tdSubTotalTeddie = document.createElement ("td");
            trBody.appendChild (tdSubTotalTeddie);

                let subTotalTeddie = document.createElement ("p")
                subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id)
                tdSubTotalTeddie.appendChild(subTotalTeddie)
                subTotal(tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity)
                

            var numberItem = document.getElementById("numberItem");
            numberArticles (itemsTeddies[i].quantity);
            numberItem.textContent = "Nombre d'articles: " + totalArticles;
          
         var priceOfTeddie = document.getElementById("priceOfTeddies");
        totalPriceOfTeddie(subTotalTeddie);
        priceOfTeddie.textContent = "Prix total à payer : " + totalPrice + "€" ; 
console.log(totalPrice)
           
        
        };
};

    let resumeCommand = document.createElement ("h3");
    resumeCommand.textContent = "Résumé de vos commandes";
    basket.appendChild(resumeCommand);


    let secondTables = document.createElement ("table");
    secondTables.setAttribute("class" , "table table-bordered border-red");
    basket.appendChild(secondTables);
   

    //let tHeadSecondTab = document.createElement("tbody");
    // secondTables.appendChild(tHeadSecondTab);

     let trNumberItemsTeddie = document.createElement ("tr");
     secondTables.appendChild(trNumberItemsTeddie);

     let numberItemTeddie = document.createElement ("p");
     numberItemTeddie.setAttribute ("id" , "numberItem");
     trNumberItemsTeddie.appendChild (numberItemTeddie);

     let trTotalPriceTeddie = document.createElement ("tr");
     secondTables.appendChild(trTotalPriceTeddie);

     let totalPriceTeddies= document.createElement ("p");
     totalPriceTeddies.setAttribute ("id" , "priceOfTeddies");
     trTotalPriceTeddie.appendChild(totalPriceTeddies)


function subTotal (idTeddie,priceUnitTeddie,quantityOfTeddie){
    var subTotalTeddie = parseInt(priceUnitTeddie * quantityOfTeddie) ;
    var subTotalElement = document.getElementById("subTotal_" + idTeddie);
    subTotalElement.textContent = subTotalTeddie /100 + "€";
}


function  numberArticles (quantityOfTeddie) {
    totalArticles = totalArticles + parseInt(quantityOfTeddie);
}

function totalPriceOfTeddie (subTotalTeddie) {
    
    totalPrice = totalPrice + parseInt(subTotalTeddie+subTotalTeddie);
   
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










   

    









