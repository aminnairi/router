# :motorway: router

History router.

[![Unit Tests](https://github.com/aminnairi/router/workflows/Unit%20Tests/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Unit+Tests%22) [![Code Style](https://github.com/aminnairi/router/workflows/Code%20Style/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Code+Style%22) [![Release Check](https://github.com/aminnairi/router/workflows/Release%20Check/badge.svg)](https://github.com/aminnairi/router/actions?query=workflow%3A%22Release+Check%22)

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
$ curl -o router.mjs https://github.com/aminnairi/router/blob/next/release/module/router.mjs
```

```javascript
import {Router} from "./router.mjs";
```

### CommonJS

```console
$ npm install aminnairi/router
```

```javascript
const {Router} = require("@aminnairi/router");
```

### Deno

```javascript
import {Router} from "https://raw.githubusercontent.com/aminnairi/router/next/release/module/router.mjs";
```

### Browser

```console
$ curl -o router.js https://raw.githubusercontent.com/aminnairi/router/next/release/browser/router.js
$ touch index.html
```

```html
<!DOCTYPE html>
<html>
    <body>
        <script src="./router.js"></script>
        <script>
            "use strict";

            const {Router} = window.Router;
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
