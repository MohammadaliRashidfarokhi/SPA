The Chat application
==========================

The server
------------------

The server address is:

```
wss://courselab.lnu.se/message-app/socket
```

You connect to the server via web sockets and send messages using the json format:

```json
{
  "type": "message",
  "data" : "The message text is sent using the data property",
  "username": "MyFancyUsername",
  "channel": "my, not so secret, channel",
  "key": "A api-key. Found when logged in on the course webpage"
}
```

The properties type, data, username and key are mandatory when sending a message to the server. The properties type, data and username will always be present when you receive a message from the server. Additionally, all properties sent from one user will be echoed to all receiving clients.



The API-key
------------------

If you are logged in to coursepress you should be able to see the API-key near the bottom of this page. The key is used to keep track of users of the application and to curb abuse.



Heartbeat
------------------

The web socket server will send a "heartbeat" message to keep the connection open. This message is sent every 40 seconds and have the following structure:

```json
{
  "type": "heartbeat",
  "data" : "",
  "username": "Server"
}
```

Your application can simply ignore those messages completly.
