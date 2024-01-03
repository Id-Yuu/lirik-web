import backTopIcon from "../assets/img/upArrow.png";

class BackTop extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <a href="#" class="back-top">
        <img src="${backTopIcon}" alt="back top icon" />
      </a>
    `;

    function scrollToTop() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        this.style.display = "block";
        window.scrollTo(0, 0);
      } else {
        this.style.display = "none";
      }
    }
    this.querySelector(".back-top").addEventListener(
      "click",
      scrollToTop.bind(this)
    );
  }
}
customElements.define("back-top", BackTop);
