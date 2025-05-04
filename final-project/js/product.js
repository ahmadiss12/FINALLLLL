const cartIcon =document.querySelector("#cart-icon");
const cart =document.querySelector(".cart");
const cartClose=document.querySelector("#cart-close");
cartIcon.addEventListener("click",() =>cart.classList.add("active"));
cartClose.addEventListener("click",() =>cart.classList.remove("active"));

// Default products data
const defaultProducts = [
    {
        name: "Toyota Corolla",
        price: "20000",
        image: "image/img6.jpg"
    },
    {
        name: "Ford Mustang",
        price: "35000",
        image: "image/img7.jpg"
    },
    {
        name: "Tesla Model 3",
        price: "45000",
        image: "image/img8.jpg"
    },
    {
        name: "Honda Civic",
        price: "22000",
        image: "image/img9.jpg"
    },
    {
        name: "Chevrolet Camaro",
        price: "28000",
        image: "image/img10.jpg"
    },
    {
        name: "BMW X5",
        price: "60000",
        image: "image/img11.jpg"
    },
    {
        name: "Audi Q7",
        price: "70000",
        image: "image/img12.jpg"
    },
    {
        name: "Mercedes-Benz GLE",
        price: "75000",
        image: "image/img16.jpg"
    },
    {
        name: "Porsche Cayenne",
        price: "85000",
        image: "image/img14.jpg"
    }
];

// Load and display cars from localStorage
function loadCars() {
    const productContent = document.querySelector(".product-content");
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    
    // Clear existing content
    productContent.innerHTML = '';

    // Function to create product box
    function createProductBox(car, index) {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        productBox.innerHTML = `
            <div class="img-box">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <h2 class="product-title">
                ${car.name}
            </h2>
            <div class="price-and-cart">
                <span class="price">$${car.price}</span>
                ${isLoggedIn ? '<i class="ri-shopping-bag-line add-cart"></i>' : ''}  
            </div>
            ${isAdmin ? `
            <div class="admin-controls">
                <button class="edit-btn" data-index="${index}">
                    <i class="ri-edit-line"></i>
                </button>
                <button class="delete-btn" data-index="${index}">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            ` : ''}
        `;
        
        productContent.appendChild(productBox);
        
        // Add click event for the entire product box (except admin controls and add to cart)
        productBox.addEventListener('click', (e) => {
            // Don't navigate if clicking on admin controls or add to cart
            if (e.target.closest('.admin-controls') || e.target.closest('.add-cart')) {
                return;
            }
            // Only navigate if it's Toyota Corolla
            const productTitle = productBox.querySelector('.product-title').textContent.trim();
            if (productTitle === 'Toyota Corolla') {
                window.location.href = 'cardetails.html';
            }
        });
        
        // Add click event for the add-cart button only if user is logged in
        if (isLoggedIn) {
            const addCartButton = productBox.querySelector('.add-cart');
            if (addCartButton) {
                addCartButton.addEventListener('click', () => {
                    addToCart(productBox);
                });
            }
        }

        // Add admin control event listeners
        if (isAdmin) {
            const editBtn = productBox.querySelector('.edit-btn');
            const deleteBtn = productBox.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => {
                editCar(index);
            });

            deleteBtn.addEventListener('click', () => {
                deleteCar(index);
            });
        }
    }

    // Load cars
    cars.forEach((car, index) => {
        createProductBox(car, index);
    });
}

// Call loadCars when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check user role and show/hide Add Car button
    const addCarBtn = document.querySelector('.add-car-btn');
    const userRole = localStorage.getItem('userRole');
    
    if (addCarBtn) {
        if (userRole === 'admin') {
            addCarBtn.style.display = 'inline-block';
        } else {
            addCarBtn.style.display = 'none';
        }
    }

    // Load cars from localStorage
    loadCars();

    // Initialize price slider
    const priceSlider = document.getElementById('price-slider');
    if (priceSlider) {
        // Set initial value
        updatePriceFilter(priceSlider.value);
    }
});

