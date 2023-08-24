const API_URL = 'https://insta-api-api.0vxq7h.easypanel.host';

const messageDiv = document.getElementById('message');
const categorySelect = document.getElementById('categorySelect');
const colorSelect = document.getElementById('colorSelect');
const priceSelect = document.getElementById('priceSelect');

// afficher toutes la liste des produit

displayHomePage ();

function displayHomePage() {
  clearMessage();

  fetchProductList()  

  fetchCategoryList()

  fetchColorList()

  calculTotalProductAddToCart();

}

function fetchProductList() {
  fetch(`${API_URL}/products/`)
    .then(resultProductlist => resultProductlist.json())
    .then(resultProductlist => {

      if (resultProductlist.length === 0) {

        showMessage('La liste de produit est vide');

      } else {
        for (let index = 0; index < resultProductlist.length; index++) {

          displayProduct(resultProductlist, index);
          displayPriceSelect(resultProductlist, index);

        }

      }

    })
}   

function fetchCategoryList (){
  fetch(`${API_URL}/product-categories/`)
    .then(resultCategorylist => resultCategorylist.json())
    .then(resultCategorylist => {

      if (resultCategorylist.length === 0) {
        showMessage('La liste de Categories est vide');
      } else {

        for (let i = 0; i < resultCategorylist.length; i++) {
          displayCategoryList(resultCategorylist, i);
          displayCategorySelect(resultCategorylist, i);

        }

      }

    })
}

