import "./main.scss";

//creating the banners using carousel
const getBanners = () => {
  return fetch("/banner").then((data) => data.json());
};

const createBanner = () => {
  let carouselContainer = document.querySelector("#carousel-container");
  let bannerList = [];

  getBanners()
    .then((data) => {
      bannerList = data;
      console.log(data);
      createBannerUtil(carouselContainer, bannerList);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createBannerUtil = (carouselContainer, bannerList) => {
  bannerList.forEach((data) => {
    let div = document.createElement("div");
    let img = document.createElement("img");

    div.classList.add("carousel-item");
    if (data.order == 1) div.classList.add("active");

    img.src = data.bannerImageUrl;
    img.alt = data.bannerImageAlt;
    img.classList.add("d-block", "w-100");

    div.appendChild(img);
    carouselContainer.appendChild(div);
  });
};

//creating the display categories on the home page
const getCategories = () => {
  return fetch("/category").then((data) => data.json());
};

const displayCategories = () => {
  const categoriesContainer = document.querySelector("#categories-container");
  let categories = [];

  getCategories()
    .then((data) => {
      categories = data;
      console.log("Getting the categories-----------", categories);
      displayCategoriesUtil(categoriesContainer, categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayCategoriesUtil = (categoriesContainer, categories) => {
  let categoryArray = categories
    .filter((val) => val.enabled)
    .forEach((val, index) => {
      let cardDiv = document.createElement("div");
      let rowDiv = document.createElement("div");
      let colDivFirst = document.createElement("div");
      let colDivSecond = document.createElement("div");
      let cardBodyDiv = document.createElement("div");
      let image = document.createElement("img");
      let h5 = document.createElement("h5");
      let para = document.createElement("p");
      let cardLink = document.createElement("a");

      cardLink.classList.add("btn", "custom-color", "mt-3");
      cardLink.href = "./product.html";
      cardLink.innerText = "Explore Products";

      cardDiv.classList.add("card", "category-card", "mb-5");
      cardDiv.style = "max-width: 100%";
      cardDiv.id = val.order;

      rowDiv.classList.add("row", "g-0");

      colDivFirst.classList.add("col-md-4");

      image.src = val.imageUrl;
      image.alt = val.name;
      image.classList.add("img-fluid", "rounded-start", "p-2");

      colDivSecond.classList.add("col-md-8");

      cardBodyDiv.classList.add("card-body", "center-items");

      h5.classList.add("card-title");
      h5.innerText = val.name;

      para.classList.add("card-text");
      para.innerText = val.description;

      colDivFirst.appendChild(image);
      cardBodyDiv.append(h5, para, cardLink);
      colDivSecond.appendChild(cardBodyDiv);

      if (index % 2 == 0) {
        rowDiv.appendChild(colDivFirst);
        rowDiv.appendChild(colDivSecond);
      } else {
        rowDiv.appendChild(colDivSecond);
        rowDiv.appendChild(colDivFirst);
      }

      cardDiv.appendChild(rowDiv);

      categoriesContainer.appendChild(cardDiv);
    });
};

createBanner();
displayCategories();
