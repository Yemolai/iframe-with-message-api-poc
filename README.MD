# Cross-domain messaging API Proof-of-concept

This small project intends to be a simple proof-of-concept of cross-domain
communication using the [Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
to solve common issues of code injection in iframes usage to compose apps
with multiple different domain HTML5 apps.

To test it you can install the `parent-app` and `child-app` dependencies using
yarn, as these are Vue projects, and you can run the `parent-app` and child
(`child-app` or `child-html`) together, the `parent-app` can run at any port,
but the child have to be exposed in the 8076 port as it is the port in the
`parent-app` iframe src, you can change it if you want.

The process is that the parent application sets an event listener for `message`
events and waits for an object message data with a property type being
`authRequest` and answers it with a message with an object having a `type`
property `authData` and a `data` property containing fictional auth data.

This is intended to just explain how this API works and should not be directly
translated to production code usage, as it lacks a lot of security concerns
that a complete implementation would have.
