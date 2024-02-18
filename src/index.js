export default function AlpineWebComponent (componentName, componentPath) {
	class CustomComponent extends HTMLElement {
		constructor(){
			super();
			// check if custom component has [shadow] attribute
			if(this.getAttribute('shadow') !== null){
				this.attachShadow({ mode: 'open' });
			}

		}
		disconnectedCallback() {
			console.log(componentName+ ': disconnected');
		}
		connectedCallback() {
			console.log(componentName+ ': connected');
			// console.log(componentName);
			// console.log(Alpine);
			
			let hasShadow = null;
			let componentRoot = this;
			if(this.shadowRoot === null){
				hasShadow = false;
			}else {
				hasShadow = true;
				componentRoot = this.shadowRoot;
			}

			// fetch component raw HTML (as text)
			fetch(componentPath)
			.then(response => response.text())
			.then(html => {

				// insert raw HTML inside a template and get HTML as node element
				const component = document.createElement('template');
				component.innerHTML = html;
				componentRoot.appendChild(component.content.cloneNode(true));

				if(!hasShadow){
					// replace [:host] in CSS by component-name if no shadow dom
					const styles = componentRoot.querySelectorAll('style');
					styles.forEach(style => {
						let shadowStyle = style.innerText;
							if(shadowStyle.includes(':host')){
							shadowStyle = shadowStyle.replaceAll(':host', componentName);
							style.remove();
							const softScopedStyle = document.createElement('style');
							softScopedStyle.textContent = shadowStyle;
							componentRoot.appendChild(softScopedStyle);
						}
					})
				}

				// add global scripts to the DOM
				const scripts = componentRoot.querySelectorAll('script[export]');
				scripts.forEach(script => {
					const scriptToExport = document.createElement('script');
					const attributes = script.getAttributeNames().filter(attr => attr !== 'export');
					attributes.forEach(name => {
						scriptToExport.setAttribute(name, script.getAttribute(name));
					})
					scriptToExport.textContent = script.innerHTML;
					componentRoot.appendChild(scriptToExport);
					scriptToExport.onload = function(){
						const event = new CustomEvent(script.getAttribute('export'), {bubbles : true, composed : true});
						window.dispatchEvent(event);
					}
					script.remove();
				})

	
				// add global styles to the DOM
				const links = componentRoot.querySelectorAll('link[export]');
				links.forEach(link => {
					const linkToAppend = document.createElement('link');
					const attributes = link.getAttributeNames().filter(attr => attr !== 'export');
					attributes.forEach(name => {
						linkToAppend.setAttribute(name, link.getAttribute(name));
					})
					document.head.appendChild(linkToAppend);
				})


				// replace the slots elements by their inner HTML
				const slots = componentRoot.querySelectorAll('[slot]');
				slots.forEach(slot => {
					console.log(slot.tagName);
					const name = slot.getAttribute('slot');
					const slotDist = componentRoot.querySelector('slot[name="'+name+'"]');
					if(slot.tagName === 'TEMPLATE'){
						slotDist.after(slot.content.cloneNode(true));
					}else {
						slotDist.after(slot.cloneNode(true));
					}
					slot.remove();
					slotDist.remove();
				})


				// add to Alpine tree if shadow
				if(hasShadow){
					Alpine.initTree(componentRoot);
				}
			})
		}
	}
	
	customElements.define(componentName, CustomComponent);
}