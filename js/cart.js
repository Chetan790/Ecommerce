function updateCartNavCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemCount = document.getElementById('cart-item-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemCount.textContent = totalItems;
}
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContent = document.getElementById('cart-content');
    const orderProductCount = document.getElementById('order-product-count');
    const orderTotalPrice = document.getElementById('order-total-price');
    const orderFinalTotal = document.getElementById('order-final-total');

    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartContent.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartContent.style.display = 'block';

        let total = 0;
        let totalQuantity = 0;

        cart.forEach(item => {
            const cartRow = document.createElement('tr');
            const shortenedTitle = shortenTitle(item.title);
            const description = generateDescription(item);
            cartRow.innerHTML = `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 15px;">
            <div style="display: flex; align-items: flex-start; justify-content: space-between;">
             <!-- Product Image -->
                <div style="flex-shrink: 0; margin-right: 15px;">
                    <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover;">
                </div>
                <!-- Product Details -->
                <div style="flex-grow: 1;">
                    <!-- Product Title -->
                    <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">
                        ${shortenedTitle}
                    </div>
                    <!-- Quantity Controls -->
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button 
                            class="btn btn-sm btn-secondary" 
                            style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" 
                            onclick="updateQuantity('${item.id}', 'decrease')">-</button>
                        <span style="font-size: 16px; font-weight: bold;">${item.quantity}</span>
                        <button 
                            class="btn btn-sm btn-secondary" 
                            style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" 
                            onclick="updateQuantity('${item.id}', 'increase')">+</button>
                    </div>
                </div>
                     <!-- Price -->
                    <div style="white-space: nowrap; text-align: right; font-size: 14px;">
                    <span>${item.quantity} × $${item.price}</span>
                </div>
            </div>
        </td>
    </tr>
`;


            cartItemsContainer.appendChild(cartRow);
            total += parseFloat(item.price) * item.quantity;
            totalQuantity += item.quantity;
        });

        orderProductCount.textContent = totalQuantity;
        orderTotalPrice.textContent = `$${total.toFixed(2)}`;
        orderFinalTotal.textContent = `$${(total + 30).toFixed(2)}`;
    }

    updateCartNavCount();
}
function updateQuantity(id, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item.id === id);

    if (product) {
        if (action === 'increase') {
            product.quantity += 1;
        } else if (action === 'decrease') {
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function addToCart(id, title, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, title, image, price, quantity: 1, category: 'bag' });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});
