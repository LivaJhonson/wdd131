// Display last modified date in the footer
document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedElem = document.getElementById('lastModified');
    lastModifiedElem.textContent = `Last Modified: ${document.lastModified}`;
});
