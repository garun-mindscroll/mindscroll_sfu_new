/**
 * @author Garun Mishra <mishragkmishra@gmail.com>
 * @date 1st october, 2023
 */
const apiResponse = require("../helpers/apiResponse");
var path = require('path');
const fs = require('fs');
const config = require('../config/config');
const logger = require("../helpers/logger");
const crypto = require("crypto");
var async = require('async');
const db = require('../models/index');
const Mailer = require('../helpers/emailHelper');
const { constants } = require('../constants/constants');
const CommonHelper = require('../helpers/commonHelper');
const commonHelper = new CommonHelper();
const mailer = new Mailer();
const Chat = db.chat;


const {
  SOMETHING_WRONG, INVALID_PROFILE_PHOTO,User_exists, Data_not_deleted_error, User_not_exists,
  Not_valid_Password, Not_valid_Otp, Data_not_deleted, Class_not_exists, Logged_in, Data_created,
  Data_not_updated, Data_Deleted, Data_updated, Some_error, OTP_Sent, Inactive_User, Email_Verifyed, SUCCESS, CHANGED_PASSWORD,PLAYLIST_NOT_AVAILABLE
} = constants;

const {
  send_chat_message,getchat,removeMsgById, update_chat_message
} = require('../services/chat.service');



//update user Profile
exports.sendChatMessage = async (req, res, next) => {
    try {
      
      var room_key = req.body.hasOwnProperty('room_key') ? req.body.room_key : '';
      var sender = req.body.hasOwnProperty('sender') ? req.body.sender : '';
      var content_type = req.body.hasOwnProperty('content_type') ? req.body.content_type : 'text';
      var message = req.body.hasOwnProperty('message') ? req.body.message : null;
      var file_path = req.body.hasOwnProperty('file_path') ? req.body.file_path : null;
      if(room_key != '' && room_key != undefined) {
        send_chat_message({
          room_key: room_key,
          sender:sender,
          content_type:content_type,
          message:message,
          file_path:file_path
      }).then(async chat => { 
              var chat = await getchat({id: chat.id });
              logger.log("info", { fileName: path.basename(__filename), message: "message sent successfully"});
              return apiResponse.successResponseWithData(res,'success',{chat});
            }
          )
          .catch(err=>{
            console.log(err);
              logger.log("warn", { fileName: path.basename(__filename), message: Some_error});
              return apiResponse.ErrorResponseWithException(res, Some_error, err.message)
          })
      } else {
        return apiResponse.ErrorResponse(res, "Room id is required field")
      }
  }
  catch (error) {
      return apiResponse.ErrorResponse(res, error.message)
  }
        
}

exports.uploadMedia = async (req, res, next) => {
  try {
    
    var responseData = {};
        const data = req.body;
        const postdata = req.body.postdata;
        var room = postdata.hasOwnProperty('room') ? postdata.room : '';
        var sender = postdata.hasOwnProperty('sender') ? postdata.sender : '';

        var randomFile = crypto.randomBytes(16).toString("hex");
        
        var base64Data = data.media.file.replace(/^data:image\/png;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
        base64Data = base64Data.replace(/^data:video\/mp4;base64,/, "");
        base64Data = base64Data.replace(/^data:audio\/mpeg;base64,/, "");

        var base64DataArr = base64Data.split(';base64,');
        if(base64DataArr.length == 2) {
            base64Data = base64DataArr[1];             
        }

        var originalFileName = data.media.fileName;
        var fileExtenssion = originalFileName.split('.').pop();
        fileExtenssion = fileExtenssion.toLowerCase();
        var filename = randomFile+'.'+fileExtenssion;
        var webFilePath = config.MEDIA_FILES_PATH+'/'+filename;
        let base_url = config.CHAT_SERVER_BASE_URL;
        

        var fileType = '';
        if(fileExtenssion == 'mp3' || fileExtenssion == 'aac' || fileExtenssion == 'wav' || fileExtenssion == 'pcm') {
            fileType = 'audio';
        } else if(fileExtenssion == 'mp4' || fileExtenssion == 'flv' || fileExtenssion == 'mkv' || fileExtenssion == 'webm' || fileExtenssion == 'ogg' || fileExtenssion == 'avi' || fileExtenssion == 'm4v' || fileExtenssion == '3gp') {
            fileType = 'video';
        } else if(fileExtenssion == 'bmp' || fileExtenssion == 'jpg' || fileExtenssion == 'jpeg' || fileExtenssion == 'gif' || fileExtenssion == 'png') {
            fileType = 'image';
        } else if(fileExtenssion == 'pdf') {
            fileType = 'pdf';
        } else if(fileExtenssion == 'doc' || fileExtenssion == 'docx' || fileExtenssion == 'xls' || fileExtenssion == 'xlsx' || fileExtenssion == 'txt' || fileExtenssion == 'xml' || fileExtenssion == 'csv' || fileExtenssion == 'ppt' || fileExtenssion == 'pptx' || fileExtenssion == 'wmv' || fileExtenssion == 'xps') {
            fileType = 'file';
        }
        if(fileType != '') {
            fs.writeFile(config.MEDIA_ACTUAL_FILES_PATH+config.MEDIA_FILES_PATH+'/'+filename, base64Data, 'base64', async function(err) {
                if(!err) {
                  send_chat_message({
                    room_key: room,
                    sender:sender,
                    content_type:fileType,
                    message:'',
                    file_path:webFilePath,
                    original_file_name:originalFileName
                }).then(async chat => { 
                        var chat = await getchat({id: chat.id });
                        logger.log("info", { fileName: path.basename(__filename), message: "message sent successfully"});
                        return apiResponse.successResponseWithData(res,'success',{chat},base_url);
                      }
                    )
                    .catch(err=>{
                      console.log(err);
                        logger.log("warn", { fileName: path.basename(__filename), message: Some_error});
                        return apiResponse.ErrorResponseWithException(res, Some_error, err.message)
                    })
                } else {
                  console.log(err);
                }
            });
        } else {
            res.send({ status: '401', message: 'Invalid file type.', data:responseData });
        }
        
}
catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
}
      
}



exports.getChatMessage = async (req, res, next) => {
  try {    
    const id = req.params.id;
    var chat = await getchat({id: id });
    logger.log("info", { fileName: path.basename(__filename), message: "message get successfully"});
    return apiResponse.successResponseWithData(res,'success',{chat});
  } catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
  }   
}

exports.updateChatMessage = async (req, res, next) => {
  try {    
    const id = req.body.id;
    const message = req.body.message;
    var chat = await update_chat_message({id: id, message:message });
    logger.log("info", { fileName: path.basename(__filename), message: "message updated successfully"});
    return apiResponse.successResponseWithData(res,'success');
  } catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
  }   
}

exports.deleteChatMessage = async (req, res, next) => {
  try {    
    const id = req.params.id;
    var chat = await getchat({id:id });
    if(chat.file_path != '' || chat.file_path != null || chat.file_path != undefined) {
      fs.unlink(config.MEDIA_ACTUAL_FILES_PATH + chat.file_path, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            console.log('File has been deleted.');
        }
      });      
    }
    removeMsgById(id)
        .then(result => console.log(`messages id ${id} has beed removed from DB`))
        .catch(error => console.log(error));
    res.send({ message: 'success' });  
  } catch (error) {
    return apiResponse.ErrorResponse(res, error.message)
  }   
}






