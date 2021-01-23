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

    let pictureTeddies = document.createElement ("img");

    let titlePicture = document.createElement ("h3");

    let nameTeddies = document.createElement ("p");

    let colorsTeddies = document.createElement ("p");

    let descriptionTeddies = document.createElement ("p");

    let priceTeddies = document.createElement ("p");

    let btnContainer = document.createElement ("div");

    let btnProduct = document.createElement ("a");


//Ajout des attributs au balises pour la création du style

    masterContainer.setAttribute("class", "card") ;

    bodyContainer.setAttribute("class", "card-body");

    pictureTeddies.setAttribute("src",data.imageUrl);
    pictureTeddies.setAttribute("class","card-img-top");
    pictureTeddies.setAttribute("alt" , "image d'un ourson en peluche");

    titlePicture.setAttribute("class" , "card-title");

    nameTeddies.setAttribute("class" , "cards__item__body--name");

    colorsTeddies.setAttribute("class" , "cards__item__body--colors");

    descriptionTeddies.setAttribute("class" , "cards-text");

    priceTeddies.setAttribute("class" , "cards__items__body--price");

    btnContainer.setAttribute("class" , "cards__item--button");

    btnProduct.setAttribute("class" , "btn btn-primary");
    btnProduct.setAttribute("href" , "./product.html?id="+ data._id);
   

//Agencement des éléments 
    
    bodyContainer.appendChild(pictureTeddies);

    bodyContainer.appendChild(titlePicture);

    bodyContainer.appendChild(nameTeddies);

    bodyContainer.appendChild(colorsTeddies);

    bodyContainer.appendChild(descriptionTeddies);

    bodyContainer.appendChild(priceTeddies);

    bodyContainer.appendChild(btnContainer);

    btnContainer.appendChild(btnProduct);

    listTeddies.appendChild(masterContainer);

    masterContainer.appendChild(bodyContainer);
    
//Contenu des balises 

    titlePicture.textContent = data.name;

    nameTeddies.textContent = "Nom: " + data.name;

    colorsTeddies.textContent = "Couleurs: " + data.colors;

    descriptionTeddies.textContent = "Description: " + data.description;

    priceTeddies.textContent = "Prix: " + data.price/100 + " €";

    btnProduct.textContent = "Voir l'ourson ";

};

