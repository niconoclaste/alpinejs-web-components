# alpinejs-web-components

![GitHub release (latest by date)](https://img.shields.io/github/v/release/niconoclaste/alpinejs-web-components)

This package is a tiny script which loads the content of a regular HTML file, converts it to a `Web component` and makes it usable anywhere in your pages with reactivity and logic powered by `Alpine.js`.

<br>

<a name="motivations"></a>

## Motivations
[Alpine.js](https://github.com/alpinejs/alpine/) is a wonderful framework, but it lacks a way to define reusable components and templates 
shareable across multiple pages.

Browser's native [WebComponents API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) is also great, but adding logic and reactivity takes a lot of time and efforts.

So why not combining those two technologies and get the best of these two worlds?

With this package you will be able to create `reusable HTML components` with `Alpine.js` logic and reactivity, use `scoped styles`, predefine `generic templates` without build phase.

<br>

<a name="limitations"></a>

## Limitations
This package is not able to do much more than what Alpine.js and the Web components API are able to do.

Not using a build phase means that everything is done browser side, which may lead to flash rendering effects and layout shifts.

This package does not pretend to be a replacement for JS frameworks and if you already use a build phase, a server-side technology, a static site generator or HTMX in your project, it makes literally no sense to use this package.

More of all the above, `this package is still in development` and is `not (yet) meant to be used in production`.

<br>

<a name="installation"></a>

## Installation

Via `<script>` tag

Insert the following at the end of the `<head>` tag:
```html
<!-- import alpinejs-web-components  -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/cdn.min.js"></script>
    
<!-- import Alpine.js -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs/dist/cdn.min.js"></script>
```

Via `ESM`

Insert the following before the `</body>` closing tag:
```html
<script type="module">

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

</script>
```

<br>

<a name="usage"></a>

# Usage
<ul>
  <li><a href="#define">Define a component</a></li>
  <li><a href="#import">Import a component</a></li>
  <li><a href="#consume">Consume a component</a></li>
  <li><a href="#separate">Global imports in a separate JS file</a></li>
  <li><a href="#shadow-css">Shadow DOM & scoped CSS</a></li>
  <li><a href="#props">Props</a></li>
  <li><a href="#slots">Slots</a></li>
  <li><a href="#nesting">Components nesting</a></li>
  <li><a href="#layouts">Layouts</a></li>
  <li><a href="#emits">Emits</a></li>
  <li><a href="#persist">Persist state</a></li>
  <li><a href="#libraries">Third-party libraries</a></li>
  <li><a href="#islands">Import components just in time</a></li>
  <li><a href="#node-vite">Node.js and vite</a></li>
</ul>

<br>

<a name="define"></a>

## Define a component

Create a `.html` file and add some add HTML, CSS and JS

```html
<!-- /_components/Button.html -->

<button class="myButton">Click me</button>

<style>
  .myButton {
    background: yellow;
    color: red;
  }
</style>

<script>
  const myButton = document.querySelector('.myButton');
  myButton.addEventListener('click', (evt) => {
    alert('clicked !');
  })
</script>
```
This file is a regular HTML file, and it would be great if the above JS code worked as expected.<br>
But if you import this file as a Web component, the code inside the `<script>` tag will not be executed.

You will need to put your JS code inside the HTML (by using `Alpine.js` syntax) to be able to import it and execute it without additional boilerplate code.

```html
<!-- /_components/Button.html -->

<button class="myButton" @click="alert('clicked !')">Click me</button>

<style>
  .myButton {
    background: yellow;
    color: red;
  }
</style>
```

<br>

<a name="import"></a>

## Import a component

After including this package and Alpine.js, call the `AlpineWebComponent()` function.

Via `<script>` tag (in the `<head>` after importing Alpine.js ) :
```html
<head>
  (...)

  <!-- import alpinejs-web-components  -->
  <script src="https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/cdn.min.js"></script>
      
  <!-- import Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs/dist/cdn.min.js"></script>

  <!-- import a component -->
  <script>
    AlpineWebComponent('alpine-button', '/_components/Button.html');
  </script>
</head>
```

Via `ESM` (after `Alpine.start()`) :

```html
<script type="module">
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

  // import a component
  AlpineWebComponent('alpine-button', '/_components/Button.html');
</script>
```

<br>

The `AlpineWebComponent()` function requires 2 arguments:
1. `the name of your component`.<br>
This will define the HTML tag name for your Web component.<br>
According to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#name" target="_blank">Web components specs</a> : <cite>Web components name must start with a lowercase letter and contain a hyphen.</cite>

2. `the path of your component`.<br>This is the path to your component's HTML file.<br>
You can generate different components with different names from the same component's HTML file.<br>
Your component name and your component HTML file name do not need to be the same.

<br>

>NOTE: The rest of this document will use ESM.

<br>

<a name="consume"></a>

## Consume a component

Just add your `Web component` tag anywhere inside the `<body>`

```html
<!-- /index.html -->

<body>

  <alpine-button></alpine-button>

</body>
```

The tag name will be the first argument that you have defined in the `AlpineWebComponent()` function.

>NOTE: Web components tag can not be auto-closed.<br>
This means that writing only `<alpine-button />` will not work.<br>
You have to explicitly open AND close your tag: `<alpine-button></alpine-button>` <br>
even if you have nothing to put between the tags.

>REMIND : In order to use Alpine.js you need to set an `x-data` directive to your component or to a parent.

Your `component` is now `fully powered by Alpine.js` and can consume all Alpine.js methods and directives!

<details>
<summary>Full code (ESM) :</summary>

```html
<!-- /_components/Button.html -->

<button class="myButton" @click="alert('clicked !')">Click me</button>

<style>
  .myButton {
    background: yellow;
    color: red;
  }
</style>
```
```html
<!-- /index.html -->
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

    import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
    window.AlpineWebComponent = AlpineWebComponent;

    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
    window.Alpine = Alpine;
    Alpine.start();

    AlpineWebComponent('alpine-button', '/_components/Button.html');

  </script>
</body>
</html>
```
</details>

<br>

<a name="separate"></a>

## Global imports in a separate JS file

You can put all your JS code into a separated file:

<cite>`/js/script.js`</cite>

```js
// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';

// add alpinejs-web-components to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import Alpine.js
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';

// add Alpine.js to the window object
window.Alpine = Alpine;

// Start Alpine.js
Alpine.start();

// import directly the common components you want to use on all pages
AlpineWebComponent('alpine-header', '/_components/Header.html');
AlpineWebComponent('alpine-footer', '/_components/Footer.html');
```

```html
<!-- /index.html -->
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
    AlpineWebComponent('alpine-button', '/_components/Button.html');
  </script>

</body>
</html>
```

<br>

<a name="shadow-css"></a>

## Shadow DOM & scoped CSS

By default, Web components generated with `AlpineWebComponent()` are returned without a shadow DOM.

Add the `shadow` attribute to your Web component tag to add a shadow DOM with `mode: "open"`.

```html
<!-- /index.html -->

<alpine-button shadow></alpine-button>
```

The HTML in your component will not be accessible by regular scripts.
But it changes nothing for Alpine.js who will work the same with or without shadow DOM.

By adding a shadow DOM, the CSS written inside your component is now fully `scoped`.

```html
<!-- /_components/Button.html -->

<button @click="alert('clicked !')">Click me</button>

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
<summary>More about Web components and CSS:</summary>

<br>

The HTML tag you create for your Web component is not a regular tag and the browser renders it by default as an `inline` element. 

You can style the component's root tag from the inside by using the `:host` CSS pseudo-class.

>The `:root` pseudo-class (which refers to the document `<html>` tag) is not available in the shadow DOM.

>The `:host` pseudo-class (which refers to your `Web component` root tag) is only available in the shadow DOM.

If you use the `:host` pseudo-class in a non-shadow DOM component, the `AlpineWebComponent()` function will change it to your component tag before appending it to the global DOM.<br>

For example, if you define an `alpine-button` component without Shadow DOM and use `:host` in your component's CSS,<br>
 `:host { ... }` will be changed to `alpine-button { ... }`

```html
<!-- /_components/Button.html -->

<style>
  :host {
    display: block;
    background-color: yellow;
  }
</style>
```
will be returned as :

```html
<!-- /index.html -->

<style>
  alpine-button {
    display: block;
    background-color: yellow;
  }
</style>
```

<br>

>NOTE: You cannot use CSS native nesting inside a `:root` pseudo-class if your component have a `shadow DOM`.

</details>

<br>

> NOTE: Without a shadow DOM, your CSS will be applied globally.

<br>

<a name="props"></a>

## Props
You can pass `props` (data) to your component just by using regular Alpine.js `x-data`.

```html
<!-- /index.html -->

<main x-data="{ global: 'I am a global prop' }">

  <alpine-section x-data="{ scoped: 'I am a scoped prop' }"></alpine-section>

</main>
```

```html
<!-- /_components/Section.html -->

<section x-data="{ local: 'I am a local prop'}">

  <h2 x-text="global"></h2>

  <button x-text="scoped"></button>

  <p x-text="local"></p>

</section>
```
Will be rendered:

```html
<!-- /index.html -->

<section>

  <h2>I am a global prop</h2>

  <button>I am a scoped prop</button>

  <p>I am a local prop</p>
  
</section>
```
These props are just Alpine.js reactive data that can be updated from inside or outside the component.

```html
<!-- /index.html -->

<main x-data="{ counter: 0 }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

  <button @click="counter--">DECREMENT</button>

</main>
```
```html
<!-- /_components/Button.html -->

<button @click="counter++">INCREMENT</button>
```

<br>

<a name="slots"></a>

## Slots

Slots work (almost) like regular [Web components slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots).

Without shadow DOM, the markup you put between your Web component's tags will be automatically `prepended` to your component's HTML source.

```html
<!-- /index.html -->

<text-component1>
  <p>one</p>
  <p>two</p>
</text-component1>
```
```html
<!-- /_components/text1.html -->

<p>three</p>
<p>four</p>
```

Will be returned:

```html
<!-- /index.html -->

<text-component1>
  <p>one</p>
  <p>two</p>
  <p>three</p>
  <p>four</p>
</text-component1>
```

You can use `named slots` if you use a shadow DOM or if you want to control where to append the markup.

```html
<!-- /index.html -->

<text-component2>
  <p slot="last">last</p>
  <p slot="first">first</p>
  <p slot="middle">middle</p>
</text-component2>

<!-- or -->
<text-component2 shadow>
  <p slot="last">last</p>
  <p slot="first">first</p>
  <p slot="middle">middle</p>
</text-component2>

```

```html
<!-- /_components/text2.html -->

<slot name="first"></slot>
<p>one</p>
<slot name="middle"></slot>
<p>two</p>
<slot name="last"></slot>
```

Will be returned:

```html
<!-- /index.html -->

<text-component2>
  <p slot="first">first</p>
  <p>one</p>
  <p slot="middle">middle</p>
  <p>two</p>
  <p slot="last">last</p>
</text-component2>

<!-- or -->

<text-component2 shadow>
  <p slot="first">first</p>
  <p>one</p>
  <p slot="middle">middle</p>
  <p>two</p>
  <p slot="last">last</p>
</text-component2>
```

With the `shadow` option, the markup used as slot will be appended to the shadow DOM.<br>
They won't be affected by global styles and will be stylable from the component CSS.

```html
<!-- /index.html -->
<style>
span {
  color: red;
}
</style>

<text-component3 shadow>
  <span slot="text">span</span>
</text-component>

<span>another span</span>

```
```html
<!-- /_components/text3.html -->

<slot name="text"></slot>

<style>
span {
  font-weight: bold;
}
</style>
```

Will be returned:

```html
<!-- /index.html -->

<style>
span {
  color: red;
}
</style>

<text-component3 shadow>
  <span slot="text">bold span</span>
  <!-- this span tag will be bold (not red) -->  
</text-component3>

<span>red span</span>
<!-- this span will be red (not bold) --> 
```

<br>

<a name="nesting"></a>

## Components nesting

You can nest components and, for example, define a component that includes other components.

> NOTE: You cannot define a component (by using the `AlpineWebComponent()` function) inside another component.<br>
You need to define all the components in your (parent) index.html `<script>` tag or in your global JS file.

```html
<!-- /_components/Section.html -->

<section>

  <alpine-heading shadow></alpine-heading>

  <alpine-text></alpine-text>

</section>

<style>
  :host {
    display: block;
  }
  :host + :host {
    border-top: solid 5px black;
  }
</style>
```

```html
<!-- /_components/Heading.html -->

<h1 x-text="title"></h1>

<style>
  h1 {
    font-size: 22px;
  }
</style>
```

```html
<!-- /_components/Text.html -->

<p x-text="text"></p>
```

```html
<!-- /index.html -->

<alpine-section x-data="{
  title: 'SECTION 1 TITLE',
  text: 'Section 1 text'
}"></alpine-section>

<alpine-section x-data="{
  title: 'SECTION 2 TITLE',
  text: 'Section 2 text'
}"></alpine-section>

