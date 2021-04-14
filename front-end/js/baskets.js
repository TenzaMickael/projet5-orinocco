/***** Variables globales *****/

var totalPrice = 0;                                                                                                 //=> Variable qui va contenir le prix total 
var totalArticles = 0;                                                                                              //=> Variable qui va contenir le nombre total d'articles 
//let urlApi = "http://localhost:3000/api/teddies/";

/***** Récupération de l' ID "basket" *****/

const basket = document.getElementById ("basket");                                                                  //=> Récupération de l'ID "basket"


/****** Récupération du localStorage ******/

let itemsTeddies = JSON.parse(localStorage.getItem ("selectTeddies"));                                              //=> Récupération du localStorage


/****** Chargement des 2 tableaux de la page *****/

tablesBasket ();                                                                                                    //=> Chargement des éléments du 1ier tableau
resumeTab (itemsTeddies);                                                                                           //=> Chargement des éléments du 2ieme tableau


/***** Boucle sur le localStorage *****/

for (let i = 0;i < itemsTeddies.length; i++) {                                                                      //=> Boucle sur le locaStorage + incrémentation 

    
/***** Création d'une variable qui contient les ID des oursons *****/ 

    var id =  itemsTeddies[i].id;                                                                                   //=> Variable qui contient les "ID" des oursons 


/* Requete XMLHttpReques */

    var request = new XMLHttpRequest();                                                                             //=> Lance une requete XMLHttRequest                                

    request.onreadystatechange = function () {                                                                      //=>  Au changement de onreadystatechange                         

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {                                         //=>  Si son changement est égal à une requete réussis et un status de 200 :

            const response = JSON.parse (this.responseText)                                                         //=>  Créer une constante que l'on parse dans un JSON en string 
            tablesItems(response);                                                                                  //=> tablesItems c'est le nom de la futur fonction 
        }; 
    }; 

    request.open ("GET" , urlApi+id);                                                 //=>  On lance la requete sur cette url     
    request.send();                                                                                                 //=> On donne l'ordre de lance la requete

    
/* Remplissage du 1ier tableau  */ 

    function tablesItems (tablesBasket)  {                                                                          //=> Eléments du premier tableau

    const tableContent = document.getElementById ("tableContent");                                                  //=> On récupère l' ID "tableContent"


    /***** Balise <tr> *****/
    let trBody = document.createElement("tr");                                                                      //=> Création d'une balise <tr>
    trBody.setAttribute("id","trBody");
    tableContent.appendChild(trBody);                                                                               //=> On lui déclare son parent


    /***** Image de l'ourson *****/
    let imgItemTeddie = document.createElement("img");                                                              //=> Création d'une balise <img>
    imgItemTeddie.setAttribute ("class" , "image__teddies__product");                                               //=> On lui attribut une classe
    imgItemTeddie.setAttribute ("src" , tablesBasket.imageUrl);                                                     //=> Chemin de l'image
    imgItemTeddie.setAttribute ("alt","image d'un ours en peluche");                                                //=> On lui attribut une balise "alt"
    trBody.appendChild (imgItemTeddie);                                                                             //=> On lui déclare son parent


    /***** Nom de l'ourson *****/
    let nameItemTeddie = document.createElement ("p");                                                              //=> Création d'une balise <p>
    nameItemTeddie.setAttribute ("class" , "name__teddies__product");                                               //=> On lui attribut une classe
    nameItemTeddie.textContent = "Nom : " + tablesBasket.name;                                                      //=> On lui attribut un contenu
    trBody.appendChild(nameItemTeddie);                                                                             //=> On lui déclare son parent


    /***** Prix unitaire de l'ourson *****/
    let priceUnitTeddie = document.createElement ("p");                                                             //=> Création d'une balise <p>
    priceUnitTeddie.setAttribute ("class" , "priceUnit__teddies__product");                                         //=> On lui attribut une classe
    priceUnitTeddie.setAttribute ("id" , "priceUnit_"+ tablesBasket._id);                                           //=> On lui attribut un <ID>
    priceUnitTeddie.textContent = tablesBasket.price/100 + " €";                                                    //=> On lui attribut un contenu
    trBody.appendChild (priceUnitTeddie);                                                                           //=> On lui déclare son parent


    /***** Cellule <td> + quantité d'oursons  *****/
    let tdQuantityTeddie = document.createElement ("td");                                                           //=> Création d'une balise <td>
    tdQuantityTeddie.setAttribute("id","tdQuantityTeddie");                                                         //=> On lui attribut un <ID> 
    trBody.appendChild (tdQuantityTeddie);                                                                          //=> On lui déclare son parent
        let quantityOfTeddie = document.createElement ("p");                                                        //=> Création d'une balise <p>
        quantityOfTeddie.setAttribute ("id" , "quantity_"+ tablesBasket._id);                                       //=> On lui attribut un <ID> 
        quantityOfTeddie.textContent = itemsTeddies[i].quantity;                                                    //=> On lui attribut un contenu
        tdQuantityTeddie.appendChild (quantityOfTeddie);                                                            //=> On lui déclare son parent
                    

    /***** Cellule <td> + prix sous total de l'ourson *****/
    let tdSubTotalTeddie = document.createElement ("td");                                                           //=> Création d'une balise <td>
    tdSubTotalTeddie.setAttribute("id","tdSubTotalTeddie");                                                         //=> On lui attribut un <ID>
    trBody.appendChild (tdSubTotalTeddie);                                                                          //=> On lui déclare son parent
        let subTotalTeddie = document.createElement ("p");                                                          //=> Création d'une balise <p>
        subTotalTeddie.setAttribute ("id" , "subTotal_"+ tablesBasket._id);                                         //=> On lui attribut un <ID>
        tdSubTotalTeddie.appendChild (subTotalTeddie);                                                              //=> On lui déclare son parent
         var subTotalOfTeddies = subTotal (tablesBasket._id,tablesBasket.price,itemsTeddies[i].quantity);           //=> On alle la fonction "subTotal"


    /***** Cellule <td> + bouton ajouter ourson *****/
    let tdAddOrRemove = document.createElement ("td");                                                              //=> Création d'une balise <td>
    tdAddOrRemove.setAttribute("id","tdAddOrRemove");                                                               //=> On lui attribut un <ID>
    trBody.appendChild (tdAddOrRemove);                                                                             //=> On lui déclare son parent
        let btnAddTeddie = document.createElement ("btn");                                                          //=> Création d'une balise <btn>
        tdAddOrRemove.appendChild (btnAddTeddie);                                                                   //=> On lui déclare son parent
        btnAddTeddie.setAttribute ("class","btn btn-primary btn-sm");                                               //=> On lui attribut une classe                                          
        btnAddTeddie.setAttribute ("id","btnAdd");                                                                  //=> On lui attribut un <ID>                
        btnAddTeddie.setAttribute ("type","button");                                                                //=> On définis son type                                                                                                    
        btnAddTeddie.textContent= "+";                                                                              //=> On lui attribut un contenu 


    /***** Bouton enlever un ourson *****/
    let btnRemoveTeddie = document.createElement ("btn");                                                           //=> Création d'une balise <btn>
    tdAddOrRemove.appendChild (btnRemoveTeddie);                                                                    //=> On lui déclare son parent  
        btnRemoveTeddie.setAttribute ("class","btn btn-primary btn-sm");                                            //=> On lui attribut une classe                                        
        btnRemoveTeddie.setAttribute ("id","btnRemove");                                                            //=> On lui attribut un <ID>                  
        btnRemoveTeddie.setAttribute ("type","button");                                                             //=> On définit son type
        btnRemoveTeddie.setAttribute ("disabled","true");                                                           //=> On le met en désactivé par défaut                                                                                                               
        btnRemoveTeddie.textContent= "-";                                                                           //=> On lui attribut un contenu


    /***** Cellule <td> + bouton supprimer la ligne de l'ourson *****/
    let tdDelete = document.createElement ("td");                                                                   //=> Création d'une balise <td>
    tdDelete.setAttribute("id","tdDelete");                                                                         //=> On lui attribut un <ID>
    trBody.appendChild(tdDelete);                                                                                   //=> On lui déclare son parent 
        let btnDeleteTeddie = document.createElement ("btn");                                                       //=> Création d'une balise <btn>                 
        btnDeleteTeddie.setAttribute("class","btn btn-danger btn-sm");                                              //=> On lui attribut une classe                                          
        btnDeleteTeddie.setAttribute("id","btnRemove");                                                             //=> On lui attribut un <ID> 
        tdDelete.appendChild(btnDeleteTeddie);                                                                      //=> On lui déclare son parent
        btnDeleteTeddie.dataset.idteddie = tablesBasket._id;                                                        //=> On lui attribut un contenu                                                                                                   
        btnDeleteTeddie.textContent= "X";                                                                           //=> On lui attribut un contenu
    

/* Evènement de la fonction tablesItems */

    /***** Evènement sur le bouton ajouter un ourson *****/ 
    btnAddTeddie.addEventListener ('click', function (event) {                                                      //=> Action si un click se produit sur le bouton "+"
        event.preventDefault();                                                                                     //=> On désactive le comportement par défaut
        updateTeddieItem (tablesBasket._id,1);                                                                      //=> On ajoute +1 à l'ourson
    });


    /***** Evènement sur le bouton enlever un ourson *****/
    btnRemoveTeddie.addEventListener ('click', function (event) {                                                   //=> Action si un click se produit sur le bouton "-" 
        event.preventDefault();                                                                                     //=> On désactive le comportement par défaut
        updateTeddieItem (tablesBasket._id, -1);                                                                    //=> On enlève -1 à l'ourson
    });


    /***** Evènement sur le bouton supprimer la ligne de l'ourson *****/
    btnDeleteTeddie.addEventListener('click', function (event) {                                                    //=> Action si un click se produit sur le bouton "X"
        event.preventDefault();                                                                                     //=> On désactive le comportement par défaut
        deleteTeddie (tablesBasket._id);                                                                            //=> On supprime la quantité de l'ourson sélectionné
    });


    /* Remplissage du 2ieme tableau */   

    /***** Calcul nombre total d'articles *****/
    numberArticles (itemsTeddies[i].quantity);                                                                      //=> Affiche le nombre total d'articles                   
            
    /***** Calcul prix total des dépenses *****/ 
    totalPriceOfTeddie (subTotalOfTeddies);                                                                         //=> Affiche le prix total 
    };
};

