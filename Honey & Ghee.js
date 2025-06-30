
const products = {
 "honey-ghee-list": [
  { name: 'Organic Honey', price: 500, img: 'https://media.istockphoto.com/id/842769074/photo/sweet-honeycomb-and-wooden-honey-dripping.jpg?s=612x612&w=0&k=20&c=GJwPKmbX02jYByrjIWLOf8xTHWqQEy3vN6cYajM6p7o=' },
  { name: 'Pure Ghee', price: 1200, img: 'https://t3.ftcdn.net/jpg/05/12/58/16/360_F_512581633_H87urnh8Os5lgvC3lsXTZMDClzrCGNpM.jpg' },
  { name: 'Wild Honey', price: 600, img: 'https://media.istockphoto.com/id/532400492/photo/exposed-beehive.jpg?s=612x612&w=0&k=20&c=GD-nPzRlmTzBBZWHU7R1DUQ48e86v4JBNslvHYyNX1w=' },
  { name: 'Buff Ghee', price: 1300, img: 'https://5.imimg.com/data5/IOS/Default/2023/10/354592066/DE/BP/DZ/23509044/product-jpeg-500x500.png' },
  { name: 'Mustard Honey', price: 400, img: 'https://static.wixstatic.com/media/302bc4_1161ffac7eb1470ea722a3e30393a14e~mv2.jpg/v1/fill/w_480,h_342,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/302bc4_1161ffac7eb1470ea722a3e30393a14e~mv2.jpg' },
  { name: 'Flavored Honey', price: 550, img: 'https://source.unsplash.com/200x200/?flavored-honey' },
  { name: 'Neem Honey', price: 580, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqYIJFth8eek5c4OGBEv8lnxZTsRaY2MqV_A&s' },
  { name: 'Mountain Honey', price: 620, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY6JAASWTCk-B-3uFEA8b2UjXCeyHfoCBwMw&s' },
  { name: 'Village Ghee', price: 1100, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmbm9LQ-WyppHgsl4bzoBcsXbJt6WB7IWlVw&s' },
  { name: 'Herbal Honey', price: 590, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ5zLVEDwt-jqfXUWSIgzo-x6GHnq-bRTmcQ&s' },
  { name: 'A2 Desi Ghee', price: 1400, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBqfelACnJbkSdLHBrJFiCbWgAGDF0SLwIcg&s' },
  { name: 'Jamun Honey', price: 570, img: 'https://cdn.neosanjivani.com/wp-content/uploads/2022/06/4.jpg' }
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