<script type="module">
  import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
  window.AlpineWebComponent = AlpineWebComponent;

  import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
  window.Alpine = Alpine;
  Alpine.start();

  AlpineWebComponent('alpine-section', '/_components/Section.html');
  AlpineWebComponent('alpine-heading', '/_components/Heading.html');
  AlpineWebComponent('alpine-text', '/_components/Text.html');
</script>
```

>NOTE: Components that have nested components must be without a shadow DOM, but child components can have a shadow DOM.

<br>

<a name="layouts"></a>

## Layouts

Being able to nest components means that you can define common layout templates and use them in all your pages.<br>
You can use slots to add markup locally.

```html
<!-- /_layouts/Layout.html -->

<alpine-header shadow></alpine-header>

<main>
  <h1 x-text="title"></h1>

  <slot name="layout"></slot>

</main>

<alpine-footer shadow></alpine-footer>
```

Just like nested components, you must define your components in the destination HTML file or via a common JS file.

<cite>`/js/script.js`</cite>

```js
// import alpinejs-web-components
import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';

// add alpinejs-web-components to the window object
window.AlpineWebComponent = AlpineWebComponent;

// import Alpine.js
import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';

// add Alpine.js to the window object
window.Alpine = Alpine;

// Start Alpine.js
Alpine.start();

