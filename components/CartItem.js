import { removeFromCart } from "../services/Order.js";


export default class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let item = JSON.parse(this.dataset.item);
    this.innerHTML = ""; // Clear the element

    let template = document.getElementById("cart-item-template");
    let content = template.content.cloneNode(true);

    this.appendChild(content);

    this.querySelector(".qty").textContent = `${item.quantity}x`;
    this.querySelector(".name").textContent = item.product.name;
    this.querySelector(".price").textContent = `$${item.product.price.toFixed(2)}`;
    this.querySelector("a.delete-button").addEventListener("click", event => {
      removeFromCart(item.product.id);
    })
  }
}

customElements.define("cart-item", CartItem);
