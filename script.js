const container = document.querySelector(".container");
const btns = document.querySelectorAll(".btn");

const fetchProduct = async () => {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    const initialCategory = data?.categories?.find(
      (category) => category?.category_name === "Men"
    );
    if (initialCategory) {
      renderProducts(initialCategory.category_products);
      document.querySelector(".man").classList.add("active");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

fetchProduct();

fetchProduct();
btns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    console.log(btn);
    const selectedCategoryID = e.currentTarget.dataset.id;
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    const selectedCategory = data?.categories?.find(
      (category) => category.category_name === selectedCategoryID
    );

    if (selectedCategory) {
      renderProducts(selectedCategory.category_products);
      btns.forEach((b) => b.classList.remove("active"));
    }
    btn.classList.add("active");
  });
});

function renderProducts(products) {
  let productList = products
    .map((product, index) => {
      return ` <div class="card">
        <img
          class="image"
          src=${product?.image}
          alt=""
        />
        <div>
          <div class="vendor">
            <span>${product?.title}</span>
            <ul>
              <li>${product?.vendor}</li>
            </ul>
          </div>
          <div class="price">
            <span class="price_1">Rs ${product?.price}</span>
            <span class="price_2">${product?.compare_at_price}</span>
            <span class="discount">50% Off</span>
          </div>
        </div>
        <button class="card_btn">Add to Cart</button>
        <div class="badge_text ${
          product?.badge_text !== null ? "" : "hide_badge_text"
        }"}>${product?.badge_text !== null ? product?.badge_text : ""}</div>
      </div>`;
    })
    .join(" ");
  container.innerHTML = productList;
}
