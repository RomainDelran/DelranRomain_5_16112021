


let maListeDeCanape = [];

    let monStockage = localStorage;
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


    //Donne le numero d'un canape dans la liste en fonction de l'Id et de la couleur
    function numeroCanapeDansListe (idTemp, colorTemp, listeCanapeTemp){
        for (i=0 ; i<listeCanapeTemp.length; i++){
            if ((idTemp == (listeCanapeTemp[i])[0]) & (colorTemp == (listeCanapeTemp[i])[1]) ){
                return i ; 
            }
        }
    }



    //fonction transformant le localstorage en liste de canape et en elimnant les doublons
    function canapeToLocalStorage () {

            //transforme le localStorage en liste de canape
            if (JSON.parse(localStorage.getItem("listeCanape"))!==null){
                maListeDeCanape = JSON.parse(localStorage.getItem("listeCanape"));
            } 
            
            suprimerUnCanapeEnDoublon ();

            //transforme la liste de canape en local storage
            localStorage.setItem("listeCanape",JSON.stringify(maListeDeCanape));
    }

    canapeToLocalStorage ();
    




    //fonction retrouvant le bon canape et retournant ses caracteristique
    function trouverCanape (canapeATester, listeCanapeTemp) {
        let canapeSelectioneApp;
        let bonCanape = false ;
        let n = 0;
        while ( !bonCanape || n < listeCanapeTemp.length ){
            var canape = listeCanapeTemp[n];

            if (canapeATester[0] == canape._id) {
                canapeSelectioneApp = canape ;
                bonCanape = true ; 
            }
            n++;
        }
        return canapeSelectioneApp;
    }


//place un canape envoyé en argument dans la liste
function placeUnCanapeSelectionne (canapeTemp){

    //retrouve le bon canape dans la liste
    let bonCanapeDansLaListe = trouverCanape (canapeTemp,listeDeTousLesCanapes);
    

    //place la balise article
    const sectionTemp = document.getElementById ('cart__items');
    let newArticle =  document.createElement('article');
    newArticle.className = "cart__item";
    newArticle.dataset.id = canapeTemp[0];
    newArticle.dataset.color = canapeTemp[1];
    
 
    //Place l'image de l'article
    let newDivImg =  document.createElement('div');
    newDivImg.className = "cart__item__img";
    let newImg =  document.createElement('img');
    newImg.src = bonCanapeDansLaListe.imageUrl ;
    newImg.alt = bonCanapeDansLaListe.altTxt ;
    newDivImg.appendChild(newImg);
    newArticle.appendChild(newDivImg);

    //description du produit
    let newDivCartItemContent =  document.createElement('div');
    newDivCartItemContent.className = "cart__item__content";
    let newDivCartItemContentDescription =  document.createElement('div');
    newDivCartItemContentDescription.className = "cart__item__content__description";
    newDivCartItemContent.appendChild(newDivCartItemContentDescription);
    newArticle.appendChild(newDivCartItemContent);

    let newNomProduit =  document.createElement('h2');
    newNomProduit.appendChild(document.createTextNode(bonCanapeDansLaListe.name));
    let newCouleurProduit =  document.createElement('p');
    newCouleurProduit.appendChild(document.createTextNode(canapeTemp[1]));
    let newCanapePrice =  document.createElement('p');
    newCanapePrice.appendChild(document.createTextNode(bonCanapeDansLaListe.price));
    newDivCartItemContentDescription.appendChild(newNomProduit);
    newDivCartItemContentDescription.appendChild(newCouleurProduit);
    newDivCartItemContentDescription.appendChild(newCanapePrice);

    //Quantite du produit
    let newDivCartItemContentSettings =  document.createElement('div');
    newDivCartItemContentSettings.className = "cart__item__content__settings";
    let newDivCartItemContentSettingsQuantity =  document.createElement('div');
    newDivCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    let newPQuantite =  document.createElement('p');
    newPQuantite.appendChild(document.createTextNode("Qté : "));
    let newInputNumber =  document.createElement('input');
    newInputNumber.type = "number";
    newInputNumber.className = "itemQuantity";
    newInputNumber.name = "itemQuantity";
    newInputNumber.min = "1";
    newInputNumber.max = "100";
    newInputNumber.value = canapeTemp[2];
    newDivCartItemContentSettingsQuantity.appendChild(newPQuantite);
    newDivCartItemContentSettingsQuantity.appendChild(newInputNumber);
    newDivCartItemContentSettings.appendChild(newDivCartItemContentSettingsQuantity);
    newDivCartItemContent.appendChild(newDivCartItemContentSettings);

    //supprimer produit
    let newDivCartItemContentSettingsDelete =  document.createElement('div');
    newDivCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    newDivCartItemContentSettings.appendChild(newDivCartItemContentSettingsDelete);
    let divPDeleteItem = document.createElement('p');
    divPDeleteItem.className = "deleteItem";
    divPDeleteItem.appendChild(document.createTextNode("Supprimer"));
    newDivCartItemContentSettingsDelete.appendChild(divPDeleteItem);

    sectionTemp.appendChild(newArticle);
}



