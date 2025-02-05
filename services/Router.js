var Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach(a => {
      a.addEventListener("click", event => {
        event.preventDefault();
        let href = event.target.getAttribute("href");
        Router.go(href);
      });
    });
    window.addEventListener('popstate', event => {
      Router.go(event.state.route, false);
    });
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, '', route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          pageElement.dataset.productId = route.substring(route.lastIndexOf("-") + 1);
        }
        break;
    }
    if (pageElement) {
      let currentPage = document.querySelector("main").firstElementChild;
      if (currentPage) {
        let fadeOut = currentPage.animate([
          { opacity: 1 }, { opacity: 0 }
        ], { duration: 200 });
        fadeOut.addEventListener("finish", () => {
          currentPage.remove();
          document.querySelector("main").appendChild(pageElement);
          let fadeIn = pageElement.animate([
            { opacity: 0 }, { opacity: 1 }
          ], { duration: 200 });
        });
      } else {
        document.querySelector("main").appendChild(pageElement);
      }

    }

    window.scrollX = 0;
  }
}

export default Router;
