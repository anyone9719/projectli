// Meats & Sukuti Product Page
const products = {
 
"meats-list": [
{ name: 'Buff Sukuti', price: 700, img: 'https://i.pinimg.com/736x/98/3b/50/983b503252db980887606d575bd4cc69.jpg' },
  { name: 'Chicken Sukuti', price: 800, img: 'https://i.pinimg.com/736x/73/94/ab/7394abec2dea3539346cfd28de5b7c83.jpg' },
  { name: 'Dry Fish', price: 600, img: 'https://i.pinimg.com/736x/70/d0/57/70d0576ed059a5fd76aa91e1fa62d551.jpg' },
  { name: 'Goat Sukuti', price: 900, img: 'https://i.pinimg.com/736x/46/7f/c4/467fc45a6abe15cdf049835f85102010.jpg' },
  { name: 'Pork Sukuti', price: 750, img: 'https://i.pinimg.com/736x/19/99/5b/19995b5d3d8e5283ee8473468c277be9.jpg' },
  { name: 'Duck Sukuti', price: 850, img: 'https://i.pinimg.com/736x/dc/6c/e2/dc6ce28fdda5269693c21ce24233b0c4.jpg' },
  { name: 'Beef Sukuti', price: 950, img: 'https://i.pinimg.com/736x/43/46/e5/4346e5188d8a0e5b920f75b1884b1799.jpg' },
  { name: 'Fish Sukuti', price: 700, img: 'https://i.pinimg.com/736x/2f/f7/62/2ff762462911da4438d1a2563eb46e68.jpg' }, 
  { name: 'Lamb Sukuti', price: 920, img: 'https://i.pinimg.com/736x/82/ad/92/82ad929343cec98b694132a7b8d6fe40.jpg' },
  { name: 'Turkey Sukuti', price: 870, img: 'https://i.pinimg.com/736x/04/fd/3b/04fd3be9e55eeb5eeb225dc0587ffe60.jpg' },
  { name: 'Rabbit Sukuti', price: 880, img: 'https://i.pinimg.com/736x/1a/96/31/1a9631bbc2430cfb4f32db20da71c9a3.jpg' },
  { name: 'Quail Sukuti', price: 760, img: 'https://i.pinimg.com/736x/08/de/dd/08dedda3ac15f6600423124f6ce7178d.jpg' }
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