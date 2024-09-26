// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';
// import AlpineWebComponent from '/dist/esm.js';

// add alpinejs-web-components to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import directly the common components you want to use on all pages
AlpineWebComponent('alpine-header', '/webcomponents/Header.html');
AlpineWebComponent('alpine-nav', '/webcomponents/Navigation.html');
AlpineWebComponent('alpine-footer', '/webcomponents/Footer.html');

import persist from 'https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/+esm';

// import AlpineJS
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

// Add persist plugin to AlpineJS
Alpine.plugin(persist);

// add AlpineJS to the window object
window.Alpine = Alpine;

// Start AlpineJS
Alpine.start();