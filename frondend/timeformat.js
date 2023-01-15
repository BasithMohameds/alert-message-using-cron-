    // const moment = require('moment');
    // date = new Date();
    // let utcDate = moment(date).utcOffset();
    // utcDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    // utcDate.toISOString();
    // utcDate = moment(utcDate).format();
    // console.log(utcDate);


    //require moment
const moment = require('moment');
// moment will give curent system time 
console.log(moment());
const m = moment();
// toString will give current date ('day month day year hrs min sec')
console.log(`current date : ${m.toString()}`);
// toString will give current UTC time 
console.log(`current UTC time : ${m.toISOString()}`);
//

let times=("08:00");

const c = moment(`2022/10/20 ${times}`);

console.log(`find Date : ${c.toString()}`);

const C = moment();

console.log(`find Date : ${C.toString()}`);