/* Structure du 1ier tableau */

function tablesBasket () {                                                                                          //=> Structure du 1ier tableau


    const basket = document.getElementById ("basket");                                                              //=> Récupération de l'ID "basket" 


    /***** Container du 1ier tableau *****/
    let containtTable = document.createElement ("div");                                                             //=> Création d'une balise <div>
    containtTable.setAttribute ("class", "responsive-table-line");                                                  //=> On lui attribut une classe
    basket.appendChild (containtTable);                                                                             //=> On lui déclare son parent


    /***** Colonnes du 1ier tableau *****/
    let tables = ["Oursons", "Quantités","Prix total","Ajouter / enlever","Supprimer"];                             //=> Noms des collonnes du 1ier tableau
   

    /***** Création du 1ier tableau *****/
    let teddiesTables = document.createElement ("table");                                                           //=> Création d'une balise <table>
    teddiesTables.setAttribute ("class","table table-light table-striped table-bordered table-hover table-sm");     //=> On lui attribut une classe
    teddiesTables.setAttribute ("id","table_1");                                                                    //=> On lui attribut un <ID>
    containtTable.appendChild (teddiesTables);                                                                      //=> On lui déclare son parent    
        

    /***** Balise <thead> *****/
    let tHead = document.createElement ("thead");                                                                   //=> Création d'une balise <thead>
    tHead.setAttribute ("class" , "thead-dark");                                                                    //=> On lui attribut une classe
    teddiesTables.appendChild (tHead);                                                                              //=> On lui déclare son parent


    /***** Balise <tr> *****/
    let trTables = document.createElement ("tr");                                                                   //=> Création d'une balise <tr>
    trTables.setAttribute ("class" ,"trTable");                                                                     //=> On lui attribut une classe
    tHead.appendChild (trTables);                                                                                   //=> On lui déclare son parent

    /***** Boucle sur les colonne du 1ier tableau *****/
    for (let i = 0;i < tables.length; i++) {                                                                        //=> Boucle sur les colonnes du 1ier tableau
                                

        /***** Balise <th> *****/
        let thTables = document.createElement ("th");                                                               //=> Création d'une balise <th>
        thTables.setAttribute ("class", "thTable");                                                                 //=> On lui attribut une classe
        trTables.appendChild (thTables);                                                                            //=> On lui déclare son parent
        thTables.textContent = tables[i];                                                                           //=> On lui attrubut un contenu

    } 


    /***** Balise <tbody> *****/
    let tBody = document.createElement ("tbody");                                                                   //=> Création d'une balise <tbody>
    tBody.setAttribute ("id","tableContent");                                                                       //=> On lui attribut un <ID>
    teddiesTables.appendChild (tBody);                                                                              //=> On lui déclare son parent
}; 


