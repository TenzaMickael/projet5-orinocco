//AFFICHAGE DES OURSON SUR LA PAGE DES DÉTAILS


//Récupération des paramètres de l'URL sur la page courante 

let params = window.location.search;
const urlParams = new URLSearchParams(params);
const id = urlParams.get('id');


//Requete pour récupérer l'API des oursons 

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        const response = JSON.parse(this.responseText)    
        productTeddies(response);    
       // console.log(response);  
    };
};
request.open("GET" ,"http://localhost:3000/api/teddies/"+id);
request.send();


//Import de l'ID "descriptionTeddies"

let descriptionTeddies = document.getElementById("descriptionTeddies"); 


//Création d'une fonction pour mettre en place les donnée récupérées de l'API

function productTeddies(data) {
     

//Création des balises sous forme de cards 

    let teddiesProductContainer = document.createElement("div");

    let teddiesProductPicture = document.createElement ("img");

    let teddiesProductItem = document.createElement ("div");

    let teddiesProductTitle = document.createElement ("h3");

    let teddiesProductName = document.createElement ("p") ;

    let teddiesProductColors = document.createElement ("p");

    let teddiesProductDescripton = document.createElement ("p");

    let teddiesProductPrice = document.createElement ("p") ;

    let teddiesCheckArticles = document.createElement ("div");

    let teddiesDetailSelect = document.createElement ("select")

    let teddieSelectOptions = document.createElement("option");

    let detailBtn = document.createElement("button");
  

//Ajout des attributs au balises pour la création du style

    teddiesProductContainer.setAttribute("class" , "cards__item__thumb");

    teddiesProductPicture.setAttribute("class" , "image__teddies__product");
    teddiesProductPicture.setAttribute("src" , data.imageUrl);
    teddiesProductPicture.setAttribute("alt","image d'un ours en peluche");

    teddiesProductItem.setAttribute("class" , "cards__items__body");

    teddiesProductTitle.setAttribute("class" , "cards__items__body--title")

    teddiesProductName.setAttribute("class", "cards__items__body--name");

    teddiesProductColors.setAttribute("class" , "cards__items__body--colors");

    teddiesProductDescripton.setAttribute("class" , "cards__items__body--description");

    teddiesProductPrice.setAttribute("class", "cards__items__body--price");

    teddiesCheckArticles.setAttribute("class", "checkArticle" );

    teddiesDetailSelect.setAttribute("id","selects");

    detailBtn.setAttribute("class","btn btn-primary");
    detailBtn.setAttribute("id","basket");
    detailBtn.setAttribute("type","button");
    detailBtn.setAttribute("href","#" + data._id);

 
//Agencement des éléments

    descriptionTeddies.appendChild(teddiesProductContainer);

    teddiesProductContainer.appendChild(teddiesProductPicture);

    descriptionTeddies.appendChild(teddiesProductItem);

    teddiesProductItem.appendChild(teddiesProductTitle);

    teddiesProductItem.appendChild(teddiesProductName);

    teddiesProductItem.appendChild(teddiesProductColors);

    teddiesProductItem.appendChild(teddiesProductDescripton);

    teddiesProductItem.appendChild(teddiesProductPrice);

    teddiesProductItem.appendChild(teddiesCheckArticles);

    teddiesCheckArticles.appendChild(teddiesDetailSelect)

    teddiesDetailSelect.appendChild(teddieSelectOptions);

    teddiesCheckArticles.appendChild(detailBtn);


//Contenu des balises
    teddiesProductTitle.textContent = data.name;

    teddiesProductName.textContent = "Nom: " + data.name;

    teddiesProductColors.textContent = "Couleurs: " + data.colors;

    teddiesProductDescripton.textContent = "Description: " + data.description;

    teddiesProductPrice.textContent = "Prix: " + data.price/100 + " €";

    teddieSelectOptions.textContent = "--Choisissez votre couleur--";

    detailBtn.textContent="Ajouter à mon panier";


//Création d'une boucle pour récupérer les couleurs des oursons

   for (let i = 0;i < data.colors.length; i++) {
        let option = document.createElement("option");
        teddiesDetailSelect.appendChild(option);
        option.textContent=data.colors[i];
    };


//On récupère l'ID du bouton du panier 

   //let essais1 = "essais1"
   //let essais2 = "essais2"
   //localStorage.setItem = ("essais1" , essais1 )
   //localStorage.setItem = ("essais2" , essais2) 
   let baskets = document.getElementById("basket");

    baskets.addEventListener('click', function (event) {
        event.preventDefault();
        
     //let teddie = (
      //  id : id,
      //  nom : data.name,
      //  description : data.description,
      //  prix : data.price/100,
      //  couleurs : data.colors,
      //  quantite: 1  ] ;
     //console.log(teddie)

    //On crée un objet 
     let selectTeddies = {id: id , quantity: 1};
     console.log(selectTeddies);

     //On récupère l'objet 
     JSON.parse(localStorage.getItem(selectTeddies));


     if (selectTeddies != null){
       sessionStorage.setItem("selectTeddies" , JSON.stringify (selectTeddies));
     };

    

    });
    

     
       
    
    


};
