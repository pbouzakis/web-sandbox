const global = window as any;

const pbo = {
  renderFoo: (selector: string) => {
    const foo = document.createElement("div");
    foo.innerHTML = "<a hx-get=\"/web/htmx/foo\" hx-swap=\"outerHTML\">HTMX Hook!</a>";
    global.htmx.process(foo);
    document.querySelector(selector)?.appendChild(foo);
  },
  renderFooTemplate: (selector: string) => {
    const foo = document.getElementById("tpl-foo") as HTMLTemplateElement;
    const el = foo?.content.cloneNode(true) as HTMLElement;
    const [child] = [...el.children];
    global.htmx.process(child);
    document.querySelector(selector)?.appendChild(el);
  },
};

global.pbo = pbo;
