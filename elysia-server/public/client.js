// src/client/client.ts
var global = window;
var pbo = {
  renderFoo: (selector) => {
    const foo = document.createElement("div");
    foo.innerHTML = "<a hx-get=\"/web/htmx/foo\" hx-swap=\"outerHTML\">HTMX Hook!</a>";
    global.htmx.process(foo);
    document.querySelector(selector)?.appendChild(foo);
  },
  renderFooTemplate: (selector) => {
    const foo = document.getElementById("tpl-foo");
    const el = foo?.content.cloneNode(true);
    const [child] = [...el.children];
    global.htmx.process(child);
    document.querySelector(selector)?.appendChild(el);
  }
};
global.pbo = pbo;
