/* VARIABLES GLOBALES */
var totalPrice = 0 ;
var totalArticles = 0 ;


/* RECUPÉRATION DE L'ID "BASKET" */
const basket = document.getElementById("basket");





/* RECUPERATION DU LOCAL STORAGE */
let itemsTeddies = JSON.parse(localStorage.getItem("selectTeddies"));


/* MISE EN PLACE D' UNE BOUCLE POUR APPLIQUER TOUTE LES MODIFS A TOUT LES OURSONS */
/* CHARGEMENT DU 1IER et 2IEME TABLEAU DÉS LE CHARGEMENT DU CODE JS */
tablesBasket ()
resumeTab (itemsTeddies)
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
       // trBody.setAttribute("class" , "table table-dark table-striped table-hover");
        tableContent.appendChild(trBody);        

        // => MISE EN PLACE DES IMAGES
        let thImgTeddie = document.createElement ("td");
      //  thImgTeddie.setAttribute("scope" , "row");
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
            quantityOfTeddie.textContent = itemsTeddies[i].quantity;
            tdQuantityTeddie.appendChild(quantityOfTeddie);  
                    
        // => PRIX TOTAL PAR OURSONS 
        let tdSubTotalTeddie = document.createElement ("td");
        trBody.appendChild(tdSubTotalTeddie);
            let subTotalTeddie = document.createElement ("p")
            subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id)
            tdSubTotalTeddie.appendChild(subTotalTeddie)
            var subTotalOfTeddies = subTotal(tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity);

        // => AJOUTER UN OURSON
        let tdAddOrRemove = document.createElement ("td");
        trBody.appendChild(tdAddOrRemove);
            let btnAddTeddie = document.createElement ("btn");
            tdAddOrRemove.appendChild(btnAddTeddie);                   
            btnAddTeddie.setAttribute("class","btn btn-primary btn-sm");                                             
            btnAddTeddie.setAttribute("id","btnAdd");                                    
            btnAddTeddie.setAttribute("type","button");                                                                                                                      
            btnAddTeddie.textContent= "+";  

        // => EVENEMENT SUR LE BOUTON AJOUTER 
        btnAddTeddie.addEventListener('click', function (event){
            event.preventDefault();
            updateTeddieItem(tablesBasket._id,1);
        });

        // => ENLEVER UN OURSON 
        let btnRemoveTeddie = document.createElement ("btn");
        tdAddOrRemove.appendChild(btnRemoveTeddie);                   
            btnRemoveTeddie.setAttribute("class","btn btn-primary btn-sm");                                             
            btnRemoveTeddie.setAttribute("id","btnRemove");                                    
            btnRemoveTeddie.setAttribute("type","button");  
            btnRemoveTeddie.setAttribute("disabled","true");                                                                                                                           
            btnRemoveTeddie.textContent= "-"; 

        // => EVENEMENT SUR LE BOUTON ENLEVER  
        btnRemoveTeddie.addEventListener('click', function (event){
            event.preventDefault();
            updateTeddieItem(tablesBasket._id, -1);  
        });

        //BOUTON SUPPRIMER UN OURSON 
        let tdDelete = document.createElement ("td");
        trBody.appendChild(tdDelete);
            let btnDeleteTeddie = document.createElement ("btn");
            tdDelete.appendChild(btnDeleteTeddie);                   
            btnDeleteTeddie.setAttribute("class","btn btn-danger btn-sm");                                             
            btnDeleteTeddie.setAttribute("id","btnRemove");        
            btnDeleteTeddie.dataset.idteddie = tablesBasket._id   ;                            
            btnDeleteTeddie.setAttribute("type","button");                                                                                                                      
            btnDeleteTeddie.textContent= "X";  

        //EVENEMENT SUR LE BOUTON SUPPRIMER
            btnDeleteTeddie.addEventListener('click', function (event){
                event.preventDefault();
                deleteTeddie (tablesBasket._id)
            });
   
        /* REMPLISSAGE DU 2IEME TABLEAU */    
        // => Calcul nombre total d'articles 
        numberArticles (itemsTeddies[i].quantity);
                    
        // => Calcul prix total des dépenses 
        totalPriceOfTeddie (subTotalOfTeddies)
    
    };

