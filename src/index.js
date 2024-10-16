export default function AlpineWebComponent(tag, path) {
	class CustomComponent extends HTMLElement {
		constructor(shadow, root, alpineJS) {
			super();

			// check if custom component has [shadow] attribute
			if (this.getAttribute('shadow') !== null) {
				this.attachShadow({ mode: 'open' });
				this.shadow = true;
				this.root = this.shadowRoot;
			} else {
				this.shadow = false;
				this.root = this;
			}

			// check if Alpine.js is available
			this.alpineJS = window.Alpine ? window.Alpine : false;
		}

		disconnectedCallback() { }

		connectedCallback() {
			// fetch component raw HTML (as text)
			fetch(path).then(response => response.text()).then(html => {

				// insert fetched raw HTML inside a template and get the HTML as node elements
				const component = document.createElement('template');
				component.innerHTML = html;
				this.root.appendChild(component.content.cloneNode(true));

				if (!this.shadow) {
					// replace [:host] in CSS by component-name if no shadow dom
					const styles = this.root.querySelectorAll('style');
					styles.forEach(style => {
						let shadowStyle = style.innerText;
						if (shadowStyle.includes(':host')) {
							shadowStyle = shadowStyle.replaceAll(':host', tag);
							style.remove();
							const softScopedStyle = document.createElement('style');
							softScopedStyle.textContent = shadowStyle;
							this.root.appendChild(softScopedStyle);
						}
					})
				}

				// add global scripts to the DOM
				const scripts = this.root.querySelectorAll('script[export]');
				scripts.forEach(script => {
					const scriptToExport = document.createElement('script');
					const attributes = script.getAttributeNames().filter(attr => attr !== 'export');
					attributes.forEach(name => {
						scriptToExport.setAttribute(name, script.getAttribute(name));
					})
					scriptToExport.textContent = script.innerHTML;
					this.root.appendChild(scriptToExport);
					scriptToExport.onload = function () {
						const event = new CustomEvent(script.getAttribute('export'), { bubbles: true, composed: true });
						window.dispatchEvent(event);
					}
					script.remove();
				})


				// extract slots inner HTML
				const slots = this.root.querySelectorAll('[slot]');
				slots.forEach(slot => {
					const name = slot.getAttribute('slot');
					const slotDist = this.root.querySelector('slot[name="' + name + '"]');
					if (slot.tagName === 'TEMPLATE') {
						slotDist.after(slot.content.cloneNode(true));
					} else {
						slotDist.after(slot.cloneNode(true));
					}
					slot.remove();
					slotDist.remove();
				})

				// add slots HTML to the shadow DOM
				if (this.shadow) {
					const slotsElements = this.root.querySelectorAll('slot');
					slotsElements.forEach(slot => {
						const slotDist = slot.assignedNodes()[0];
						slot.before(slotDist);
						slot.remove();
					})
				}

				// add to Alpine tree if shadow dom and if Alpine is available
				if (this.shadow && this.alpineJS) {
					this.alpineJS.initTree(this.root);
				}
			})
		}
	}

	customElements.define(tag, CustomComponent);
}