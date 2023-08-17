(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

	class ColoredBox extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
		  this._firstConnection = false;
      this._tagContainer;
      this._tagText = "Hello World";
      
      //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
       
    //Fired when the widget is added to the html DOM of the page
    connectedCallback(){
            this._firstConnection = true;
            this.redraw();       
        }
        
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
		
		//When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy(){
    	    
        }
    //Getters and Setters
    get widgetText() {
      return this._tagText;
        }

    set widgetText(value) {
    	this._tagText = value;
        }
             
    redraw(){
   		if (this._tagContainer){
   			this._tagContainer.parentNode.removeChild(this._tagContainer);
            }

   		var shadow = window.getSelection(this._shadowRoot);
   		var theText = document.createTextNode(this._tagText);    
   		this._tagContainer.appendChild(theText); 
   		this._shadowRoot.appendChild(this._tagContainer);
        }  
	}
 
	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();