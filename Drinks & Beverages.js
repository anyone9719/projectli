
const products = {
 
  "drinks-list": [
  { name: 'Tongba (Hot Millet Beer)', price: 150, img: 'https://nepyork.com/wp-content/uploads/2023/02/Tongba.jpg' },
  { name: 'Chhaang (Himalayan Rice Beer)', price: 80, img: 'https://assets-cdn.kathmandupost.com/uploads/source/news/2020/lifestyle/6-(3).jpg' },
  { name: 'Marpha Apple juice ', price: 90, img: 'https://i.pinimg.com/736x/97/da/b6/97dab6986c27602210cf587336d4ba46.jpg' },
  { name: 'Walnut Milk', price: 200, img: 'https://i.pinimg.com/736x/dd/4d/be/dd4dbea1adb69b90694f484a546f97dd.jpg' },
  { name: 'Junar Juice', price: 140, img: 'https://i.pinimg.com/736x/e5/21/f6/e521f6d4f27b55146b84e2bbf5148b5c.jpg' },
  { name: 'Sugarcane Sugar Tea', price: 130, img: 'https://i.pinimg.com/736x/f0/c9/e6/f0c9e6a15fc597a49251643751ee7a70.jpg' },
  { name: 'Grape Wine', price: 70, img: 'https://i.pinimg.com/736x/74/bd/c7/74bdc788f308509d5a5ad6c8716359b1.jpg' },
  { name: 'Vodka', price: 550, img: 'https://cdn11.bigcommerce.com/s-tgrcca6nho/images/stencil/1280x1280/products/22162/46259/8848-vodka__82679.1749291995.jpg?c=1' },
  { name: 'Soft Drinks', price: 600, img: 'https://i.pinimg.com/736x/7a/1c/cd/7a1ccd6b55961ad7fc80efbc627074e5.jpg' },
  { name: 'Beer', price: 650, img: 'https://nutsaboutwine.ie/wp-content/uploads/2020/11/tuborg.jpg' }
]
};
let cartCount = 0;
let cartTotal = 0;

function renderProducts(highlight = "") {
  let targetElement = null;

  Object.keys(products).forEach(sectionId => {
    const row = document.getElementById(sectionId);
    row.innerHTML = '';

    products[sectionId].forEach(product => {
      const isHighlight = (product.name.toLowerCase() === highlight.toLowerCase());
      const highlightClass = isHighlight ? 'border-success text-success' : '';

      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
      col.innerHTML = `
        <div class="card product-card ${highlightClass}">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body text-center">
            <h5 class="card-title ${highlightClass}">${product.name}</h5>
            <p class="card-text ${highlightClass}">Rs. ${product.price}</p>
            <div class="stars mb-3">
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
              <i class="bi bi-star"></i>
            </div>
            <button class="btn btn-primary mb-2 w-100" onclick="addToCart(${product.price})">Add to Cart</button>
            <button class="btn btn-success w-100">Buy Now</button>
          </div>
        </div>
      `;
      row.appendChild(col);

      if (isHighlight && !targetElement) {
        targetElement = row.parentElement.previousElementSibling;
      }
    });
  });

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}

function addToCart(price) {
  cartCount++;
  cartTotal += price;
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-total').textContent = cartTotal;
}

const searchBar = document.getElementById('searchBar');
const suggestionsBox = document.getElementById('suggestions');

searchBar.addEventListener('input', function () {
  const searchTerm = this.value.trim().toLowerCase();
  suggestionsBox.innerHTML = '';

  if (searchTerm === '') {
    suggestionsBox.style.display = 'none';
    renderProducts();
    return;
  }

  const allProducts = Object.values(products).flat();
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  if (filteredProducts.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = product.name;
    div.addEventListener('click', () => {
      searchBar.value = product.name;
      suggestionsBox.style.display = 'none';
      renderProducts(product.name);
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = 'block';
});

renderProducts();