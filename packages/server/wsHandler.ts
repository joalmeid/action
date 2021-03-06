import {WebSocketBehavior} from 'uWebSockets.js'
import handleDisconnect from './socketHandlers/handleDisconnect'
import handleMessage from './socketHandlers/handleMessage'
import wssConnectionHandler from './socketHandlers/wssConnectionHandler'

const wsHandler: WebSocketBehavior = {
  compression: 0,
  idleTimeout: 0,
  maxPayloadLength: 5 * 2 ** 20,
  open: wssConnectionHandler,
  message: handleMessage,
  // today, we don't send folks enough data to worry about backpressure
  close: (ws) => {
    ws.done = true
    handleDisconnect(ws.connectionContext)
  }
}

export default wsHandler
