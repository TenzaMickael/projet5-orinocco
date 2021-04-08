/*On récupère les paramètre de l'URL de la page index */

let params = window.location.search;                                                             //=> récupère l'URL courante 
const urlParams = new URLSearchParams (params);                                                  //=> On créer une constante avec la nouvelle URL 
const id = urlParams.get ("id");                                                                 //=> récupère l'ID sur la page courante 
let descriptionTeddies = document.getElementById ("descriptionTeddies");                         //=> On récupère l'élément "descriptionTeddies"                                               


/*On lance une requete pour récupérer l'API des oursons */ 

getOneTeddie (id);                                                                               //=> Appelle de la fonction (requete XMLHttpRequest)


/* Création d'une fonction pour mettre en place les donnée récupérées de l'API */

function productTeddies (data) {                                                                 
   
    /***** Container de la page *****/
    let teddiesProductItem = document.createElement ("div");                                     //=> Création d'un container <div> 
    teddiesProductItem.setAttribute ("class" , "cardOfProduct");                                 //=> On lui attribut une classe
    descriptionTeddies.appendChild (teddiesProductItem);                                         //=> On lui déclare son parent


    /***** Image de l'ourson *****/
    let teddiesProductPicture = document.createElement ("img");                                  //=> Création d'une balise <img>   
    teddiesProductPicture.setAttribute ("class" , "image__teddies__products");                   //=> On lui attribut une classe
    teddiesProductPicture.setAttribute ("src" , data.imageUrl);                                  //=> On lui indique où récupérer l'image
    teddiesProductPicture.setAttribute ("alt","image d'un ours en peluche");                     //=> On lui assigne une balise "alt"
    teddiesProductItem.appendChild (teddiesProductPicture);                                      //=> On lui déclare son parent


    /***** Sous titre + nom de l'oursons *****/
    let teddiesProductTitle = document.createElement ("h3");                                     //=> Création d'une balise <h3>
    teddiesProductTitle.setAttribute ("class" , "cards__items__body--title");                    //=> On lui attribut une classe
    teddiesProductItem.appendChild (teddiesProductTitle);                                        //=> On lui déclare son parent
    teddiesProductTitle.textContent = data.name;                                                 //=> On lui attribut un contenu


    /***** Container des infos de l'ourson  *****/
    let contentProductTeddie = document.createElement ("div");                                   //=> Création d'un container <div>
    contentProductTeddie.setAttribute ("id", "contentProductTeddie");                            //=> On lui attribut un <ID>
    teddiesProductItem.appendChild (contentProductTeddie);                                       //=> On lui déclare son parent


    /***** Nom de l'ourson *****/
    let teddiesProductName = document.createElement ("p");                                       //=> Création d'une balise <p>
    teddiesProductName.setAttribute ("class", "cards__items__body--name");                       //=> On lui attribut une classe
    contentProductTeddie.appendChild (teddiesProductName);                                       //=> On lui déclare son parent
    teddiesProductName.textContent = "Nom: " + data.name;                                        //=> On lui attribut un contenu


    /***** Couleurs de l'ourson *****/
    let teddiesProductColors = document.createElement ("p");                                     //=> Création d'une balise <p>
    teddiesProductColors.setAttribute ("class" , "cards__items__body—colors");                   //=> On lui attribut une classe
    contentProductTeddie.appendChild (teddiesProductColors);                                     //=> On lui déclare son parent
    teddiesProductColors.textContent = "Couleurs: " + data.colors;                               //=> On lui attribut un contenu


    /***** Description de l'ourson *****/
    let teddiesProductDescription = document.createElement ("p");                                //=> Création d'une balise <p>
    teddiesProductDescription.setAttribute ("class" , "cards__items__body—description");         //=> On lui attribut une classe
    contentProductTeddie.appendChild (teddiesProductDescription);                                //=> On lui déclare son parent
    teddiesProductDescription.textContent = "Description: " + data.description;                  //=> On lui attribut un contenu


    /***** Prix de l'ourson *****/
    let teddiesProductPrice = document.createElement ("p");                                      //=> Création d'une balise <p>
    teddiesProductPrice.setAttribute ("class", "cards__items__body—price");                      //=> On lui attribut une classe
    contentProductTeddie.appendChild (teddiesProductPrice);                                      //=> On lui déclare son parent
    teddiesProductPrice.textContent = "Prix: " + data.price/100 + " €";                          //=> On lui attribut un contenu


    /***** Sous titre instruction *****/
    let instruction = document.createElement ("h2");                                             //=> Création d'une balise <h2>
    instruction.setAttribute ("class", "instruction");                                           //=> On lui attribut une classe
    teddiesProductItem.appendChild (instruction);                                                //=> On lui déclare son parent
    instruction.textContent = "Choisissez une couleurs pour ajouter votre article au panier ";   //=> On lui attribut un contenu


    /***** Container option de l'ourson *****/
    let teddiesCheckArticles = document.createElement ("div");                                   //=> Création d'un container <div>
    teddiesCheckArticles.setAttribute ("class", "checkArticle");                                 //=> On lui attribut une classe
    teddiesProductItem.appendChild (teddiesCheckArticles);                                       //=> On lui déclare son parent


    /***** Choix de la couleur *****/
    let teddiesDetailSelect = document.createElement ("select");                                 //=> Création d'une balise <select>
    teddiesDetailSelect.setAttribute ("id","selects");                                           //=> On lui attribut un "ID"
    teddiesCheckArticles.appendChild (teddiesDetailSelect);                                      //=> On lui déclare son parent


    /***** Bouton avec les couleurs *****/
    let teddiesSelectOptions = document.createElement ("option");                                //=> Création d'une balise <option>
    teddiesSelectOptions.setAttribute ("id" , "defaultOption");                                  //=> On attribut un "ID"
    teddiesSelectOptions.textContent = "--Choisissez votre couleur--";                           //=> On lui attribut un contenu 
    teddiesDetailSelect.appendChild (teddiesSelectOptions);                                      //=> On lui déclare son parent 
  
    
    /***** Bouton ajouter au panier *****/
    let detailBtn = document.createElement ("button");                                           //=> Création d'une balise <button>
    detailBtn.setAttribute ("class","btn btn-primary");                                          //=> On lui attribut une classe                       
    detailBtn.setAttribute ("id","basketCommand");                                               //=> On attribut un "ID" 
    detailBtn.setAttribute ("type","button");                                                    //=> On définit son type  
    detailBtn.setAttribute ("disabled","true");                                                  //=> On le met en désactivé par défaut 
    detailBtn.dataset.idteddie = data._id   ;                                                    //=> On définit l'action quand on appuis sur le bouton 
    teddiesCheckArticles.appendChild (detailBtn);                                                //=> On lui déclare son parent
    detailBtn.textContent="Ajouter à mon panier";                                                //=> On lui attribut un contenu


/* Création d'une boucle pour récupérer les couleurs des oursons */
                                                                  
    for (let i = 0;i < data.colors.length; i++) {                                                //=> Boucle sur le tableau de data.colors + incrémentation

        let teddiesDetailSelect = document.getElementById("selects")                             //=> Récupération de l'ID "selects"

        let option = document.createElement ("option");                                          //=> Création d'une balise <option>

        teddiesDetailSelect.appendChild (option);                                                //=> On lui déclare son parent

        option.textContent = data.colors[i];                                                     //=> On lui attribut un contenu                                                                  
    };


/* Evènement sur le bouton des couleurs  */

    teddiesDetailSelect.addEventListener ('change' , function (event) {                          //=> Action si un changement se produit sur le bouton des couleurs
                                                     
        let basketCommand = document.getElementById ("basketCommand")                            //=> On récupère l' ID "basket"

            if(!(data.colors).includes (event.target.value)) {                                   //=> On teste si la couleur sélectionné est bien contenu dans le tableau couleur de l'ourson  
            basketCommand.disabled = true ;                                                      //=> On déclare que le bouton est grisé 
          
            } else  {                                                                            //=> Sinon
                                   
                basketCommand.disabled = false;                                                  //=> On active le bouton pour ajouter l'ourson au panier                             
            };                         
    });


/* Evènement sur le bouton "Ajouter au panier" */

        detailBtn.addEventListener ('click', function (event){                                   //=> Action si un click se produit sur le bouton "ajouter au panier"

        event.preventDefault();                                                                  //=> On désactive le comportement par défaut 

        productBasket (event.target.dataset.idteddie);                                           //=> On récupère les informations dont on as besoin 

        let confirm = document.createElement ("p");                                              //=> Création d'une balise <p>
        confirm.setAttribute ("id","message")                                                    //=> On attribut un "ID"
        teddiesCheckArticles.appendChild (confirm);                                              //=> On lui déclare son parent
        message.innerHTML =` L'ourson à été ajouter à votre panier `;                            //=> On lui attribut un contenu

        setTimeout(function () {                                                                 //=> On crée unr fonction pour gérer la disparition du texte 
            message.innerHTML = "";                                                              //=> On met en place un texte vide 
          },2000);                                                                               //=> Durée du texte affiché
    });  
    
};


