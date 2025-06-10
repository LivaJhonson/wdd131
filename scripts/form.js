// js/main.js

const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Populate Product Name select element
    const productNameSelect = document.getElementById('productName');

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; // Use product.id for the value attribute
        option.textContent = product.name; // Use product.name for the display text
        productNameSelect.appendChild(option);
    });

    // Handle review counter for review.html
    // This part should primarily be in review.html's JavaScript,
    // but demonstrating the localStorage concept here.

    // On form submission, increment the counter *before* navigating to review.html
    const reviewForm = document.querySelector('form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', () => {
            let reviewCount = localStorage.getItem('numReviews') || 0;
            reviewCount = parseInt(reviewCount) + 1;
            localStorage.setItem('numReviews', reviewCount);
            console.log("Reviews submitted: " + reviewCount); // For debugging
        });
    }

    // Display last modification date in the footer
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});