const apiResponse = require("../helpers/apiResponse");
var path = require('path');
const fs = require('fs');
const config = require('../config/config');
const logger = require("../helpers/logger");
var async = require('async');
const {
  create_room, getRoom, getAllUsers
} = require('../services/room.service');

const {
  createRoomPartner,getRoomPartner,getRoomPartners,getRoomOfflinePartners
}= require('../services/room_partner.service');

const {
  create_user, getUser,userGetOrCreate,getUsersById
} = require('../services/user.service');

const db = require('../models/index');
const Mailer = require('../helpers/emailHelper');
const { constants } = require('../constants/constants');
const CommonHelper = require('../helpers/commonHelper');
const commonHelper = new CommonHelper();
const mailer = new Mailer();
const {
  SOMETHING_WRONG, INVALID_PROFILE_PHOTO,User_exists, Data_not_deleted_error, User_not_exists,
  Not_valid_Password, Not_valid_Otp, Data_not_deleted, Class_not_exists, Logged_in, Data_created,
  Data_not_updated, Data_Deleted, Data_updated, Some_error, OTP_Sent, Inactive_User, Email_Verifyed, SUCCESS, CHANGED_PASSWORD,PLAYLIST_NOT_AVAILABLE
} = constants;
const Room = db.room;
const User = db.user;
const TimeTracker = db.timeTracker;
const Room_Partner = db.room_partner;

//update user Profile
exports.createUser = async (req, res, next) => {
    try {
      
      var email = req.body.hasOwnProperty('email') ? req.body.email : '';
      var last_login = await commonHelper.getCurrentDateTime();
      var status = true;
      var user = await getUser({email: email });
      if(user != null && user != undefined) {
        return apiResponse.successResponseWithData(res,'success',{user});
      } else {
        if(email != '' && email != undefined) {
          create_user({
            email: email,
            last_login: last_login,
            status: status,
        }).then(async user => {              
                logger.log("info", { fileName: path.basename(__filename), message: "User Created successfully"});
                var user = await getUser({email: user.email });
                return apiResponse.successResponseWithData(res,'success',{user});
              }
            )
            .catch(err=>{
                logger.log("warn", { fileName: path.basename(__filename), message: Some_error});
                return apiResponse.ErrorResponseWithException(res, Some_error, err.message)
            })
        } else {
          return apiResponse.ErrorResponse(res, "Email can't be empty.")
        }
      }
  }
  catch (error) {
      return apiResponse.ErrorResponse(res, error.message)
  }   
}


exports.updateSocketid = async (req, res, next) => {
  try {
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';
    var socketId = req.body.hasOwnProperty('socketId') ? req.body.socketId : '';
    var user_id = req.body.hasOwnProperty('user_id') ? req.body.user_id : '';

    var room = await getRoom({room_key: room_key });
    if(room != null && room != undefined) {
      let roomPartner = await getRoomPartner({room_id:room.id,user_id:user_id});
      if(roomPartner != null && roomPartner != undefined) {
        var updateData = { socket_id: socketId};
        await Room_Partner.update(updateData, { where: { id: roomPartner.id } });
        return apiResponse.successResponseWithData(res,'success',{roomPartner});
      }
      return apiResponse.successResponseWithData(res,'success',{});
    } else {
      return apiResponse.successResponseWithData(res,'success',{});
    }
  }
  catch (error) {
      return apiResponse.ErrorResponse(res, error.message)
  }
}

exports.getOnlineOfflineParticipant = async (req, res, next) => {
  try {
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';
    let onlineUsersSocketIds = req.body.hasOwnProperty('onlineParticipant') ? req.body.onlineParticipant : [];
    if(onlineUsersSocketIds.length > 0) {
      // Adding 'id' property to each object
      let roomOnlinePartnersids = [];
      if (Array.isArray(onlineUsersSocketIds)) {
        roomOnlinePartnersids = onlineUsersSocketIds.map(obj => obj.id);
      }      
      var room = await getRoom({room_key: room_key });
      let users = [];
      if(room != null && room != undefined) {
        let roomOfflinePartnersids = await getRoomOfflinePartners(room.id,roomOnlinePartnersids);
        const normalArray = roomOfflinePartnersids.map(u => u.get());
        let roomOfflineList = [];
        for(let i = 0; i < normalArray.length; i++) {
          roomOfflineList.push(normalArray[i].user_id);
        }

        let onlineUsers = await getUsersById(roomOnlinePartnersids);
        onlineUsers = onlineUsers.map(u => u.get());
        onlineUsers.forEach(obj => {
          obj.is_online = true;
        });

        let offlineUsers = await getUsersById(roomOfflineList);
        offlineUsers = offlineUsers.map(u => u.get());
        offlineUsers.forEach(obj => {
          obj.is_online = false;
        });

        users = onlineUsers.concat(offlineUsers);
        return apiResponse.successResponseWithData(res,'success',{users});        
      } else {
        return apiResponse.successResponseWithData(res,'success',{});
      }
    } else {
      return apiResponse.successResponseWithData(res,'success',{is_new_participant_connected:true});
    }
  } catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
  }
}