/* Structure du 2 ième tableau */ 

function resumeTab (itemsTeddies) {                                                                                 //=> Structure du 2ième tableau
    

    /***** Balise <table> *****/
    let tableContent = document.createElement ("table");                                                            //=> Création d'une balise <table>
    tableContent.setAttribute ("class" , "table table-light table-striped table-bordered table-hover table-sm");    //=> On lui attribut une classe
    tableContent.setAttribute ("id" , "table_2");                                                                   //=> On lui attribut un <ID>
    basket.appendChild (tableContent);                                                                              //=> On lui déclare son parent


    /***** Balise <tbody> *****/
    let tHeadSecondTab = document.createElement ("tbody");                                                          //=> Création d'une balise <tbody>
    tableContent.appendChild (tHeadSecondTab);                                                                      //=> On lui déclare son parent


    /***** Balise <tr> + nombre d'oursons *****/
    let trNumberItemsTeddie = document.createElement ("tr");                                                        //=> Création d'une balise <tr>
    tableContent.appendChild (trNumberItemsTeddie);                                                                 //=> On lui déclare son parent
        let numberItemTeddie = document.createElement ("p");                                                        //=> Création d'une balise <p>
        numberItemTeddie.setAttribute ("id" , "numberItem");                                                        //=> On lui attribut un <ID>
        trNumberItemsTeddie.appendChild (numberItemTeddie);                                                         //=> On lui déclare son parent


    /***** Balise <tr> + prix des oursons *****/
    let trTotalPriceTeddie = document.createElement ("tr");                                                         //=> Création d'une balise <tr>
    tableContent.appendChild (trTotalPriceTeddie);                                                                  //=> On lui déclare son parent
        let totalPriceTeddies= document.createElement ("p");                                                        //=> Création d'une balise <p>
        totalPriceTeddies.setAttribute ("id" , "priceOfTeddies");                                                   //=> On lui attribut un <ID>
        trTotalPriceTeddie.appendChild (totalPriceTeddies);                                                         //=> On lui déclare son parent


    /***** Balise <a> + boutton "continuer vos achats" *****/
    let continueShopping = document.createElement ("a");                                                            //=> Création d'une balise <a>
    continueShopping.setAttribute ("type" , "button");                                                              //=> On définit son type
    continueShopping.setAttribute ("class" , "btn btn-success");                                                    //=> On lui attribut une classe
    continueShopping.setAttribute ("id" , "btnContinueShopping");                                                   //=> On lui attribut un <ID>
    continueShopping.setAttribute ("href" , "./index.html");                                                        //=> Chemin du bouton
    continueShopping.textContent = "Continuer vos achats ";                                                         //=> On lui attrubut un contenu
    tableContent.appendChild(continueShopping);                                                                     //=> On lui déclare son parent

    /***** Condition sur le "itemsTeddies" *****/
    if (itemsTeddies) {                                                                                             //=> Condition sur "itemsTeddies"


        /***** Bouton commander *****/
        let placeOrderBasket = document.createElement ("btn");                                                      //=> Création d'une balise <btn>
        placeOrderBasket.setAttribute ("type" , "button");                                                          //=> On définit son type
        placeOrderBasket.setAttribute ("class" , "btn btn-success");                                                //=> On lui attribut une classe
        placeOrderBasket.setAttribute ("id","btnOrder");                                                            //=> On lui attribut un <ID>
        placeOrderBasket.textContent = " Commander ";                                                               //=> On lui attrubut un contenu
        tableContent.appendChild (placeOrderBasket);                                                                //=> On lui déclare son parent

            
        /***** Bouton commander *****/
        let deleteLocalStorage = document.createElement ("btn");                                                    //=> Création d'une balise <btn>
        deleteLocalStorage.setAttribute ("type" , "button");                                                        //=> On définit son type
        deleteLocalStorage.setAttribute ("class" , "btn btn-danger");                                               //=> On lui attribut une classe
        deleteLocalStorage.setAttribute ("id" , "btnDeleteLocallStorage");                                          //=> On lui attribut un <ID>
        deleteLocalStorage.textContent = " Vider le panier ";                                                       //=> On lui attrubut un contenu
        tableContent.appendChild (deleteLocalStorage);                                                              //=> On lui déclare son parent
       

        /***** Evènement sur le bouton "Vider le panier" *****/
        btnDeleteLocallStorage.addEventListener("click", function (event) {                                         //=> Action si un click se produit sur le bouton "Vider le panier"
            event.preventDefault();                                                                                 //=> On désactive le comportement par défaut
            deleteTeddie (itemsTeddies);                                                                            //=> On appelle la fonction deleteTeddie
            window.location.reload ();                                                                              //=> On recharge la page
        });  

        /***** Evènement sur le bouton "Commander" *****/
        btnOrder.addEventListener("click", function (event) {                                                       //=> Action si un click se produit sur le bouton "Commander"
            event.preventDefault();                                                                                 //=> On désactive le comportement par défaut
            if (!document.getElementById("form")) {                                                                 //=> Si le formulairee n'est pas présent 
                placeOrder();                                                                                       //=> On appelle la fonction "placeOrder"
            };
        });
    }
};