// Define layout
AlpineWebComponent('alpine-layout', '/_layouts/Layout.html');

// Define components used in the layout
AlpineWebComponent('alpine-header', '/_components/Header.html');
AlpineWebComponent('alpine-footer', '/_components/Footer.html');
```

```html
<!-- /index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>layout example</title>
</head>

<body x-data="{ title: 'LAYOUT EXAMPLE'}" x-cloak>
  <alpine-layout>

    <section slot="layout">

      <p>Some markup (via slot)</p>

    </section>

  </alpine-layout>

  <!-- common js code and imports -->
  <script type="module" src="/js/script.js"></script>  
</body>
</html>
```

The `<alpine-layout>` part will be rendered:

```html
<!-- ./index.html -->

<alpine-layout>

  <alpine-header shadow></alpine-header>

  <main>
    <h1 x-text="title">LAYOUT EXAMPLE</h1>

    <section slot="layout">

      <h2>Some markup (via slot)</h2>

      <p>another markup (via slot)</p>

    </section>

  </main>

  <alpine-footer shadow></alpine-footer>

</alpine-layout>
```

You can get rid of the extra `<section>` tag (from the slot) by using a `<template>` tag instead.

Using the previous layout example:

```html
<!-- /index.html -->

<alpine-layout>

  <template slot="layout">

    <h2>Some markup (via slot)</h2>

    <p>another markup (via slot)</p>

  </template>