//fonction donnant la quantite d'article et le prix total
let initialisationQuantiteArticleEtPrixTotal = false;
function quantiteArticleEtPrixTotal () {
    let prixTotal = 0;
    let quantiteArticle = 0;
    
    for (i=0 ; i<maListeDeCanape.length ; i++) {
        quantiteArticle = (parseInt(quantiteArticle, 10)) + (parseInt(((maListeDeCanape[i])[2]), 10));
        
        let bonCanapeDansLaListe = trouverCanape (maListeDeCanape[i],listeDeTousLesCanapes);
        prixTotal = parseInt(prixTotal, 10) + (parseInt((bonCanapeDansLaListe.price), 10) * (parseInt((maListeDeCanape[i])[2], 10))) ;
    }

    //place la quantite total et le prix total de la commande
    let totalQuantity = document.getElementById ('totalQuantity');
    let totalPrice = document.getElementById ('totalPrice');

    if (!initialisationQuantiteArticleEtPrixTotal) {      
        totalQuantity.appendChild(document.createTextNode(quantiteArticle));
        totalPrice.appendChild(document.createTextNode(prixTotal));
        initialisationQuantiteArticleEtPrixTotal = true ;
    }   else {
        totalQuantity.textContent =quantiteArticle;
        totalPrice.textContent =prixTotal;
    }
}



let  itemQuantity;

var listeDeTousLesCanapes = [];
fetch("http://localhost:3000/api/products")
.then(function(response) {
    return response.json();
  })
  .then(function(json) {

    listeDeTousLesCanapes = json ;

    for (i=0 ; i<maListeDeCanape.length ; i++ ){
        placeUnCanapeSelectionne (maListeDeCanape[i]);
        console.log (maListeDeCanape[i]);
    }
    quantiteArticleEtPrixTotal ();



    //ajoute le canape dans le local storage et modifi la quantite et le prix final
    itemQuantity = document.getElementsByClassName ('itemQuantity');
     for (n=0 ; n<itemQuantity.length ; n++){
        
        let itemSelectionne =itemQuantity[n];

        itemQuantity[n].addEventListener('click', event => {
           
            let idCanapeSelectionne= itemSelectionne.closest("article").dataset.id;
            let colorCanapeSelectionne= itemSelectionne.closest("article").dataset.color;

            let numeroCanapeSelectionne = numeroCanapeDansListe (idCanapeSelectionne, colorCanapeSelectionne, maListeDeCanape);
            
            (maListeDeCanape[numeroCanapeSelectionne])[2] = parseInt(itemSelectionne.value, 10);
            
            localStorage.setItem("listeCanape",JSON.stringify(maListeDeCanape));
            quantiteArticleEtPrixTotal ();
        })
    }



    //Supprime un canape de la liste et du local storage
    itemDelete = document.getElementsByClassName ('deleteItem');
    for (n=0 ; n<itemQuantity.length ; n++){
        
        let itemSelectionneDelete =itemDelete[n];

        itemDelete[n].addEventListener('click', event => {
           
            let idCanapeSelectionneDelete= itemSelectionneDelete.closest("article").dataset.id;
            let colorCanapeSelectionneDelete= itemSelectionneDelete.closest("article").dataset.color;

            let numeroCanapeSelectionneDelete = numeroCanapeDansListe (idCanapeSelectionneDelete, colorCanapeSelectionneDelete, maListeDeCanape);
            
            maListeDeCanape.splice(numeroCanapeSelectionneDelete , 1);
       
            localStorage.setItem("listeCanape",JSON.stringify(maListeDeCanape));

            quantiteArticleEtPrixTotal ();

            itemSelectionneDelete.closest("article").remove(); 
            
        })
    }
  })

  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });












