# Info

Chat-client. Config for local usage with local server on Go for default.

# To be used

```
npm i classnames
```

If you want to test with local server(https://github.com/akudnamor/chat-test-task), then use:

```
npm install socket-io-client@2.0.0
```

else you need:

```
npm install socket-io-client@3.1.0
```

and edit files:

  Bar.js:
```
const response = await fetch(
  "https://chat-backend.fabg.space/api/messages?skip=0&limit=15"
);
```
  ChatWindow.js:
```
const { io } = require("socket.io-client");

const socket = io("wss://chat-backend.fabg.space", {
  transports: ["websocket"],
  upgrade: false,
});
```

