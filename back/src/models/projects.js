import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: "user",
  }],
  owner: {
    type: mongoose.Schema.ObjectId, 
    ref: "user"
  },
  createDate: {
    type: Date,
  },
  updateDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true, 
  },
  organization: {
    type: mongoose.Schema.ObjectId, ref: "organization"
  }
});
const project = mongoose.model("project", projectSchema);

export default project;