//fonction determinant si un prenom ou un nom est valide
function validateName (elementValue){      
    var nameRegex = /^[a-zA-Z\-]+$/;
    return nameRegex.test(elementValue); 
  } 
  
//function recupérant le prenom entré et le testant avec un message d'erreur si nécéssaire
let entreFirstName = document.getElementById ('firstName');
let entreFirstNameErrorMsg = document.getElementById ('firstNameErrorMsg');
function validationPrenom (){
    if (validateName(entreFirstName.value)){
        entreFirstNameErrorMsg.textContent = "";
        contacts.firstName = entreFirstName.value;
    }else {
        entreFirstNameErrorMsg.textContent = "Erreur: le nom doit être composé uniquement de caractére";
    }
}
//function recupérant le nom entré et le testant avec un message d'erreur si nécéssaire
let entreLastName = document.getElementById ('lastName');
let entreLastNameErrorMsg = document.getElementById ('lastNameErrorMsg');
function validationNom (){
    if (validateName(entreLastName.value)){
        entreLastNameErrorMsg.textContent = "";
        contacts.lastName = entreLastName.value;
    }else {
        entreLastNameErrorMsg.textContent = "Erreur: le nom doit être composé uniquement de caractére";
    }
}
//fonction determinant si une adresse est valide
function validateAdresse (elementValue){      
    var adresseRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    return adresseRegex.test(elementValue); 
  } 
  
//function recupérant le prenom entré et le testant avec un message d'erreur si nécéssaire
let entreAddress = document.getElementById ('address');
let entreAddressErrorMsg = document.getElementById ('addressErrorMsg');
function validationAdresse (){
    if (validateAdresse(entreAddress.value)){
        entreAddressErrorMsg.textContent = "";
        contacts.address = entreAddress.value;
    }else {
        entreAddressErrorMsg.textContent = "Erreur: adresse invalid";
    }
}
//function recupérant la ville entré et la testant avec un message d'erreur si nécéssaire
let entreCity = document.getElementById ('city');
let entreCityErrorMsg= document.getElementById ('cityErrorMsg');
function validationCity (){
    if (validateName(entreCity.value)){
        entreCityErrorMsg.textContent = "";
        contacts.city = entreCity.value;
    }else {
        entreCityErrorMsg.textContent = "Erreur: ville invalid";
    }
}

//fonction determinant si un Email est valide
function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 
//function recupérant l'Email entré et le testant avec un message d'erreur si nécéssaire
let entreEmail = document.getElementById ('email');
let entreEmailErrorMsg = document.getElementById ('emailErrorMsg');
function validationEmail (){
    if (validateEmail(entreEmail.value)){
        emailErrorMsg.textContent = "";
        contacts.email = entreEmail.value;
    }else {
        emailErrorMsg.textContent = "Erreur: Email invalide";
    }
}
//Fonction créant un tableau avec uniquement les ID des produit
function tableauId (){
    for (i=0 ; i<(maListeDeCanape.length) ; i++){
        for (n=(i+1) ; n<(maListeDeCanape.length); n++){
            if ((maListeDeCanape[i][0]==maListeDeCanape[n][0]) & (i!==n)){
                    
                    maListeDeCanape.splice(n,1);
                    n=n-1;
                }
            }
        products.push( maListeDeCanape[i][0]) ;   
        }
}


//Verifi tout les champs avant validation et envoi l'IdOrder a la page confirmation
let products = [];
let contacts = new Object();
let ButonSubmit = document.getElementById ('order');
ButonSubmit.addEventListener('click', event => {
    event.preventDefault();
    validationPrenom();
    validationNom();
    validationAdresse ();
    validationCity ();
    validationEmail ();

    
    tableauId ();

    let formData = {
        contact:contacts,
        products:products
        }
        
    console.log(formData);
    if (validateEmail(entreEmail.value)&(validateName(entreCity.value))&(validateAdresse(entreAddress.value))&(validateName(entreLastName.value))&(validateName(entreFirstName.value)) ){
        fetch("http://localhost:3000/api/products/order",{ 
            method: "POST",
            body: JSON.stringify(formData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
          })
          
          .then(function(json) {
              location.href = "confirmation.html?id="+json.orderId;
              console.log(json);
            })

        .catch('Il y a eu un problème avec l\'opération fetch2 ');
    }
  
            
});
