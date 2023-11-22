import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

const app = new Elysia();

app.use(html());

app.get("/hello", () => "<h1>Hello Elysia</h1>");

// The following are meant to be served from vite-project.

app.get('/web/html', () => `
  <html lang="en">
      <head>
          <title>Hello World</title>
          <link href="/styles.css" />
      </head>
      <body>
          <h1>Hello World</h1>
      </body>
  </html>  `
);

app.get('/web/jsx', () => (
  <html lang="en">
    <head>
      <title>This is written in jsx. Nice!</title>
      <link href="/styles.css" />
    </head>
    <body>
      <h1>Hello World from Bun! (w/ jsx)</h1>
    </body>
  </html>
));

app.get('/web/htmx', () => (
  <html lang="en">
    <head>
      <title>HTMX Playground</title>
      <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
      <style>{`
            :root {
              font-family: Inter, sans-serif;
              line-height: 1.5;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.87);
              background-color: #242424;
            }
            a:hover {
              text-decoration: underline;
              cursor: pointer;
            }
            body {
              display: flex;
              justify-content: center;
            }
            h1 { margin: 0; padding: 0; }
            main {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}</style>
    </head>
    <body>
      <main>
        <h1>Hello World from Bun, Elysia, TypeScript, and HTMX! (BETH)</h1>
        <p>Technically BETH stack, the T is Turbo, but don't have that setup yet.</p>
        <a hx-get="/web/htmx/more" hx-swap="outerHTML">Click for more!</a>
      </main>
      <script src="/public/client.js"></script>
    </body>
  </html>
));

app.get('/web/htmx/more', () => (
  <div>
    <div>
      <p id="more-content">More content coming your way!</p>
      <a hx-get="/web/htmx/foo" hx-swap="outerHTML">Click for more!</a>
    </div>
    <button onclick="pbo.renderFoo('#playground')">Render Foo Link</button>
    <button onclick="pbo.renderFooTemplate('#playground')">Render Foo Link w/ Template</button>
    <section id="playground"></section>
    <template id="tpl-foo">
      <a hx-get="/web/htmx/foo" hx-swap="outerHTML">HTMX Hook! (template)</a>
      <div data-console="I HAVE BEEN CONSOLED!!!!">Just a div!</div>
      <button onclick="pbo.addConsoleTo('#more-content')">Add console</button>
    </template>
  </div>
));

app.get('/web/htmx/foo', () => (
  <p>Foo foo foo!</p>
));

app.get("/public/client.js", () => new Response(Bun.file("./public/client.js")))

app.get('*', (context) => `<h1>Catchall! url: ${context.request.url}`);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
