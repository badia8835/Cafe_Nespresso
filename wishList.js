
const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

const messageDiv = document.getElementById('message');
const deleteAllProductsButton = document.getElementById('deleteAllProducts');

// Fetch une list wishliste

fetchWishList();

function fetchWishList() {
  fetch(`${API_URL}/wishlist/`)
    .then(resultWishlist => resultWishlist.json())
    .then(resultWishlist => {

        if(resultWishlist.length === 0){

          deleteAllProductsButton.classList.add('hidden');
          showMessage('La liste de favoris est vide');
  
        }else{

          deleteAllProductsButton.classList.remove('hidden');
          deleteAllProductsButton.addEventListener('click', function() {deleteAllProductsFromWishList();});
          for (let index = 0; index < resultWishlist.length; index++) {
  
            creatFormToDisplayProduct(resultWishlist,index);

          }
        }       
    })

    calculTotalProductAddToCart ()
}

function creatFormToDisplayProduct(resultWishlist,index) {
  const divRow = document.createElement('div');
  const divColMd6 = document.createElement('div');
  const productImage = document.createElement('img');
  const divColMd8 = document.createElement('div');
  const h2ProductName = document.createElement('h2');
  const pDescription = document.createElement('p');
  const h2Price = document.createElement('h4');
  const divBlockButton = document.createElement('div');
  const buttonDeleteProduct = document.createElement('button');
  const buttonProductDetail = document.createElement('button');

  divRow.setAttribute('class', 'row container aligns-items-center mb-3 border border-white');
  divRow.setAttribute('style', 'width: 30rem;');

  productImage.setAttribute('class', 'img-fluid');
  productImage.setAttribute('id', 'productImage');
  productImage.setAttribute('alt', 'Product Image');
  productImage.setAttribute('src', resultWishlist[index].image);

  h2ProductName.setAttribute('id', 'productName');
  h2ProductName.textContent = resultWishlist[index].name

  pDescription.setAttribute('id', 'description');
  pDescription.textContent = resultWishlist[index].description

  h2Price.setAttribute('id', 'price');
  h2Price.textContent = "$"+resultWishlist[index].price

  buttonDeleteProduct.setAttribute('id', 'deleteProduct');
  buttonDeleteProduct.setAttribute('class', 'btn btn-outline-danger');
  buttonDeleteProduct.addEventListener('click', function() {deleteProductFromWishList(resultWishlist[index].id);});
  buttonDeleteProduct.textContent = "Suprimer de la liste des favoris ";

  buttonProductDetail.setAttribute('id', 'productDetails');
  buttonProductDetail.setAttribute('class', 'btn btn-outline-primary ajust-button');
  buttonProductDetail.setAttribute('onclick', "window.location.href='product-details.html?id=" + resultWishlist[index].id + "'");
  buttonProductDetail.textContent = "voir le details";

  divColMd6.appendChild(productImage);

  divColMd8.appendChild(h2ProductName);
  divColMd8.appendChild(pDescription);
  divColMd8.appendChild(h2Price);
  divBlockButton.appendChild(buttonDeleteProduct);
  divBlockButton.appendChild(buttonProductDetail);
  divColMd8.appendChild(divBlockButton);
  
  divRow.appendChild(divColMd6);
  divRow.appendChild(divColMd8);

  const containerPosts = document.getElementById('container-products')
  containerPosts.appendChild(divRow);
}

// Fonction pour supprimer un café
function deleteProductFromWishList(productId) {
  fetch(`${API_URL}/wishlist/delete-product/${productId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchWishList();
        location.reload(); // Rafraîchir la page
      } else {
        throw new Error('Erreur lors de la suppression de produit de la liste des mes favoris');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de produit de la liste des mes favoris :', error);
      showMessage('Erreur: lors de la suppression de produit de la liste des mes favoris. Veuillez réessayer.');
    });
}

// Fonction pour supprimer un café
function deleteAllProductsFromWishList() {
  fetch(`${API_URL}/wishlist/clear`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchWishList();
        location.reload(); // Rafraîchir la page
      } else {
        throw new Error('Erreur lors de la suppression de toutes produit de la liste des favoris');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de toutes produit de la liste de favoris :', error);
      showMessage('Erreur: lors de la suppression de toutes produit de la liste de favoris. Veuillez réessayer.');
    });
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(message) {
  deleteAllProductsButton.classList.add('hidden');
  messageDiv.setAttribute('class', 'aligns-items-center mb-3 border border-white p-3 mb-2 bg-danger text-white');
  messageDiv.textContent = message;
}


//fonction pour calculr le tolal de produit qui a ete ajoute au panier
function calculTotalProductAddToCart (){

  fetch(`${API_URL}/cart/`)
  .then(resultCartlist => resultCartlist.json())
  .then(resultCartlist => {

    if (resultCartlist.length === 0) {
    } else {
 
      let totalProductAddToCart = 0;
      for (let i = 0; i < resultCartlist.length; i++) {
        totalProductAddToCart = totalProductAddToCart+ resultCartlist[i].quantity;
      }
      var cartSpanButton = document.getElementById('cartSpanButton');
      cartSpanButton.textContent=totalProductAddToCart;
    }

  })
}
  