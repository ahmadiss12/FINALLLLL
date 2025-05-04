document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-car-form');
    const imageInput = document.getElementById('car-image');
    const imageUrlInput = document.getElementById('car-image-url');
    const imagePreview = document.getElementById('image-preview');
    const submitButton = form.querySelector('.submit-btn');

    // Handle image preview for both file upload and URL
    function updateImagePreview(imageSource) {
        const img = document.createElement('img');
        img.src = imageSource;
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
    }

    // Handle file upload preview
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updateImagePreview(e.target.result);
                // Clear URL input when file is selected
                imageUrlInput.value = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle URL input preview
    imageUrlInput.addEventListener('input', function(e) {
        const url = e.target.value.trim();
        if (url) {
            updateImagePreview(url);
            // Clear file input when URL is entered
            imageInput.value = '';
        }
    });

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitButton.disabled = true;

        try {
            const name = document.getElementById('car-name').value;
            const price = document.getElementById('car-price').value;
            let imageSource;

            // Check if URL is provided
            if (imageUrlInput.value.trim()) {
                imageSource = imageUrlInput.value.trim();
            } 
            // Check if file is uploaded
            else if (imageInput.files[0]) {
                imageSource = await getBase64(imageInput.files[0]);
            } else {
                throw new Error('Please provide either an image file or URL');
            }

            // Create new car object
            const newCar = {
                name: name,
                price: price,
                image: imageSource
            };

            // Get existing cars from localStorage or initialize empty array
            let cars = JSON.parse(localStorage.getItem('cars') || '[]');
            
            // Add new car
            cars.push(newCar);
            
            // Save updated cars array to localStorage
            localStorage.setItem('cars', JSON.stringify(cars));

            alert('Car added successfully!');
            form.reset();
            imagePreview.innerHTML = '';
            window.location.href = 'product.html';
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error adding car. Please try again.');
        } finally {
            submitButton.disabled = false;
        }
    });
});

// Helper function to convert File to base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
} 