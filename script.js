// Small browser-side cart for the Fashion Hub demo.
const CART_KEY = 'fashionHubCart';
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function money(value) { return '₹' + Number(value).toLocaleString('en-IN'); }

document.addEventListener('click', (event) => {
  const button = event.target.closest('.buy-button');
  if (!button) return;
  event.preventDefault();
  const card = button.closest('.product-card');
  if (!card) return;
  const title = card.querySelector('.product-title')?.textContent.trim() || 'Fashion item';
  const priceText = card.querySelector('.product-price')?.textContent || '';
  const price = Number(priceText.replace(/[^0-9.]/g, ''));
  const image = card.querySelector('img')?.getAttribute('src') || '';
  if (!price) { alert('Product price is unavailable.'); return; }
  const cart = readCart();
  const existing = cart.find(item => item.title === title && item.price === price);
  if (existing) existing.quantity += 1;
  else cart.push({ title, price, image, quantity: 1 });
  saveCart(cart);
  button.textContent = 'Added ✓';
  setTimeout(() => { button.textContent = 'Buy Now'; }, 1200);
});

function renderCart() {
  const root = document.getElementById('cart-items');
  if (!root) return;
  const cart = readCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  root.innerHTML = '';
  if (!cart.length) {
    root.innerHTML = '<p class="empty-cart">Your cart is empty. Browse a collection and add a product.</p>';
  } else {
    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      const img = document.createElement('img');
      img.src = item.image; img.alt = item.title;
      const details = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = item.title;
      const price = document.createElement('p'); price.textContent = `${money(item.price)} each`;
      const quantity = document.createElement('p'); quantity.textContent = `Quantity: ${item.quantity}`;
      const remove = document.createElement('button'); remove.textContent = 'Remove';
      remove.addEventListener('click', () => { const next = readCart(); next.splice(index, 1); saveCart(next); renderCart(); });
      details.append(title, price, quantity, remove); row.append(img, details); root.append(row);
    });
  }
  const totalNode = document.getElementById('cart-total');
  if (totalNode) totalNode.textContent = money(total);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  const clear = document.getElementById('clear-cart');
  if (clear) clear.addEventListener('click', () => { saveCart([]); renderCart(); });
  const checkout = document.getElementById('checkout-demo');
  if (checkout) checkout.addEventListener('click', () => {
    if (!readCart().length) { alert('Add a product before checkout.'); return; }
    alert('Demo checkout successful! No payment was collected.');
    saveCart([]); renderCart();
  });
});
