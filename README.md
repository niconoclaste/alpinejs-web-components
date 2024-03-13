# alpinejs-web-components

![GitHub release (latest by date)](https://img.shields.io/github/v/release/niconoclaste/alpinejs-web-components)

This package is a tiny script who loads code from a regular HTML file, convert it to a `web-component` and make it usable anywhere in your pages with reactivity and logic powered by `AlpineJS`.

<a name="motivations"></a>
# Motivations
[AlpineJS](https://github.com/alpinejs/alpine/) is a wonderfull framework but it lacks a way to define reusable components and templates across all pages.

Browser's native [webComponents API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) is also great, but it lacks a simple way to add reactivity and logic to web components.

So why not combining thoses two technologies and get the best of this two worlds ?

With this package you will be able to create reusable HTML components with AlpineJS logic and reactivity, use scoped styles, predefine generic templates, or render your components just in time `without build phase`.

<a name="limitations"></a>
# Limitations
This package is not able to do much more than what AlpineJS and webComponents API are able to do.

Not using a build phase means that everything is done browser side, which may leads to flash rendering effects and layout shifts.

This package does not pretend to be a replacement for JS frameworks and if you already use a build phase, a server side technology, a static site generator or HTMX in you project, it makes literally no sense to use this package.

More of all the above, this package is not meant to be use in production.


<a name="todo"></a>
# To do before v.1

- regular function to Class ? Object ?
- parameters to object
- make everyting optional
- examples to codepen


<a name="installation"></a>
# Installation

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
This file is a regular HTML file and it does not need AlpineJS to be rendered.<br>But without AlpineJS it make no sense to use this package.

This is the AlpineJS equivalent :

```html
<button class="myButton" @click="console.log('clicked !')">Click me</button>

<style>
  .myButton {
    color: red;
  }
</style>
```

The rest of this docs will be written using AlpineJS

<a name="import"></a>
## Import a component

<cite>`/index.html`</cite>
```html
<!-- via <script> tag -->
<script>

  AlpineWebComponent('button-webcomponent', '/webcomponents/Button.html');

</script>

<!-- via esm -->
<script type="module">

  AlpineWebComponent('button-webcomponent', '/webcomponents/Button.html');

</script>
```
After the import of this package, call the `AlpineWebComponent()` function with 2 required arguments :
- `the name of your component`.<br>This will define the HTML tag name for you component.<br>
According to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#name" target="_blank">specs</a> : <cite>Web components name must start with a lowercase letter and contain a hyphen.</cite>

- `the path of your component`.<br>This is the path to your component's HTML file.
You can generate different components with different names from the same HTML.<br>Your component name and your component HTML file name does not need to be the same.

The rest of this docs will be written using ESM.


<a name="consume"></a>
## Consume a component

<cite>`/index.html`</cite>
```html
<main x-data>

  <button-webcomponent></button-webcomponent>

</main>
```
Just add your `web-component` inside `<body>`

The tag name will be the first argument that you defined in the `AlpineWebComponent()` function.

Web-components can not be auto-closed.<br>
This mean that writing only `<button-webcomponent />` in your HTML will not work.<br>You need to explecitily open AND close your HTML tag : `<button-webcomponent> (...) </button-webcomponent>`.

In order to use AlpineJS you need to set `x-data` directive to your component or to a parent.

Your component is not fully powered by AlpineJS and can consume all AlpineJS methods and directives and makes it REALLY easy to use !

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

      <button-webcomponent></button-webcomponent>

    </main>
    
    <script type="module">

      // import alpinejs-web-components
      import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

      // import component
      AlpineWebComponent('button-webcomponent', '/webcomponents/Button.html');

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
You can separate your js code from your HTML

<cite>`/js/script.js`</cite>
```js
// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

// add alpinejs-web-components to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import directly the common components you want to use on all pages
AlpineWebComponent('header-webcomponent', '/webcomponents/Header.html');
AlpineWebComponent('footer-webcomponent', '/webcomponents/Footer.html');

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
  <body>

    <header-webcomponent></header-webcomponent>

    <main>

      <button-webcomponent></button-webcomponent>

    </main>

    <footer-webcomponent></footer-webcomponent>

    <!-- global imports -->
    <script type="module" src="/js/script.js"></script>

    <!-- local imports -->
    <script type="module">
      AlpineWebComponent('button-webcomponent', '/webcomponents/Button.html');
    </script>
  </body>
</html>

```

<a name="shadow"></a>
## Shadow DOM
By default, web-components generated with `AlpineWebComponent()` are returned without a shadow DOM.

Add the `shadow` attribute to your web-component tag to add a shadow DOM with `mode: "open"`.

<cite>`/index.html`</cite><br>
```html
<alpine-button shadow></alpine-button>
```

<br>

<a name="css"></a>
## Scoped CSS
By adding a shadow DOM, your component's CSS are now scoped to the component.<br>
The CSS defined inside your component will not affect the rest of your HTML and the styles defined outside your component will not affect your component.

<cite>`/components/AlpineButton.html`</cite><br>
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

You can style the component's root tag from the inside by using the `:host` CSS pseudo-class.
>The HTML tag you create for your web component is not a regular tag and the browser renders it by default as an `inline` element. 

In the shadow DOM you can't use the `:root` pseudo-class (witch stands for the `<html>` element) and the `:host` pseudo-class (which stands for your `component HTML tag`) is only available in a shadow DOM context.

>If you use the `:root` pseudo-class in a non shadow DOM component, the `AlpineWebComponent()` function will change it to your component tag.

For example if you define a `alpine-button` component without Shadow DOM and use `:host` in your component's CSS, `:host { ... }` will be changed to `alpine-button { ... }`

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
>This will not make your CSS scoped, but you can limit the scope of the CSS defined in your component by nesting your CSS to the component root with `:host`

```html
<style>
  :host {
    display: block;
    background-color: yellow;
    button {
      color: red;
    }
  }

  /* will be returned : */
  alpine-button {
    display: block;
    background-color: yellow;
    button {
      color: red;
    }
  }

  /* which is equivalent to : */
  alpine-button {
    display: block;
    background-color: yellow;
  }
  alpine-button button {
    color: red;
  }
</style>
```
>Note that this will not prevent your element to be styled from the outside.<br>The only way to prevent this is to use shadow DOM.<br>
Without shadow DOM, your CSS will be added to the `<head>` element.<br>

<br>

<a name="props"></a>
## Props
You can pass `scoped props` or `global props` to your component using regular AlpineJS `x-data`.

<cite>`/index.html`</cite><br>
```html
<main x-data="{ global: 'I am a global prop' }">

  <alpine-button x-data="{ scoped: 'I am a scoped prop' }"></alpine-button>

</main>

```
<br>

<cite>`/components/AlpineButton.html`</cite><br>
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

<cite>`/index.html`</cite><br>
```html
<main x-data="{ counter: 0 }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

</main>
```
<br>

<cite>`/components/AlpineButton.html`</cite><br>
```html
<button @click="counter ++">INCREMENT</button>
```

<br>

<a name="emits"></a>
## Emits
You can emit custom events from your component by using AlpineJS `$dispatch` and listen to it from the parent by using AlpineJS ` x-on: / @: ` event listener.

<cite>`/index.html`</cite><br>
```html
<main x-data @foo="console.log($event.detail.message)">

  <alpine-button></alpine-button>
  
</main>
```
<br>

<cite>`/components/AlpineButton.html`</cite><br>
```html
<button @click="$dispatch('foo', { message: 'Hello Papa!' })">
  Say something to the parent
</button>
```


<br>

<a name="slots"></a>
## Slots

Slots works like regular web-components slots.
But slots elements will be returned without the `<slot>` tag.


<cite>`/components/AlpineButton.html`</cite><br>
```html
<button @click="console.log('thank you !')">

  <slot name="text"></slot>

</button>
```
<br>

<cite>`/index.html`</cite><br>
```html
<alpine-button>

  <span slot="text">Click Me !</span>

</alpine-button>

<!-- Will be returned as : -->
<alpine-button>

  <button @click="console.log('thank you !')">

    <span slot="text">Click Me !</span>

  </button>

</alpine-button>
```

<br>

<a name="nesting"></a>
## Components nesting

You can nest components and, for example, define a component who includes other components.<br>
All the components must be defined in your (parent) index.html file.

<cite>`/components/AlpineHeader.html`</cite><br>
```html
<header x-data>

  <alpine-nav shadow></alpine-nav>
  
  <h1 x-text="title"></h1>

</header>
```
<br>

<cite>`/components/AlpineNav.html`</cite><br>
```html
<nav x-data>
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

<cite>`/index.html`</cite><br>
```html
<main x-data="{ title: 'TOP', current: 'top' }">

  <alpine-header></alpine-header>

  <!-- rest of your code -->

</main>

<script type="module">

  // import alpinejs-web-components
  import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

  // define header component
  AlpineWebComponent('alpine-header', '/components/AlpineHeader.html');

  // define nested navigation component
  AlpineWebComponent('alpine-nav', '/components/AlpineNav.html');

  // import AlpineJS
  import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

  // add AlpineJS to the window object
  window.Alpine = Alpine;

  // Start AlpineJS
  Alpine.start();

</script>
```
<br>

<cite>`/about/index.html`</cite><br>
```html
<body x-data="{ title: 'ABOUT', current: 'about' }">

  <alpine-header></alpine-header>

  <!-- rest of your code -->

  <script type="module">
    // same as '/index.html' -->
  </script>
  
</body>
```

<br>

<a name="persist"></a>
## Persist state

Your can use AlpineJS persist plugin to keep the state of a data across pages.

<cite>`/about/index.html`</cite><br>
```html
<body x-data="{ counter : $persist(0) }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

  <script type="module">
    // import alpinejs-web-components
    import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/esm.min.js';

    // define button component
    AlpineWebComponent('alpine-button', '/components/AlpineButton.html');

    // Import Alpine Plugins
    import { persist } from 'https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/+esm';

    // import AlpineJS
    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/+esm';

    // add AlpineJS to the window object
    window.Alpine = Alpine;

    // Start AlpineJS
    Alpine.start();
  </script>
</body>
```
