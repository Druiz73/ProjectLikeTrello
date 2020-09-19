import moment from "moment-timezone";

const users = [];
let members = [];
let room;

const addUser = ({ id, email, actualRoom,userId,timeZone }) => {
  let day = moment().day();
  if (actualRoom.dayOfDaily.includes(day)) {
    let initHourOfDaily = moment.tz(actualRoom.initHourOfDaily, 'HH:mm', actualRoom.timeZone); 
    let finishHourOfDaily = moment(initHourOfDaily);
    finishHourOfDaily.add(moment.duration("00:15"));
    initHourOfDaily.subtract(moment.duration("00:10"));
    let convert = moment().tz(timeZone);
    let today= convert.clone().tz(actualRoom.timeZone);
      if (today.isSameOrAfter(initHourOfDaily) === true && today.isSameOrBefore(finishHourOfDaily) === true) {
          room = actualRoom.nameRoom.trim().toLowerCase();
          members = actualRoom.members;
          const validateUser = members.find(member => member.email === email);
            if (validateUser) {
              const existingUser = users.find(user => user.room === room && user.email === email);
                if (!existingUser) {
                  const user = {id, email, room, userId};
                  users.push(user);
                  return { user };
                }else{
                  const user = users.find(user => user.room === room && user.email === email);
                  return { user };
                }
           } else {return { error: 'El usuario no tiene permisos para unirse a la sala' };}
       } else {return { error: 'La sala no se encuentra disponible en estos momentos' };}
  } else {
    return { error: 'La sala no se encuentra disponible en estos momentos' };
  }
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = userId => users.find(user => user.userId === userId);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}
