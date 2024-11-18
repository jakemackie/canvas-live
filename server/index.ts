const express = require('express')
const http = require('http')
const chalk = require('chalk')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

type Point = { x: number; y: number }

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

let players = 0;

io.on('connection', (socket) => {
  socket.on('client-ready', () => {
    console.log(`Client connected: ${socket.id}, total players: ${players}`);
    players++;
    io.emit('clients-count', players);
    socket.broadcast.emit('get-canvas-state');
  });

  socket.on('canvas-state', (state) => {
    socket.broadcast.emit('canvas-state-from-server', state);
  });

  socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color });
  });

  socket.on('clear', () => io.emit('clear'));

  socket.on('disconnect', () => {
    players = Math.max(players - 1, 0);
    io.emit('clients-count', players);
  });
});

server.listen(3001, () => {
  console.log(`${chalk.green('✓')} Server running on port 3001`)
})