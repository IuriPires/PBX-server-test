const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let guests = []

io.on('connection', socket => {
  console.log('[IO] Connection => Server has a new connection')
  socket.on('message.new', data => {
      console.log('[SOCKET] Chat.message => ', data)
      io.emit('message.show', data)
  })
  socket.on(('guest.show'), data => {
    io.emit('guest.show', guests)
  })
  socket.on('guest.new', data => {
      guests = [...guests, data]    
      io.emit('guest.show', guests)
  })

  socket.on('disconnect', () => {
      console.log('[SOCKET] Disconnect => A connection was disconnected')
  })
})


http.listen(3000, () => {
  console.log('Application has been started at port 3000');
})