/* On créer une fonction qui va contenir les oursons dans le panier */

function productBasket (idteddie) {                                                              //=> On créer une fonction pour créer le panier avec les oursons à l'intérieur  

    if (localStorage.getItem ("selectTeddies") == undefined ){                                   //=> On test si "selectTeddies" est undefined

        let  indexTeddies = [];                                                                  //=> Si undefined , On crée un tableau vide qui va contenir les oursons sélectionnés    

        indexTeddies.push ({id:id , quantity:1});                                                //=> On crée un objet et on le push dans le array "indexTeddies" 

        localStorage.setItem ("selectTeddies" , JSON.stringify (indexTeddies));                  //=> On met à jour le localStorage
    
        }else {                                                                                  //=> Sinon si il est défini :
     
            var teddiesTab =  JSON.parse (localStorage.getItem("selectTeddies"));                //=> on récupère le tableau "selectTeddies" 
 
            if  (!teddiesTab.map(function(selectTeddies) { return selectTeddies.id; }).includes(idteddie)) {    //=> On test si l'ourson sélectionner est présent dans le          tableau                                                      
                teddiesTab.push({id:id , quantity:1});                                           //=> On push l'ID et la quantité dans teddiesTab
        
            }else{                                                                               //=> Sinon

            for (let index=0; index< teddiesTab.length ;index++) {                               //=> On met en place une boucle dans le cas de deux id identique , puis on incrémente leurs quantité  
        
            if (teddiesTab[index].id == idteddie ){                                              //=> Si le tableau dans le localStorage est identique à l'id sélectionner 
            
                teddiesTab[index].quantity = teddiesTab[index].quantity+1;                       //=> On incrémente la quantité en +1  
            };             
        };                                                                     
        } 

        localStorage.setItem ("selectTeddies" , JSON.stringify (teddiesTab));                    //=> On met à jour le sessionStorage 

    };
};






                                        