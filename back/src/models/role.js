import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  description: { type: String },
  nivel:{ type: Number }
});

const role = mongoose.model('role', roleSchema);
export default role;
