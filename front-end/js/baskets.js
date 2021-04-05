/* Variables globales */

var totalPrice = 0;                                                                                                 //=> Variable qui va contenir le prix total 
var totalArticles = 0;                                                                                              //=> Variable qui va contenir le nombre total d'articles 


/* Récupération de l' ID "basket" */

const basket = document.getElementById ("basket");                                                                  //=> Récupération de l'ID "basket"


/* Récupération du localStorage */

let itemsTeddies = JSON.parse(localStorage.getItem ("selectTeddies"));                                              //=> Récupération du localStorage


/* Chargement des 2 tableaux de la page */

tablesBasket ();                                                                                                    //=> Chargement des éléments du 1ier tableau
resumeTab (itemsTeddies);                                                                                           //=> Chargement des éléments du 2ieme tableau


/* Boucle sur le localStorage */

for (let i = 0;i < itemsTeddies.length; i++) {                                                                      //=> Boucle sur le locaStorage + incrémentation 

    
/* Création d'une variable qui contient les ID des oursons */ 

    var id =  itemsTeddies[i].id;                                                                                   //=> Variable qui contient les "ID" des oursons 


/* Requete XMLHttpReques */

    var request = new XMLHttpRequest();                                                                             //=> Lance une requete XMLHttRequest                                

    request.onreadystatechange = function () {                                                                      //=>  Au changement de onreadystatechange                         

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {                                         //=>  Si son changement est égal à une requete réussis et un status de 200 :

            const response = JSON.parse (this.responseText)                                                         //=>  Créer une constante que l'on parse dans un JSON en string 
            tablesItems(response);                                                                                  //=> tablesItems c'est le nom de la futur fonction 
        }; 
    }; 

    request.open ("GET" , "http://localhost:3000/api/teddies/"+id);                                                 //=>  On lance la requete sur cette url     
    request.send();                                                                                                 //=> On donne l'ordre de lance la requete

    
/* Remplissage du 1ier tableau  */ 

    function tablesItems (tablesBasket)  {                                                                          //=> Eléments du premier tableau

        const tableContent = document.getElementById ("tableContent");                                              //=> On récupère l' ID "tableContent"
     
        let trBody = document.createElement("tr");                                                                  //=> Création d'une balise <tr>
        tableContent.appendChild(trBody);                                                                           //=> On lui déclare son parent

            /***** Image de l'ourson *****/
            let imgItemTeddie = document.createElement("img");                                                      //=> Création d'une balise <img>
            imgItemTeddie.setAttribute ("class" , "image__teddies__product");                                       //=> On lui attribut une classe
            imgItemTeddie.setAttribute ("src" , tablesBasket.imageUrl);                                             //=> Chemin de l'image
            imgItemTeddie.setAttribute ("alt","image d'un ours en peluche");                                        //=> On lui attribut une balise "alt"
            trBody.appendChild (imgItemTeddie);                                                                     //=> On lui déclare son parent


            /***** Nom de l'ourson *****/
            let nameItemTeddie = document.createElement ("p");                                                      //=> Création d'une balise <p>
            nameItemTeddie.setAttribute ("class" , "name__teddies__product");                                       //=> On lui attribut une classe
            nameItemTeddie.textContent = "Nom : " + tablesBasket.name;                                              //=> On lui attribut un contenu
            trBody.appendChild(nameItemTeddie);                                                                     //=> On lui déclare son parent


            /***** Prix unitaire de l'ourson *****/
            let priceUnitTeddie = document.createElement ("p");                                                     //=> Création d'une balise <p>
            priceUnitTeddie.setAttribute ("class" , "priceUnit__teddies__product");                                 //=> On lui attribut une classe
            priceUnitTeddie.setAttribute ("id" , "priceUnit_"+ tablesBasket._id);                                   //=> On lui attribut un <ID>
            priceUnitTeddie.textContent = "Prix unitaire : " + tablesBasket.price/100 + " €";                       //=> On lui attribut un contenu
            trBody.appendChild (priceUnitTeddie);                                                                   //=> On lui déclare son parent


            /***** Cellule <td> + quantité d'oursons  *****/
            let tdQuantityTeddie = document.createElement ("td");                                                   //=> Création d'une balise <td>
            trBody.appendChild (tdQuantityTeddie);                                                                  //=> On lui déclare son parent
                let quantityOfTeddie = document.createElement ("p");                                                //=> Création d'une balise <p>
                quantityOfTeddie.setAttribute ("id" , "quantity_"+ tablesBasket._id);                               //=> On lui attribut un <ID> 
                quantityOfTeddie.textContent = itemsTeddies[i].quantity;                                            //=> On lui attribut un contenu
                tdQuantityTeddie.appendChild (quantityOfTeddie);                                                    //=> On lui déclare son parent
                    

            /***** Cellule <td> + prix sous total de l'ourson *****/
            let tdSubTotalTeddie = document.createElement ("td");                                                   //=> Création d'une balise <td>
            trBody.appendChild (tdSubTotalTeddie);                                                                  //=> On lui déclare son parent
                let subTotalTeddie = document.createElement ("p");                                                  //=> Création d'une balise <p>
                subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id);                                 //=> On lui attribut un <ID>
                tdSubTotalTeddie.appendChild (subTotalTeddie);                                                      //=> On lui déclare son parent
                var subTotalOfTeddies = subTotal (tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity);    //=> On lui attribut un contenu


            /***** Cellule <td> + bouton ajouter ourson *****/
            let tdAddOrRemove = document.createElement ("td");                                                      //=> Création d'une balise <td>
            trBody.appendChild (tdAddOrRemove);                                                                     //=> On lui déclare son parent
                let btnAddTeddie = document.createElement ("btn");                                                  //=> Création d'une balise <btn>
                tdAddOrRemove.appendChild (btnAddTeddie);                                                           //=> On lui déclare son parent
                btnAddTeddie.setAttribute ("class","btn btn-primary btn-sm");                                       //=> On lui attribut une classe                                          
                btnAddTeddie.setAttribute ("id","btnAdd");                                                          //=> On lui attribut un <ID>                
                btnAddTeddie.setAttribute ("type","button");                                                        //=> On définis son type                                                                                                    
                btnAddTeddie.textContent= "+";                                                                      //=> On lui attribut un contenu 


/* Evènement sur le bouton ajouter un ourson */ 
            btnAddTeddie.addEventListener ('click', function (event) {                                              //=> Action si un click se produit sur le bouton "+"
                event.preventDefault();                                                                             //=> On désactive le comportement par défaut
                updateTeddieItem (tablesBasket._id,1);                                                              //=> On ajoute +1 à l'ourson
            });


            /***** Bouton enlever un ourson *****/
            let btnRemoveTeddie = document.createElement ("btn");                                                   //=> Création d'une balise <btn>
            tdAddOrRemove.appendChild (btnRemoveTeddie);                                                            //=> On lui déclare son parent  
                btnRemoveTeddie.setAttribute ("class","btn btn-primary btn-sm");                                    //=> On lui attribut une classe                                        
                btnRemoveTeddie.setAttribute ("id","btnRemove");                                                    //=> On lui attribut un <ID>                  
                btnRemoveTeddie.setAttribute ("type","button");                                                     //=> On définit son type
                btnRemoveTeddie.setAttribute ("disabled","true");                                                   //=> On le met en désactivé par défaut                                                                                                               
                btnRemoveTeddie.textContent= "-";                                                                   //=> On lui attribut un contenu


/* Evènement sur le bouton enlever un ourson */
            btnRemoveTeddie.addEventListener ('click', function (event) {                                           //=> Action si un click se produit sur le bouton "-" 
                event.preventDefault();                                                                             //=> On désactive le comportement par défaut
                updateTeddieItem (tablesBasket._id, -1);                                                            //=> On enlève -1 à l'ourson
            });


            /***** Cellule <td> + bouton supprimer la ligne de l'ourson *****/
            let tdDelete = document.createElement ("td");                                                           //=> Création d'une balise <td>
            trBody.appendChild(tdDelete);                                                                           //=> On lui déclare son parent 
                let btnDeleteTeddie = document.createElement ("btn");                                               //=> Création d'une balise <btn>                 
                btnDeleteTeddie.setAttribute("class","btn btn-danger btn-sm");                                      //=> On lui attribut une classe                                          
                btnDeleteTeddie.setAttribute("id","btnRemove");                                                     //=> On lui attribut un <ID> 
                tdDelete.appendChild(btnDeleteTeddie);                                                              //=> On lui déclare son parent
                btnDeleteTeddie.dataset.idteddie = tablesBasket._id;                                                //=> On lui attribut un contenu                                                                                                   
                btnDeleteTeddie.textContent= "X";                                                                   //=> On lui attribut un contenu


/* Evènement sur le bouton supprimer la ligne de l'ourson */
            btnDeleteTeddie.addEventListener('click', function (event) {                                            //=> Action si un click se produit sur le bouton "X"
                event.preventDefault();                                                                             //=> On désactive le comportement par défaut
                deleteTeddie (tablesBasket._id);                                                                    //=> On supprime la quantité de l'ourson sélectionné
            });
   

/* Remplissage du 2ieme tableau */   

            /***** Calcul nombre total d'articles *****/
            numberArticles (itemsTeddies[i].quantity);                                                              //=> Affiche le nombre total d'articles
                      
            
            /***** Calcul prix total des dépenses *****/ 
            totalPriceOfTeddie (subTotalOfTeddies);                                                                 //=> Affiche le prix total 
    
    };


