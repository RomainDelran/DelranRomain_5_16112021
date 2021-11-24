


//recupere l'url
var urlRecupere = document.location.href;
var url = new URL (urlRecupere);


//recuperel'id produit contenu dans l'url
var searchID = new URLSearchParams(url.search); 
if(searchID.has('id')) {
    var id = searchID.get('id');
  }
  



//fonction retrouvant le bon canape
var canapeSelectione;
var bonCanape = false ;
var n = 0;
function trouverCanape (listeCanapeTemp) {
    while ( !bonCanape || n < listeCanapeTemp.length ){
        var canape = listeCanapeTemp[n];

        if (id == canape._id) {
            canapeSelectione = canape ;
            bonCanape = true ; 
        }
        n++;
    }
}

//fonction placer les element du canape dans le DOM
function placerLesElements (canapeTemp) {

    //créer le visuel du canape
    const placeImage = document.getElementsByClassName ('item__img');
    let canapeImage = canapeTemp.imageUrl;
    let newImage =  document.createElement('img');
    newImage.src = canapeImage;
    let newAltImage =  canapeTemp.altTxt;
    newImage.alt = newAltImage;
    placeImage[0].appendChild(newImage);

    //donne le nom du canape
    const titre = document.getElementById ('title');
    let canapeNom = canapeTemp.name;
    let nomTexte = document.createTextNode(canapeNom);
    titre.appendChild(nomTexte);

    //donne le prix du produit
    const prix = document.getElementById ('price');
    let canapePrix = canapeTemp.price;
    let prixTexte = document.createTextNode(canapePrix);
    prix.appendChild(prixTexte);

    //donne la description du canape
    const description = document.getElementById ('description');
    let canapeDescription = canapeTemp.description;
    let pTexte = document.createTextNode(canapeDescription);
    description.appendChild(pTexte);

    //donne les couleur du canape
    const couleur = document.getElementById ('colors');
    let tableauCouleur = canapeTemp.colors;
    let nombreDeCouleur = tableauCouleur.length;

    for (let i = 0; i < nombreDeCouleur; i++){

        let newColor =  document.createElement('option');
        newColor.value = canapeTemp.colors[i];
        let couleurTexte = document.createTextNode(canapeTemp.colors[i]);
        newColor.appendChild(couleurTexte);

        couleur.appendChild(newColor);
    }
}


  var listeCanape = [];

  fetch("http://localhost:3000/api/products")
.then(function(response) {
    return response.json();
  })
  .then(function(json) {
    listeCanape = json ;
    
    trouverCanape (listeCanape);

    placerLesElements (canapeSelectione);


  })

  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  })