'use strict';

function Helper(){};
const helper = new Helper();

Helper.prototype.randomString = async function(length = 10){
  return new Promise(resolve => {
    var chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    resolve(result);
  });
};

Helper.prototype.randomStringNew =  function(length = 10){
    var chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

Helper.prototype.getCurrentDateTime = function(){
  const currentDate = new Date();
  // Extract the date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, '0');
  // Extract the time components
  
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Format the date and time
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

},

module.exports = Helper;
