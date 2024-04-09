const db = require('../models/index');
const Chat = db.chat;

//function to add a new chat
const send_chat_message = async ({ room_key,sender,content_type,message,file_path,original_file_name}) => {
    return await Chat.create({ room_key,sender,content_type,message,file_path,original_file_name });
};

// find one chat by id
const getchat = async obj => {
    return await Chat.findOne({
        where: obj,
    });
};

//get all chat by room
const getAllChat = async () => {
    return await Chat.findAll({
        where: obj,
    });
};

const removeMsgById = async(id) => {
    const index = `id = ${id}`;
    await Chat.destroy({where: {id: id}})
}

const update_chat_message = async obj => {
    const updateData = {message:obj.message};
    const condition = {
        id: obj.id
      };
      console.log('============>',obj,updateData,condition);
    return await Chat.update(updateData,{
        where: condition,
    });
};


module.exports = {send_chat_message, getchat, getAllChat, removeMsgById, update_chat_message}
