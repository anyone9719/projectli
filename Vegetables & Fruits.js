const products = {

 "vegetables-fruits-list": [
  { name: 'Tomato', price: 40, img: 'https://www.almanac.com/sites/default/files/users/The%20Editors/tomatoes_ozgurdonmaz_gettyimages-edit_full_width.jpeg' },
  { name: 'Carrot', price: 60, img: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Potato', price: 30, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVWt2bG1fRw0fFxQLM39GoCH0hkXfVO9uA2w&s' },
  { name: 'Apple', price: 120, img: 'https://www.earth.com/assets/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2019%2F06%2F19132041%2FHow-the-apple-became-such-a-ubiquitous-iconic-fruit-across-the-globe-1400x850.jpg&w=1200&q=75' },
  { name: 'Banana', price: 80, img: 'https://thumbs.dreamstime.com/b/banana-bunch-hanging-palm-tree-ai-generative-design-background-instagram-facebook-wall-painting-art-backgrounds-wallpaper-325270238.jpg' },
  { name: 'Cucumber', price: 50, img: 'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg' },
  { name: 'Mango', price: 150, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx2tmzH9WS5HbdC5j-sEBuEe5S6Nar9OEDwQ&s' },
  { name: 'Orange', price: 100, img: 'https://i.pinimg.com/736x/61/23/e1/6123e1e54a33de953797718103887089.jpg' },
  { name: 'Onion', price: 70, img: 'https://t3.ftcdn.net/jpg/09/54/54/88/360_F_954548899_M6D9TLhN9G1FkwUHEX78NAUp33LRImdf.jpg' },
  { name: 'Pineapple', price: 130, img: 'https://cdn.mos.cms.futurecdn.net/D2buHfHJAu9EmxPbEcmUT5.jpg' },
  { name: 'Spinach', price: 45, img: 'https://www.trustbasket.com/cdn/shop/articles/Spinach.webp?v=1686909241' },
  { name: 'Broccoli', price: 90, img: 'https://www.health.com/thmb/gX-_Nn-CquRW2-2xXjnlqsRPg6s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TypesOfBroccoli-6dd837ebc29047889872aeeb175a3646.jpg' }
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
              <i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
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
  const seen = new Set();

  const filteredProducts = allProducts.filter(product => {
    const lowerName = product.name.toLowerCase();
    if (lowerName.includes(searchTerm) && !seen.has(lowerName)) {
      seen.add(lowerName);
      return true;
    }
    return false;
  });

  if (filteredProducts.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = 'list-group-item suggestion-item';
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
