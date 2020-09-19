import mongoose from 'mongoose';

let validTypeRoom ={
    values: ['Ludic', 'Sprint', 'Daily', 'Videochat'],
    message: '{VALUE} no es un estado válido'
};

const roomSchema = mongoose.Schema({
    nameRoom: { type: String, default: mongoose.Schema.ObjectId, ref: "user" },
    createBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    createDate: { type: Date },
    active: { type: Boolean, default: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: "user", }],
    dayOfDaily: {type: Array},
    initHourOfDaily: {type: String},
    timeZone:{type: String},
    deleted: { type: Date },
    projectId: { type : mongoose.Schema.ObjectId, ref: 'project' },
    icono: { type: String,
        default:
        'https://www.logoarena.com/contestimages/public_new/7027/thumb_14449_1462635341_theroom2.jpg',
    },
    typeRoom: {
        type: String,
        enum: validTypeRoom
    },
    link:{
        type: String
    }

});
const room = mongoose.model('room', roomSchema);

export default room;
