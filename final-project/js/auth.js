document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    const loginLink = document.getElementById("login-link");
    const userMenu = document.getElementById("user-menu");
    const userButton = document.getElementById("user-button");
    const userDropdown = document.getElementById("user-dropdown");
    const addCarBtn = document.querySelector(".add-car-btn");
    const dashboardLink = document.getElementById("dashboard-link");

    if (isLoggedIn === "true") {
        if (loginLink) loginLink.style.display = "none";
        if (userMenu) userMenu.style.display = "inline-block";
        if (userRole === "admin") {
            if (dashboardLink) dashboardLink.style.display = "block";
        }
        
        // Only show add car button for admin users
        if (addCarBtn) {
            addCarBtn.style.display = userRole === "admin" ? "inline-block" : "none";
        }

        if (userButton && userDropdown) {
            userButton.addEventListener("click", (e) => {
                e.preventDefault();
                userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
            });
        }

        const logoutBtn = document.getElementById("logout");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole"); 
                if (addCarBtn) addCarBtn.style.display = "none";
                if (dashboardLink) dashboardLink.style.display = "none";
                window.location.href = "index.html"; 
            });
        }
    } else {
        if (addCarBtn) addCarBtn.style.display = "none";
        if (loginLink) loginLink.style.display = "block";
        if (userMenu) userMenu.style.display = "none";
        if (dashboardLink) dashboardLink.style.display = "none";
    }
});
