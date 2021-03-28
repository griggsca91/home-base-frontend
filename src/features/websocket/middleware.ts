import { Middleware } from "@reduxjs/toolkit"
import { incomingSensorMessage } from "../garage/garageSlice"

function socketMiddleware(): Middleware {
    console.log("socket middleware called")
    let socket: WebSocket | null = null

    const onOpen = (store: any) => (event: any) => {
        console.log('websocket open', event.target.url);
        // store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = (store: any) => () => {
        console.log("on close")
        // store.dispatch(actions.wsDisconnected());
    };

    const onMessage = (store: any) => (event: any) => {
        const payload = JSON.parse(event.data);
        console.log('receiving server message', payload.source, payload);
        if (payload.source === "garage_sensor") {
            store.dispatch(incomingSensorMessage(payload))
        }
    };
    

    // the middleware part of this function
    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== null) {
                    socket.close();
                }

                socket = new WebSocket("ws://localhost:8080");

                // connect to the remote host
                // websocket handlers
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);

                break;
            case 'WS_DISCONNECT':
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case 'NEW_MESSAGE':
                console.log('sending a message', action.msg);
                socket?.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
                break;
            default:
                console.log('the next action:', action);
                return next(action);
        }
    };
}
  
  export default socketMiddleware();
  