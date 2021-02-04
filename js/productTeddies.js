//AFFICHAGE DES OURSON SUR LA PAGE DES DÉTAILS


//Récupération des paramètres de l'URL sur la page courante 

    let params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const id = urlParams.get("id");


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
    detailBtn.setAttribute("href","#" + data.id);

 
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

   let baskets = document.getElementById("basket");



    //On écoute le bouton 

    baskets.addEventListener('click', function (event) {
    event.preventDefault();
        

    // 1°) On récupère l'item selectTeddies 
    // 2°) On test si le tableau est vide 

    if (sessionStorage.getItem("selectTeddies") == null ){
   

    // 3°) On crée un objet selectTeddies 
    //3.1°) On créer le tableau et on met l' id à l'intérieur 

      selectTeddies = sessionStorage.setItem("selectTeddies" , JSON.stringify ({id:id , quantity:1}));
 

     //4°) Si item selectTeddies est défini :

    //4.1°) On récupère le tableau 

    }else {  
        
        JSON.parse(sessionStorage.getItem("selectTeddies"));
        console.log(selectTeddies)
    
    //5°) On met en place une boucle pour récupérer les différents ourson ainsi que les quantité 

    //for (let quantity of sessionStorage ) {
        //if (data.id == selectTeddies.id) ; {
           // selectTeddies.quantity+1 ;
           
           for(let i = 0; i < selectTeddies.length; i++) {
            selectTeddies[i].quantity ++
        }
        


            //console.log(selectTeddies)
       
             
     // }
    //};
    //6 ) On push le tableau dans le sessionstorage  
    
};
});
    };
