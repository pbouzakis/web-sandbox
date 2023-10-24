import './style.css'

let linkedCss = document.getElementById("shared-css");
let globalRules = Array.from(linkedCss.sheet.cssRules).map(rule => rule.cssText).join("\n");
let sharedCss = new CSSStyleSheet();
sharedCss.replace(globalRules);

const tpl = document.getElementById("tpl-test");

// const styles = document.getElementById("css");
// const globalCSS = new CSSStyleSheet();
// globalCSS.replaceSync(styles.textContent);
// document.adoptedStyleSheets = [...document.adoptedStyleSheets, globalCSS];



const btnShadow = document.querySelector("button[data-action=shadow]");
btnShadow.addEventListener("click", async () => {
  const el = document.getElementById("shadow");
  const frag = tpl.content.cloneNode(true);
  if (el.shadowRoot) {
    el.shadowRoot.appendChild(frag);
  } else {
    el.attachShadow({mode: "open"}).appendChild(frag);

    let ss = new CSSStyleSheet();
    ss.replace(".green { color: green }");

    el.shadowRoot.adoptedStyleSheets = [sharedCss, ss];
    el?.classList.remove("hidden")
  }
});

const btnLight = document.querySelector("button[data-action=light]");
btnLight.addEventListener("click", () => {
  const el = document.getElementById("light");
  const frag = tpl.content.cloneNode(true);
  el?.appendChild(frag);
  el?.classList.remove("hidden")
});


