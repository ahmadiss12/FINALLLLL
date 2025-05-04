// 360 View Zoom Controls
document.addEventListener('DOMContentLoaded', function() {
    const modelViewer = document.querySelector('model-viewer');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomLevel = document.querySelector('.zoom-level');
    let currentZoom = 1;

    if (modelViewer && zoomInBtn && zoomOutBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < 2) {
                currentZoom += 0.1;
                modelViewer.setAttribute('camera-orbit', `0deg 75deg ${currentZoom * 2}m`);
                zoomLevel.textContent = `Zoom: ${Math.round(currentZoom * 100)}%`;
            }
        });

        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > 0.5) {
                currentZoom -= 0.1;
                modelViewer.setAttribute('camera-orbit', `0deg 75deg ${currentZoom * 2}m`);
                zoomLevel.textContent = `Zoom: ${Math.round(currentZoom * 100)}%`;
            }
        });
    }

    // Color Switcher
    const colorButtons = document.querySelectorAll('.color-btns button');
    const colorImage = document.getElementById('colorImage');
    const colorCaption = document.querySelector('.colors .caption');

    if (colorButtons.length && colorImage) {
        colorButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                colorButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update image and caption
                const newImage = button.getAttribute('data-img');
                if (newImage) {
                    colorImage.src = newImage;
                    // Update caption based on color
                    const colorName = getColorName(button.style.backgroundColor);
                    colorCaption.textContent = `Color Variant: ${colorName}`;
                }
            });
        });
    }
});

// Helper function to get color name from RGB
function getColorName(rgb) {
    const colors = {
        'rgb(73, 77, 78)': 'Dark Gray',
        'rgb(190, 190, 190)': 'Silver',
        'rgb(0, 60, 128)': 'Blue',
        'rgb(61, 65, 68)': 'Graphite',
        'rgb(25, 24, 29)': 'Black'
    };
    return colors[rgb] || 'Custom';
} 