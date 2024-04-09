const db = require('../models/index');
// const bcrypt = require('bcrypt-nodejs');
// var md5 = require('md5');
const Room = db.room;

//function to add a user
const create_room = async ({ room_key}) => {
    return await Room.create({ room_key });
};



// find user
const getRoom = async obj => {
    return await Room.findOne({
        where: obj,
    });
};

//get all users
const getAllUsers = async () => {
    return await Room.findAll();
};

//get selected users
const getSelectedUsers = async obj => {
    return await Room.findAll({
        where: obj,
    });
};


// Password History
const getAllPasswordHistory = async obj => {
    return await PasswordHistory.findAll({
        where: obj,
        order: [
            ['created_at', 'ASC']
        ]
    });
};
const getPasswordHistory = async obj => {
    return await PasswordHistory.findOne({
        where: obj,
        order: [
            ['created_at', 'ASC']
        ]
    });
};
//
//Create Password History
const createPasswordHistory = async ({ user_id, password }) => {
    return await PasswordHistory.create({ user_id, password });
};

const checkPasswordHistory = async function(user_id, password) {
  return new Promise(async resolve => {
        var hash = md5(password);
        console.log(hash);
         let isExist = await getPasswordHistory({user_id : user_id, password : hash});
          if(isExist != null) {
              resolve(true);
          } else {
              let userPassHistory = await getAllPasswordHistory({user_id : user_id});
              if(userPassHistory.length >= 10) {
                let olderPassword = await getPasswordHistory({user_id : user_id});
                PasswordHistory.destroy({where : {id : olderPassword.id}});
              }
              let newEntry = await createPasswordHistory({user_id : user_id,password : hash});
                if(newEntry != null) {
                  resolve(false);
                }
            }
    });
  }



module.exports = {
    create_room, getRoom, getAllUsers, getSelectedUsers,
    getPasswordHistory, createPasswordHistory, checkPasswordHistory
}
