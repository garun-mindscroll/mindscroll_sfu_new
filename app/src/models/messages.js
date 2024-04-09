const orm = require('../config/orm');

const messages = {
    name: 'messages',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },
    getRoomLastMsgs: async function(roomId) {
        let sql = `SELECT messages.id, messages.room_id, messages.message_body, messages.user_id, messages.id,messages.type,messages.file_path,messages.updated_at 
        FROM messages WHERE messages.room_id = '${roomId}' order by messages.id DESC limit 1 ;`;
        const result = await orm.directQuery(sql);
        return result.length > 0  ? result[0] : {};
    },

    getRoomMsgs: async function(roomId) {
        let sql = `SELECT messages.room_id, users.profile_image as avatar_dirct, users.fname as display_name, messages.message_body, messages.user_id, messages.id,messages.type,messages.file_path,messages.original_file_name,messages.updated_at 
        FROM messages LEFT JOIN users ON users.id = messages.user_id WHERE room_id = '${roomId}' order by messages.id ASC ;`;
        console.log('===>', sql);
        const result = await orm.directQuery(sql);
        return result;
    },

    // add message output: { user, channel, msg }
    addMsgToRoom: async function(userId, roomId, msg, type, file_path, originalFileName=null) {
        const variableQuery = `(user_id, room_id, message_body,type, file_path, original_file_name)`;
        const dataQuery = `(${userId}, \'${roomId}\', \'${msg}\', \'${type}\', \'${file_path}\',  \'${originalFileName}\')`;
        await orm.insertOne(this.name,variableQuery,dataQuery);

        const result = await orm.directQuery(
            `SELECT top 1 messages.id FROM messages WHERE messages.user_id = \'${userId}\' and messages.room_id = \'${roomId}\' order by id desc `
        )
        // console.log('UUUUUUUUU',result);
        return result[0].id;
    },
    updateMsgToRoom: async function(userId, roomId, msg, type, file_path, edit_msg_id) {
        const query = `message_body = \'${msg}\'`;
        const index = `id = ${edit_msg_id}`;
        await orm.updateOne(this.name, query, index);
    },
    

    // delete all messages for 1 room output: { message: 'success' or 'failure' }
    removeMsgByRoom: async function(roomID) {
        const index = `room_id = '${roomID}'`;
        await orm.deleteOne(this.name, index);
    },
    getMsgById: async function(id) {
        const result = await orm.findOne('messages',
            'messages.id, messages.user_id, messages.room_id,messages.message_body,messages.type,messages.file_path,messages.updated_at',
            `messages.id = \'${id}\';`
        )
        return result[0];
    },
    removeMsgById: async function(id) {
        const index = `id = ${id}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = messages;