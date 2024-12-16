import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export interface ServerToClientEvents {
  'analytics-update': (data: any) => void
  'notification': (data: any) => void
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void
  'leave-room': (roomId: string) => void
}

export type Socket = SocketIOSocket<ClientToServerEvents, ServerToClientEvents>
export type SocketServer = SocketIOServer<ClientToServerEvents, ServerToClientEvents> 