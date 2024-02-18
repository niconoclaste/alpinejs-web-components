# alpinejs-web-components


![GitHub release (latest by date)](https://img.shields.io/github/v/release/niconoclaste/alpinejs-web-components)

This package is a tiny script who loads code from a regular html file, convert it to a `native web component` and make it usable anywhere in your pages with reactivity and logic powered by `AlpineJS`.

<a name="motivations"></a>
## Motivations
[AlpineJS](https://github.com/alpinejs/alpine/) is a wonderfull framework but it lacks a way to define reusable components and templates across all pages.

Brower's native [webComponents API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) is also great, but it lacks a simple way to add reactivity and logic to web components.

So why not combining thoses two technologies and get the best of this two worlds ?

With this package you will be able to create reusable HTML components with AlpineJS logic and reactivity, use scoped styles, predefine generic templates, include your components just in time (just like Astro.js islands) `without build phase`.

<a name="limitations"></a>
## Limitations
This package is not able to do much more than what AlpineJS and webComponents API are able to do.

Not using a build phase means that everything is done browser side, which may leads to flash rendering effects and layout shifts.

This package does not pretend to be a replacement for JS frameworks and if you already use a build phase, a server side technology, a static site generator or HTMX in you project, it makes literally no sense to use this package.

<a name="installation"></a>
## Installation
### Via `<script>` tag

> index.html

Insert the following at the end of the `<head>` tag:
```html
<head>

  (...)

  <!-- alpinejs-web-components  -->
  <script src="https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/cdn.min.js"></script>
  
  <!-- AlpineJS Core -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
```

### Via `ESM`
> index.html

Insert the following at the end of the `<body>` tag:
```html
<body>

  (...)

  <script type="module">
    // alpinejs-web-components
    import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

    // AlpineJS Core
    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

    // add AlpineJS to window object
    window.Alpine = Alpine;

    // Start AlpineJS
    Alpine.start();
  </script>
</body>
```

<a name="usage"></a>
## Usage
<ul>
  <li><a href="#define-components">Define components</a></li>
  <li><a href="#use-components">Use components</a></li>
  <li><a href="#shadow-dom">Shadow DOM</a></li>
  <li><a href="#props">Pass props to components</a></li>
  <li><a href="#emmits">Emitting events to parent or root</a></li>
  <li><a href="#slots">Using slots</a></li>
  <li><a href="#nesting">Components nesting</a></li>
  <li><a href="#persist">Persist AlpineJS state across pages</a></li>
  <li><a href="#external">Use external scripts or styles within your components</a></li>
  <li><a href="#islands">Include components just in time (islands)</a></li>
  <li><a href="#define-templates">Define templates</a></li>
  <li><a href="#use-templates">Use templates</a></li>
  <li><a href="#spa">SPA like usage</a></li>
  <li><a href="#layout-flash">Prevent layout flash effect</a></li>
</ul>