
const products = {
 
  "drinks-list": [
  { name: 'Mango Juice', price: 150, img: 'https://t3.ftcdn.net/jpg/01/87/65/02/360_F_187650225_yiZwjK4HjPVxlD8npzCRUuaoodF39Kby.jpg' },
  
  { name: 'Lemon Water', price: 80, img: 'https://igan.org/wp-content/uploads/2024/04/lemon-cucumber-water.jpeg' },
  { name: 'Coconut Water', price: 90, img: 'https://rebel-kitchen.com/cdn/shop/files/coconut-water-750ml-lifestyle-1500x.jpg?v=1744030655&width=1445' },
  { name: 'Herbal Juice', price: 200, img: 'https://img.drz.lazcdn.com/g/kf/Se56c7fd741bc48bdb4f7f0d3c4a56795G.jpg_720x720q80.jpg' },
  { name: 'Orange Juice', price: 140, img: 'https://images.herzindagi.info/image/2020/Nov/orange-juice-for-health.jpg' },
  { name: 'Soft Drink', price: 130, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1nmnmp8dbLE74xW5scabuI4MFOOpWUr3yrQ&s' },
  { name: 'Butter Milk', price: 70, img: 'https://images.unsplash.com/photo-1630409346699-79481a79db52?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVybWlsa3xlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'HinwButter Milka Wine', price: 550, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp754JpiM8GC-iVEZyhTgAjP74CvBGOu22hOooKC-zyNDy97ioeQMnPjTjfmAF2fQWIbk&usqp=CAU' },
  { name: 'Dadaghare Wine', price: 600, img: 'https://nba-english-bucket.s3.ap-south-1.amazonaws.com/img/news/20160905042435_dada.jpg' },
  { name: 'Marpha Apple Wine', price: 650, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR4cRu5MJpdVfpZ46Bzxh0BAn_qic8gnhBbA&s' }
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