</alpine-layout>
```

Will be rendered:

```html
<!-- /index.html -->

<alpine-layout>

  <alpine-header shadow></alpine-header>

  <main>
    <h1 x-text="title">LAYOUT EXAMPLE</h1>

    <h2>Some markup (via slot)</h2>

    <p>another markup (via slot)</p>

  </main>

  <alpine-footer shadow></alpine-footer>

</alpine-layout>
```

<br>

<a name="emits"></a>

## Emits
You can emit custom events from your component by using [Alpine.js magic dispatch](https://alpinejs.dev/magics/dispatch) `$dispatch` and listen to it from the parent by using Alpine.js `x-on` / `@` event listener.

```html
<!-- /index.html -->

<main x-data @foo="alert($event.detail.message)">

  <alpine-button></alpine-button>
  
</main>
```

```html
<!-- /_components/Button.html -->

<button @click="$dispatch('foo', { message: 'Hello Papa!' })">
  Say something to the parent
</button>
```

<br>

<a name="persist"></a>

## Persist state

You can use Alpine.js [persist plugin](https://alpinejs.dev/plugins/persist) to keep the state of your data across pages, components and even if you close your browser.

```html
<!-- /index.html -->

<main x-data="{ counter : $persist(0) }">

  <p x-text="counter"></p>

  <alpine-button></alpine-button>

