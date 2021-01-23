//AFFICHAGE DES OURSON SUR LA PAGE DES DÉTAILS


//Récupération des paramètres de l'URL

let params = new URLSearchParams(document.location.search);
let id = params.get('id');

//Requete pour récupérer l'API des oursons 

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
        const response = JSON.parse(this.responseText);
        console.log(response);  
    }
};
request.open("GET" ,"http://localhost:3000/api/teddies/"+id);
request.send();

//Import de l'ID "descriptionTeddies"

const descriptionTeddies = document.getElementById("descriptionTeddies");

//Création d'une fonction pour mettre en place les donnée récupérées de l'API

function productTeddies(_id) {
//Création des balises sous forme de cards 

    let itemContainer = document.createElement("div");  

//Ajout des attributs au balises pour la création du style

    itemContainer.setAttribute("class", "cards__item__thumb");
    
//Agencement des éléments
descriptionTeddies.appendChild(itemContainer);
    

//Contenu des balises

};
