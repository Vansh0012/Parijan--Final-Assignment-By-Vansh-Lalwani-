// Sticky Navbar
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 50);
});

// Dropdown & Currency Handling
const dropBtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');
const chevronIcon = dropBtn.querySelector('i');
const currencyElement = document.querySelector('.currency');
const productPriceElements = document.querySelectorAll('.product-price');

dropBtn.addEventListener('click', () => {
  dropdownContent.classList.toggle('show');
  chevronIcon.classList.toggle('fa-chevron-up');
  chevronIcon.classList.toggle('fa-chevron-down');
});

document.addEventListener('click', (e) => {
  if (!dropBtn.contains(e.target)) {
    dropdownContent.classList.remove('show');
    chevronIcon.classList.remove('fa-chevron-up');
    chevronIcon.classList.add('fa-chevron-down');
  }
});

dropdownContent.addEventListener('click', (e) => {
  const selected = e.target.closest('a');
  if (selected) {
    const currency = selected.dataset.currency || 'INR';
    const flag = selected.querySelector('img').src;
    currencyElement.textContent = `${currency} ${currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : currency}`;
    document.querySelector('#selected-flag').src = flag;

    productPriceElements.forEach(priceEl => {
      const basePrice = parseFloat(priceEl.dataset.price);
      let updatedPrice = basePrice;

      if (currency === 'USD') updatedPrice = basePrice * 1.1;
      else if (currency === 'GBP') updatedPrice = basePrice * 0.85;

      priceEl.textContent = `${updatedPrice.toFixed(2)} ${currency}`;
    });

    dropdownContent.classList.remove('show');
    chevronIcon.classList.remove('fa-chevron-up');
    chevronIcon.classList.add('fa-chevron-down');
  }
});

// ScrollReveal animation
ScrollReveal().reveal('.hero-text, .timeless-elegance, .image-container, .text-overlay, .timeless-text, .old-money-section, .nav-left a, .logo a, .nav-right div, .dropdown-content a', {
  reset: false,
  distance: '0px',
  opacity: 0,
  scale: 0.9,
  duration: 1200,
  delay: 200,
  easing: 'ease-in-out'
});

// Account Modal
const modal = document.getElementById("createAccountModal");
const accountIcon = document.getElementById("account-icon");
const closeBtn = document.querySelector(".close-btn");

accountIcon.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = "block";
});
closeBtn.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Quick Add to Cart
document.querySelectorAll('.quick-add').forEach(button => {
  button.addEventListener('click', function () {
    const productCard = this.closest('.product-card');
    const name = productCard.querySelector('.product-name').textContent;
    const price = productCard.querySelector('.product-price').textContent;
    const img = productCard.querySelector('.main-image').getAttribute('src');

    const cartItem = { name, price, img, quantity: 1 };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});

// Product Image Thumbnail Switching
document.querySelectorAll('.product-card').forEach(card => {
  const mainImage = card.querySelector('.main-image');
  const thumbnails = card.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const newSrc = thumbnail.getAttribute('data-main');
      mainImage.src = newSrc;
    });
  });
});
