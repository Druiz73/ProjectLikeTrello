import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  idGoogle: { type: String },
  password: { type: String },
  photo: {
    type: String,
    default:
      'https://media-exp1.licdn.com/dms/image/C4E0BAQFukE6t1gOQNw/company-logo_200_200/0?e=2159024400&v=beta&t=ySPNen1F30pRNQCpXMXoHJGpVwBxmjV7xSGZq_V7W78',
  },
  reset_password_token: { type: String },
  reset_password_expires: { type: Date }
});
const user = mongoose.model('user', userSchema);

export default user;
