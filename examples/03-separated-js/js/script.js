// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';

// add AlpineWebComponent to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import Alpine.js
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';

// add Alpine.js to the window object
window.Alpine = Alpine;

// Start Alpine.js
Alpine.start();

// import directly the common components you want to use on all pages
AlpineWebComponent('alpine-header', './_components/Header.html');
AlpineWebComponent('alpine-footer', './_components/Footer.html');