function fetchColorList (){
  fetch(`${API_URL}/product-colors/`)
  .then(resultColorlist => resultColorlist.json())
  .then(resultColorlist => {

    if (resultColorlist.length === 0) {
      showMessage('La liste de couleurs est vide');
    } else {

      for (let i = 0; i < resultColorlist.length; i++) {
        displayColorSelect(resultColorlist, i);

      }

    }

  })

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

function displayProduct(resultProductlist, index, showDeleteButton = false) {

  productId = resultProductlist[index].id
  fetch(`${API_URL}/comments?productId=${productId}`)
    .then(resultCommentslist => resultCommentslist.json())
    .then(resultCommentslist => {

      const divRow = document.createElement('div');
      const divColMd6 = document.createElement('div');
      const productImage = document.createElement('img');
      const divColMd8 = document.createElement('div');
      const h2ProductName = document.createElement('h2');
      const h2Price = document.createElement('h4');
      const divBlockButton = document.createElement('div');
      const buttonProductDetail = document.createElement('button');



      // commentaires  
      const buttonComment = document.createElement('button');
      const pCommentsContainer = document.createElement('p');
      const divCommentsContainer = document.createElement('div');
      const divCardFooter = document.createElement('div');
      const divFormFloating = document.createElement('div');
      const textareaFormControl = document.createElement('textarea');
      const pAddCommentButton = document.createElement('p');
      const buttonAddComment = document.createElement('button');
      const buttonclearComment = document.createElement('button');

      divRow.setAttribute('class', 'row container aligns-items-center mb-3 border border-white');
      divRow.setAttribute('style', 'width: 30rem;');
      divRow.setAttribute('id', 'container-products-list');

      productImage.setAttribute('class', 'img-fluid');
      productImage.setAttribute('id', 'productImage');
      productImage.setAttribute('alt', 'Product Image');
      productImage.setAttribute('src', resultProductlist[index].image);

      h2ProductName.setAttribute('id', 'productName');
      h2ProductName.textContent = resultProductlist[index].name

      h2Price.setAttribute('id', 'price');
      h2Price.textContent = "$" + resultProductlist[index].price

      divBlockButton.setAttribute('class', 'mb-3');

      buttonProductDetail.setAttribute('id', 'productDetails');
      buttonProductDetail.setAttribute('class', 'btn btn-outline-primary m-6 mb-3');
      buttonProductDetail.setAttribute('onclick', "window.location.href='product-details.html?id=" + resultProductlist[index].id + "'");
      buttonProductDetail.textContent = "voir le details";

      buttonComment.setAttribute('class', 'btn btn-outline-primary float-end mb-3');
      buttonComment.setAttribute('type', 'button');
      buttonComment.setAttribute('data-bs-toggle', 'collapse');
      buttonComment.setAttribute('data-bs-target', '#commentsContainer' + resultProductlist[index].id);
      buttonComment.setAttribute('id', 'buttonComment' + resultProductlist[index].id);
      buttonComment.setAttribute('aria-expanded', 'true');
      buttonComment.setAttribute('aria-controls', 'commentsContainer');
      buttonComment.textContent = 'Commentaires ' + resultCommentslist.length;

      divCardFooter.setAttribute('class', 'card-footer');

      divFormFloating.setAttribute('class', 'form-floating mb-3');

      textareaFormControl.setAttribute('class', 'form-control mb-3');
      textareaFormControl.setAttribute('placeholder', 'Leave a comment here');
      textareaFormControl.setAttribute('id', 'floatingTextarea' + resultProductlist[index].id);

      buttonAddComment.setAttribute('type', 'button');
      buttonAddComment.setAttribute('class', 'btn btn-sm btn-outline-primary float-end m-1');
      buttonAddComment.addEventListener('click', function () { addComments(resultProductlist[index].id); });

      buttonAddComment.textContent = 'Ajouter un commentaire';

      buttonclearComment.setAttribute('type', 'button');
      buttonclearComment.setAttribute('class', 'btn btn-sm btn-outline-danger float-end m-1');
      buttonclearComment.addEventListener('click', function () { clearComment(resultProductlist[index].id); });

      buttonclearComment.textContent = 'Effacer';


      divCommentsContainer.setAttribute('class', 'collapse');
      divCommentsContainer.setAttribute('id', 'commentsContainer' + resultProductlist[index].id);

      for (let l = 0; l < resultCommentslist.length; l++) {

        const divListComments = document.createElement('div');
        divListComments.setAttribute('class', 'form-floating mb-3 dropdown-container');
        const buttonDeleteComment = document.createElement('button');
        buttonDeleteComment.setAttribute('class', 'btn-close btn-close-white');
        buttonDeleteComment.setAttribute('aria-label', 'Close');
        buttonDeleteComment.setAttribute('type', 'button');
        buttonDeleteComment.setAttribute('id', 'buttonDeleteComment' + resultCommentslist[l].id);
        buttonDeleteComment.setAttribute('data-toggle', 'tooltip');
        buttonDeleteComment.setAttribute('data-placement', 'bottom');
        buttonDeleteComment.setAttribute('title', "Supprimer le commentaire");
        buttonDeleteComment.addEventListener('click', function () { deleteComments(resultCommentslist[l].id); });

        const textareaListComments = document.createElement('textarea');
        textareaListComments.setAttribute('class', 'form-control');
        textareaListComments.setAttribute('type', 'text');
        textareaListComments.setAttribute('readonly', true);
        textareaListComments.setAttribute('id', 'textareaComments' + resultProductlist[index].id);
        textareaListComments.value = resultCommentslist[l].content;

        divListComments.appendChild(textareaListComments);
        divListComments.appendChild(buttonDeleteComment);
        divCommentsContainer.appendChild(divListComments);
      }
      if (showDeleteButton) {
        const buttonDelete = document.createElement('button');
        buttonDelete.setAttribute('class', 'btn btn-outline-danger float-end m-1');
        buttonDelete.textContent = 'Delete';
        buttonDelete.addEventListener('click', function () {
          // Call the deleteRecentlyViewedProduct function with the product ID
          deleteRecentlyViewedProduct(resultProductlist[index].id);
        });
        divBlockButton.appendChild(buttonDelete);
      }

      pAddCommentButton.appendChild(buttonAddComment);
      pAddCommentButton.appendChild(buttonclearComment);
      divFormFloating.appendChild(textareaFormControl);
      divCardFooter.appendChild(divFormFloating);
      divCardFooter.appendChild(pAddCommentButton);

      divCommentsContainer.appendChild(divCardFooter);

      pCommentsContainer.appendChild(divCommentsContainer);

      /// comments

      divColMd6.appendChild(productImage);

      divColMd8.appendChild(h2ProductName);
      divColMd8.appendChild(h2Price);
      divBlockButton.appendChild(buttonProductDetail);

      divBlockButton.appendChild(buttonComment);
      divBlockButton.appendChild(pCommentsContainer);

      divColMd8.appendChild(divBlockButton);


      divRow.appendChild(divColMd6);
      divRow.appendChild(divColMd8);

      const containerProducts = document.getElementById('container-products')
      containerProducts.appendChild(divRow);
    })
}

// create comments
function addComments(productCommentId) {

  const floatingTextarea = document.getElementById("floatingTextarea" + productCommentId)
  const productId = productCommentId;
  const content = floatingTextarea.value;
  const popup = document.getElementById("popup")
  const popupContent = document.getElementById("popup-content")
  if (content.length === 0) {
    alert("Vous devez inscrire un commentaire pour l'ajouter")
  } else {
    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        content: content,
      }),
    })
      .then(response => response.json())
      .then(() => {

        // Reload the page
        location.reload();

      })
      .catch(error => {
        console.error("Error:", error);
        popupContent.textContent = error;
        popup.style.display = "block";
      });
  }
}

