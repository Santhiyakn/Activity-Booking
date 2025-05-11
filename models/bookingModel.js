import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }
});

export default model('Booking', bookingSchema);