const cartContent=document.querySelector(".cart-content");
const addToCart=productBox =>{
    const productImgsSrc=productBox.querySelector("img").src;
    const productTitle=productBox.querySelector(".product-title").textContent;
    const productPrice=productBox.querySelector(".price").textContent;

    const cartItems=cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItems){
        if(item.textContent === productTitle){
            alert("this item is already in the cart");
            return;
        }
    }
    const cartBox=document.createElement("div");

    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImgsSrc}" alt="Cart image">
    <div class="cart-detail">
        <h2 class="cart-product-title">${productTitle}</h2>
        <span class="cart-price">${productPrice}</span>
        <div class="cart-quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
        </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>`;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () =>{
        cartBox.remove();
        updateCarCount(-1);
        updateTotalPrice();

    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
        const numberElement= cartBox.querySelector(".number");
        const decrementButton= cartBox.querySelector("#decrement");
        let quantity= numberElement.textContent;

        if(event.target.id === "decrement" && quantity >1){
            quantity--;
            if(quantity ===1){
                decrementButton.style.color="#999";
            }
         } else if(event.target.id==="increment"){
                quantity++;
                decrementButton.style.color="#333";
            }
        numberElement.textContent=quantity;
        updateTotalPrice();

    });
    updateCarCount(1);
    updateTotalPrice();
};


const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", "").trim());
        const quantity = parseInt(quantityElement.textContent);

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`; 
};


let cartItemCount=0;
const updateCarCount=change =>{
    const cartItemCountBadge= document.querySelector(".cart-item-count");
    cartItemCount+=change;
    if(cartItemCount>0){
        cartItemCountBadge.style.visibility="visible";
        cartItemCountBadge.textContent=cartItemCount;
    }
    else{
        cartItemCountBadge.style.visibility="hidden";
        cartItemCountBadge.textContent="";
    }
};


const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying");
        return;
    }

    // Get current orders count
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order
    const newOrder = {
        items: Array.from(cartBoxes).map(box => ({
            name: box.querySelector('.cart-product-title').textContent,
            price: box.querySelector('.cart-price').textContent,
            quantity: parseInt(box.querySelector('.number').textContent)
        })),
        total: document.querySelector('.total-price').textContent,
        date: new Date().toISOString()
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cartBoxes.forEach(box => box.remove());
    cartItemCount = 0;
    updateCarCount(0);
    updateTotalPrice();
    alert("Thank you for your purchase!");
});

function editCar(index) {
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const car = cars[index];
    
    // Create and show edit form
    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');
    editForm.innerHTML = `
        <div class="edit-form-content">
            <h2>Edit Car</h2>
            <input type="text" id="edit-name" value="${car.name}" placeholder="Car Name">
            <input type="number" id="edit-price" value="${car.price}" placeholder="Price">
            <input type="text" id="edit-image" value="${car.image}" placeholder="Image URL">
            <div class="edit-buttons">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(editForm);

    // Add event listeners for the form
    const saveBtn = editForm.querySelector('.save-btn');
    const cancelBtn = editForm.querySelector('.cancel-btn');

    saveBtn.addEventListener('click', () => {
        const newName = document.getElementById('edit-name').value;
        const newPrice = document.getElementById('edit-price').value;
        const newImage = document.getElementById('edit-image').value;

        if (newName && newPrice && newImage) {
            cars[index] = {
                name: newName,
                price: newPrice,
                image: newImage
            };
            localStorage.setItem('cars', JSON.stringify(cars));
            editForm.remove();
            // Reload the products
            document.querySelector('.product-content').innerHTML = '';
            loadCars();
        } else {
            alert('Please fill in all fields');
        }
    });

    cancelBtn.addEventListener('click', () => {
        editForm.remove();
    });
}

function deleteCar(index) {
    if (confirm('Are you sure you want to delete this car?')) {
        const cars = JSON.parse(localStorage.getItem('cars') || '[]');
        cars.splice(index, 1);
        localStorage.setItem('cars', JSON.stringify(cars));
        // Reload the products
        document.querySelector('.product-content').innerHTML = '';
        loadCars();
    }
}

// Add this function after your existing constants
function updatePriceFilter(value) {
    // Update the displayed price value
    document.getElementById('price-value').textContent = value;
    
    // Get all product boxes
    const productBoxes = document.querySelectorAll('.product-box');
    const maxPrice = parseFloat(value);
    
    productBoxes.forEach(box => {
        const priceText = box.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));
        
        // Show/hide based on price
        if (price <= maxPrice) {
            box.style.display = '';
        } else {
            box.style.display = 'none';
        }
    });
}