// => FONCTION POUR LE 2 IEME TABLEAU 
    function updateTeddieItem (idTeddie,nQuantity) {
 
        // =>  Ajouter +1 a la quantité de l'ourson sélectionner           
        var quantityElement = document.getElementById("quantity_" + idTeddie);
        var quantity = parseInt(quantityElement.innerHTML)+nQuantity;
        quantityElement.innerHTML = quantity;
    
        // => Appeller la fonction pour mettre a jour chaque ligne de l'ourson 
        var priceUnitTeddie = parseInt(document.getElementById("priceUnit_"+idTeddie).innerHTML)*100;
        subTotal(idTeddie,priceUnitTeddie,quantity)
    
        // => mettre a jour le prix total    
        totalPriceOfTeddie(priceUnitTeddie * nQuantity)
    
        // => mettre a jour le nb d'article total
        numberArticles (nQuantity)

 // =>  Mettre a jour le localStorage
 updateStorageTeddie(idTeddie,quantity)

        if (quantity === 0 ) {
           
           deleteTeddie (idTeddie)
        }  
    
       
    };
};

/* CRÉATION DES ÉLÉMENTS DU 1 IER TABLEAU */

function tablesBasket () {


    const basket = document.getElementById("basket");
   
        let containtTable = document.createElement ("div");
        containtTable.setAttribute("class", "responsive-table-line");
        basket.appendChild (containtTable);

    let tables = ["Miniature","Nom","Prix unitaire"," Quantités","Prix total","Ajouter ou enlever","Supprimer"];
   
            let teddiesTables = document.createElement("table");
            teddiesTables.setAttribute("class","table table-light table-striped table-bordered table-hover table-sm")
            teddiesTables.setAttribute ("id","table_1")
            containtTable.appendChild(teddiesTables);
        
                let tHead = document.createElement("thead");
                tHead.setAttribute ("class" , "thead-dark");
                teddiesTables.appendChild(tHead);

                    let trTables = document.createElement("tr");
                    trTables.setAttribute ("class" ,"trTable")
                    tHead.appendChild(trTables);

                        for (let i = 0;i < tables.length; i++) {
                                
                            let thTables = document.createElement("th")
                            thTables.setAttribute ("class", "thTable")
                            trTables.appendChild(thTables);
                            thTables.textContent = tables[i]; 
                        } 

            let tBody = document.createElement("tbody") 
            tBody.setAttribute("id","tableContent");
            teddiesTables.appendChild(tBody); 
}; 


/* CRÉATION DES ÉLÉMENTS DU 2IEME TABLEAU */ 

function resumeTab (itemsTeddies){
    let resumeCommand = document.createElement ("h3");
    resumeCommand.textContent = "Résumé de votre commande";
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


        let continueShopping = document.createElement ("a");
        continueShopping.setAttribute ("type" , "button");
        continueShopping.setAttribute ("class" , "btn btn-success");
        continueShopping.setAttribute ("id" , "btnContinueShopping");
        continueShopping.setAttribute ("href" , "./index.html")
        continueShopping.textContent = " Continuer vos achats ";
        tableContent.appendChild(continueShopping); 

       

        if (itemsTeddies) {

            let placeOrderBasket = document.createElement ("btn");
            placeOrderBasket.setAttribute ("type" , "button");
            placeOrderBasket.setAttribute("class" , "btn btn-success");
            placeOrderBasket.setAttribute("id","btnOrder");
            placeOrderBasket.textContent = " Commander ";
            tableContent.appendChild(placeOrderBasket);

            btnOrder.addEventListener("click", function (event){
                event.preventDefault();
                if (!document.getElementById("form")){
                    placeOrder();
                };
            });
            

            let deleteLocalStorage = document.createElement ("btn");
            deleteLocalStorage.setAttribute ("type" , "button");
            deleteLocalStorage.setAttribute ("class" , "btn btn-danger");
            deleteLocalStorage.setAttribute ("id" , "btnDeleteLocallStorage");
            deleteLocalStorage.textContent = " Vider le panier ";
            tableContent.appendChild(deleteLocalStorage);
       
            btnDeleteLocallStorage.addEventListener("click", function (event){
                event.preventDefault();
                deleteTeddie(itemsTeddies);
            window.location.reload ()
            });
           
          
        }
 
    };


