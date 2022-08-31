const express = require('express');
const cors = require('cors')
  require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');

const io  = new Server(server,{
  cors:{
    origin:'http://localhost:3000'
  }
})
io.on('connection',(socket)=>{
  socket.on('join_room',(data)=>{
    socket.join(data.room);
  });
  socket.on('send_message',(data)=>{
     socket.to(data.room).emit('receive_message',data)
  })
});
server.listen(3001,()=>{
  console.log('listening on port 3001')
})