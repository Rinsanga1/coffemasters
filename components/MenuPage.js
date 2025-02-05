import API from '../services/API.js';
import ProductItem from './ProductItem.js';


export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    let template = document.getElementById("menu-page-template");
    let content = template.content.cloneNode(true);
    let styles = document.createElement("style");

    this.root.appendChild(content);
    this.root.appendChild(styles);

    async function loadCSS() {
      let request = await fetch("/components/MenuPage.css");
      styles.textContent = await request.text();
    }
    loadCSS();
  }

  connectedCallback() {
    this.render();
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        let liCategory = document.createElement("li");
        liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class='category'>
                </ul>`;
        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.map(product => {
          let item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = `Loading...`;
    }
  }

}

customElements.define("menu-page", MenuPage);