/* Fonctions pour le 2ième tableau */

    function updateTeddieItem (idTeddie,nQuantity) {                                                                //=> Fonction qui sert a afficher les infos dans le deuxième tableau
 
        /***** Ajouter +1 a la quantité de l'ourson sélectionner *****/           
        var quantityElement = document.getElementById ("quantity_" + idTeddie);                                     //=> On récupère l' ID "quantity" + "idTeddie"
        var quantity = parseInt (quantityElement.innerHTML)+nQuantity;                                              //=> On transforme "quantityElement" + nQuantity
        quantityElement.innerHTML = quantity;                                                                       //=> On lui attribut le contenu
    

        /***** Appeller la fonction pour mettre à jours chaque lignes de l'ourson *****/
        var priceUnitTeddie = parseInt (document.getElementById ("priceUnit_"+idTeddie) .innerHTML)*100;            //=> On transforme l'ID "priceUnit" + "idTeddie" et on le divise par 100
        subTotal (idTeddie,priceUnitTeddie,quantity);                                                               //=> On appelle la fonction "subtotal"
    

        /***** Mettre a jour le prix total *****/    
        totalPriceOfTeddie (priceUnitTeddie * nQuantity);                                                           //=> On appelle la fonction "totalPriceOfTeddie"
    

        /***** mettre a jour le nb d'article total *****/
        numberArticles (nQuantity);                                                                                 //=> On appelle la fonction "numberArticles"


        /***** Mettre a jour le localStorage *****/
        updateStorageTeddie (idTeddie,quantity);                                                                    //=> On appelle la fonction "updateStorageTeddie"

        if (quantity === 0 ) {                                                                                      //=> Si la quantité est à zéro
           
           deleteTeddie (idTeddie);                                                                                 //=> On appelle le fonction "deleteTeddie"
        }  
    };
};

