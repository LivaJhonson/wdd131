// Get the current year for the footer
const currentYearElement = document.querySelector('#currentyear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Get the last modified date for the footer
const lastModifiedElement = document.querySelector('#lastmodified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// Hamburger menu functionality
const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('nav');

if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
        navigation.classList.toggle('open'); // Toggle 'open' class on nav
        
        // Change button icon and aria-label
        if (navigation.classList.contains('open')) {
            hamButton.innerHTML = '&#x2715;'; // 'X' symbol
            hamButton.setAttribute('aria-label', 'Close navigation menu');
        } else {
            hamButton.innerHTML = '&#9776;'; // Hamburger symbol
            hamButton.setAttribute('aria-label', 'Open navigation menu');
        }
    });
}