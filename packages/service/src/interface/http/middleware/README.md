Middleware
==========

HTTP Middlewares are called before the router, such that context mutation or
flow control can be injected.

All middlewares are normalised to use a standard function call with the syntax:
```js
middleware(app = {}, config = {}) { ... }
```
Which returns the middleware handler for the HTTP library to use.
