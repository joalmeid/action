import {encode} from '@msgpack/msgpack'
import {HttpResponse, WebSocket} from 'uWebSockets.js'
import PROD from '../PROD'
import sendSSEMessage from '../sse/sendSSEMessage'
import isHttpResponse from './isHttpResponse'

const encoder = PROD ? encode : JSON.stringify
const sendEncodedMessage = (transport: WebSocket | HttpResponse, message: object | string) => {
  if (transport.done) return
  if (isHttpResponse(transport)) {
    sendSSEMessage(transport as HttpResponse, JSON.stringify(message))
    return
  }
  transport.send(encoder(message) as string | Buffer)
}

export default sendEncodedMessage
