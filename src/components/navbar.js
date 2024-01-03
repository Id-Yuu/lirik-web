import "./search.js";

class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
            <search-lirik></search-lirik>
        `;
  }
}

customElements.define("nav-bar", Navbar);
