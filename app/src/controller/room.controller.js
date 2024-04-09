const apiResponse = require("../helpers/apiResponse");
var path = require('path');
const fs = require('fs');
const config = require('../config/config');
const logger = require("../helpers/logger");
var async = require('async');
const axios = require('axios');
const {
  create_room, getRoom
} = require('../services/room.service');

const {
  createRoomPartner,getRoomPartner
}= require('../services/room_partner.service');

const {
  save_recording
} = require('../services/recording.service');

const {
  create_user, getUser,userGetOrCreate
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
const Recording = db.recording;
const TimeTracker = db.timeTracker;

//update user Profile
exports.createRoom = async (req, res, next) => {
    try {
      console.log(req.body);
      
      var title = req.body.hasOwnProperty('title') ? req.body.title : '';
      var description = req.body.hasOwnProperty('description') ? req.body.description : '';
      var start_date_time = req.body.hasOwnProperty('start_date_time') ? req.body.start_date_time : await commonHelper.getCurrentDateTime();
      var duration = req.body.hasOwnProperty('duration') ? req.body.duration : null;
      var organizer = req.body.hasOwnProperty('organizer') ? req.body.organizer : '';
      var partners = req.body.hasOwnProperty('partner') ? req.body.partner : '';
      var room_key_data = await commonHelper.randomString(15);
      if(organizer != '' && organizer != undefined) {
        create_room({
          room_key: room_key_data
      }).then(async room => {
              var updateData = { title: title, description: description,start_date_time:start_date_time, duration:duration};
             console.log(updateData);
              await Room.update(updateData, { where: { id: room.id } });
              let roomObj = await getRoom({id: room.id });
              
              var organizerName = Object.keys(req.body.organizer.name).length ? req.body.organizer.name : '';
              var organizerEmail = Object.keys(req.body.organizer.email).length ? req.body.organizer.email : '';
              var last_login = await commonHelper.getCurrentDateTime();
              var status = true;

              let organizer = await getUser({email: organizerEmail });
              if(user == null || user == undefined) {
                
                create_user({
                  email: organizerEmail,
                  last_login: last_login,
                  status: status,
                  }).then(async user => { 
                    organizer = await getUser({email: organizerEmail });
                    
                    createRoomPartner({
                      room_id : roomObj.id,
                      user_id: organizer.id,
                      is_organizer : 1,
                      status : 1       
                    });
                    if(partners != '' && partners != undefined) {
                      for (let i = 0; i < partners.length; i++) {
                        var partner = partners[i];
                        var user = await userGetOrCreate(partner.email);
                        createRoomPartner({
                          room_id : roomObj.id,
                          user_id: user.id,
                          is_organizer : 0,
                          status : 1       
                        });
                      }
                    }
                    // mailer.sent_user_creation(user);
                    var room = await getRoom({id: roomObj.id });
                    logger.log("info", { fileName: path.basename(__filename), message: "Room Created successfully"});
                    return apiResponse.successResponseWithData(res,'success',{room:room,user:organizer});
                  })
              } else {
                createRoomPartner({
                  room_id : roomObj.id,
                  user_id: organizer.id,
                  is_organizer : 1,
                  status : 1       
                });
                if(partners != '' && partners != undefined) {
                  for (let i = 0; i < partners.length; i++) {
                    var partner = partners[i];
                    var user = await userGetOrCreate(partner.email);
                    createRoomPartner({
                      room_id : roomObj.id,
                      user_id: user.id,
                      is_organizer : 0,
                      status : 1       
                    });
                  }
                }
                // mailer.sent_user_creation(user);
                var room = await getRoom({id: roomObj.id });
                logger.log("info", { fileName: path.basename(__filename), message: "Room Created successfully"});
                return apiResponse.successResponseWithData(res,'success',{room:room,user:organizer});
              }

              
              
            }
          )
          .catch(err=>{
              logger.log("warn", { fileName: path.basename(__filename), message: Some_error});
              return apiResponse.ErrorResponseWithException(res, Some_error, err.message)
          })
      } else {
        return apiResponse.ErrorResponse(res, "organizer can't be empty.")
      }
  }
  catch (error) {
      return apiResponse.ErrorResponse(res, error.message)
  }      
}


exports.validateRoom = async (req, res, next) => {
  try {
    
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';
    var room = await getRoom({room_key: room_key });
    if(room != null && room != undefined) {      
      return apiResponse.successResponseWithData(res,'success',{room});          
    } else {
      return apiResponse.ErrorResponse(res, "Room does not exist")
    }
}
catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
}     
}




exports.addParticipant = async (req, res, next) => {
  try {
    
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';
    var user_id = req.body.hasOwnProperty('user_id') ? req.body.user_id : '';
    var room = await getRoom({room_key: room_key });
    if(room != null && room != undefined) {
      var participant = await getRoomPartner({room_id:room.id,user_id: user_id});
      if(participant != null || participant != undefined) {
        return apiResponse.successResponseWithData(res,'success',{participant});
      } else {
        createRoomPartner({
          room_id : room.id,
          user_id: user_id,
          is_organizer : 0,
          status : 1       
        });
        var participant = await getRoomPartner({room_id:room.id,user_id: user_id});
        return apiResponse.successResponseWithData(res,'success',{participant});
      }
      
    } else {
      return apiResponse.ErrorResponse(res, "Room does not exist")
    }
}
catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
} 
}


exports.saveRecardingPath = async (req,res, next) => {
  try {
    var room = await getRoom({room_key: req.room_key });
    // console.log(room);
    if(room != null && room != undefined) {  
      save_recording({
        room_id: room.id,
        path: req.recording_path
    }).then(async recording => {
        return true;
    });
    } else {
      return false
    }
}
catch (error) {
    return false
}     
}

exports.sendInviteMail = async (req,res, next) => {
  try {
    var email = req.body.hasOwnProperty('email') ? req.body.email : '';req.email;
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';req.room_key;
    var room_url = req.body.hasOwnProperty('room_url') ? req.body.room_url : '';req.room_url;

    const data = {
      grant_type: 'password',
      client_id: config.BACKEND_API_CLIENT_ID,
      client_secret: config.BACKEND_API_CLIENT_SECRET,
      username: config.BACKEND_API_USER_NAME,
      password: config.BACKEND_API_PASSWORD,
    };
    
    axios.post(config.BACKEND_BASE_URL+'/oauth/token', data)
      .then(response => {
        if(response.data) {
          var accessToken = response.data.access_token;

          const postdata = {
            email: email,
            room_key: room_key,
            room_url:room_url
          };
          console.log('post data',postdata);
          
          const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          };
          
          console.log(headers);
          axios.post(config.BACKEND_BASE_URL+'/api/v4/participant/invite', postdata, { headers })
            .then(response => {
              if(response.data && response.data.status == 1) {
                return apiResponse.successResponseWithData(res,'success',{response});
              }
            })
            .catch(error => {
              return apiResponse.ErrorResponse(res, error)
            });

        } else {
          return apiResponse.ErrorResponse(res, 'Invalid data while sending invite')
        }
      })
      .catch(error => {
        console.error(error);
      });
}
catch (error) {
    return false
}     
}



exports.createUserAndGetPermission = async (req,res, next) => {
  try {
    var email = req.body.hasOwnProperty('user_email') ? req.body.user_email : '';
    var name = req.body.hasOwnProperty('user_name') ? req.body.user_name : '';
    var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';

    const data = {
      grant_type: 'password',
      client_id: config.BACKEND_API_CLIENT_ID,
      client_secret: config.BACKEND_API_CLIENT_SECRET,
      username: config.BACKEND_API_USER_NAME,
      password: config.BACKEND_API_PASSWORD,
    };
    
    axios.post(config.BACKEND_BASE_URL+'/oauth/token', data)
      .then(response => {
        if(response.data) {
          var accessToken = response.data.access_token;

          const postdata = {
            email: email,
            room_key: room_key,
            name: name
          };
          console.log('post data',postdata);
          
          const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          };
          
          console.log(headers);
          axios.post(config.BACKEND_BASE_URL+'/api/v4/participant/create', postdata, { headers })
            .then(response => {
              if(response.data && response.data.status == 1) {
                let resdata = {user : response.data.data.user, room: response.data.data.room};
                return apiResponse.successResponseWithData(res,'success',{resdata});
              }
            })
            .catch(error => {
              return apiResponse.ErrorResponse(res, error)
            });

        } else {
          return apiResponse.ErrorResponse(res, 'Invalid data while sending invite')
        }
      })
      .catch(error => {
        console.error(error);
      });
}
catch (error) {
    return false
}     
}