/* Création des éléments du 1ier tableau */

function tablesBasket () {                                                                                          //=> Structure du 1ier tableau


    const basket = document.getElementById ("basket"); //=>
   
        let containtTable = document.createElement ("div");//=>
        containtTable.setAttribute ("class", "responsive-table-line");//=>
        basket.appendChild (containtTable);//=>

    let tables = ["Oursons", "Quantités","Prix total","Ajouter / enlever","Supprimer"];//=>
   
            let teddiesTables = document.createElement ("table");//=>
            teddiesTables.setAttribute ("class","table table-light table-striped table-bordered table-hover table-sm");    //=>
            teddiesTables.setAttribute ("id","table_1");//=>
            containtTable.appendChild (teddiesTables);//=>
        
                let tHead = document.createElement ("thead");//=>
                tHead.setAttribute ("class" , "thead-dark");//=>
                teddiesTables.appendChild (tHead);//=>

                    let trTables = document.createElement ("tr");//=>
                    trTables.setAttribute ("class" ,"trTable");//=>
                    tHead.appendChild (trTables);//=>

                        for (let i = 0;i < tables.length; i++) {//=>
                                
                            let thTables = document.createElement ("th"); //=>
                            thTables.setAttribute ("class", "thTable");//=>
                            trTables.appendChild (thTables);//=>
                            thTables.textContent = tables[i]; //=>
                        } 

            let tBody = document.createElement ("tbody");//=>
            tBody.setAttribute ("id","tableContent");//=>
            teddiesTables.appendChild (tBody); //=>
}; 


