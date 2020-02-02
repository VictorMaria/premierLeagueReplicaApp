import mongoose from 'mongoose';
 
const { Schema } = mongoose;
 
const FixtureSchema = new mongoose.Schema({
   adminId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    }, 
  homeTeam: {
     name: {
     type: String,
    },
    score: {
        type: Number,
        default: 0,
    }
  },
  awayTeam: {
      name: {
       type: String,
    },
    score: {
        type: Number,
        default: 0,
    }
  },
  venue: {
    stadium: {
        type: String,
        required: true,
      },
    city: {
        type: String,
        required: true,
      },
    country: {
        type: String,
        required: true,
      }, 
  },
  referee: {
      type: String,
  },
   happeningOn: {
    type: Date,
    required: true,
  },
  idempotencyKey: {
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
 
const Fixture = mongoose.model('fixtures', FixtureSchema);
 
export default Fixture;