</main>

<script type="module">
  // import alpinejs-web-components
  import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
  window.AlpineWebComponent = AlpineWebComponent;

  // import Persist plugin
  import { persist } from 'https://cdn.jsdelivr.net/npm/@alpinejs/persist/+esm';

  // import Alpine.js
  import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
  window.Alpine = Alpine;

  // Add persist plugin to Alpine.js
  Alpine.plugin(persist);

  // Start Alpine.js
  Alpine.start();

  // import a Web component
  AlpineWebComponent('alpine-button', './_components/Button.html');
</script>


```

```html
<!-- /_components/Button.html -->

<button @click="counter ++">
  INCREMENT
</button>

<button @click="counter --">
  DECREMENT
</button>

<p x-text="counter"></p>
```

<br>

<a name="libraries"></a>

## Third-party libraries in your components

There are 2 ways of using third-party libraries in your components.

>NOTE: In both cases, the Web component must be WITHOUT a shadow DOM and the Javascript that initiates the library MUST be written directly inside the component's file.

### 1. By loading the library in your main .html file

Consider the following main `/index.html` file importing Swiper.js library JS and CSS:<br>

```html
<!-- /index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>import Swiper Web component</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">
  <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
</head>
<body>
  
  <alpine-swiper></alpine-swiper>
  
  <script type="module">
    import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
    window.AlpineWebComponent = AlpineWebComponent;
    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
    window.Alpine = Alpine;
    AlpineWebComponent('alpine-swiper', '/_components/Swiper.html');
    Alpine.start();
  </script>
</body>
</html>
```

and the following component with the minimum HTML, JS and CSS needed to activate a Swiper carousel.

```html
<!-- /_components/Swiper.html -->

<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
  </div>
</div>

<script>
new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 10,
});
</script>

