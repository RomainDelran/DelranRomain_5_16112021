
console.log(localStorage);
try {
    console.log(localStorage);
  } catch(e){console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);}




fetch("http://localhost:3000/api/products")
.then(function(response) {
    return response.json();
  })
  .then(function(json) {
    //listeCanape = json ;
    
    console.log(localStorage);
  })

  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });