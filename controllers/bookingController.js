import Booking from '../models/bookingModel.js';
import Activity from '../models/activitiesModel.js';

const bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    const userId = req.user.id; 

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ status: 'Error', message: 'Activity not found' });
    }

    const booking = new Booking({
      userId,
      activityId
    });

    await booking.save();

    res.status(201).json({
      status: 'success',
      message: 'Activity booked successfully',
      data: booking
    });
  } catch (err) {
    res.status(500).json({ status: 'Error', message: err.message });
  }
};



const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate({
        path: 'activityId',
        select: 'title description location date time'
      })
      .sort({ bookingDate: -1 });

    return res.status(200).json({
      status: 'success',
      message: 'Your bookings retrieved',
      data: bookings.map(b => ({
        bookingId:     b._id,
        bookingDate:   b.bookingDate,
        status:        b.status,
        activity:      b.activityId
      }))
    });
  } catch (err) {
    return res.status(500).json({
      status: 'Error',
      message: err.message,
      data: []
    });
  }
};


const bookInfo = { bookActivity ,getMyBookings}
export default bookInfo;
