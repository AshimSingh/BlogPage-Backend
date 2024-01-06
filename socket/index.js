const { createComment } = require('../src/controllers/commentsControllers')

const mountOnComment = ({ socket, io }) => {
  socket.on('Comment', (author, comment, timestamp, room) => {
    createComment({ author: author._id, comment, blogId: room })
    io.to(room).emit('Comment', author, comment, timestamp)
  })
}

const mountOnTyping = ({ socket }) => {
  socket.on('Typing', (isOn, room) => {
    socket.to(room).emit('Typing', isOn)
  })
}
// const onRoom = (socket, io) => {
//   //when user types in particular blog that blog id is room
//   socket.on('join room', (room) => {
//     console.log(room, 'a room')
//     socket.join(room)

//     mountOnComment({ socket, io, room })
//     mountOnTyping({ socket, io, room })
//   })
// }

const initilizeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('user Connected')
    // onRoom(socket,io)
    socket.on('join room', (room) => {
      console.log(room, 'a room')
      socket.join(room)
    })
    mountOnComment({ socket, io })
    mountOnTyping({ socket, io })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

module.exports = {
  initilizeSocket,
}
