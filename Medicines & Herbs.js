
const products = {
 
"medicines-herbs-list": [
  { name: 'Ashwagandha', price: 250, img: 'https://i.pinimg.com/736x/a3/fe/d3/a3fed3ff7d53547f4162ca96a29ad18f.jpg' },
  { name: 'Yarsagumba ', price: 300, img: 'https://i.pinimg.com/736x/83/bd/dc/83bddccd39782a0808c9b70de8613413.jpg' },
  { name: 'Panch Aunle (Dactylorhiza hatagirea)', price: 200, img: 'https://efloraofindia.com/wp-content/uploads/2020/10/Dactylorrhiza%20hatagirea%20-3-.JPG' },
  { name: ' Satuwa (Paris polyphylla)', price: 350, img: 'https://i.pinimg.com/736x/62/3f/de/623fdedf69adbc9da4d7146714d308f6.jpg' },
  { name: 'Lauth Salla (Taxus wallichiana)', price: 400, img: 'https://www.edgeofexistence.org/wp-content/uploads/2024/04/Untitled-design-1.png' },
  { name: 'Chiraito (Swertia chirayita)', price: 280, img: 'https://ediblebeautyaustralia.com/cdn/shop/articles/our-anti-ageing-botanical-wonder-214526_600x.jpg?v=1663738221' },
  { name: 'Sugandhawal (Valeriana jatamansi)', price: 260, img: 'https://i.pinimg.com/736x/4a/c9/bd/4ac9bd8d108cb4f350e853493512b837.jpg' },
  { name: 'Rudraksha Plant (Elaeocarpus ganitrus)', price: 320, img: 'https://i.pinimg.com/736x/b6/60/ad/b660ad9600b2212a010f9abd1f1a5392.jpg' },
  { name: ' Titepati (Artemisia indica/nepalensis)', price: 290, img: 'https://i.pinimg.com/736x/f6/5e/6b/f65e6be857cb44efcdf1d6dd1a8b1aa5.jpg' },
  { name: ' Brahmi (Bacopa monnieri)', price: 600, img: 'https://m.media-amazon.com/images/I/61iVLkY90SL._UF1000,1000_QL80_.jpg' },
  { name: 'Amala', price: 310, img: 'https://i.pinimg.com/736x/28/42/92/28429204c204302f780252d0583d065e.jpg' },
  { name: ' Bojho (Acorus calamus)', price: 270, img: 'https://i.pinimg.com/736x/ee/02/bc/ee02bc4cda7f458ddc7aec9bd64ec343.jpg' }
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