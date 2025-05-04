function filterProducts() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const products = document.querySelectorAll(".product-box");

    products.forEach((product) => {
        const productTitle = product.querySelector(".product-title").textContent.toLowerCase();

        if (productTitle.includes(searchQuery)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