/* Création du formulaire de contact */

function placeOrder () {                                                                                            //=> Fonction pour le formulaire de commande 
    
    /***** Container pour le formulaire *****/
    let formContaint = document.createElement ("form");                                                             //=> Création d'une balise <form>
    formContaint.setAttribute ("id" , "form");                                                                      //=> On lui attribut un <ID>
    basket.appendChild (formContaint);                                                                              //=> On lui déclare son parent


    /***** Balise <h2> *****/
    let formTitle = document.createElement ("h2");  
    formTitle.setAttribute("id","formTitle")                                                                        //=> Création d'une balise <h2>
    formTitle.textContent= "Merci de remplir ce formulaire pour finaliser votre commande";                          //=> On lui attrubut un contenu
    formContaint.appendChild (formTitle);                                                                           //=> On lui déclare son parent


    /***** Nom *****/
    let lastNameForm = document.createElement ("label");                                                            //=> Création d'une balise <label>
    lastNameForm.setAttribute ("for", "lastName");                                                                  //=> On lui attribut un "for" "lastName"
    lastNameForm.textContent = " Nom : ";                                                                           //=> On lui attrubut un contenu
    formContaint.appendChild (lastNameForm);                                                                        //=> On lui déclare son parent
        let inputLastName = document.createElement ("input");                                                       //=> Création d'une balise <input>
        inputLastName.setAttribute ("type" , "text");                                                               //=> On définit son type
        inputLastName.setAttribute ("name" , "nom");                                                                //=> On définit son nom
        inputLastName.setAttribute ("id" , "lastName");                                                             //=> On lui attribut un <ID>
        inputLastName.setAttribute ("placeholder" , "nom");                                                         //=> On lui attribut un placeholder
        inputLastName.setAttribute ("required" , "true");                                                           //=> On lui met un attribut "required"
        lastNameForm.appendChild (inputLastName);                                                                   //=> On lui déclare son parent
            let spanLastName = document.createElement ("span");                                                     //=> Création d'une balise <span>
            spanLastName.setAttribute ("id", "missLastName");                                                       //=> On lui attribut un <ID>
            lastNameForm.appendChild (spanLastName);                                                                //=> On lui déclare son parent
                
            
    /***** Prénom *****/
    let firstNameForm = document.createElement ("label");                                                           //=> Création d'une balise <label>
    firstNameForm.setAttribute ("for", "firstName");                                                                //=> On lui attribut un "for" 
    firstNameForm.textContent = " Prenom : ";                                                                       //=> On lui attrubut un contenu 
    formContaint.appendChild (firstNameForm);                                                                       //=> On lui déclare son parent
        let inputFirstName = document.createElement ("input");                                                      //=> Création d'une balise <input>
        inputFirstName.setAttribute ("type" , "text");                                                              //=> On définit son type
        inputFirstName.setAttribute ("name" , "firstName");                                                         //=> On définit son nom
        inputFirstName.setAttribute ("id" , "firstName") ;                                                          //=> On lui attribut un <ID>
        inputFirstName.setAttribute ("placeholder" , "prénom");                                                     //=> On lui attribut un placeholder
        inputFirstName.setAttribute ("required" , "true");                                                          //=> On lui met un attribut "required"
        firstNameForm.appendChild (inputFirstName);                                                                 //=> On lui déclare son parent
            let spanFirstName = document.createElement ("span");                                                    //=> Création d'une balise <span>
            spanFirstName.setAttribute ("id", "missFirstName");                                                     //=> On lui attribut un <ID>
            firstNameForm.appendChild (spanFirstName);                                                              //=> On lui déclare son parent


    /***** Addresse *****/
    let adressForm = document.createElement ("label");                                                              //=> Création d'une balise <label>
    adressForm.setAttribute ("for", "address");                                                                     //=> On lui attribut un "for"
    adressForm.textContent = " Adresse : ";                                                                         //=> On lui attribut un contenu
    formContaint.appendChild (adressForm);                                                                          //=> On lui déclare son parent
        let inputAdress = document.createElement ("input");                                                         //=> Création d'une balise <input>
        inputAdress.setAttribute ("type" , "text");                                                                 //=> On définit son type
        inputAdress.setAttribute ("name" , "adress");                                                               //=> On définit son nom 
        inputAdress.setAttribute ("id" , "adress");                                                                 //=> On lui attribut un <ID>
        inputAdress.setAttribute ("placeholder" , "adresse");                                                       //=> On lui attribut un placeholder
        inputAdress.setAttribute ("required" , "true");                                                             //=> On lui met un attribut "required"
        adressForm.appendChild (inputAdress);                                                                       //=> On lui déclare son parent
            let spanAdress = document.createElement ("span");                                                       //=> Création d'une balise <span>
            spanAdress.setAttribute ("id", "missAdress");                                                           //=> On lui attribut un <ID>
            adressForm.appendChild (spanAdress);                                                                    //=> On lui déclare son parent


    /***** Ville *****/
    let cityForm = document.createElement ("label");                                                                //=> Création d'une balise <label>
    cityForm.setAttribute ("for", "city");                                                                          //=> On lui attribut un "for"
    cityForm.textContent = " Ville : ";                                                                             //=> On lui attrubut un contenu
    formContaint.appendChild (cityForm);                                                                            //=> On lui déclare son parent
        let inputCity = document.createElement ("input");                                                           //=> Création d'une balise <input>
        inputCity.setAttribute ("type" , "text");                                                                   //=> On définit son type
        inputCity.setAttribute ("name" , "city");                                                                   //=> On définit son nom
        inputCity.setAttribute ("id" , "city");                                                                     //=> On lui attribut un <ID>
        inputCity.setAttribute ("placeholder" , "ville");                                                           //=> On lui attribut un placeholder
        inputCity.setAttribute ("required" , "true");                                                               //=> On lui met un attribut "required"
        cityForm.appendChild (inputCity);                                                                           //=> On lui déclare son parent
            let spanCity = document.createElement ("span");                                                         //=> Création d'une balise <span>
            spanCity.setAttribute ("id", "missCity");                                                               //=> On lui attribut un <ID>
            cityForm.appendChild (spanCity);                                                                        //=> On lui déclare son parent


    /***** Mail *****/
    let mailForm = document.createElement ("label");                                                                //=> Création d'une balise <label>
    mailForm.setAttribute ("for", "mail");                                                                          //=> On lui attribut un "for"
    mailForm.textContent = " Mail : ";                                                                              //=> On lui attrubut un contenu
    formContaint.appendChild (mailForm);                                                                            //=> On lui déclare son parent
        let inputMail = document.createElement ("input");                                                           //=> Création d'une balise <input>
        inputMail.setAttribute ("type" , "email");                                                                  //=> On définit son type
        inputMail.setAttribute ("name" , "mail");                                                                   //=> On lui attribut un <ID>
        inputMail.setAttribute ("id" , "mail");                                                                     //=> On lui attribut un <ID>
        inputMail.setAttribute ("placeholder" , "email") ;                                                          //=> On lui attribut un placeholder
        inputMail.setAttribute ("required" , "true");                                                               //=> On lui met un attribut "required"
        mailForm.appendChild (inputMail);                                                                           //=> On lui déclare son parent
            let spanMail = document.createElement ("span");                                                         //=> Création d'une balise <span>
            spanMail.setAttribute ("id", "missMail");                                                               //=> On lui attribut un <ID>
            mailForm.appendChild (spanMail);                                                                        //=> On lui déclare son parent


    /***** Validation *****/
    let validForm = document.createElement ("input");                                                               //=> Création d'une balise <input>
    validForm.setAttribute ("type","submit");                                                                       //=> On définit son type
    validForm.setAttribute ("value" , "valider");                                                                   //=> On lui attribut une valeur
    validForm.setAttribute ("id","btnValid");                                                                       //=> On lui attribut un <ID>
    formContaint.appendChild (validForm);                                                                           //=> On lui déclare son parent
    btnValid.addEventListener ("click",validation);                                                                 //=> On défint l'action au click sur lez bouton "valider"


                                                                                              //=> Création d'une variable pour le formulaire


/* Fonction pour vérifier les donnée saisies dans le formulaire */

    function validation() {                                                                                         //=> Fonction pour vérifier les donnée saisies dans le formulaire
  
        var formValid = true; 
    /***** Nom *****/
    if (lastName.validity.valueMissing  ) {                                                                         //=> Si la valeur saisie est vide
                                                                                                                    
        missLastName.textContent = "nom manquant";                                                                  //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else if (!(/^\D+$/.test(lastName.value))) {                                                                    //=> Sinon si les caractère rentrés sont différent de :

        missLastName.textContent = "le nom contient des chiffres";                                                  //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"
                                                                                                                
    }else{                                                                                                          //=> Sinon
                                                                                                                    
        missLastName.textContent ="";                                                                               //=> On lui attrubut un contenu
    }


    /***** Prénom *****/
    if (firstName.validity.valueMissing) {                                                                          //=> Si la valeur saisie est vide
                                                                                                                    
        missFirstName.textContent = "prénom manquant";                                                              //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else if (!(/^\D+$/.test(firstName.value))) {                                                                   //=> Sinon si les caractère rentrés sont différent de :

        missFirstName.textContent = "le prénom contient des chiffres";                                              //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else{                                                                                                          //=> Sinon

        missFirstName.textContent ="";                                                                              //=> On lui attrubut un contenu
    } 


    /***** Addresse *****/
    if (adress.validity.valueMissing) {                                                                             //=> Si la valeur saisie est vide
                                                                                    
        missAdress.textContent = "Adresse manquant";                                                                //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else  if (!(/[A-Za-z0-9]/.test(adress.value))) {                                                               //=> Sinon si les caractère rentrés sont différent de :

        missAdress.textContent = "Vous utiliser des caractère spéciaux";                                            //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else{                                                                                                          //=> Sinon
                                                                                                                    
        missAdress.textContent ="";                                                                                 //=> On lui attrubut un contenu
    }


    /***** Ville *****/
    if (city.validity.valueMissing) {                                                                               //=> Si la valeur saisie est vide

        missCity.textContent = "Ville manquante";                                                                   //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else  if (!(/[A-Za-z-']/.test(city.value))) {                                                                  //=> Sinon si les caractère rentrés sont différent de :

        missCity.textContent = "la ville contient des chiffres ou des caractères non autorisés";                    //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else{                                                                                                          //=> Sinon
            
        missCity.textContent ="";                                                                                   //=> On lui attrubut un contenu
    }   


    /***** Mail *****/
    if (mail.validity.valueMissing) {                                                                               //=> Si la valeur saisie est vide

        missMail.textContent = "Email manquant";                                                                    //=> Message d'erreur
        formValid = false;                                                                                          //=> change la variable "formValid"

    }else if (!/.+@.+\..+/.test(mail.value)) {                                                                      //=> Sinon si les caractère rentrés sont différent de :
        
        missMail.textContent = "Format email incorect";                                                             //=> Message d'erreur
        missMail.style.color = "red";                                                                               //=>
        formValid = false;                                                                                          //=> change la variable "formValid"

    } else {                                                                                                        //=> Sinon
                                                                                                                    
        missMail.textContent ="";                                                                                   //=> On lui attrubut un contenu   
    };



        event.preventDefault();


/* Fonction qui crée les éléments pour la page de confirmation si le formulaire est valide */

    if (formValid == true) {                                                                                        //=> Si le formulaire renvoi "true"
         
        const contact = {                                                                                           //=> Création d'une constante 
             lastName: document.getElementById("lastName").value,                                                   //=> La valeur du nom 
             firstName: document.getElementById("firstName").value,                                                 //=> La valeur du prénom
             address: document.getElementById("adress").value,                                                      //=> La valeur de l' addresse
             city: document.getElementById("city").value,                                                           //=> La valeur de la ville
             email: document.getElementById("mail").value                                                           //=> La valeur du mail 
        }


        let panier = []                                                                                             //=> On crée un tableau vide 
                                                                                                  
        for (let index = 0;index < itemsTeddies.length; index++) {                                                  //=> Boucle sur itemsTeddies

             panier.push(itemsTeddies[index].id);                                                                   //=> On push dans le tableau vide 
        }
         
         var order= {                                                                                               //=> On crée une variable

             contact: contact,                                                                                      //=> Contient les coordonnéees de l'utilisateur
             products: panier                                                                                       //=> Contient le numéro de commande 
         };
 
         postOfTeddie (order);                                                                                      //=> Appelle la fonction postOfTeddie
                            
     
     };
    

    }; 
}


   
    









