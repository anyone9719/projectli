
const products = {
  
"coffee-tea-list": [
  { name: 'Black Coffee', price: 200, img: 'https://media.istockphoto.com/id/157528129/photo/mug-on-plate-filled-with-coffee-surrounded-by-coffee-beans.jpg?s=612x612&w=0&k=20&c=W_za-myO9QP_dimiJeZXsR4G2GHjrdo0RTyO3yVhopQ=' },
  { name: 'Espresso', price: 250, img: 'https://media.istockphoto.com/id/1455924833/photo/fresh-double-espresso-coffee-and-coffee-beans-on-wooden-table.jpg?s=612x612&w=0&k=20&c=STuLBo05aQ5nHZxU2NnWAlaADSLCnZxzLIkED9sMEUM=' },
  { name: 'Cappuccino', price: 300, img: 'https://thumbs.dreamstime.com/b/coffee-cappuccino-3979271.jpg' },
  { name: 'Latte', price: 280, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKKlBszDY2-tsXAeefqoqvq0vUaybmh2r0fg&s' },
  { name: 'Green Tea', price: 180, img: 'https://media.istockphoto.com/id/628986454/photo/glass-cup-with-fresh-green-tea.jpg?s=612x612&w=0&k=20&c=XaspjM0PSAzw8rvNJA-C2BE95-xXbDzhwJRYodIh8Dc=' },
  { name: 'Masala Chai', price: 150, img: 'https://media.istockphoto.com/id/614533094/photo/indian-masala-chai-tea.jpg?s=612x612&w=0&k=20&c=0P-npS30JIBX0FA9csLyB0WYtkEU7gWkNE7nSnvXlSE=' },
  { name: 'Lemon Tea', price: 160, img: 'https://cdn.shopify.com/s/files/1/1146/8126/files/Lemon-Tea-Pictures_large.jpg?v=1503945632' },
  { name: 'Herbal Tea', price: 200, img: 'https://www.treehugger.com/thmb/uWQw8MStw9Zetyqli_5F3qoS9Dc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tea-cup-with-several-dried-tea-leaves-and-flowers-1201496311-55f0a4dfdbc54605966a0a9ec2f40f3c.jpg' },
  { name: 'Iced Coffee', price: 220, img: 'https://www.mybakingaddiction.com/wp-content/uploads/2023/10/brown-sugar-iced-shaken-espresso-hero.jpg' },
  { name: 'Turmeric Latte', price: 260, img: 'https://images.getrecipekit.com/20240903060407-turmeric-20latte.jpeg?width=650&quality=90&' },
  { name: 'Cold Brew', price: 240, img: 'https://www.eatingwell.com/thmb/ypZDdq0HS72jXHjFCAt5eXRtF7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/How-to-Make-Cold-Brew-Coffee-b4af3ec355b642e78bb79e18991a0da0.jpg' },
  { name: 'Butter Tea', price: 230, img: 'https://i.ytimg.com/vi/fzGjsxx9oRo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA6ajsp8oHc7INrnIUXr3CmzaZ4Zw' }
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
