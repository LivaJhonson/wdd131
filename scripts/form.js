// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    const productNameSelect = document.getElementById('productName');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');

    // Array of product objects (as provided in the assignment)
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];

    // Function to populate product options
    function populateProducts() {
        if (productNameSelect) { // Ensure the element exists on the page
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1); // Capitalize first letter
                productNameSelect.appendChild(option);
            });
        }
    }

    // Function to display current year in the footer
    function displayCurrentYear() {
        if (currentYearSpan) { // Ensure the element exists on the page
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // Function to display last modification date
    function displayLastModified() {
        if (lastModifiedSpan) { // Ensure the element exists on the page
            lastModifiedSpan.textContent = document.lastModified;
        }
    }

    // Call functions to populate content
    populateProducts();
    displayCurrentYear();
    displayLastModified();

    // Handle form submission for review count (on form.html)
    const reviewForm = document.querySelector('form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', () => {
            let numReviews = localStorage.getItem('numReviews') || 0;
            numReviews++;
            localStorage.setItem('numReviews', numReviews);
        });
    }
});