/* CRÉATION DES ÉLÉMENTS DU 2IEME TABLEAU */ 

function resumeTab (itemsTeddies) {//=>
   
    let tableContent = document.createElement ("table");//=>
    tableContent.setAttribute ("class" , "table table-light table-striped table-bordered table-hover table-sm");//=>
    tableContent.setAttribute ("id" , "table_2");//=>
    basket.appendChild (tableContent);//=>

    let tHeadSecondTab = document.createElement ("tbody");//=>
    tableContent.appendChild (tHeadSecondTab);//=>

    let trNumberItemsTeddie = document.createElement ("tr");//=>
    tableContent.appendChild (trNumberItemsTeddie);//=>
        let numberItemTeddie = document.createElement ("p");//=>
        numberItemTeddie.setAttribute ("id" , "numberItem");//=>
        trNumberItemsTeddie.appendChild (numberItemTeddie);//=>

    let trTotalPriceTeddie = document.createElement ("tr");//=>
    tableContent.appendChild (trTotalPriceTeddie);//=>
        let totalPriceTeddies= document.createElement ("p");//=>
        totalPriceTeddies.setAttribute ("id" , "priceOfTeddies");//=>
        trTotalPriceTeddie.appendChild (totalPriceTeddies);//=>


        let continueShopping = document.createElement ("a");//=>
        continueShopping.setAttribute ("type" , "button");//=>
        continueShopping.setAttribute ("class" , "btn btn-success");//=>
        continueShopping.setAttribute ("id" , "btnContinueShopping");//=>
        continueShopping.setAttribute ("href" , "./index.html");//=>
        continueShopping.textContent = "Continuer vos achats ";//=>
        tableContent.appendChild(continueShopping); //=>

       

        if (itemsTeddies) {//=>

            let placeOrderBasket = document.createElement ("btn");//=>
            placeOrderBasket.setAttribute ("type" , "button");//=>
            placeOrderBasket.setAttribute ("class" , "btn btn-success");//=>
            placeOrderBasket.setAttribute ("id","btnOrder");//=>
            placeOrderBasket.textContent = " Commander ";//=>
            tableContent.appendChild (placeOrderBasket);//=>

            btnOrder.addEventListener("click", function (event) {//=>
                event.preventDefault();//=>
                if (!document.getElementById("form")) {//=>
                    placeOrder();//=>
                };
            });
            

            let deleteLocalStorage = document.createElement ("btn");//=>
            deleteLocalStorage.setAttribute ("type" , "button");//=>
            deleteLocalStorage.setAttribute ("class" , "btn btn-danger");//=>
            deleteLocalStorage.setAttribute ("id" , "btnDeleteLocallStorage");//=>
            deleteLocalStorage.textContent = " Vider le panier ";//=>
            tableContent.appendChild (deleteLocalStorage);//=>
       
            btnDeleteLocallStorage.addEventListener("click", function (event) {//=>
                event.preventDefault();//=>
                deleteTeddie (itemsTeddies);//=>
            window.location.reload ();//=>
            });
           
          
        }
 
    };


