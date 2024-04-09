'use strict';

const nodemailer = require("nodemailer");
const config = require('../config/config');


function Helper(){};
const helper = new Helper();

Helper.prototype.smtpTransport = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  tls: config.nodemailer.tls,
  ssl: config.nodemailer.ssl,
  auth: {
    user: config.nodemailer.auth.user,
    pass: config.nodemailer.auth.pass
  }
});

/*
* When click on calulate salary button.
*/
Helper.prototype.sent_otp = function(user, type){
  if(config.SMTP_MODE == 'LIVE') {
    var subject = '';
    var html = '';

    if(type == 'register') {
      subject = 'SCale - Email OTP Verification';
      html = '<div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:20px 0px 20px 0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:120px;"><img height="auto" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/61c429246de88/1640246319.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height: 1;text-align:left;color:#000000;"><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong>One-time password</strong></span></p><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong>(OTP)</strong></span></p></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: Cabin, sans-serif; font-size: 22px; text-align: center;"><span style="font-size: 64px; color: #3598db;">'+user.otp+'</span></h1></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial,sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong><span style="color: #7e8c8d;">Here is the OTP for verifying your email. </span></strong></span></p><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong><span style="color: #7e8c8d;">It will expire in 1 minutes.</span></strong></span></p></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><pstyle="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;">Facing issues?</span></p><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="text-decoration: underline; color: #3598db; font-family: Lato, Tahoma, sans-serif;"><span style="font-size: 16px;"><a style="text-align: center; color: #3598db; text-decoration: underline;" href="#">Contact S</a>upport</span></span></p></div></td></tr></tbody></table></div>';
    } if(type == 'forgot_password') {
      subject = 'SC Future Skill - Reset Password OTP Verfication';
      html = '<div class="mj-column-per-100 outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:20px 0px 20px 0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:120px;"><img height="auto" src="https://s3-eu-west-1.amazonaws.com/topolio/uploads/61c429246de88/1640246319.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height: 1;text-align:left;color:#000000;"><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong>One-time password</strong></span></p><p style="font-size: 11px; font-family: Ubuntu, Helvetica, Arial; text-align: center;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong>(OTP)</strong></span></p></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: Cabin, sans-serif; font-size: 22px; text-align: center;"><span style="font-size: 64px; color: #3598db;">'+user.otp+'</span></h1></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial,sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong><span style="color: #7e8c8d;">Here is the OTP for gettig new password. </span></strong></span><br/></p><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;"><strong><span style="color: #7e8c8d;">It will expire in 1 minutes.</span></strong></span></p><p style="text-align: center"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;text-align: center;margin: 0;"><span style="color: #7e8c8d;">It was not you? Change your password now to protect your account. </span></span></p></div></td></tr><tr><td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;"><div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><pstyle="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="font-size: 16px; font-family: Lato, Tahoma, sans-serif;">Facing issues?</span></p><p style="font-size: 11px;font-family: Ubuntu, Helvetica, Arial;text-align: center;margin: 0;"><span style="text-decoration: underline; color: #3598db; font-family: Lato, Tahoma, sans-serif;"><span style="font-size: 16px;"><a style="text-align: center; color: #3598db; text-decoration: underline;" href="#">Contact S</a>upport</span></span></p></div></td></tr></tbody></table></div>';
    }
    console.log('======>'+user.otp);
        var mailOptions = {
          from: config.nodemailer.from,
          to: user.email,
          subject: subject,
          html: html
        };

        Helper.prototype.smtpTransport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return true;
  } else {
    return true;
  }
}
// Reset Password Mail
Helper.prototype.sent_reset_password = function(user){
  if(config.SMTP_MODE == 'LIVE') {
        var mailOptions = {
          from: config.nodemailer.from,
          to: user.email,
          subject: 'SCale - Reset Password',
          html: 'Dear '+user.first_name+',<br/><br/>Your password has been reset. So change your password through forget password in the app.  <br/><br/><br/> Thanks<br/>Scale Team'
        };

        Helper.prototype.smtpTransport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return true;
  } else {
    return true;
  }
}

// User creation Mail
Helper.prototype.sent_user_creation = function(user){
  if(config.SMTP_MODE == 'LIVE') {
        var mailOptions = {
          from: config.nodemailer.from,
          to: user.email,
          subject: 'Welcome to SCale',
          html: 'Dear '+user.first_name+',<br/><br/>Your account has been created. To access your account first you reset your password through forget password in the app.  <br/><br/><br/> Thanks<br/>Scale Team'
        };

        Helper.prototype.smtpTransport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return true;
  } else {
    return true;
  }
}

module.exports = Helper;
