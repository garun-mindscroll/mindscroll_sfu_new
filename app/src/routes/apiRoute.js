const fs = require('fs');
const path = require('path');
const roomController = require('../controller/room.controller');
const chatController = require('../controller/chat.controller');
const userController = require('../controller/user.controller');
const config = require('../config/config');

function routes(app) {
    app.get( '/', ( req, res ) => {
        res.sendFile('/index.html' ,{ root: './src' });
    } );

    app.post('/vcapi/create_room', roomController.createRoom);
    app.post('/vcapi/validate_room', roomController.validateRoom);
    app.post('/vcapi/send_invite_mail', roomController.sendInviteMail);
    app.post('/vcapi/create_user_and_get_permission', roomController.createUserAndGetPermission);
    

    app.post('/vcapi/send_chat_message', chatController.sendChatMessage);
    app.post('/vcapi/upload-media', chatController.uploadMedia);
    app.get('/vcapi/message/:id', chatController.getChatMessage);
    app.post('/vcapi/update_chat_message', chatController.updateChatMessage);    
    app.delete('/vcapi/message/:id', chatController.deleteChatMessage);

// User Apis
    app.post('/vcapi/create_user', userController.createUser);
    app.post('/vcapi/add_participant', roomController.addParticipant);

   // END
   app.post('/vcapi/update_socketid', userController.updateSocketid);
   app.post('/vcapi/get_online_offline_participant', userController.getOnlineOfflineParticipant);
   
   
    
}

module.exports = routes;