function placeOrder () {//=>
    
    //=> CONTAINER POUR LE FORMULAIRE
    let formContaint = document.createElement ("form");//=>
    formContaint.setAttribute ("id" , "form");//=>
    basket.appendChild (formContaint);//=>

    let formTitle = document.createElement ("h2");//=>
    formTitle.textContent= "Veuillez remplir ce formulaire pour valider votre commande";//=>
    formContaint.appendChild (formTitle);//=>

    //=> NOM
        let lastNameForm = document.createElement ("label");//=>
        lastNameForm.setAttribute ("for", "lastName");//=>
        lastNameForm.textContent = " Nom : ";     //=>
        formContaint.appendChild (lastNameForm);//=>
            let inputLastName = document.createElement ("input");//=>
            inputLastName.setAttribute ("type" , "text");//=>
            inputLastName.setAttribute ("name" , "nom");//=>
            inputLastName.setAttribute ("id" , "lastName") ;//=>
            inputLastName.setAttribute ("placeholder" , "nom"); //=>
            inputLastName.setAttribute ("required" , "true");//=>
            lastNameForm.appendChild (inputLastName);//=>
                let spanLastName = document.createElement ("span");//=>
                spanLastName.setAttribute ("id", "missLastName");//=>
                lastNameForm.appendChild (spanLastName);//=>
                
            
//=> PRENOM
        let firstNameForm = document.createElement ("label");//=>
        firstNameForm.setAttribute ("for", "firstName");//=>
        firstNameForm.textContent = " Prenom : ";       //=>
        formContaint.appendChild (firstNameForm);//=>
            let inputFirstName = document.createElement ("input");//=>
            inputFirstName.setAttribute ("type" , "text");//=>
            inputFirstName.setAttribute ("name" , "firstName");//=>
            inputFirstName.setAttribute ("id" , "firstName") ;//=>
            inputFirstName.setAttribute ("placeholder" , "prénom"); //=>
            inputFirstName.setAttribute ("required" , "true");//=>
            firstNameForm.appendChild (inputFirstName);//=>
                let spanFirstName = document.createElement ("span");//=>
                spanFirstName.setAttribute ("id", "missFirstName");//=>
                firstNameForm.appendChild (spanFirstName);//=>

//=> ADRESSE
        let adressForm = document.createElement ("label");//=>
        adressForm.setAttribute ("for", "address");//=>
        adressForm.textContent = " Adresse : ";         //=>
        formContaint.appendChild (adressForm);//=>
            let inputAdress = document.createElement ("input");//=>
            inputAdress.setAttribute ("type" , "text");//=>
            inputAdress.setAttribute ("name" , "adress");//=>
            inputAdress.setAttribute ("id" , "adress");//=>
            inputAdress.setAttribute ("placeholder" , "adresse"); //=>
            inputAdress.setAttribute ("required" , "true");//=>
            adressForm.appendChild (inputAdress);//=>
                let spanAdress = document.createElement ("span");//=>
                spanAdress.setAttribute ("id", "missAdress");//=>
                adressForm.appendChild (spanAdress);//=>

//=> VILLLE
        let cityForm = document.createElement ("label");//=>
        cityForm.setAttribute ("for", "city");//=>
        cityForm.textContent = " Ville : ";           //=>
        formContaint.appendChild (cityForm);//=>
            let inputCity = document.createElement ("input");//=>
            inputCity.setAttribute ("type" , "text");//=>
            inputCity.setAttribute ("name" , "city");//=>
            inputCity.setAttribute ("id" , "city");//=>
            inputCity.setAttribute ("placeholder" , "ville"); //=>
            inputCity.setAttribute ("required" , "true");//=>
            cityForm.appendChild (inputCity);//=>
                let spanCity = document.createElement ("span");//=>
                spanCity.setAttribute ("id", "missCity");//=>
                cityForm.appendChild (spanCity);//=>

//=> MAIL
        let mailForm = document.createElement ("label");//=>
        mailForm.setAttribute ("for", "mail");//=>
        mailForm.textContent = " Mail :";           //=>
        formContaint.appendChild (mailForm);//=>
            let inputMail = document.createElement ("input");//=>
            inputMail.setAttribute ("type" , "email");//=>
            inputMail.setAttribute ("name" , "mail");//=>
            inputMail.setAttribute ("id" , "mail");//=>
            inputMail.setAttribute ("placeholder" , "email") ; //=>
            inputMail.setAttribute ("required" , "true");//=>
            mailForm.appendChild (inputMail);//=>
                let spanMail = document.createElement ("span");//=>
                spanMail.setAttribute ("id", "missMail");//=>
                mailForm.appendChild (spanMail);//=>

//=> VALIDER
        let validForm = document.createElement ("input");//=>
        validForm.setAttribute ("type","submit");//=>
        validForm.setAttribute ("value" , "valider");//=>
        validForm.setAttribute ("id","btnValid");//=>
        formContaint.appendChild (validForm);//=>
        btnValid.addEventListener ("click",validation);//=>

var formValid = true;   //=>

function validation() {//=>
   
  
    //NOM
    if (lastName.validity.valueMissing  ) {//=>
        missLastName.textContent = "nom manquant";//=>
        missLastName.style.color = "red";//=>
        formValid = false;//=>

    } else if (!(/^\D+$/.test(lastName.value))) {//=>

        missLastName.textContent = "le nom contient des chiffres";//=>
        missLastName.style.color = "red";//=>
        formValid = false;//=>
    }
    else {
        missLastName.textContent ="";//=>
      
    }


    //PRENOM
    if (firstName.validity.valueMissing) {    //=>
        missFirstName.textContent = "prénom manquant";//=>
        missFirstName.style.color = "red";//=>
        formValid = false;//=>

    } else if (!(/^\D+$/.test(firstName.value))) {//=>

        missFirstName.textContent = "le prénom contient des chiffres";//=>
        missFirstName.style.color = "red";//=>
        formValid = false;//=>

    } else{//=>

        missFirstName.textContent ="";//=>
    } 

    //ADRESSE
    if (adress.validity.valueMissing) {//=>
        missAdress.textContent = "Adresse manquant";//=>
        missAdress.style.color = "red";//=>
        formValid = false;//=>


    }else  if (!(/[A-Za-z0-9]/.test(adress.value))) {//=>

        missAdress.textContent = "Vous utiliser des caractère spéciaux";//=>
        missAdress.style.color = "red";//=>
        formValid = false;//=>

    } else {
        missAdress.textContent ="";//=>
       
    }
   
    //VILLE
    if (city.validity.valueMissing) { //=>
        missCity.textContent = "Ville manquante";//=>
        missCity.style.color = "red";//=>
        formValid = false;//=>

    }else  if (!(/[A-Za-z-']/.test(city.value))) {//=>

        missCity.textContent = "la ville contient des chiffres ou des caractères non autorisés";//=>
        missCity.style.color = "red";//=>
        formValid = false;//=>

    }else { missCity.textContent ="";//=>
       

    }

    //EMAIL
    if (mail.validity.valueMissing) {//=>
        missMail.textContent = "Email manquant";//=>
        missMail.style.color = "red";//=>
        formValid = false;//=>

    }else if (!/.+@.+\..+/.test(mail.value)) {//=>
        
        missMail.textContent = "Format email incorect";//=>
        missMail.style.color = "red";//=>
        formValid = false;//=>

    }else {   
        missMail.textContent ="";//=>
        
    };
    
    if (formValid == true) {//=>
         
         const contact = {//=>
             lastName: document.getElementById("lastName").value,//=>
             firstName: document.getElementById("firstName").value,//=>
             address: document.getElementById("adress").value,//=>
             city: document.getElementById("city").value,//=>
             email: document.getElementById("mail").value//=>
         }
         let panier = []//=>
         for (let index = 0;index < itemsTeddies.length; index++) {//=>
             panier.push(itemsTeddies[index].id); //=>
         }
         
         var order= {//=>
             contact: contact,//=>
             products: panier //=>
         };
 
         postOfTeddie (order);//=>
                            
     
     };
    




};  

}


   
    









