var socketIO = function (io, socket, onlineUsers,fs) {
  // connect to server
  console.log('a user connected', socket.id);
  socket.on('connectToServer', (data) => { onlineUsers.push(data); });

  // join rooms
  socket.on('join', (data) => {
    console.log(`user ${data.userId} has joined room ${data.roomId}`);
    socket.join(data.roomId);
    // let room know someone joined
    // console.log('======================full socket==>',socket);
    var recentUser = {};
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === data.socketId) {
          onlineUsers[i].roomId = data.roomId;
          recentUser = onlineUsers[i];
      }
    }

    io.to(data.roomId).emit('enteredRoom', recentUser,onlineUsers);
  })

  // send/receive message
  socket.on('message', (data) => {
    console.log(`message from room ${data.roomId} - ${data.displayName}: ${data.msg}`);
    io.to(data.roomId).emit('receivedMsg', { avatar:data.avatar, displayName:data.displayName, msg:data.msg, senderUserId: data.senderUserId,room_id:data.roomId, message_id:data.message_id });
  });

  // file send
  socket.on("send-media-server", function (data) {
    io.to(data.roomId).emit('send-media-client', 
    {
      room_id: data.roomId, user: data.user,message:data.message
    }
      // {
      //   avatar:data.avatar, displayName:data.displayName, file_path:data.file_path,file_type:data.file_type, senderUserId: data.senderUserId,room_id: data.roomId,message_id:data.message_id
      // }
      
    );
  });

    // send updated message
    socket.on('update-message-server', (data) => {
      console.log(`Update message from room ${data.roomId} - ${data.displayName}: ${data.msg}`);
      io.to(data.roomId).emit('update-message-client', { avatar:data.avatar, displayName:data.displayName, msg:data.msg, senderUserId: data.senderUserId,room_id:data.roomId, message_id:data.message_id });
    });
  

  // leave rooms
  socket.on('leave', (data) => {
    socket.leave(data.roomId);
    // find user info
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === data.socketId) {
        onlineUsers[i].roomId = null;
        io.to(data.roomId).emit('disconnected', onlineUsers[i]);
        break;
      }
    }
  });

// delete particuler message
socket.on('deleteMessageSocket', (data) => {
  console.log(`message id ${data.currentMessageId} - room id ${data.roomId} removed from chat`); 
  io.to(data.roomId).emit('delete_message_client', {roomId:data.roomId, messageId:data.currentMessageId} );
});


socket.on('client_user_typing', function(data) {
  console.log(data);
  io.to(data.room_id).emit('server_user_typing', { username:data.username, user_id: data.user_id } );
});


  // track disconnects
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
    for (let i=0; i<onlineUsers.length; i++) {
      if (onlineUsers[i].socketId === socket.id) {
        // let clients know user disconnected
        io.to(onlineUsers[i].roomId).emit('disconnected', onlineUsers[i]);
        // delete user from online list
        onlineUsers.splice(i,1);
      }
    }
  })
}

module.exports = socketIO;