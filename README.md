# alpinejs-web-components

![GitHub release (latest by date)](https://img.shields.io/github/v/release/niconoclaste/alpinejs-web-components)

This package is a tiny script who loads the content of a regular HTML file, convert it to a `web-component` and make it usable anywhere in your pages with reactivity and logic powered by `AlpineJS`.

<a name="motivations"></a>
## Motivations
[AlpineJS](https://github.com/alpinejs/alpine/) is a wonderful framework, but it lacks a way to define reusable components and templates across all pages.

Browser's native [webComponents API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) is also great, but adding logic and reactivity takes a lot of time and efforts.

So why not combining those two technologies and get the best of these two worlds ?

With this package you will be able to create `reusable HTML web-components` with `AlpineJS logic and reactivity`, use `scoped styles`, predefine generic templates `without build phase`.

<a name="limitations"></a>
## Limitations
This package is not able to do much more than what AlpineJS and web-components API are able to do.

Not using a build phase means that everything is done browser side, which may leads to flash rendering effects and layout shifts.

This package does not pretend to be a replacement for JS frameworks and if you already use a build phase, a server side technology, a static site generator or HTMX in your project, it makes literally no sense to use this package.

More of all the above, this package is not (yet) meant to be use in production.


### To do before v.1
- regular function to Class ? Object ?
- Parameters to object
- make everything optional
- examples to codepen


<a name="installation"></a>
## Installation

Via `<script>` tag

Insert the following at the end of the `<head>` tag:

<cite>`/index.html`</cite>
```html
<!-- import alpinejs-web-components  -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/cdn.min.js"></script>
  
<!-- import AlpineJS -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Via `ESM`

Insert the following at the end of the `<body>` tag:

<cite>`/index.html`</cite>
```html
<script type="module">

  // import alpinejs-web-components
  import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

  // import AlpineJS
  import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

  // add AlpineJS to the window object
  window.Alpine = Alpine;

  // Start AlpineJS
  Alpine.start();

</script>
```

<a name="usage"></a>
# Usage
<ul>
  <li><a href="#define">Define a component</a></li>
  <li><a href="#import">Import a component</a></li>
  <li><a href="#consume">Consume a component</a></li>
  <li><a href="#shadow">Shadow DOM</a></li>
  <li><a href="#css">Scoped CSS</a></li>
  <li><a href="#props">Props</a></li>
  <li><a href="#emits">Emits</a></li>
  <li><a href="#slots">Slots</a></li>
  <li><a href="#nesting">Components nesting</a></li>
  <li><a href="#persist">Persist state</a></li>
  <li><a href="#library">Third-party libraries in your components</a></li>
  <li><a href="#islands">Include components just in time</a></li>
  <li><a href="#templates">Templates</a></li>
  <li><a href="#head">Head ??</a></li>
  <li><a href="#spa">SPA ??</a></li>
  <li><a href="#layout-flash">Prevent layout flash effect</a></li>
</ul>


<a name="define"></a>
## Define a component

Create a `.html` file and add HTML, CSS and JS

<cite>`/webcomponents/Button.html`</cite>
```html
<button class="myButton">Click me</button>

<style>
  .myButton {
    color: red;
  }
</style>

<script>
  const myButton = document.querySelector('.myButton');
  myButton.addEventListener('click', (evt) => {
    console.log('clicked !');
  })
</script>
```
This file is a regular HTML file, and it would be great if the above code worked as expected.<br>
But this won't work with web-component.

You will need to use AlpineJS magic to make it work without additional boilerplate code.

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="console.log('clicked !')">Click me</button>

<style>
  .myButton {
    color: red;
  }
</style>
```

<br>

<a name="import"></a>
## Import a component

<cite>`/index.html`</cite>
```html
<!-- via <script> tag -->
<script>

  AlpineWebComponent('alpine-button', '/webcomponents/Button.html');

</script>

<!-- via esm -->
<script type="module">

  AlpineWebComponent('alpine-button', '/webcomponents/Button.html');

</script>
```
After the import of this package, call the `AlpineWebComponent()` function with 2 required arguments :
1. `the name of your component`.<br>
This will define the HTML tag name for you web-component.<br>
According to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#name" target="_blank">web-components specs</a> : <cite>Web components name must start with a lowercase letter and contain a hyphen.</cite>

2. `the path of your component`.<br>This is the path to your web-component's HTML file.<br>
You can generate different components with different names from the same HTML.<br>Your component name and your component HTML file name does not need to be the same.

>NOTE : The rest of these docs will be written using ESM.


<a name="consume"></a>
## Consume a component

<cite>`/index.html`</cite>
```html
<main x-data>

  <alpine-button></alpine-button>

</main>
```
Just add your `web-component` tag inside the `<body>`

The tag name will be the first argument that you defined in the `AlpineWebComponent()` function.

>Web-components can not be auto-closed.<br>
This mean that writing only `<alpine-button />` in your HTML will not work.<br>
You need to explicitly open AND close your HTML tag : `<alpine-button> (...) </alpine-button>`.

In order to use AlpineJS you need to set `x-data` directive to your component or to a parent.

Your `web-component` is now `fully powered by AlpineJS` and can consume all AlpineJS methods and directives !

<details>
  <summary>Full code :</summary>

<cite>`/index.html`</cite>
```html
<!DOCTYPE html>
<html lang="en">
  <head>

    <title>Title</title>
    
  </head>

  <body>

    <main x-data>

      <alpine-button></alpine-button>

    </main>
    
    <script type="module">

      // import alpinejs-web-components
      import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

      // import component
      AlpineWebComponent('alpine-button', '/webcomponents/Button.html');

      // import AlpineJS
      import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

      // add AlpineJS to the window object
      window.Alpine = Alpine;

      // Start AlpineJS
      Alpine.start();

    </script>
  </body>
</html>
```
</details>

<br>
You can also separate your common JS code from your HTML :

<cite>`/js/script.js`</cite>
```js
// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

// add alpinejs-web-components to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import directly the common components you want to use on all pages
AlpineWebComponent('alpine-header', '/webcomponents/Header.html');
AlpineWebComponent('alpine-footer', '/webcomponents/Footer.html');

// import AlpineJS
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

// add AlpineJS to the window object
window.Alpine = Alpine;

// Start AlpineJS
Alpine.start();
```

<cite>`/index.html`</cite>
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>INDEX</title>
  </head>
  <body x-data>

    <alpine-header></alpine-header>

    <main>

      <alpine-button></alpine-button>

    </main>

    <alpine-footer></alpine-footer>

    <!-- common js code and imports -->
    <script type="module" src="/js/script.js"></script>

    <!-- local imports -->
    <script type="module">
      AlpineWebComponent('alpine-button', '/webcomponents/Button.html');
    </script>
  </body>
</html>

```

>NOTE : The rest of these docs will be written without AlpineJS or AlpineWebComponent common imports.

<br>

<a name="shadow"></a>
## Shadow DOM
By default, web-components generated with `AlpineWebComponent()` are returned without a shadow DOM.

Add the `shadow` attribute to your web-component tag to add a shadow DOM with `mode: "open"`.

<cite>`/index.html`</cite>
```html
<alpine-button shadow></alpine-button>
```

The HTML in Your component will not be accessible by regular scripts.
But it changes nothing for AlpineJS who will work the same with or without shadow DOM.

<br>

<a name="css"></a>
## Scoped CSS
By adding a shadow DOM to your component, the CSS written inside your component are now fully `scoped` to your web-component.

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="console.log('clicked !')">Click me</button>

<style>
  :host {
    display: block;
    background-color: yellow;
  }
  
  button {
    color: red;
  }
</style>
```
<details>
  <summary>More about web-component and CSS</summary>

The HTML tag you create for your web component is not a regular tag and the browser renders it by default as an `inline` element. 

You can style the component's root tag from the inside by using the `:host` CSS pseudo-class.

> The `:root` pseudo-class (which refers for the document `<html>` tag) is not available in the shadow DOM.

> The `:host` pseudo-class (which refers to your `web-component` tag) is only available in the shadow DOM.

If you use the `:root` pseudo-class in a non-shadow DOM component, the `AlpineWebComponent()` function will change it to your component tag.<br>
For example if you define an `alpine-button` component without Shadow DOM and use `:host` in your component's CSS,<br>
 `:host { ... }` will be changed to `alpine-button { ... }`

```html
<style>
  :host {
    display: block;
    background-color: yellow;
  }
  
/* will be returned as : */
  alpine-button {
    display: block;
    background-color: yellow;
  }
</style>
```

<br>

>NOTE : You cannot nest your CSS inside a `:root` pseudo-class if you use `shadow DOM`.

</details>

<br>

> NOTE : Without shadow DOM, your CSS will be automatically appended to your page `<head>`.

<br>

<a name="props"></a>
## Props
You can pass `props` (data) to your component just by using regular AlpineJS `x-data`.

<cite>`/index.html`</cite>
```html
<main x-data="{ global: 'I am a global prop' }">

  <alpine-button x-data="{ scoped: 'I am a scoped prop' }">></alpine-button>

</main>

```
<br>

<cite>`/webcomponents/Button.html`</cite>
```html
<div x-data="{ local: 'I am a local prop'}">

  <h2 x-text="global"></h2>

  <button x-text="scoped"></button>

  <p x-text="local"></p>

</div>

<!-- Will be rendered : -->

<div>

  <h2>I am a global prop</h2>

  <button>I am a scoped prop</button>

  <p>I am a local prop</p>
  
</div>
```
These props are just AlpineJS reactive data who can be updated from the component.

<br>

<cite>`/index.html`</cite>
```html
<main x-data="{ counter: 0 }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

  <button @click="counter--">DECREMENT</button>

</main>
```
<br>

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="counter++">INCREMENT</button>
```

<br>

<a name="emits"></a>
## Emits
You can emit custom events from your component by using [AlpineJS magic displatch](https://alpinejs.dev/magics/dispatch) `$dispatch` and listen to it from the parent by using AlpineJS ` x-on: / @: ` event listener.

<cite>`/index.html`</cite>
```html
<main x-data @foo="console.log($event.detail.message)">

  <alpine-button></alpine-button>
  
</main>
```
<br>

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="$dispatch('foo', { message: 'Hello Papa!' })">
  Say something to the parent
</button>
```


<br>

<a name="slots"></a>
## Slots

Slots works like regular [web-components slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots).

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="console.log('thank you !')">
  <slot name="text"></slot>
</button>
```
<br>

>NOTE : the `<slot>` element in your web-component will be replaced by the node you provided.

<cite>`/index.html`</cite>
```html
<alpine-button>
  <span slot="text">Click me please !</span>
</alpine-button>

<!-- Will be rendered : -->
<alpine-button>

  <button @click="console.log('thank you !')">

    <span slot="text">Click me please !</span>

  </button>

</alpine-button>
```



<br>

<a name="nesting"></a>
## Components nesting

You can nest components and, for example, define a component who includes other components.<br>
> NOTE : You cannot define a component inside another component.<br>
You need to define all the components in your (parent) index.html `<script>` tag or in your global JS file.

<cite>`/webcomponents/Header.html`</cite>
```html
<header>

  <alpine-nav></alpine-nav>
  
  <h1 x-text="title"></h1>

</header>
```
<br>

<cite>`/webcomponents/Navigation.html`</cite>
```html
<nav>
  <ul>
    <li>
      <a href="/" :class="current === 'top' ? 'current' : ''">TOP</a>
    </li>
    <li>
      <a href="/about/" :class="current === 'about' ? 'current' : ''">ABOUT</a>
    </li>
  </ul>
</nav>

<style>
  .current {
    pointer-events: none;
    opacity: 0.5;
  }
</style>
```

<br>

<cite>`/js/script.js`</cite>
```js
AlpineWebComponent('alpine-header', '/webcomponents/Header.html');
AlpineWebComponent('alpine-nav', '/webcomponents/Navigation.html');
```

<br>

<cite>`/index.html`</cite>
```html
<main x-data="{ title: 'TOP', current: 'top' }">

  <alpine-header></alpine-header>

</main>
```

<br>

<a name="persist"></a>
## Persist state

You can use AlpineJS [persist plugin](https://alpinejs.dev/plugins/persist) to keep the state of a data across pages, web-components and even if you close your browser.

<cite>`/js/script.js`</cite>
```js
// import Persist plugin
import { persist } from 'https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/+esm';

// import AlpineJS
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

// add AlpineJS to the window object
window.Alpine = Alpine;

// Add persist plugin to AlpineJS
Alpine.plugin(persist);

// Start AlpineJS
Alpine.start();
```

<cite>`/index.html`</cite>
```html
<main x-data="{ counter : $persist(0) }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

</main>
```

<br>

<cite>`/webcomponents/Button.html`</cite>
```html
<button @click="counter ++">
  INCREMENT
</button>

<button @click="counter --">
  DECREMENT
</button>

<p x-text="counter"></p>
```
