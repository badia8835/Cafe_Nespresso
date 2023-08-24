// Parse the URL to get query parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the "id" parameter
const productId = urlParams.get('id');

const messageDivPromotion = document.getElementById('messageInformationPromotion');
const messageDivCart = document.getElementById('messageInformationCart');
const messageDivLastSee = document.getElementById('messageInformationLastSee');

const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

const addToWishListButton = document.getElementById('addToWishList');

const quantitySelect = document.getElementById('quantitySelect');

fetchProductList(productId);

// retrieve un produit  
function fetchProductList(productId) {

// Fetch  un produit
fetch(`${API_URL}/products/`+productId+'')
  .then(resultProduct => resultProduct.json())
  .then(resultProduct => {

      if(resultProduct.length === 0){

        showMessage('Erreur lors de l\'ajout un produit au liste de favoris. Veuillez réessayer.');

      }else{

        productImage=document.getElementById("productImage");
        productImage.src=resultProduct.image;

        productName=document.getElementById("productName");
        productName.textContent=resultProduct.name;

        description=document.getElementById("description");
        description.textContent=resultProduct.description;

        price=document.getElementById("price");
        price.textContent="$"+resultProduct.price;

        categoryName=document.getElementById("categoryName");
        categoryName.textContent=resultProduct.category.name;

        colorName=document.getElementById("colorName");
        colorName.textContent=resultProduct.color.name;
        fetchWishList(productId);  

        validateProductDiscountCartLastSee(productId);
      }   
    
  })

  calculTotalProductAddToCart();

}

// retrieve la liste de wishlist pour une produit 
function fetchWishList(productId) {
  const addToWishListButton = document.getElementById('addToWishList');
  fetch(`${API_URL}/wishlist/`)
    .then(resultWishlist => resultWishlist.json())
    .then(resultWishlist => {
        if(resultWishlist.length === 0){
          //enable le button de Ajouter au favoris
          addToWishListButton.classList.disabled = false;
        }else{
          let productInWishlist = false;
           for (let index = 0; index < resultWishlist.length; index++) {

            if (resultWishlist[index].id === parseInt(productId)) {
              productInWishlist = true;
               break;
            }           
           }
           addToWishListButton.disabled = productInWishlist;  
        }         
    })
}

// Fonction pour ajouter un product to wishlist
function addProductToWishList() {
  const data = {
    "productId": `${productId}`
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': `${API_URL}/wishlist/add-product`
    },
    body: JSON.stringify(data)
  };

  fetch(`${API_URL}/wishlist/add-product`, options)
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
      fetchProductList(productId);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout un produit au liste de favoris :', error);
      showMessage('Erreur lors de l\'ajout un produit au liste de favoris. Veuillez réessayer.');
    });
}


// Fonction pour ajouter un produit  au panier
function addProductToCart() {

  const data = {
    "productId": `${productId}`,
    "quantity": quantitySelect.value 
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': `${API_URL}/cart/add-product`
    },
    body: JSON.stringify(data)
  };

  fetch(`${API_URL}/cart/add-product`, options)
    .then(response => response.json())
    .then(result => {
      console.log('Response:', result);
      fetchProductList(productId);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout un produit au panier :', error);
      showMessage('Erreur lors de l\'ajout un produit au panier. Veuillez réessayer.');
    });
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(message, messageDiv) {
  messageDiv.setAttribute('class', 'aligns-items-center mb-1 border border-white p-1 mb-1  bg-info text-white');
  messageDiv.textContent = message;
}

//fonction pour calculr le tolal de produit qui a ete ajoute au panier
function calculTotalProductAddToCart (){

  fetch(`${API_URL}/cart/`)
  .then(resultCartlist => resultCartlist.json())
  .then(resultCartlist => {

    if (resultCartlist.length === 0) {
      showMessage('La liste de couleurs est vide');
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

// retrieve la liste de wishlist pour une produit 
function validateProductDiscountCartLastSee(productId) {

  fetch(`${API_URL}/promotions/`)
    .then(resultPromotions => resultPromotions.json())
    .then(resultPromotions => {
        if(resultPromotions.length === 0){
        }else{
          let isPromotional = false;
          let discountPercent = "";
           for (let index = 0; index < resultPromotions.length; index++) {
            if (resultPromotions[index].productId === parseInt(productId)) {
              discountPercent =resultPromotions[index].discountPercent
              isPromotional = true;
               break;
            }           
           }
           
           if (isPromotional === true) {
            showMessage('Ce produit a une rabais de '+discountPercent+` % !!`,messageDivPromotion);
           }


        }         
    })

    fetch(`${API_URL}/cart/`)
    .then(resultCartList => resultCartList.json())
    .then(resultCartList => {
        if(resultCartList.length === 0){

        }else{
          let isInCartList = false;
           for (let index = 0; index < resultCartList.length; index++) {
            if (resultCartList[index].id === parseInt(productId)) {
              isInCartList = true;
               break;
            }           
           }
           
           if (isInCartList === true) {
            showMessage('Ce produit est dejas dans le panier', messageDivCart);
            
           }


        }         
    })

    fetch(`${API_URL}/suggestions/recently-viewed-products/`)
    .then(resultLastSee => resultLastSee.json())
    .then(resultLastSee => {
        if(resultLastSee.length === 0){

        }else{
          let isLastSee = false;
           for (let index = 0; index < resultLastSee.length; index++) {
            if (resultLastSee[index].id === parseInt(productId)) {
              isLastSee = true;
               break;
            }           
           }
           
           if (isLastSee === true) {
            showMessage('vous avez vu recement Ce produit',messageDivLastSee);
           }


        }         
    })


}