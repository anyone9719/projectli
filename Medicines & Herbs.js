
const products = {
 
"medicines-herbs-list": [
  { name: 'Ashwagandha', price: 250, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9ysWAIbhnsRLks2Ewyj4Z4X9egeQuAk3Zw&s' },
  { name: 'Neem Powder', price: 300, img: 'https://m.media-amazon.com/images/I/51zagwhXhuL._AC_UF1000,1000_QL80_.jpg' },
  { name: 'Turmeric Powder', price: 200, img: 'https://www.chettinadsnacksonline.com/cdn/shop/products/Turmericnew.png?v=1615736950' },
  { name: 'Amla Juice', price: 350, img: 'https://static.toiimg.com/thumb/msid-115433359,width-1070,height-580,imgsize-124158,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg' },
  { name: 'Tulsi Drops', price: 400, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDe3Q1WAAvC_pGl1HKmmn2gCApoTHVwa_z1w&s' },
  { name: 'Ginger Powder', price: 280, img: 'https://img.drz.lazcdn.com/static/np/p/041550faf9ef0c83c4852514e64339ed.jpg_720x720q80.jpg' },
  { name: 'Brahmi', price: 260, img: 'https://www.easyayurveda.com/wp-content/uploads/2014/07/Brahmi-plant-with-flower.jpg' },
  { name: 'Giloy Juice', price: 320, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxfGI4pFYXN_9Nwkquu6oY0GO2L7LStCPNjA&s' },
  { name: 'Moringa Powder', price: 290, img: 'https://adrish.co.in/public/uploads/products/212221635591868.jpg' },
  { name: 'Shilajit Resin', price: 600, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHcpwycQnR3BiyjW3W0KxOmFw1SciG739Bw&s' },
  { name: 'Triphala Powder', price: 310, img: 'https://dwibhashi.co.in/cdn/shop/articles/triphala_ceb7a881-c751-4f03-88c3-69736f992be1.jpg?v=1738677803' },
  { name: 'Licorice Root', price: 270, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZEL3SO-tFfWmB8alvpaQAu4wnLLYhTuDj6A&s' }
]

};

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
            <button class="btn btn-primary mb-2 w-100" onclick="addToCart(${product.id})">Add to Cart</button>
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

function addToCart(productId) {
  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartSummary();
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach(el => el.textContent = totalCount);
  document.querySelectorAll(".cart-total").forEach(el => el.textContent = totalPrice);
}

// Search Suggestion System
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

// Load products and cart count on page load
window.addEventListener("load", () => {
  renderProducts();
  updateCartSummary();
});
