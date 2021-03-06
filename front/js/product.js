




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
  });


  //recupere la couleur choisi par l'utilisateur
  let couleurUtilisateur;
  const couleurChoisie = document.getElementById ('colors');
  couleurChoisie.addEventListener("input", function(e) {
      
    couleurUtilisateur  = e.target.value;
    
});


    //recupere la quantité choisi par l'utilisateur et met la valeur par default a 1
    let quantiteUtilisateur=1;
    const quantite = document.getElementById ('quantity');
    quantite.value = 1;
    quantite.addEventListener("input", function(e) {
      
        quantiteUtilisateur  = e.target.value;
        
    });










    
    let produitsSelectione = [id , couleurUtilisateur , quantiteUtilisateur ];
    let addToCart = document.getElementById ('addToCart');
    let monStockage = localStorage;
    let maListeDeCanape = [];
 
   //Verifi que 2 canape ne sont pas identique retourne un booleen
   function siDeuxCanapeSontIdentique (canapeA , canapeB) {
    if ((canapeA[0] == canapeB[0]) & (canapeA[1] == canapeB[1])){
        return true;
    } else {
        return false;
    }
}

    //fonction qui verifie et suprime les canapes en doublon
    function suprimerUnCanapeEnDoublon () {
        
        for (i=0 ; i<(maListeDeCanape.length) ; i++){
            for (n=(i+1) ; n<(maListeDeCanape.length); n++){
                if ((siDeuxCanapeSontIdentique (maListeDeCanape[i] , maListeDeCanape[n])) & (i!==n)){
                    
                    (maListeDeCanape[i])[2] = parseInt((maListeDeCanape[i])[2], 10) + parseInt((maListeDeCanape[n])[2], 10);
                   
                    maListeDeCanape.splice(n,1);
                    n=n-1;
                }
            }
        }
    }

    //fonction ajoutant au localstorage un canape en elimnant les doublons
    function addCanapeToLocalStorage () {

        if ((id != null)&(quantiteUtilisateur>0)&(quantiteUtilisateur<101)&(couleurUtilisateur != null)&(couleurUtilisateur !== "")) {

            //transforme le localStorage en liste de canape
            if (JSON.parse(localStorage.getItem("listeCanape"))!==null){
                maListeDeCanape = JSON.parse(localStorage.getItem("listeCanape"));
            }
            
            //ajouter un produit selectioné a la fin de la liste
            produitsSelectione = [id , couleurUtilisateur , parseInt(quantiteUtilisateur, 10) ];
            maListeDeCanape.push(produitsSelectione); 
            
            suprimerUnCanapeEnDoublon ();

            //transforme la liste de canape en local storage
            localStorage.setItem("listeCanape",JSON.stringify(maListeDeCanape));
        }
    }

    addToCart.addEventListener('click', event => {
        
            addCanapeToLocalStorage ();
            
            console.log(maListeDeCanape);
            console.log(JSON.parse(localStorage.getItem("listeCanape")));
        }
       );

