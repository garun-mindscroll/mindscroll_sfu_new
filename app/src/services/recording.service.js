const db = require('../models/index');
const Recording = db.recording;

//function to add a user
const save_recording = async ({ room_id,path}) => {
    console.log('ooooooooooooooo>',path);
    return await Recording.create({room_id,path});
};



// find user
const getRecording = async obj => {
    return await Recording.findOne({
        where: obj,
    });
};


module.exports = {
    save_recording,getRecording
}
