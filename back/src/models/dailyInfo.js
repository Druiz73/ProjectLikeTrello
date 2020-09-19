import mongoose from 'mongoose';

const dailyInfoSchema = mongoose.Schema({
  roomId: {
      type: mongoose.Schema.ObjectId, ref: "room" 
    },
  dateDaily:{ 
    type: String 
  },
  initDaily:{ 
    type: Date 
  },
  finishDaily:{ 
    type: Date 
  },
  participantsDaily:{
    type: Array
  }
});

const dailyInfo = mongoose.model('dailyInfo', dailyInfoSchema);
export default dailyInfo;
