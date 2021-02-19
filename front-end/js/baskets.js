


//Requete XMLHttpRequest pour récupérer l'API des oursons



//Import de l'ID "basket" dans le code html 





const basket = document.getElementById("basket");

    

let itemsTeddies = JSON.parse(sessionStorage.getItem("selectTeddies"));


for (let i = 0;i < itemsTeddies.length; i++) {

const essais = itemsTeddies.map (function () {return itemsTeddies[i++]});
console.log(essais);

    

        var request = new XMLHttpRequest();                                         

        request.onreadystatechange = function () {                                  

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

                const response = JSON.parse (this.responseText)                 
                basketTeddies(response); 
                //console.log(itemsTeddies)                      
            }; 
        }; 
        
        request.open ("GET" , "http://localhost:3000/api/teddies/"+id);             
        request.send();
        
        
};       


function basketTeddies (data) {}

   // let productBasket = document.createElement("main");
   // productBasket.setAttribute ("class" , "cards__item__thumb");      
   // basket.appendChild(productBasket);

   // let essais = document.createElement("img");
      //  essais.setAttribute ("id" , "cards__item__thumb"); 
      //  essais.dataset.idteddie =  itemsTeddies.data.imageUrl;
    
        
     //   essais.setAttribute("alt","image d'un ours en peluche");     
     //   productBasket.appendChild(essais);
     //   //essais.textContent = "Nom: " + itemsTeddies[i] ;






    //};
    

 
//1) Aller chercher le sessionStorage
//2) Faire une boucle pour récupérer les ids
    //3) Faire une requete pour récupérer les oursons par rapport à leur ID => avec l'URL 
    //4) Retranscrire les infos en injectant dans le code HTML avec les paramètres qui y corresponde 

//faire une fonction avec en parametre la réponse de la requete 

//la fonction sert à injecter le code html avec des cartes pour chaque oursons pour la page 









   

    

    //Import du sessionStorage







