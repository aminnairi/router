/**
 * Help using static methods while still having a state base single instance.
 */
class Singleton {
    /**
     * Create if it didn't exist and return it.
     *
     * @return void
     *
     * @example
     * Something.getInstance();
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }
}

/**
 * Ease the routing for web applications.
 */
export class Router extends Singleton {
    /**
     * Creates a new instance.
     *
     * @description This should never be used since this class is using the
     * Singleton pattern and therefore any instance is handled automatically
     * when calling the inherited getInstance method.
     *
     * @return {this} A new instance.
     *
     * @example
     * const router = new Router();
     */
    constructor() {
        super();

        /**
         * @var {object[]} routes All routes registered for this instance.
         */
        this.routes = [];

        /**
         * @var {function} fallback When no route is matching.
         */
        this.fallback = null;
    }

    /**
     * Add a new route.
     *
     * @param {string} pattern A string or a pattern-like for matching the route.
     * @param {function} callback Function callback when the route matches the current page.
     *
     * @throws {Error} If the method is called with more or less than two arguments.
     * @throws {TypeError} If the pattern is not a string.
     * @throws {TypeError} If the callback is not a function.
     *
     * @return {void}
     *
     * @example
     * Router.on("/", () => {});
     * Router.on("/users", () => {});
     * Router.on("/user/:id", ({id}) => {});
     * Router.on("/user/:id/posts", ({id}) => {});
     * Router.on("/user/:userId/post/:postId", ({userId, postId}) => {});
     * Router.on("/user/:userId/post/:postId", async ({userId, postId}) => {});
     */
    static on(pattern, callback) {
        if (2 !== arguments.length) {
            throw new Error("Expected two arguments.");
        }

        if ("string" !== typeof pattern) {
            throw new TypeError("First argument is not a string.");
        }

        if ("function" !== typeof callback) {
            throw new TypeError("Second argument is not a function.");
        }

        Router.getInstance().routes.push({callback, pattern});
    }

    /**
     * Start listening for route changes.
     *
     * @throws {Error} If the method is called with some arguments.
     *
     * @return {void}
     *
     * @example
     * Router.start();
     */
    static start() {
        if (0 !== arguments.length) {
            throw new Error("Expected no arguments.");
        }

        const onPopState = () => {
            const page = window.location.pathname;
            const placeholder = /:(?<placeholder>[a-zA-Z]+)/gu;
            const parameter = "(?<$1>[a-zA-Z0-9]+)";

            let found = false;

            for (const {pattern, callback} of Router.getInstance().routes) {
                const pagePattern = new RegExp(`^${pattern.replace(placeholder, parameter)}$`, "u");

                if (pagePattern.test(page)) {
                    callback(pagePattern.exec(page).groups);

                    found = true;

                    break;
                }
            }

            if (!found && null !== Router.getInstance().fallback) {
                Router.getInstance().fallback();
            }
        };

        window.addEventListener("popstate", onPopState);

        onPopState();
    }

    /**
     * Programmatically change the current page without triggering an HTTP request.
     *
     * @param {string} page The page to go to.
     *
     * @throws {Error} If the method is called with more or less than one argument.
     * @throws {TypeError} If the first argument is not a string.
     * @throws {Error} If the History API is not supported by the browser.
     *
     * @return {void}
     *
     * @example
     * Router.goToPage("/users");
     */
    static goToPage(page) {
        if (1 !== arguments.length) {
            throw new Error("Expected one argument.");
        }

        if ("string" !== typeof page) {
            throw new TypeError("First argument is not a string.");
        }

        if (!window.history) {
            throw new ReferenceError("This browser does not support the History API.");
        }

        window.history.pushState(null, null, page);
        window.dispatchEvent(new window.CustomEvent("popstate"));
    }

    /**
     * Register a page that gets triggered when no pattern matches the current route.
     *
     * @param {function} fallback A function that gets called when no pattern matches the current page.
     *
     * @throws {Error} If the function is called with more or less than one argument.
     * @throws {TypeError} If the first argument is not a function.
     *
     * @return {void}
     *
     * @example
     * Router.onPageNotFound(() => {});
     */
    static onPageNotFound(fallback) {
        if (1 !== arguments.length) {
            throw new Error("Expected one argument.");
        }

        if ("function" !== typeof fallback) {
            throw new TypeError("First argument is not a function.");
        }

        Router.getInstance().fallback = fallback;
    }
}
