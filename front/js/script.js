


var listeCanape = [];



// Fonction créant le visuel d'un canape
function canapeAAjouter (canape){
  const sectionItems = document.getElementById ('items');
  
  let canapeID = canape._id;
  let newA = document.createElement('a');
  newA.href = "product.html?id="+ canapeID;

  let newArticle = document.createElement('article');

  let canapeImage = canape.imageUrl;
  let newImage =  document.createElement('img');
  newImage.src = canapeImage;
  let newAltImage =  canape.altTxt;
  newImage.alt = newAltImage;

  let canapeNom = canape.name;
  let newH3 =  document.createElement('h3');
  newH3.className = "productName";
  let H3Texte = document.createTextNode(canapeNom);
  newH3.appendChild(H3Texte);

  let canapeDescription = canape.description;
  let newP = document.createElement('p');
  newP.className = "productDescription";
  let pTexte = document.createTextNode(canapeDescription);
  newP.appendChild(pTexte);

  newArticle.appendChild(newImage);
  newArticle.appendChild(newH3);
  newArticle.appendChild(newP);
  newA.appendChild(newArticle);
  
  sectionItems.appendChild(newA);
}


fetch("http://localhost:3000/api/products")
.then(function(response) {
    return response.json();
  })
  .then(function(json) {
    // recuperer la liste des canapé
    listeCanape = json ;
    console.log(listeCanape[0]);


    //met en place tout les canape sur la page d'acceuil
    for (let i=0; i< listeCanape.length ; i++) {
      canapeAAjouter (listeCanape[i]);
    }
    

    
  })
  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  })

  

  







  



   

 



