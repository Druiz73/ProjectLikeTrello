import mongoose from 'mongoose';

const companyNoteSchema = mongoose.Schema({
    title: {
        type: String,
        default: '',
        maxlength: [30, "Very long name maximum 30"]
    },
    description: {
        type: String,
        default: ''
    },
    typeNote: {
        type: String,
        default: 'announcement'
    },
    workspace: {
        type: String,
        default: 'workspace by default'
    },
    organization: {
        type: mongoose.Schema.ObjectId, ref: "organization"
    },
    createDate: {
        type: Date 
    },
    updateDate: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: 'active'
    },
    ejeX: {
        type: Number,
        default: 20
    },
    ejeY: {
        type: Number,
        default: 20
    },
    image:{
        type: String,
        default: ""
    }  
})
const companyNote = mongoose.model('companyNote', companyNoteSchema);

export default companyNote;
