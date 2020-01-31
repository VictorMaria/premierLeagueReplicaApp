import mongoose from 'mongoose';
 
const { Schema } = mongoose;
 
const TeamSchema = new mongoose.Schema({
   adminId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    }, 
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  manager: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
 
const Team = mongoose.model('teams', TeamSchema);
 
export default Team;