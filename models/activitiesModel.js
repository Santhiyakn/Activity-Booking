import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title:  {
        type: String,
        required: true
    },
  description:  {
        type: String,
    },
  location:  {
        type: String,
        required: true
    },
  date:  {
        type: String,
        required: true
    },
  time:  {
        type: String,
        required: true
    }
});

const Activity =mongoose.model('Activity', activitySchema);
export default Activity;