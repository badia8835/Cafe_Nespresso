const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

const messageDiv = document.getElementById('message');
const deleteAllProductsButton = document.getElementById('deleteAllProducts');

// Fetch une liste panier

fetchCartList();

function fetchCartList() {
  fetch(`${API_URL}/cart/`)
    .then(resultCartlist => resultCartlist.json())
    .then(resultCartlist => {
      let Total = 0;

        if(resultCartlist.length === 0){

          deleteAllProductsButton.classList.add('hidden');
          showMessage('Le panier est vide');
          if(parseInt(Total) === 0){
            const checkoutBtn = document.getElementById('checkoutBtn');
            checkoutBtn.setAttribute('disabled', true);
          } 
  
        }else{

          deleteAllProductsButton.classList.remove('hidden');
          deleteAllProductsButton.addEventListener('click', function() {deleteAllProductsFromCart();});

          for (let index = 0; index < resultCartlist.length; index++) {
  
            creatFormToDisplayProduct(resultCartlist,index);
            Total = Total+(resultCartlist[index].price*resultCartlist[index].quantity);
            const totalProduct = document.getElementById('total');
            totalProduct.textContent=Total;

          }
        }       
    })
}

function creatFormToDisplayProduct(resultCartlist,index) {
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
  productImage.setAttribute('src', resultCartlist[index].image);

  h2ProductName.setAttribute('id', 'productName');
  h2ProductName.textContent = resultCartlist[index].name

  pDescription.setAttribute('id', 'description');
  pDescription.textContent = resultCartlist[index].description

  h2Price.setAttribute('id', 'price');
  h2Price.textContent = "$"+resultCartlist[index].price

  buttonDeleteProduct.setAttribute('id', 'deleteProduct');
  buttonDeleteProduct.setAttribute('class', 'btn btn-outline-danger');
  buttonDeleteProduct.addEventListener('click', function() {deleteProductFromCart(resultCartlist[index].id);});
  buttonDeleteProduct.textContent = "Suprimer-le de panier ";

  buttonProductDetail.setAttribute('id', 'productDetails');
  buttonProductDetail.setAttribute('class', 'btn btn-outline-primary ajust-button');
  buttonProductDetail.setAttribute('onclick', "window.location.href='product-details.html?id=" + resultCartlist[index].id + "'");
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

  const quantityControls = createProductQuantityControls(resultCartlist, index);
  divColMd8.appendChild(quantityControls);
}

// Fonction pour supprimer un café
function deleteProductFromCart(productId) {
  fetch(`${API_URL}/cart/remove-product/${productId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchCartList();
        location.reload(); // Rafraîchir la page
      } else {
        throw new Error('Erreur lors de la suppression de produit de panier');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de produit de panier :', error);
      showMessage('Erreur: lors de la suppression de produit de panier. Veuillez réessayer.');
    });
}

// Fonction pour supprimer un café
function deleteAllProductsFromCart() {
  fetch(`${API_URL}/cart/clear`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        fetchCartList();
        location.reload(); // Rafraîchir la page
      } else {
        throw new Error('Erreur lors de la suppression de toutes produit de panier');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de toutes produit de panier :', error);
      showMessage('Erreur: lors de la suppression de toutes produit de panier. Veuillez réessayer.');
    });
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(message) {
  deleteAllProductsButton.classList.add('hidden');
  messageDiv.setAttribute('class', 'aligns-items-center mb-3 border border-white p-3 mb-2 bg-danger text-white');
  messageDiv.textContent = message;
}

  // ... Your existing code ...

function createQuantityInputField(quantity) {
  const inputField = document.createElement('input');
  inputField.setAttribute('type', 'number');
  inputField.setAttribute('class', 'quantity-input');
  inputField.setAttribute('value', quantity);
  return inputField;
}

function updateProductQuantity(productId, newQuantity) {
  fetch(`${API_URL}/cart/modify-product-quantity/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: newQuantity }),
  })
    .then(response => {
      if (response.ok) {
        fetchCartList();
        location.reload(); // Refresh the page
      } else {
        throw new Error('Erreur lors de la modification de la quantité du produit dans le panier');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la modification de la quantité du produit dans le panier :', error);
      showMessage('Erreur: lors de la modification de la quantité du produit dans le panier. Veuillez réessayer.');
    });
}

function createQuantityUpdateButton(productId, quantityInput) {
  const updateButton = document.createElement('button');
  updateButton.setAttribute('class', 'btn btn-outline-success');
  updateButton.textContent = 'Mettre à jour';
  updateButton.addEventListener('click', function () {
    const newQuantity = quantityInput.value;
    updateProductQuantity(productId, newQuantity);
  });
  return updateButton;
}

function createProductQuantityControls(resultCartlist, index) {
  const quantityInput = createQuantityInputField(resultCartlist[index].quantity);
  const updateButton = createQuantityUpdateButton(resultCartlist[index].id, quantityInput);

  const quantityControlsDiv = document.createElement('div');
  quantityControlsDiv.appendChild(quantityInput);
  quantityControlsDiv.appendChild(updateButton);

  return quantityControlsDiv;
}


function payment(){
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
 
}

const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('closePopup');

closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
  deleteAllProductsFromCart()
});

