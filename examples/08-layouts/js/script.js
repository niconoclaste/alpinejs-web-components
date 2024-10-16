import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
window.AlpineWebComponent = AlpineWebComponent;

import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
window.Alpine = Alpine;

// Define layout
AlpineWebComponent('alpine-layout', '/08-layouts/_layouts/Layout.html');

// Define components
AlpineWebComponent('alpine-header', '/08-layouts/_components/Header.html');
AlpineWebComponent('alpine-nav', '/08-layouts/_components/Navigation.html');
AlpineWebComponent('alpine-footer', '/08-layouts/_components/Footer.html');

Alpine.start();