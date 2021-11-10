import "./main.scss";
import { getTotalCount, getTotalPrice } from "./index";

// Get the products list and seggregate them according to the categories
const getProducts = () => {
  return fetch("/product").then((data) => data.json());
};

const displayProducts = () => {
  const productsContainer = document.querySelector("#products-container-row");
  let products = [];

  getProducts()
    .then((data) => {
      console.log("Received data Successfully-----------", data);
      products = data;
      displayProductsUtil(productsContainer, products);
    })
    .catch((err) => {
      console.log("Error in obtaining the data-----------", err);
    });
};

const displayProductsUtil = (productsContainer, products) => {
  products.forEach((data) => {
    let cardDiv = document.createElement("div");
    let cardHeaderDiv = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBodyDiv = document.createElement("div");
    let cardDescP = document.createElement("p");
    let cardPrice = document.createElement("h4");
    let cardButton = document.createElement("buttton");

    cardButton.classList.add("custom-color", "btn", "float-end", "product-add");
    cardButton.innerText = "Add Item";

    cardPrice.classList.add("card-text", "float-start", "product-price");
    cardPrice.innerText = "Rs. " + data.price;

    cardDescP.classList.add(
      "card-text",
      "bg-light",
      "text-dark",
      "p-3",
      "mb-3",
      "rounded",
      "product-description"
    );
    cardDescP.innerText = data.description;

    cardBodyDiv.classList.add("card-body");

    cardImage.classList.add("card-img-top", "mt-3", "product-image");
    cardImage.alt = data.name;
    cardImage.src = data.imageURL;

    cardHeaderDiv.classList.add("card-header", "product-name");
    cardHeaderDiv.innerText = data.name;

    cardDiv.classList.add(
      "product-card",
      "card",
      "col-xs-12",
      "col-md-4",
      "col-lg-3",
      "p-2",
      "m-3"
    );

    cardBodyDiv.appendChild(cardDescP);
    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(cardButton);
    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardBodyDiv);

    productsContainer.appendChild(cardDiv);
  });
};

displayProducts();

// cart functionality from products page
(function () {
  let container = document.querySelector("#products-container-row");
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-add")) {
      let target = e.target;
      let imageUrl,
        name,
        price,
        quantity = 1;
      let modalContainer = document.querySelector("#modal-container");
      let cartItems = document.querySelectorAll(".cart-item-card");

      let emptyCartMessage = modalContainer.querySelector(
        "#empty-cart-message"
      );
      let startShoppingButton = modalContainer.querySelector(
        "#start-shopping-button"
      );
      let proceedToCheckoutButton = modalContainer.querySelector(
        "#proceed-to-checkout-button"
      );

      if (emptyCartMessage || startShoppingButton) {
        emptyCartMessage.classList.add("d-none");
        startShoppingButton.classList.add("d-none");

        proceedToCheckoutButton.classList.remove("d-none");

        modalContainer.classList.remove(
          "d-flex",
          "flex-column",
          "justify-content-between"
        );
      }

      //price
      price = target.previousElementSibling.innerText.split(" ")[1];

      //name && imageUrl
      let collection = target.parentElement.parentElement.children;

      name = collection[0].innerText;
      imageUrl = collection[1].src;

      if (cartItems.length) {
        cartItems.forEach((item) => {
          let cartItemBody =
            item.firstElementChild.childNodes[1].firstElementChild;
          console.log(cartItemBody);
          let cartItemName = cartItemBody.firstElementChild.innerText;

          if (cartItemName === name) {
            let cartItemQuantity = +cartItemBody.childNodes[3].innerText + 1;

            cartItemBody.childNodes[3].innerText = cartItemQuantity;

            price = +price * cartItemQuantity;

            cartItemBody.childNodes[1].innerText = "Rs. " + price;
            quantity = 0;
          }
        });
      }

      if (quantity) {
        let cardDiv = document.createElement("div");
        let cardRowDiv = document.createElement("div");
        let cardColDivFirst = document.createElement("div");
        let cardImage = document.createElement("img");
        let cardColDivSecond = document.createElement("div");
        let cardBodyDiv = document.createElement("div");
        let cardTitle = document.createElement("h4");
        let cardTextPrice = document.createElement("h5");
        let cardTextQuantity = document.createElement("h5");
        let cardMinus = document.createElement("button");
        let cardPlus = document.createElement("button");
        let cardPrice = document.createElement("h5");

        cardPrice.classList.add("card-text", "d-inline", "ms-3");
        cardPrice.innerText = " x  Rs. " + price;

        cardMinus.classList.add(
          "btn",
          "btn-danger",
          "btn-sm",
          "d-inline",
          "rounded-pill",
          "me-2",
          "ps-2",
          "pe-2",
          "decrement-button"
        );
        cardMinus.innerText = "-";

        cardPlus.classList.add(
          "btn",
          "btn-success",
          "btn-sm",
          "d-inline",
          "rounded-pill",
          "ms-2",
          "ps-2",
          "pe-2",
          "increment-button"
        );
        cardPlus.innerText = "+";

        cardTextQuantity.classList.add("card-text", "d-inline", "mt-4");
        cardTextQuantity.innerText = quantity;

        cardTextPrice.classList.add(
          "card-text",
          "float-end",
          "cart-item-price"
        );
        cardTextPrice.innerText = "Rs. " + price;

        cardTitle.classList.add("card-title");
        cardTitle.innerText = name;

        cardBodyDiv.classList.add("card-body");

        cardColDivSecond.classList.add("col-xs-10", "col-sm-8");

        cardImage.src = imageUrl;
        cardImage.classList.add("img-fluid", "rounded-start");
        cardImage.alt = name;
        cardImage.width = 120;
        cardImage.height = 120;

        cardColDivFirst.classList.add("col-xs-2", "col-sm-3");

        cardRowDiv.classList.add("row", "g-0");

        cardDiv.classList.add("card", "mb-3", "container", "cart-item-card");
        cardDiv.style = "max-width: 90%";

        cardBodyDiv.append(
          cardTitle,
          cardTextPrice,
          cardMinus,
          cardTextQuantity,
          cardPlus,
          cardPrice
        );
        cardColDivSecond.appendChild(cardBodyDiv);
        cardColDivFirst.appendChild(cardImage);
        cardRowDiv.append(cardColDivFirst, cardColDivSecond);
        cardDiv.append(cardRowDiv);

        modalContainer.insertBefore(cardDiv, emptyCartMessage);
      }

      let alertBadge = document.querySelector("#add-to-cart-alert");
      alertBadge.innerText = "Product Added";
      alertBadge.classList.remove("d-none");
      setTimeout(() => {
        alertBadge.classList.add("d-none");
      }, 1500);

      getTotalPrice();
      getTotalCount();

      localStorage.setItem("cart-items", modalContainer.innerHTML);

      console.log(localStorage.getItem("cart-items"));
    }
  });
})();

