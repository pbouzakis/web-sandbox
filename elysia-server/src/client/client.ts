const global = window as any;


const mutObserver = (function () {
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

  function handleMutations(mutations: MutationRecord[]) {
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
  };

  function attributeChanged(mutation: MutationRecord) {
    console.log("attributeChanged", mutation);
    const el = mutation.target as HTMLElement;
    const message = el.dataset.console;
    if (message) {
      console.log("LOADED", el, message)
    }
  }

  function childListChanged(mutation: MutationRecord) {
    console.log("childListChanged", mutation);
    const el = mutation.target as HTMLElement;

    el.querySelectorAll("[data-console]").forEach((el: Element) => {
      const message = (el as HTMLElement).dataset.console;
      if (message) {
        console.log("LOADED", el, message)
      }
    });
  }

  return {
    init: initMutationObserver,
  };

}());

const pbo = {
  renderFoo(selector: string) {
    const foo = document.createElement("div");
    foo.innerHTML = "<a hx-get=\"/web/htmx/foo\" hx-swap=\"outerHTML\">HTMX Hook!</a>";
    global.htmx.process(foo);
    document.querySelector(selector)?.appendChild(foo);
  },
  renderFooTemplate(selector: string) {
    const foo = document.getElementById("tpl-foo") as HTMLTemplateElement;
    const el = foo?.content.cloneNode(true) as HTMLElement;
    const [child] = [...el.children];
    global.htmx.process(child);
    document.querySelector(selector)?.appendChild(el);
  },
  addConsoleTo(selector: string) {
    const el = document.querySelector(selector) as HTMLElement;
    el.dataset.console = "Attribute changed and I will consoled!";
  },
};

mutObserver.init();
global.pbo = pbo;
