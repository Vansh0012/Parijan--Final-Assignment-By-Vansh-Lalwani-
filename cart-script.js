// Example cart (in real case, you could load this from localStorage or a server)
let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
  
  function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
  
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" class="cart-thumbnail" alt="${item.name}" />
        <div class="cart-item-info">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">€${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-minus" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-plus" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    updateSummary();
  }
  
  function updateSummary() {
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);
    document.querySelector('.subtotal').textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector('.total').textContent = `€${subtotal.toFixed(2)}`;
  }
  
  document.addEventListener('click', function (e) {
    const id = parseInt(e.target.dataset.id);
    if (e.target.classList.contains('quantity-plus')) {
      const item = cart.find(p => p.id === id);
      item.quantity += 1;
    }
    if (e.target.classList.contains('quantity-minus')) {
      const item = cart.find(p => p.id === id);
      if (item.quantity > 1) item.quantity -= 1;
    }
    if (e.target.classList.contains('remove-item')) {
      cart = cart.filter(p => p.id !== id);
    }
    renderCart();
  });
  
  document.querySelector('.continue-shopping-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Adjust this path as needed
  });
  
  document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Redirect or integrate payment logic
  });
  
  renderCart();
document.addEventListener('DOMContentLoaded', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const itemHTML = `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" width="60" height="60" />
          <div>
            <p><strong>${item.name}</strong></p>
            <p>${item.price} × ${item.quantity}</p>
          </div>
        </div>
        <hr>
      `;
      cartContainer.innerHTML += itemHTML;
    });
  }
});
document.querySelector('.email-btn').addEventListener('click', function () {
  window.location.href = 'mailto:orders@parijan.com';
});
