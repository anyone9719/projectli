
const products = {
  
"coffee-tea-list": [
  { name: 'Typica Arabica', price: 800, img: 'https://5.imimg.com/data5/SELLER/Default/2024/6/430080235/ED/FI/MQ/212628420/arabica-coffee-beans-500x500.jpg' },
  { name: 'Bourbon Arabica', price: 250, img: 'https://m.media-amazon.com/images/I/315+ac-SG+L._AC_UF894,1000_QL80_.jpg' },
  { name: 'Caturra', price: 300, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_RwhRnr15lTJApUiXd52VKuJ5CfG6Pa9Jw&s' },
  { name: 'Pacamara', price: 280, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzH9UPkVFxV3EwxOMjNeDRVVmV_qqBNp1knQ&s' },
  { name: 'Catimor', price: 180, img: 'https://s.alicdn.com/@sc04/kf/A97532ededfb54d468e73962a4858a38eL.jpg' },
  { name: 'golden tips tea', price: 150, img: 'https://nepalteaexchange.com.np/cdn/shop/products/GoldenTips1stclass_1024x1024.jpg?v=1653118801' },
  { name: 'Orthodox Black Tea', price: 160, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZBXAwtaZfRbIuo0rUUmCkn3CEB47icnLlA&s' },
  { name: 'Green Tea', price: 200, img: 'https://teashop.com/cdn/shop/files/matcha-gracia-blend-1000x1000_c4c72357-0b7c-4e6d-8ad0-772a35686a70.jpg?v=1720782443&width=1000' },
  { name: 'White Tea', price: 220, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMy1MQpOVgjVuTokGPNy0yvTOouH0DWHwjg&s' },
  { name: 'Oolong Tea', price: 260, img: 'https://cdn.shopify.com/s/files/1/1146/8126/files/drink-oolong-tea_high_1.jpg?v=1591071201'},
  { name: 'Silver Tips (White Tea variant)', price: 240, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTkblLiBCCDkmDb46FyZ_RsTEvJgwWEllIg&s' },
  { name: 'Organic Shade-Grown Coffee (General practice)', price: 230, img: 'https://royalnepalcoffee.com/frontend/images/shade-grown-2.jpg' }
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