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

app.get('*', (context) => `<h1>Catchall! url: ${context.request.url}`);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
