var socketioJwt = require('socketio-jwt');

//Helpers
const { addUser, removeUser, getUser, getUsersInRoom } = require('./modelsSocket/users');
const {createMessage,getMessagesInRoom } = require('./modelsSocket/message');

module.exports = function (io) {

  /* io.set('authorization', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
  })); */

    io.on('connection', socket => {
      console.log("connected");
        socket.on('joinRoom', ({ email, actualRoom, userId,timeZone }, cb) => {
          const { error, user } = addUser({ id: socket.id, email, actualRoom, userId,timeZone});
          console.log('Usuario que llega ===>', user);
          if(error) return cb(error);
          socket.join(user.room);
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), messages: getMessagesInRoom(actualRoom._id)});
          cb();
        })

    socket.on('sendMessage', ({ dailyNote, userId }, cb) => {
      const user = getUser(userId);
      const messages = createMessage(dailyNote);
      socket.broadcast.emit('otherMessages', messages);
      io.to(user.room).emit('allMessages', messages)
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      cb();
    })

    socket.on('finishDaily', ({ userId, finish }) => {
      const user = getUser(userId);
      socket.broadcast.emit('finishAll', {finish, message: 'El administrador ha finalizado la daily'});
    })

    socket.on('endTime', ({ userId }) => {
      const user = getUser(userId);
      if(user) {
        io.to(user.room).emit('sendAllFinishTime', { message: 'El tiempo ha finalizado ' });
      }
    })

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.email} abandonó` })
      }
    })
  })
}
