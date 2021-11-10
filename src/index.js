import "./main.scss";

// this is common to both the pages

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cart-items")) {
    let modalContainer = document.querySelector("#modal-container");
    let emptyCartMessage = modalContainer.querySelector("#empty-cart-message");
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

    modalContainer.innerHTML = localStorage.getItem("cart-items");

    getTotalPrice();
    getTotalCount();
  }
});

export function getTotalPrice() {
  const totalPrice = [];
  let prices = document.querySelectorAll(".cart-item-price");

  prices.forEach((item) => {
    totalPrice.push(parseFloat(item.innerText.split(" ")[1]));
  });

  document.querySelector("#final-price").innerHTML =
    "Rs. " + totalPrice.reduce((acc, value) => acc + value, 0);
}

export function getTotalCount() {
  let cartItems = document.querySelectorAll(".cart-item-card"),
    totalCount = 0;
  cartItems.forEach((item) => {
    totalCount +=
      +item.firstElementChild.childNodes[1].firstElementChild.childNodes[3]
        .innerText;
  });

  console.log(totalCount);

  document.querySelector("#cart-items").innerHTML = totalCount + " items";
  document.querySelector("#item-count").innerHTML = `(${totalCount})`;

  return totalCount;
}

//clear cart functionality

function clearCart(e) {
  let modalContainer = document.querySelector("#modal-container");

  let emptyCartMessage = modalContainer.querySelector("#empty-cart-message");
  let startShoppingButton = modalContainer.querySelector(
    "#start-shopping-button"
  );
  let proceedToCheckoutButton = modalContainer.querySelector(
    "#proceed-to-checkout-button"
  );

  let cartItems = modalContainer.querySelectorAll(".cart-item-card");
  cartItems.forEach((item) => item.remove());

  proceedToCheckoutButton.classList.add("d-none");
  emptyCartMessage.classList.remove("d-none");
  startShoppingButton.classList.remove("d-none");

  localStorage.removeItem("cart-items");

  getTotalCount();
}

// if (localStorage.getItem("cart-items")) {
//   let modalContainer = document.querySelector("#modal-container");
//   let emptyCartMessage = modalContainer.querySelector("#empty-cart-message");
//   let startShoppingButton = modalContainer.querySelector(
//     "#start-shopping-button"
//   );
//   let proceedToCheckoutButton = modalContainer.querySelector(
//     "#proceed-to-checkout-button"
//   );

//   if (emptyCartMessage || startShoppingButton) {
//     emptyCartMessage.classList.add("d-none");
//     startShoppingButton.classList.add("d-none");

//     proceedToCheckoutButton.classList.remove("d-none");

//     modalContainer.classList.remove(
//       "d-flex",
//       "flex-column",
//       "justify-content-between"
//     );
//   }

//   modalContainer.innerHTML = localStorage.getItem("cart-items");
// }

(function () {
  let clearCartButton = document.querySelector("#clear-cart-button");
  clearCartButton.addEventListener("click", clearCart);
})();

//add or remove quantity functionality
(function () {
  const modalContainer = document.querySelector("#modal-container");

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("decrement-button")) {
      let currentQuantity = +target.nextElementSibling.innerText;
      let price = +target.parentElement.childNodes[5].innerText.split(" ")[3];

      if (currentQuantity == 1) {
        target.parentElement.parentElement.parentElement.parentElement.remove();
      } else {
        target.nextElementSibling.innerText = --currentQuantity;

        target.previousElementSibling.innerText =
          "Rs. " + price * currentQuantity;
      }

      let totalCount = getTotalCount();
      if (totalCount == 0) clearCart();
      else localStorage.setItem("cart-items", modalContainer.innerHTML);

      getTotalPrice();
    } else if (target.classList.contains("increment-button")) {
      let currentQuantity = +target.previousElementSibling.innerText;
      let price = +target.parentElement.childNodes[5].innerText.split(" ")[3];

      target.previousElementSibling.innerText = ++currentQuantity;
      target.parentElement.childNodes[1].innerText =
        "Rs. " + price * currentQuantity;

      getTotalPrice();
      getTotalCount();

      localStorage.setItem("cart-items", modalContainer.innerHTML);
    }
  });
})();
