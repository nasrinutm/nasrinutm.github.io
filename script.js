/**
 * script.js - Mohamad Nasrin Portfolio
 * Handles theme switching and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');

    // Function to toggle Dark Theme
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        
        // Update the button icon based on the current mode
        if (document.body.classList.contains('dark-theme')) {
            toggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark'); // Save preference
        } else {
            toggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light'); // Save preference
        }
    };

    // Event listener for the theme toggle button
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }

    // Check for saved user preference in LocalStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    }
});