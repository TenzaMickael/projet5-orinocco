



const basket = document.getElementById("basket");

    

let itemsTeddies = JSON.parse(sessionStorage.getItem("selectTeddies"));

for (let i = 0;i < itemsTeddies.length; i++) {

    var id =  itemsTeddies[0].id 

    var request = new XMLHttpRequest();                                         

    request.onreadystatechange = function () {                                  

        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {     

            const response = JSON.parse (this.responseText)                 
            basketTeddies(response);  
                            
        }; 
    }; 
};       
        request.open ("GET" , "http://localhost:3000/api/teddies/"+id);             
        request.send();
        
        function basketTeddies (itemsTeddies , data ) {
          console.log (itemsTeddies.imageUrl)
                
               let productBasket = document.createElement("main");
                productBasket.setAttribute ("class" , "cards__item__thumb");      
                basket.appendChild(productBasket);
            
                let essais = document.createElement("img");
                    essais.setAttribute ("class" , "image__teddies__product"); 

                   
                   essais.dataset.picture =  itemsTeddies.imageUrl;
                  // essais.dataset.picture = itemsTeddies.imageUrl
               console.log(itemsTeddies.imageUrl)
                   
                    essais.setAttribute("alt","image d'un ours en peluche");     
                    productBasket.appendChild(essais);
                 
            }
        





    








    //};
    

 
//1) Aller chercher le sessionStorage
//2) Faire une boucle pour récupérer les ids
    //3) Faire une requete pour récupérer les oursons par rapport à leur ID => avec l'URL 
    //4) Retranscrire les infos en injectant dans le code HTML avec les paramètres qui y corresponde 

//faire une fonction avec en parametre la réponse de la requete 

//la fonction sert à injecter le code html avec des cartes pour chaque oursons pour la page 









   

    

    //Import du sessionStorage







