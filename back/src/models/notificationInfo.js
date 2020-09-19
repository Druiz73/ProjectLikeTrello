import mongoose from 'mongoose';

const notificationInfoSchema = mongoose.Schema({
  roomId: {
      type: mongoose.Schema.ObjectId, ref: "room" 
    },
  userId: {
        type: mongoose.Schema.ObjectId, ref: "user" 
    },
  dateDaily:{ 
    type: Date 
  },
  actionDiscard:{
    type: String
  },
  hourDiscard:{
    type: Date  
  },
  actionPostpone:{
    type: String
  },
  hourPostpone:{
    type: Date  
  }
});

const notificationInfo = mongoose.model('notificationInfo', notificationInfoSchema);
export default notificationInfo;