function placeOrder () {
    
    //=> CONTAINER POUR LE FORMULAIRE
    let formContaint = document.createElement ("form");
    formContaint.setAttribute("method", "POST")
    formContaint.setAttribute("id" , "form")
    basket.appendChild(formContaint)

    let formTitle = document.createElement ("h2");
    formTitle.textContent= "Veuillez remplir ce formulaire pour valider votre commande";
    formContaint.appendChild(formTitle);

    //=> NOM
        let lastNameForm = document.createElement ("label");
        lastNameForm.setAttribute("for", "lastName");
        lastNameForm.textContent = " NOM : "    ;     
        formContaint.appendChild(lastNameForm)
            let inputLastName = document.createElement ("input");
            inputLastName.setAttribute ("type" , "text") ;
            inputLastName.setAttribute ("name" , "nom") ;
            inputLastName.setAttribute ("id" , "lastName") ;
            inputLastName.setAttribute("placeholder" , "nom") ; 
            inputLastName.setAttribute("required" , "true");
            lastNameForm.appendChild(inputLastName);
                let spanLastName = document.createElement ("span");
                spanLastName.setAttribute ("id", "missLastName");
                lastNameForm.appendChild(spanLastName);
                
            
//=> PRENOM
        let firstNameForm = document.createElement ("label");
        firstNameForm.setAttribute("for", "firstName");
        firstNameForm.textContent = " PRENOM : " ;       
        formContaint.appendChild(firstNameForm);
            let inputFirstName = document.createElement ("input");
            inputFirstName.setAttribute ("type" , "text") ;
            inputFirstName.setAttribute ("name" , "firstName") ;
            inputFirstName.setAttribute ("id" , "firstName") ;
            inputFirstName.setAttribute("placeholder" , "prénom") ; 
            inputFirstName.setAttribute("required" , "true");
            firstNameForm.appendChild(inputFirstName);
                let spanFirstName = document.createElement ("span");
                spanFirstName.setAttribute ("id", "missFirstName");
                firstNameForm.appendChild(spanFirstName);

//=> ADRESSE
        let adressForm = document.createElement ("label");
        adressForm.setAttribute("for", "address");
        adressForm.textContent = " ADRESSE : " ;         
        formContaint.appendChild(adressForm);
            let inputAdress = document.createElement ("input");
            inputAdress.setAttribute ("type" , "text") ;
            inputAdress.setAttribute ("name" , "adress") ;
            inputAdress.setAttribute ("id" , "adress") ;
            inputAdress.setAttribute("placeholder" , "adresse") ; 
            inputAdress.setAttribute("required" , "true");
            adressForm.appendChild(inputAdress);
                let spanAdress = document.createElement ("span");
                spanAdress.setAttribute ("id", "missAdress");
                adressForm.appendChild(spanAdress);

//=> VILLLE
        let cityForm = document.createElement ("label");
        cityForm.setAttribute("for", "city");
        cityForm.textContent = " VILLE : "            
        formContaint.appendChild(cityForm);
            let inputCity = document.createElement ("input");
            inputCity.setAttribute ("type" , "text") ;
            inputCity.setAttribute ("name" , "city") ;
            inputCity.setAttribute ("id" , "city") ;
            inputCity.setAttribute("placeholder" , "ville") ; 
            inputCity.setAttribute("required" , "true");
            cityForm.appendChild(inputCity);
                let spanCity = document.createElement ("span");
                spanCity.setAttribute ("id", "missCity");
                cityForm.appendChild(spanCity);

//=> MAIL
        let mailForm = document.createElement ("label");
        mailForm.setAttribute("for", "mail");
        mailForm.textContent = " MAIL :"            
        formContaint.appendChild(mailForm);
            let inputMail = document.createElement ("input");
            inputMail.setAttribute ("type" , "email") ;
            inputMail.setAttribute ("name" , "mail") ;
            inputMail.setAttribute ("id" , "mail") ;
            inputMail.setAttribute("placeholder" , "email") ; 
            inputMail.setAttribute("required" , "true");
            mailForm.appendChild(inputMail);
                let spanMail = document.createElement ("span");
                spanMail.setAttribute ("id", "missMail");
                mailForm.appendChild(spanMail);

//=> VALIDER
        let validForm = document.createElement ("input");
        validForm.setAttribute ("type","submit");
        validForm.setAttribute ("value" , "valider");
        validForm.setAttribute ("id","btnValid");
        formContaint.appendChild(validForm) ;
        btnValid.addEventListener("click",validation);

var formValid = true;   
function validation(){
   
  
    //NOM
    if (lastName.validity.valueMissing  ){
        missLastName.textContent = "nom manquant";
        missLastName.style.color = "red" ;
        formValid = false;

    } else if (!(/^\D+$/.test(lastName.value))) {

        missLastName.textContent = "le nom contient des chiffres";
        missLastName.style.color = "red" ;
        formValid = false
    }
    else {
        missLastName.textContent ="";
      
    }


    //PRENOM
    if (firstName.validity.valueMissing){    
        missFirstName.textContent = "prénom manquant";
        missFirstName.style.color = "red" ;
        formValid = false ;

    } else if (!(/^\D+$/.test(firstName.value))) {

        missFirstName.textContent = "le prénom contient des chiffres";
        missFirstName.style.color = "red" ;
        formValid = false

    } else{

        missFirstName.textContent ="";
     
    } 

    //ADRESSE
    if (adress.validity.valueMissing){
        missAdress.textContent = "Adresse manquant";
        missAdress.style.color = "red" ;
        formValid = false ;


    }else  if (!(/[A-Za-z0-9]/.test(adress.value))) {

        missAdress.textContent = "Vous utiliser des caractère spéciaux";
        missAdress.style.color = "red" ;
        formValid = false;

    } else {
        missAdress.textContent ="";
       
    }
   
    //VILLE
    if (city.validity.valueMissing){ 
        missCity.textContent = "Ville manquante";
        missCity.style.color = "red" ;
        formValid = false;

    }else  if (!(/[A-Za-z-']/.test(city.value))) {

        missCity.textContent = "la ville contient des chiffres ou des caractères non autorisés";
        missCity.style.color = "red" ;
        formValid = false;

    }else { missCity.textContent ="";
       

    }

    //EMAIL
    if (mail.validity.valueMissing){
        missMail.textContent = "Email manquant";
        missMail.style.color = "red" ;
        formValid = false;

    }else if (!/.+@.+\..+/.test(mail.value)){
        
        //[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})//
        missMail.textContent = "Format email incorect";
        missMail.style.color = "red" ;
        formValid = false;

    }else {   
        missMail.textContent ="";
        
    };
    
 
btnValid.addEventListener ("click" , function (event){
    event.preventDefault ()

    if (formValid = true){
      
         
         const contact = {
             lastName: document.getElementById("lastName").value,
             firstName: document.getElementById("firstName").value,
             address: document.getElementById("adress").value,
             city: document.getElementById("city").value,
             email: document.getElementById("mail").value
         }
         let panier = []
         for (let index = 0;index < itemsTeddies.length; index++) {
             panier.push(itemsTeddies[index].id)  
         }
         
         var order= {
             contact: contact,
             products: panier 
         };
 
         postOfTeddie (order);
         window.location = "./confirm.html";                      
     
     };
    
console.log(formValid)

});

};  

}


   
    









