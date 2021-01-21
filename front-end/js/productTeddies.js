//PAGE PRODUIT DES OURSONS //

const descriptionTeddies = document.getElementById('descriptionTeddies');

var str = "http://localhost:3000/api/teddies/"+_id;
var url = new URL(str);
var essais = url.searchParams.get("essais");
console.log(essais);


/*const productTeddies = function () {
    

    //Création des balises sous forme de cards 
    let pictureContainer = document.createElement ("div");

    let pictureTeddies = document.createElement ("img");

    let containerTeddies = document.createElement ("div");

    let titleTeddies = document.createElement ("h3") ;

    //Ajout des attributs au balises pour la création du style
    pictureContainer.setAttribute("class", "card__item__thumb");

    pictureTeddies.setAttribute("src",data.imageUrl);
    pictureTeddies.setAttribute("alt","image d'un ourson en peluche");

    containerTeddies.setAttribute("class" , "cards__items__body")

    titleTeddies.setAttribute("class", "cards__items__body--title");
    titleTeddies.setAttribute("input", "hidden" );

    //Agencement des éléments 
    descriptionTeddies.appendChild(pictureContainer);

    pictureContainer.appendChild(pictureTeddies);

    descriptionTeddies.appendChild(containerTeddies);

    containerTeddies.appendChild(titleTeddies);

    //Contenu des balises 
    

    titleTeddies._id = data.name;

    //colorsTeddies.textContent = "Couleurs: " + data.colors;

    //descriptionTeddies.textContent = "Description: " + data.description;

    //priceTeddies.textContent = "Prix: " + data.price + " €";

    //btnProduct.textContent = "Voir l'ourson ";

};*/









