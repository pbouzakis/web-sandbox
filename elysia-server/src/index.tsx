import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

const app = new Elysia();

app.use(html());

app.get("/hello", () => "Hello Elysia")

app.get('/html', () => `
  <html lang="en">
      <head>
          <title>Hello World</title>
      </head>
      <body>
          <h1>Hello World</h1>
      </body>
  </html>  `
);

app.get('/jsx', () => (
  <html lang="en">
      <head>
          <title>This is written in jsx. Nice!</title>
      </head>
      <body>
          <h1>Hello World from Bun! (w/ jsx)</h1>
      </body>
  </html>
));

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
