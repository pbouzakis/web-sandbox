// src/client/client.ts
var global = window;
var mutObserver = function() {
  let mo;
  function initMutationObserver() {
    mo = new MutationObserver(handleMutations);
    mo.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-console"],
      childList: true,
      subtree: true
    });
  }
  function handleMutations(mutations) {
    mutations.forEach((mutation) => {
      switch (mutation.type) {
        case "attributes":
          attributeChanged(mutation);
          break;
        case "childList":
          childListChanged(mutation);
          break;
      }
    });
  }
  function attributeChanged(mutation) {
    console.log("attributeChanged", mutation);
    const el = mutation.target;
    const message = el.dataset.console;
    if (message) {
      console.log("LOADED", el, message);
    }
  }
  function childListChanged(mutation) {
    console.log("childListChanged", mutation);
    const el = mutation.target;
    el.querySelectorAll("[data-console]").forEach((el2) => {
      const message = el2.dataset.console;
      if (message) {
        console.log("LOADED", el2, message);
      }
    });
  }
  return {
    init: initMutationObserver
  };
}();
var pbo = {
  renderFoo(selector) {
    const foo = document.createElement("div");
    foo.innerHTML = "<a hx-get=\"/web/htmx/foo\" hx-swap=\"outerHTML\">HTMX Hook!</a>";
    global.htmx.process(foo);
    document.querySelector(selector)?.appendChild(foo);
  },
  renderFooTemplate(selector) {
    const foo = document.getElementById("tpl-foo");
    const el = foo?.content.cloneNode(true);
    const [child] = [...el.children];
    global.htmx.process(child);
    document.querySelector(selector)?.appendChild(el);
  },
  addConsoleTo(selector) {
    const el = document.querySelector(selector);
    el.dataset.console = "Attribute changed and I will consoled!";
  }
};
mutObserver.init();
global.pbo = pbo;
