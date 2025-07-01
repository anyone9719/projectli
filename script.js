// Initialize Swiper for Hero Slider
const heroSwiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Product Data
const customProducts = [
  { name: 'Tomato', price: 40, img: 'https://www.almanac.com/sites/default/files/users/The%20Editors/tomatoes_ozgurdonmaz_gettyimages-edit_full_width.jpeg', reviews: 4 },
  { name: 'Cucumber', price: 50, img: 'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg', reviews: 5 },
  { name: 'Carrot', price: 60, img: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHxlbnwwfHwwfHx8MA%3D%3D', reviews: 3 },
  { name: 'Potato', price: 30, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVWt2bG1fRw0fFxQLM39GoCH0hkXfVO9uA2w&s', reviews: 4 },
  { name: 'Apple', price: 120, img: 'https://www.earth.com/assets/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2019%2F06%2F19132041%2FHow-the-apple-became-such-a-ubiquitous-iconic-fruit-across-the-globe-1400x850.jpg&w=1200&q=75', reviews: 4 },
  { name: 'Banana', price: 80, img: 'https://thumbs.dreamstime.com/b/banana-bunch-hanging-palm-tree-ai-generative-design-background-instagram-facebook-wall-painting-art-backgrounds-wallpaper-325270238.jpg', reviews: 3 },
  { name: 'Mango', price: 150, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx2tmzH9WS5HbdC5j-sEBuEe5S6Nar9OEDwQ&s', reviews: 5 },
  { name: 'Onion', price: 35, img: 'https://t3.ftcdn.net/jpg/09/54/54/88/360_F_954548899_M6D9TLhN9G1FkwUHEX78NAUp33LRImdf.jpg', reviews: 4 },
  { name: 'Eggplant', price: 70, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJiWmeeYXAs4OPqkG-wOHBdURQhpP9Uw42Tg&s', reviews: 2 },
  { name: 'Cauliflower', price: 90, img: 'https://www.epicgardening.com/wp-content/uploads/2023/09/Types-of-Cauliflower.jpg', reviews: 4 }
];

// Swiper instance variable for custom slider
let customSwiperInstance = null;

// Render Custom Swiper Slider
function renderCustomSlider(data = customProducts) {
  const wrapper = document.getElementById('custom-product-list');
  wrapper.innerHTML = '';

  data.forEach(product => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide custom-slide';
    slide.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Rs. ${product.price}</p>
        <div class="star-rating">
          ${'★'.repeat(product.reviews)}${'☆'.repeat(5 - product.reviews)}
        </div>
        <div class="button-container">
          <button class="btn btn-primary addcart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          <button class="btn btn-success" onclick="buyNow('${product.name}', ${product.price})">Buy Now</button>
        </div>
      </div>`;
    wrapper.appendChild(slide);
  });

  if (customSwiperInstance) {
    customSwiperInstance.destroy(true, true);
  }

  customSwiperInstance = new Swiper('.customSwiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      prevEl: '.custom-prev',
      nextEl: '.custom-next'
    },
    breakpoints: {
      1200: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      576: { slidesPerView: 1 },
      320: { slidesPerView: 1 }
    }
  });

  document.querySelectorAll('.custom-slide').forEach(s => s.classList.add('show'));
}

// Add to Cart Functionality with localStorage persistence
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay(cart);

}

// Update cart count and total amount display in header (assumes .cart-count and .cart-total elements exist)
function updateCartDisplay(cart) {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalCount);
  document.querySelectorAll('.cart-total').forEach(el => el.textContent = `Rs. ${totalAmount}`);
}

// Buy Now handler
function buyNow(name, price) {
  alert(`Proceeding to checkout for ${name} - Rs. ${price}`);
}

// Listen for add to cart button clicks
document.addEventListener('click', e => {
  if (e.target.classList.contains('addcart')) {
    const name = e.target.dataset.name;
    const price = +e.target.dataset.price;
    addToCart(name, price);
  }
});

// Products list for other sections (vegetables-fruits-list)
const products = {
  "vegetables-fruits-list": [
    { name: 'Tomato', price: 40, img: 'https://www.almanac.com/sites/default/files/users/The%20Editors/tomatoes_ozgurdonmaz_gettyimages-edit_full_width.jpeg', reviews: 4 },
    { name: 'Carrot', price: 60, img: 'https://images.unsplash.com/photo-1633380110125-f6e685676160?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHxlbnwwfHwwfHx8MA%3D%3D', reviews: 3 },
    { name: 'Potato', price: 30, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVWt2bG1fRw0fFxQLM39GoCH0hkXfVO9uA2w&s', reviews: 4 },
    { name: 'Apple', price: 120, img: 'https://www.earth.com/assets/_next/image/?url=https%3A%2F%2Fcff2.earth.com%2Fuploads%2F2019%2F06%2F19132041%2FHow-the-apple-became-such-a-ubiquitous-iconic-fruit-across-the-globe-1400x850.jpg&w=1200&q=75', reviews: 4 },
    { name: 'Banana', price: 80, img: 'https://thumbs.dreamstime.com/b/banana-bunch-hanging-palm-tree-ai-generative-design-background-instagram-facebook-wall-painting-art-backgrounds-wallpaper-325270238.jpg', reviews: 3 },
    { name: 'Cucumber', price: 50, img: 'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg', reviews: 5 },
    { name: 'Mango', price: 150, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx2tmzH9WS5HbdC5j-sEBuEe5S6Nar9OEDwQ&s', reviews: 5 },
    { name: 'Orange', price: 100, img: 'https://t3.ftcdn.net/jpg/04/86/61/74/360_F_486617409_HfTkXKIMRNdayEqPKwSzUajDcpayW0mJ.jpg', reviews: 4 },
    { name: 'Onion', price: 70, img: 'https://t3.ftcdn.net/jpg/09/54/54/88/360_F_954548899_M6D9TLhN9G1FkwUHEX78NAUp33LRImdf.jpg', reviews: 4 },
    { name: 'Pineapple', price: 130, img: 'https://cdn.mos.cms.futurecdn.net/D2buHfHJAu9EmxPbEcmUT5.jpg', reviews: 5 },
    { name: 'Spinach', price: 45, img: 'https://www.trustbasket.com/cdn/shop/articles/Spinach.webp?v=1686909241', reviews: 3 },
    { name: 'Broccoli', price: 90, img: 'https://images.everydayhealth.com/images/diet-nutrition/all-about-broccoli-nutrition-facts-health-benefits-uses-and-more-722x406.jpg?w=508', reviews: 4 }
  ]
};

// Render product cards for sections, highlighting searched product if needed
function renderProducts(highlight = "") {
  Object.keys(products).forEach(sectionId => {
    const row = document.getElementById(sectionId);
    row.innerHTML = '';

    products[sectionId].forEach(product => {
      const isHighlight = product.name.toLowerCase() === highlight.toLowerCase();
      const highlightClass = isHighlight ? 'border-success text-success' : '';

      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';
      col.innerHTML = `
        <div class="card product-card ${highlightClass}">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body text-center">
            <h5 class="card-title ${highlightClass}">${product.name}</h5>
            <p class="card-text ${highlightClass}">Rs. ${product.price}</p>
            <div class="star-rating">
              ${'★'.repeat(product.reviews)}${'☆'.repeat(5 - product.reviews)}
            </div>
            <button class="btn btn-primary mb-2 w-100" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <button class="btn btn-success w-100" onclick="buyNow('${product.name}', ${product.price})">Buy Now</button>
          </div>
        </div>`;
      row.appendChild(col);
    });
  });
}

// Search functionality for product suggestions and highlight on click
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

// On page load, render slider and products, update cart count & total
window.onload = () => {
  renderCustomSlider();
  renderProducts();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartDisplay(cart);
};
