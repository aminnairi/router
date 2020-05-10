# :motorway: router

History router.

## :thinking: Usage

```javascript
Router.on("/", () => {
    console.log("Home page");
});

Router.start();
```

## :arrow_down: Installation

### Manual

Copy and paste the content of:
- `release/module/router.mjs` if you use ECMAScript Modules (Browser & Deno)
- `release/commonjs/router.cjs` if you use CommonJS (Node.js)
- `release/browser/router.js` if you use the browser

### Node.js

```console
$ npm install aminnairi/router
```

## :nerd: API

### Router

#### on

Triggers a callback when a pattern match the current page.

```typescript
on(pattern: string, callback: (parameters?: {[key: string]: string}) => void): void;
```

```javascript
import {Router} from "./Router.mjs";

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
import {Router} from "./Router.mjs";

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
import {Router} from "./Router.mjs";

Router.start();
```

#### goToPage

Programatically change the route without causing the page to reload.

```typescript
goToPage(page: string): void;
```

```javascript
import {Router} from "./Router.mjs";

Router.goToPage("/");
```
