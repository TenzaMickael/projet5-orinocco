//APPELLE DE L'API DES OURSONS 


// Import de l'Id "listTeddies"

const listTeddies = document.getElementById('listTeddies');

//Requete XMLHttpRequest pour récupérer l'API des oursons


getAllTeddies ();


//Création d'une fonction pour mettre en place les donnée récupérées de l'API 

function teddies (data) {


    let masterContainer = document.createElement ("div"); 
    masterContainer.setAttribute("class", "card") ;
    listTeddies.appendChild(masterContainer);
        let bodyContainer = document.createElement ("div");
        bodyContainer.setAttribute("class", "card-body");
        masterContainer.appendChild(bodyContainer);

    let pictureIndexTeddies = document.createElement ("img");
    pictureIndexTeddies.setAttribute("src",data.imageUrl);
    pictureIndexTeddies.setAttribute("class","card-img-top");
    pictureIndexTeddies.setAttribute("alt" , "image d'un ourson en peluche");
    bodyContainer.appendChild(pictureIndexTeddies);

    let titleIndexPicture = document.createElement ("h3");
    titleIndexPicture.setAttribute("class" , "card-title");
    bodyContainer.appendChild(titleIndexPicture);
    titleIndexPicture.textContent = data.name;

    let nameIndexTeddies = document.createElement ("p");
    nameIndexTeddies.setAttribute("class" , "card-text");
    bodyContainer.appendChild(nameIndexTeddies);
    nameIndexTeddies.textContent = "Nom: " + data.name;

    let colorsIndexTeddies = document.createElement ("p");
    colorsIndexTeddies.setAttribute("class" , "card-text");
    bodyContainer.appendChild(colorsIndexTeddies);
    colorsIndexTeddies.textContent = "Couleurs: " + data.colors;

    let descriptionIndexTeddies = document.createElement ("p");
    descriptionIndexTeddies.setAttribute("class" , "cards-text");
    bodyContainer.appendChild(descriptionIndexTeddies);
    descriptionIndexTeddies.textContent = "Description: " + data.description;

    let priceIndexTeddies = document.createElement ("p");
    priceIndexTeddies.setAttribute("class" , "card-text");
    bodyContainer.appendChild(priceIndexTeddies);
    priceIndexTeddies.textContent = "Prix: " + data.price/100 + " €";

    let btnIndexContainer = document.createElement ("div");
    btnIndexContainer.setAttribute("class" , "cards__item--button");
    btnIndexContainer.setAttribute ("id" , "btnProduct")
    bodyContainer.appendChild(btnIndexContainer);

    let btnIndexProduct = document.createElement ("a");
    btnIndexProduct.setAttribute("class" , "btn btn-outline-info");
    btnIndexProduct.setAttribute("id" , "btnIndexProduct");
    btnIndexProduct.setAttribute("href" , "./product.html?id="+ data._id);
    btnIndexContainer.appendChild(btnIndexProduct);
    btnIndexProduct.textContent = "Voir l'ourson ";
};

