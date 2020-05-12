# :motorway: router

History router.

[![Unit Tests](https://github.com/aminnairi/router/workflows/Unit%20Tests/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Unit+Tests%22) [![Code Style](https://github.com/aminnairi/router/workflows/Code%20Style/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Code+Style%22) [![Release Check](https://github.com/aminnairi/router/workflows/Release%20Check/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Release+Check%22) [![Coverage Status](https://coveralls.io/repos/github/aminnairi/router/badge.svg?branch=latest)](https://coveralls.io/github/aminnairi/router?branch=latest)

## :thinking: Usage

```javascript
Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

## :arrow_down: Installation

### ECMAScript Modules

```console
$ curl -o router.mjs https://raw.githubusercontent.com/aminnairi/router/latest/release/module/router.mjs
$ touch index.js
```

```javascript
import {Router} from "./router.mjs";

Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

### CommonJS

```console
$ npm install aminnairi/router
$ touch index.js
```

```javascript
const {Router} = require("@aminnairi/router");

Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

Or

```console
$ curl -o router.cjs https://raw.githubusercontent.com/aminnairi/router/latest/release/commonjs/router.cjs
$ touch index.js
```

```javascript
const {Router} = require("./router.cjs");

Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

### Deno

```console
$ touch mod.js
```

```javascript
import {Router} from "https://raw.githubusercontent.com/aminnairi/router/latest/release/module/router.mjs";

Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

### Browser

```console
$ curl -o router.js https://raw.githubusercontent.com/aminnairi/router/latest/release/browser/router.js
$ touch index.html
```

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="./router.js"></script>
        <script>
            "use strict";

            const {Router: BrowserRouter} = window.Router;

            BrowserRouter.on("/", () => {
                console.log("Home page");
            });

            BrowserRouter.start();
        </script>
    </body>
</html>
```

## :nerd_face: API

### Router

#### on

Triggers a callback when a pattern match the current page.

```typescript
on(pattern: string, callback: (parameters?: {[key: string]: string}) => void): void;
```

```javascript
Router.on("/users", () => {
    console.log("List of all users");
});

Router.on("/user/:id", ({id}) => {
    console.log(`Details for user #${id}`);
});

Router.on("/user/:id/posts", ({id}) => {
    console.log(`List of all posts for user #${id}`);
});

Router.on("/user/:userId/post/:postId", ({userId, postId}) => {
    console.log(`Post #${postId} for user #${userId}`);
});

Router.on("/photo/:id", ({id}) => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(response => response.json())
        .then(console.log)
        .catch(console.error);
});

Router.on("/post/:id", async ({id}) => {
    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const response = await fetch(url);
        const post = await response.json();

        console.log(post);
    } catch (error) {
        console.log(`Unable to retrieve post #${id}`);
    }
});
```

#### onPageNotFound

Triggers a callback when no patterns match the current page.

```typescript
onPageNotFound(callback: () => void): void;
```

```javascript
Router.onPageNotFound(() => {
    console.log("Page not found");
});
```

#### start

Listen for routes registered using `Router.on`.

```typescript
start(): void;
```

```javascript
Router.start();
```

#### goToPage

Programatically change the route without causing the page to reload.

```typescript
goToPage(page: string): void;
```

```javascript
Router.goToPage("/");
```
