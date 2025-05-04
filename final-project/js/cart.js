// Cart functionality with localStorage
let cartItemCount = 0;

// Initialize cart from localStorage
function initializeCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.querySelector('.cart-content');
    const cartItemCountBadge = document.querySelector('.cart-item-count');
    
    if (cartContent) {
        cartContent.innerHTML = '';
        savedCart.forEach(item => {
            addCartItemToDOM(item);
        });
    }
    
    // Update cart count
    cartItemCount = savedCart.length;
    updateCartCount();
}

// Add item to cart
function addToCart(productBox) {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    // Check if item already exists in cart
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.some(item => item.title === productTitle)) {
        alert("This item is already in the cart");
        return;
    }

    // Create cart item object
    const cartItem = {
        imgSrc: productImgSrc,
        title: productTitle,
        price: productPrice,
        quantity: 1
    };

    // Add to localStorage
    savedCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(savedCart));

    // Add to DOM if on product page
    const cartContent = document.querySelector('.cart-content');
    if (cartContent) {
        addCartItemToDOM(cartItem);
    }

    // Update cart count
    cartItemCount++;
    updateCartCount();
    updateTotalPrice();
}

// Add cart item to DOM
function addCartItemToDOM(item) {
    const cartContent = document.querySelector('.cart-content');
    if (!cartContent) return;

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${item.imgSrc}" alt="Cart image">
        <div class="cart-detail">
            <h2 class="cart-product-title">${item.title}</h2>
            <span class="cart-price">${item.price}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">${item.quantity}</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>`;

    cartContent.appendChild(cartBox);

    // Add event listeners
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        removeFromCart(item.title);
        cartBox.remove();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent);

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }
        
        numberElement.textContent = quantity;
        updateItemQuantity(item.title, quantity);
        updateTotalPrice();
    });
}

// Remove item from cart
function removeFromCart(title) {
    let savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart = savedCart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    
    cartItemCount--;
    updateCartCount();
    updateTotalPrice();
}

// Update item quantity in localStorage
function updateItemQuantity(title, quantity) {
    let savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = savedCart.find(item => item.title === title);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(savedCart));
    }
}

// Update cart count badge
function updateCartCount() {
    const cartItemCountBadge = document.querySelector('.cart-item-count');
    if (cartItemCountBadge) {
        if (cartItemCount > 0) {
            cartItemCountBadge.style.visibility = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visibility = "hidden";
            cartItemCountBadge.textContent = "";
        }
    }
}

// Update total price
function updateTotalPrice() {
    const totalPriceElement = document.querySelector(".total-price");
    if (!totalPriceElement) return;

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    savedCart.forEach(item => {
        const price = parseFloat(item.price.replace("$", "").trim());
        if (!isNaN(price)) {
            total += price * item.quantity;
        }
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Buy now functionality
function buyNow() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying");
        return;
    }

    // Clear cart
    localStorage.removeItem('cart');
    const cartContent = document.querySelector('.cart-content');
    if (cartContent) {
        cartContent.innerHTML = '';
    }
    
    cartItemCount = 0;
    updateCartCount();
    updateTotalPrice();
    alert("Thank you for your purchase!");
}

// Export functions for use in other files
window.initializeCart = initializeCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateItemQuantity = updateItemQuantity;
window.updateCartCount = updateCartCount;
window.updateTotalPrice = updateTotalPrice;
window.buyNow = buyNow; 