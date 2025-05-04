document.addEventListener('DOMContentLoaded', function() {
    // Check if user is admin, if not redirect to product page
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
        window.location.href = 'product.html';
    }

    // Handle Add New Car button visibility
    const addCarBtn = document.querySelector('.add-car-btn');
    if (addCarBtn) {
        addCarBtn.style.display = userRole === 'admin' ? 'inline-block' : 'none';
    }

    // Load dashboard data
    loadDashboardData();
});

function loadDashboardData() {
    // Load cars data
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    
    // Update total cars count
    document.getElementById('total-cars').textContent = cars.length;

    // Load users data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    document.getElementById('total-users').textContent = users.length;

    // Load orders data (if implemented)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('total-orders').textContent = orders.length;

    // Populate recent cars table
    const recentCarsTable = document.querySelector('#recent-cars tbody');
    recentCarsTable.innerHTML = '';
    
    // Show all cars
    cars.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.name}</td>
            <td>$${car.price.toLocaleString()}</td>
            <td>
                <button class="edit-btn" onclick="editCar('${car.name}')">
                    <i class="ri-edit-line"></i>
                </button>
                <button class="delete-btn" onclick="deleteCar('${car.name}')">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </td>
        `;
        recentCarsTable.appendChild(row);
    });

    // Populate recent users table
    const recentUsersTable = document.querySelector('#recent-users tbody');
    recentUsersTable.innerHTML = '';
    
    // Show last 5 users
    const recentUsers = users.slice(-5).reverse();
    recentUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="view-btn" onclick="viewUser('${user.username}')">
                    <i class="ri-eye-line"></i>
                </button>
                <button class="delete-btn" onclick="deleteUser('${user.username}')">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </td>
        `;
        recentUsersTable.appendChild(row);
    });
}

function editCar(carName) {
    // Redirect to product page with edit mode
    window.location.href = `product.html?edit=${encodeURIComponent(carName)}`;
}

function deleteCar(carName) {
    if (confirm(`Are you sure you want to delete ${carName}?`)) {
        // Get cars from localStorage
        const cars = JSON.parse(localStorage.getItem('cars') || '[]');
        
        // Remove car
        const updatedCars = cars.filter(car => car.name !== carName);
        
        // Save updated array
        localStorage.setItem('cars', JSON.stringify(updatedCars));
        
        // Reload dashboard data
        loadDashboardData();
    }
}

function viewUser(username) {
    // Get user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);
    
    if (user) {
        alert(`User Details:\nUsername: ${user.username}\nEmail: ${user.email}`);
    }
}

function deleteUser(username) {
    if (confirm(`Are you sure you want to delete user ${username}?`)) {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Remove user
        const updatedUsers = users.filter(user => user.username !== username);
        
        // Save updated users
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Reload dashboard data
        loadDashboardData();
    }
} 