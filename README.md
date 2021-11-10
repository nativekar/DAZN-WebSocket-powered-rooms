## DAZN FE LIBRARY

A web socket based Frontend module built as part of the DAZN Front End Engineering Challenge.

### Features

Allows a web socket server to keep pinging data after a fixed delay to clients connected to different rooms.

User(s) in a room have to send `subscribe` to start reciving messages via the web socket service and `unsubscribe` to stop reciving them.

### Usage

```
npm install
npm run dev

Go to localhost:3000
```

#### To-Do

While I've covered all requirements and handled edge cases, the alerting system can be polished.
