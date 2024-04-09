const db = require('../models/index');
const { Sequelize, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt-nodejs');
// var md5 = require('md5');
const CommonHelper = require('../helpers/commonHelper');
const commonHelper = new CommonHelper();
const User = db.user;

//function to add a user
const create_user = async ({ email,last_login,status}) => {
    return await User.create({ email,last_login,status });
};



// find user
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

//get all users
const getAllUsers = async () => {
    return await User.findAll();
};

//get selected users
const getSelectedUsers = async obj => {
    return await User.findAll({
        where: obj,
    });
};

const userGetOrCreate = async function(email) {
    return new Promise(async resolve => {
           let user = await getUser({email: email });
            if(user != null) {
                resolve(user);
            } else {
                var last_login = await commonHelper.getCurrentDateTime();
                var status = true;
                create_user({
                    email: email,
                    last_login: last_login,
                    status: status
                }).then(async user => { 
                    var user = await getUser({email: email });
                    resolve(user);
                })                
            }
      });
    }

    const getUsersById = async function(userIds) {
        return await User.findAll({
            where: {
                id: {
                  [Sequelize.Op.in]: userIds,
                },
                // You can add more conditions here if needed
              },
        });    
    }    

    


module.exports = {
    create_user, getUser, getAllUsers, getSelectedUsers,userGetOrCreate, getUsersById
}
