import API from './services/API.js';
import Router from './services/Router.js';
import Store from './services/Store.js';

// Web Components Imports
import MenuPage from './components/MenuPage.js';
import OrderPage from './components/OrderPage.js';
import DetailsPage from './components/DetailsPage.js';
import { loadData } from "./services/Menu.js";


window.app = {}

app.router = Router;
app.store = Store;


window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
  loadData();
});


navigator.serviceWorker.register("/serviceworker.js");



window.addEventListener("appcartchange", event => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
