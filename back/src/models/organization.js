import mongoose from 'mongoose';

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: "You need a name",
    maxlength: [20, "Very long name maximum 20"],
  },
  members: [{
    email: { type: String },
    active: { type: Boolean, default: false },
    rol: { type: String, default: 'Participant' },
    deleted:  { type: Boolean, default: true }//para el deleted logico
  }],
  createDate: { type: Date },
  updateDate: { type: Date },
  active: { type: Boolean, default: true },
  photo: {
    type: String,
    default:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQFukE6t1gOQNw/company-logo_200_200/0?e=2159024400&v=beta&t=ySPNen1F30pRNQCpXMXoHJGpVwBxmjV7xSGZq_V7W78',
  }
})

const organization = mongoose.model("organization", organizationSchema);
export default organization;