// Fonction pour supprimer un commentaire
function deleteComments(productCommentId) {
  fetch(`${API_URL}/comments/${productCommentId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
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

function clearComment(productId) {

  if (document.getElementById('floatingTextarea' + productId)) {
    document.getElementById('floatingTextarea' + productId).value = "";
  }
}

function displayCategoryList(resultCategorylist, index) {

  const liItem = document.createElement('li');
  const buttonLink = document.createElement('button');

  liItem.setAttribute('class', 'nav-item');
  buttonLink.setAttribute('type', 'nav-link');
  buttonLink.setAttribute('class', 'btn btn-outline-light m-1');
  buttonLink.setAttribute('data-toggle', 'tooltip');
  buttonLink.setAttribute('data-placement', 'bottom');
  buttonLink.setAttribute('id', 'botton' + resultCategorylist[index].id);
  buttonLink.setAttribute('title', resultCategorylist[index].description);
  buttonLink.textContent = resultCategorylist[index].name
  buttonLink.addEventListener('click', function () { displayProductByCategory(resultCategorylist[index].id, resultCategorylist, resultCategorylist[index].name); });

  liItem.appendChild(buttonLink);

  const categoryList = document.getElementById('categoryList')
  categoryList.appendChild(liItem);
}

function displayProductByCategory(categoryId, resultCategorylist, categoryName) {
  clearMessage();
  clearFilter();
  categorySelect.value = categoryName;
  // initialiser les categories active
  resetValue(resultCategorylist);
  //active le button 
  const categoryButton = document.getElementById('botton' + categoryId);
  categoryButton.setAttribute('class', 'btn btn-outline-light active');

  clearProdutsList();

  //Afficher les product by categorie
  fetchProductByCategoryList(categoryId)

}

function resetValue(resultCategorylist) {

  for (let i = 0; i < resultCategorylist.length; i++) {
    const categoryButton = document.getElementById('botton' + resultCategorylist[i].id);
    categoryButton.setAttribute('class', 'btn btn-outline-light');

  }
}

function fetchProductByCategoryList(categoryId) {
  clearMessage();
  fetch(`${API_URL}/products/`)
    .then(resultProductlist => resultProductlist.json())
    .then(resultProductlist => {

      if (resultProductlist.length === 0) {

        showMessage('La liste de produit est vide');

      } else {
        for (let index = 0; index < resultProductlist.length; index++) {

          if (parseInt(categoryId) === resultProductlist[index].category.id) {
            displayProduct(resultProductlist, index);
          }
        }
      }
    })
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(message) {
  const containerDivMessage = document.createElement('div');
  containerDivMessage.setAttribute('id', 'containerDivMessage');
  containerDivMessage.setAttribute('class', 'aligns-items-center mb-3 border border-white p-3 mb-2 bg-danger text-white');
  containerDivMessage.textContent = message;
  messageDiv.appendChild(containerDivMessage);

}

function displayCategorySelect(resultCategorylist, index) {
  const optionItem = document.createElement('option');

  optionItem.setAttribute('value', resultCategorylist[index].name);
  optionItem.textContent = resultCategorylist[index].name;

  const categorySelect = document.getElementById('categorySelect');
  categorySelect.appendChild(optionItem);
}

function displayColorSelect(resultColorlist, index) {
  const optionItem = document.createElement('option');

  optionItem.setAttribute('value', resultColorlist[index].name);
  optionItem.textContent = resultColorlist[index].name;

  const colorSelect = document.getElementById('colorSelect');
  colorSelect.appendChild(optionItem);
}

function displayPriceSelect(resultProductlist, index) {
  const optionItem = document.createElement('option');

  optionItem.setAttribute('value', resultProductlist[index].price);
  optionItem.textContent = resultProductlist[index].price;

  const priceSelect = document.getElementById('priceSelect');
  priceSelect.appendChild(optionItem);
}

function clearProdutsList() {
  while (document.getElementById('container-products-list') != null) {
    const containerProductsList = document.getElementById('container-products-list')
    containerProductsList.remove();
  }

}

function clearMessage() {
  if (document.getElementById('containerDivMessage')) {
    document.getElementById('containerDivMessage').remove();
  }
}

function applyFilter() {
  clearMessage();
  if ((categorySelect.value === "Selectionner une categorie") && (colorSelect.value === "Selectionner une couleur") && (priceSelect.value === "Selectionner un prix")) {

    fetch(`${API_URL}/products/`)
      .then(resultProductlist => resultProductlist.json())
      .then(resultProductlist => {

        if (resultProductlist.length === 0) {

          showMessage('La liste de cafe Nespresso est vide');

        } else {
          clearProdutsList();
          for (let index = 0; index < resultProductlist.length; index++) {
            displayProduct(resultProductlist, index);
          }

        }

      })

  } else {

    if ((categorySelect.value === "Selectionner une categorie") && (colorSelect.value === "Selectionner une couleur") && (priceSelect.value != "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if (parseInt(priceSelect.value) === parseInt(resultProductlist[index].price)) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value === "Selectionner une categorie") && (colorSelect.value != "Selectionner une couleur") && (priceSelect.value != "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if ((parseInt(priceSelect.value) === parseInt(resultProductlist[index].price)) && (colorSelect.value === resultProductlist[index].color.name)) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value != "Selectionner une categorie") && (colorSelect.value === "Selectionner une couleur") && (priceSelect.value != "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if ((parseInt(priceSelect.value) === parseInt(resultProductlist[index].price)) && (categorySelect.value === resultProductlist[index].category.name)) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value != "Selectionner une categorie") && (colorSelect.value != "Selectionner une couleur") && (priceSelect.value === "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if ((colorSelect.value === resultProductlist[index].color.name) && (categorySelect.value === resultProductlist[index].category.name)) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value != "Selectionner une categorie") && (colorSelect.value === "Selectionner une couleur") && (priceSelect.value === "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if (categorySelect.value === resultProductlist[index].category.name) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value === "Selectionner une categorie") && (colorSelect.value != "Selectionner une couleur") && (priceSelect.value === "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if (colorSelect.value === resultProductlist[index].color.name) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

    if ((categorySelect.value != "Selectionner une categorie") && (colorSelect.value != "Selectionner une couleur") && (priceSelect.value != "Selectionner un prix")) {

      fetch(`${API_URL}/products/`)
        .then(resultProductlist => resultProductlist.json())
        .then(resultProductlist => {

          if (resultProductlist.length === 0) {

            showMessage('La liste de cafe Nespresso est vide');

          } else {
            clearProdutsList();
            findProduct = false;
            for (let index = 0; index < resultProductlist.length; index++) {
              if ((colorSelect.value === resultProductlist[index].color.name) && (categorySelect.value === resultProductlist[index].category.name) && (parseInt(priceSelect.value) === parseInt(resultProductlist[index].price))) {
                findProduct = true;
                displayProduct(resultProductlist, index);
              }
            }
            if (findProduct === false) {
              showMessage('Aucun produit correspondant avec ce filtre!!!');
            }

          }

        })

    }

  }
}

function clearFilter() {
  categorySelect.value = "Selectionner une categorie";
  colorSelect.value = "Selectionner une couleur";
  priceSelect.value = "Selectionner un prix";
}

// Add this code to your existing JavaScript file

const viewRecentlyViewedBtn = document.getElementById('viewRecentlyViewedBtn');
viewRecentlyViewedBtn.addEventListener('click', fetchRecentlyViewedProducts);




function fetchRecentlyViewedProducts() {
  clearProdutsList(); // Clear the existing product list
  clearMessage(); // Clear any existing messages

  fetch(`${API_URL}/suggestions/recently-viewed-products`)
    .then((recentlyViewedProducts) => recentlyViewedProducts.json())
    .then((recentlyViewedProducts) => {
      if (recentlyViewedProducts.length === 0) {
        showMessage('No recently viewed products.');
      } else {
        for (let index = 0; index < recentlyViewedProducts.length; index++) {
          // Call displayProduct with showDeleteButton parameter set to true
          displayProduct(recentlyViewedProducts, index, true);
          displayPriceSelect(recentlyViewedProducts, index);
        }
      }
    })
    .catch((error) => {
      console.error('Error fetching recently viewed products:', error);
      showMessage('Error fetching recently viewed products. Please try again.');
    });
}
// Fonction pour supprimer un café
function deleteRecentlyViewedProduct(productId) {
  fetch(`${API_URL}/suggestions/recently-viewed-products/${productId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        // Reload the recently viewed products after deletion
        fetchRecentlyViewedProducts();
      } else {
        throw new Error('Error deleting recently viewed product');
      }
    })
    .catch((error) => {
      console.error('Error deleting recently viewed product:', error);
      showMessage('Error deleting recently viewed product. Please try again.');
    });
}


// Add this code to your existing JavaScript file

// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', performSearch);

// Function to perform search
function performSearch() {
  const searchBar = document.getElementById('searchBar');
  const searchValue = searchBar.value.toLowerCase(); // Convert to lowercase for case-insensitive search

  clearProdutsList(); // Clear the existing product list
  clearMessage(); // Clear any existing messages

  fetch(`${API_URL}/products/`)
    .then(resultProductlist => resultProductlist.json())
    .then(resultProductlist => {

      if (resultProductlist.length === 0) {
        showMessage('No products available');
      } else {
        let findProduct = false;

        for (let index = 0; index < resultProductlist.length; index++) {
          const productName = resultProductlist[index].name.toLowerCase();

          if (productName.includes(searchValue)) {
            findProduct = true;
            displayProduct(resultProductlist, index);
            displayPriceSelect(resultProductlist, index);
          }
        }

        if (!findProduct) {
          showMessage('No products match the search criteria');
        }
      }
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products. Please try again.');
    });
}