<style>
.swiper {
  height: 300px;
}
.swiper-slide {
  text-align: center;
  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

The JS inside a Web component will not be imported and executed, unless you provide an `export` attribute to the `<script>` tag.

```html
<script>
// this will not be executed
alert('oh no !')
</script>

<script export>
// this will be imported and executed
alert('oh yes !')
</script>
```

The final working component will look like this:

```html
<!-- /_components/Swiper.html -->

<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
  </div>
</div>

<script export>
new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 10,
});
</script>

<style>
.swiper {
  height: 300px;
}
.swiper-slide {
  text-align: center;
  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 2. By loading the library from the Web component

Consider the following main `/index.html`:<br>

```html
<!-- /index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>import Swiper Web component</title>
</head>
<body>
  
  <alpine-swiper></alpine-swiper>
  
  <script type="module">
    import AlpineWebComponent from 'https://cdn.jsdelivr.net/npm/alpinejs-web-components/+esm';
    window.AlpineWebComponent = AlpineWebComponent;
    import Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs/+esm';
    window.Alpine = Alpine;
    AlpineWebComponent('alpine-swiper', '/_components/Swiper.html');
    Alpine.start();
  </script>
</body>
</html>
```

and the following Web component importing Swiper.js library JS and CSS:

```html
<!-- /_components/Swiper.html -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js" export></script>

<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
  </div>
</div>

<script export>
new Swiper('.swiper', {
  slidesPerView: 2,
  spaceBetween: 10,
});
</script>

<style>
.swiper {
  height: 300px;
}
.swiper-slide {
  text-align: center;
  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

As seen previously, `<script>` tags need an `export` attribute to be imported and executed.

But the problem is that the javascript that activates the library will be executed before the library itself is fully loaded and ready to use.

To resolve this, you can add a value to the export attribute on the script tag that loads the library.<br>
This value (a string) will be converted to a custom event that will be fired when the library is fully loaded and ready to use.

Finally, you can use this custom event name to wait before activating the library.

```html
<!-- /_components/Swiper.html -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js" export="swiperIsReady"></script>

<div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
    <div class="swiper-slide">Slide 4</div>
  </div>
</div>

<script export>
window.addEventListener('swiperIsReady', () => {

  console.log('swiper.js is LOADED and READY to be activated !')
  
  new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 10,
  });
});
</script>

<style>
.swiper {
  height: 300px;
}
.swiper-slide {
  text-align: center;
  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

<br>

<a name="islands"></a>

## Import components just in time (like Astro.js islands)

The HTML inside a `<template>` tag is not parsed and rendered until its content is extracted with JS and appended to the DOM.<br>
This is what Alpine.js does with the `x-if` directive, and this is why `x-if` is only usable with the `<template> `tag.

So you can put your Web component in a `<template>` tag and use Alpine.js `x-if` and switch a `true/false` condition according to a certain event or action.

This event or action could be:<br>
・ window.onload<br>
・ scroll into view (using Alpine.js [Intersect Plugin](https://alpinejs.dev/plugins/intersect) by example)<br>
・ click on a button<br>
・ a mouse hover<br>
etc.

With the Swiper example, it could look like that :

```html
<!-- /index.html -->
<main x-data="{swiperIsVisible: false}">

  <button @click="swiperIsVisible = !swiperIsVisible">Connect / Disconnect SWIPER component</button>

  <template x-if="swiperIsVisible">
    <alpine-swiper></alpine-swiper>
  </template>
</main>
```

The JS and the CSS written or imported inside the component will not be downloaded and executed until the `x-if` condition is resolved to `true`.

>NOTE: with Alpine.js, a `<template>` tag must have only one direct child.<br>
If you need to display more nodes, you will need to wrap them into a `<div>` or another root node tag.


<br>

<a name="node-vite"></a>

## Node.js and Vite

You can install and use this package with Node.js and use [Vite](https://vite.dev/) to preview or build your app.

This package does not include `Alpine.js` and `Vite`, so you will also have to install them.

```bash
# npm
npm install alpinejs-web-components alpinejs vite

# pnpm
pnpm add alpinejs-web-components alpinejs vite
```

Then you can import `Alpine` and the `AlpineWebComponent` function.

```js
import AlpineWebComponent from 'alpinejs-web-components';
import Alpine from 'alpinejs';
```

Minimal `package.json` example :

```json
{
  "name": "alpinejs-web-components app",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "alpinejs": "latest",
    "alpinejs-web-components": "latest"
  },
  "devDependencies": {
    "vite": "latest"
  }
}
```

Minimal `vite.config.js` example :

```js
export default {
  root: 'src/',
  publicDir: '../static/',
  base: './',
  appType: 'mpa',
  server: {
    host: true,
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true
  }
}
```

In order to include your components HTML files on build,<br>
you must put them in a `/static/` folder in your project root folder (outside of the `/src/` folder)

Minimal app structure example :

```
alpinejs-web-components-app
├── package.json
├── vite.config.js
├── static
│   └── _components
│       └── Button.html
└── src
    ├── index.html
    └── assets
        ├── script.js
        └── style.css
```