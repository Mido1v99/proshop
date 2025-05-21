function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').innerText = cart.length;
}

updateCartCount();
