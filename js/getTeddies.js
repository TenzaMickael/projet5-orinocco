//APPELLE DE L'API DES OURSONS 


// Import de l'Id "listTeddies"

const listTeddies = document.getElementById('listTeddies');

//Requete XMLHttpRequest pour récupérer l'API des oursons

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        const response = JSON.parse(this.responseText);
        console.log(response);
        for (let index = 0 ; index < response.length ; index++) {
            teddies(response[index]);   
        }  
    }
};
request.open("GET" ,"http://localhost:3000/api/teddies");
request.send();


//Création d'une fonction pour mettre en place les donnée récupérées de l'API 

function teddies (data) {


//Création des balises sous forme de cards 

    let masterContainer = document.createElement ("div"); 

    let bodyContainer = document.createElement ("div");

    let pictureIndexTeddies = document.createElement ("img");

    let titleIndexPicture = document.createElement ("h3");

    let nameIndexTeddies = document.createElement ("p");

    let colorsIndexTeddies = document.createElement ("p");

    let descriptionIndexTeddies = document.createElement ("p");

    let priceIndexTeddies = document.createElement ("p");

    let btnIndexContainer = document.createElement ("div");

    let btnIndexProduct = document.createElement ("a");


//Ajout des attributs au balises pour la création du style

    masterContainer.setAttribute("class", "card") ;

    bodyContainer.setAttribute("class", "card-body");

    pictureIndexTeddies.setAttribute("src",data.imageUrl);
    pictureIndexTeddies.setAttribute("class","card-img-top");
    pictureIndexTeddies.setAttribute("alt" , "image d'un ourson en peluche");

    titleIndexPicture.setAttribute("class" , "card-title");

    nameIndexTeddies.setAttribute("class" , "cards__item__body--name");

    colorsIndexTeddies.setAttribute("class" , "cards__item__body--colors");

    descriptionIndexTeddies.setAttribute("class" , "cards-text");

    priceIndexTeddies.setAttribute("class" , "cards__items__body--price");

    btnIndexContainer.setAttribute("class" , "cards__item--button");

    btnIndexProduct.setAttribute("class" , "btn btn-primary");
    btnIndexProduct.setAttribute("href" , "./product.html?id="+ data._id);
   

//Agencement des éléments 
    
    bodyContainer.appendChild(pictureIndexTeddies);

    bodyContainer.appendChild(titleIndexPicture);

    bodyContainer.appendChild(nameIndexTeddies);

    bodyContainer.appendChild(colorsIndexTeddies);

    bodyContainer.appendChild(descriptionIndexTeddies);

    bodyContainer.appendChild(priceIndexTeddies);

    bodyContainer.appendChild(btnIndexContainer);

    btnIndexContainer.appendChild(btnIndexProduct);

    listTeddies.appendChild(masterContainer);

    masterContainer.appendChild(bodyContainer);
    
//Contenu des balises 

    titleIndexPicture.textContent = data.name;

    nameIndexTeddies.textContent = "Nom: " + data.name;

    colorsIndexTeddies.textContent = "Couleurs: " + data.colors;

    descriptionIndexTeddies.textContent = "Description: " + data.description;

    priceIndexTeddies.textContent = "Prix: " + data.price/100 + " €";

    btnIndexProduct.textContent = "Voir l'ourson ";

};