// function getTotalPrice() {
//   const totalPrice = [];
//   let prices = document.querySelectorAll(".cart-item-price");

//   prices.forEach((item) => {
//     totalPrice.push(parseFloat(item.innerText.split(" ")[1]));
//   });

//   document.querySelector("#final-price").innerHTML =
//     "Rs. " + totalPrice.reduce((acc, value) => acc + value, 0);
// }

// function getTotalCount() {
//   let cartItems = document.querySelectorAll(".cart-item-card"),
//     totalCount = 0;
//   cartItems.forEach((item) => {
//     totalCount +=
//       +item.firstElementChild.childNodes[1].firstElementChild.childNodes[3]
//         .innerText;
//   });

//   console.log(totalCount);

//   document.querySelector("#cart-items").innerHTML = totalCount + " items";
//   document.querySelector("#item-count").innerHTML = `(${totalCount})`;

//   return totalCount;
// }

// //clear cart functionality

// function clearCart(e) {
//   let modalContainer = document.querySelector("#modal-container");

//   let emptyCartMessage = modalContainer.querySelector("#empty-cart-message");
//   let startShoppingButton = modalContainer.querySelector(
//     "#start-shopping-button"
//   );
//   let proceedToCheckoutButton = modalContainer.querySelector(
//     "#proceed-to-checkout-button"
//   );

//   let cartItems = modalContainer.querySelectorAll(".cart-item-card");
//   cartItems.forEach((item) => item.remove());

//   proceedToCheckoutButton.classList.add("d-none");
//   emptyCartMessage.classList.remove("d-none");
//   startShoppingButton.classList.remove("d-none");

//   getTotalCount();
// }

// (function () {
//   let clearCartButton = document.querySelector("#clear-cart-button");
//   clearCartButton.addEventListener("click", clearCart);
// })();

// //add or remove quantity functionality
// (function () {
//   const modalContainer = document.querySelector("#modal-container");

//   modalContainer.addEventListener("click", (e) => {
//     let target = e.target;

//     if (target.classList.contains("decrement-button")) {
//       let currentQuantity = +target.nextElementSibling.innerText;
//       let price = +target.parentElement.childNodes[5].innerText.split(" ")[3];

//       if (currentQuantity == 1) {
//         target.parentElement.parentElement.parentElement.parentElement.remove();
//       } else {
//         target.nextElementSibling.innerText = --currentQuantity;

//         target.previousElementSibling.innerText =
//           "Rs. " + price * currentQuantity;
//       }

//       let totalCount = getTotalCount();
//       if (totalCount == 0) clearCart();

//       getTotalPrice();
//     } else if (target.classList.contains("increment-button")) {
//       let currentQuantity = +target.previousElementSibling.innerText;
//       let price = +target.parentElement.childNodes[5].innerText.split(" ")[3];

//       target.previousElementSibling.innerText = ++currentQuantity;
//       target.parentElement.childNodes[1].innerText =
//         "Rs. " + price * currentQuantity;

//       getTotalPrice();
//       getTotalCount();
//     }
//   });
// })();
