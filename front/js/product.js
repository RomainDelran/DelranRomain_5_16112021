




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
 

    //transforme le localStorage en liste de canape
    function localStorageToListeCanape () {
        let monStockageTemp = localStorage;
        let nombreDeCanapes = (monStockageTemp.length)/3;
        maListeDeCanape = [];
        for (let i =0 ; i<nombreDeCanapes ; i++){
            let canapeIdTemp =localStorage.getItem("canapeId"+i);
            let canapeColorTemp =localStorage.getItem("canapeColor"+i);
            let canapeQuantiteTemp =parseInt(localStorage.getItem("canapeQuantite"+i), 10);
            let monCanapeTemp = []
            monCanapeTemp.push (canapeIdTemp);
            monCanapeTemp.push (canapeColorTemp);
            monCanapeTemp.push (canapeQuantiteTemp);
            maListeDeCanape.push (monCanapeTemp);

        }
    }

    //transforme la liste de canape en local storage
    function listeCanapeToLocalStorage () {
        
        let nombreDeCanapes = (maListeDeCanape.length);

        localStorage.clear();

        for (let i =0 ; i<nombreDeCanapes ; i++){
            localStorage.setItem("canapeId"+i ,maListeDeCanape[i][0] );
            localStorage.setItem("canapeColor"+i ,maListeDeCanape[i][1] ); 
            localStorage.setItem("canapeQuantite"+i ,maListeDeCanape[i][2] );    
        }
    }

   //Verifi que 2 canape ne sont pas identique retourne un booleen
   function siDeuxCanapeSontIdentique (canapeA , canapeB) {
    if ((canapeA[0] == canapeB[0]) & (canapeA[1] == canapeB[1])){
        return true;
    } else {
        return false;
    }
}



    //fonction qui verifi et suprime les canape en doublon
    function suprimerUnCanapeEnDoublon () {
        
        for (i=0 ; i<(maListeDeCanape.length) ; i++){
            for (n=(i+1) ; n<(maListeDeCanape.length); n++){
                if ((siDeuxCanapeSontIdentique (maListeDeCanape[i] , maListeDeCanape[n])) & (i!==n)){
                    
                    (maListeDeCanape[i])[2] = (maListeDeCanape[i])[2] + (maListeDeCanape[n])[2];
                   
                    maListeDeCanape.splice(n);
                    n=n-1;
                }
            }
        }
    }

 

    //ajouter un produit selectioné avec un numero de canape
    function ajouterUnProduitSelectionne (n , produitsSelectioneTemp){
        
        monStockage.setItem("canapeId"+n ,produitsSelectioneTemp[0] );
        monStockage.setItem("canapeColor"+n ,produitsSelectioneTemp[1] ); 
        monStockage.setItem("canapeQuantite"+n ,produitsSelectioneTemp[2] );
    }



    



    addToCart.addEventListener('click', event => {
        if ((id != null)&(quantiteUtilisateur>0)&(quantiteUtilisateur<101)&(couleurUtilisateur != null)&(couleurUtilisateur !== "")) {
            //localStorage.clear();

            produitsSelectione = [id , couleurUtilisateur , quantiteUtilisateur ];
            let n = (localStorage.length)/3;
            ajouterUnProduitSelectionne (n,produitsSelectione);
            
            localStorageToListeCanape ();
            
            suprimerUnCanapeEnDoublon ();

            listeCanapeToLocalStorage ();
            
            console.log (maListeDeCanape);
            console.log(localStorage);
        }
      } );

