const db = require('../models/index');
const { Sequelize, DataTypes } = require('sequelize');
const RoomPartner = db.room_partner;

//function to add a user
const createRoomPartner = async ({ room_id,user_id,is_organizer,status }) => {
    return await RoomPartner.create({ room_id,user_id,is_organizer,status });
};

// find user
const getRoomPartner = async obj => {
    return await RoomPartner.findOne({
        where: obj,
    });
};



//get all users
const getRoomPartners = async (room_id,onlineUsersSocketIds,querytype) => {
    if(querytype == 'IN') {
        return await RoomPartner.findAll({
            where: {
                user_id: {
                  [Sequelize.Op.in]: onlineUsersSocketIds,
                },
                room_id:room_id
              },
            attributes: ['user_id'],  
        });
    } else {
        return await RoomPartner.findAll({
            where: {
                user_id: {
                  [Sequelize.Op.notIn]: onlineUsersSocketIds,
                },
                room_id:room_id
              },
            attributes: ['user_id'],
        });
    }
    
};


const getRoomOfflinePartners = async (room_id,onlineUsersSocketIds) => {    
    return await RoomPartner.findAll({
        where: {
            user_id: {
                [Sequelize.Op.notIn]: onlineUsersSocketIds,
            },
            room_id:room_id
            },
        attributes: ['user_id'],
    });
    
    
};







module.exports = {
    createRoomPartner, getRoomPartner, getRoomPartners,getRoomOfflinePartners
}
