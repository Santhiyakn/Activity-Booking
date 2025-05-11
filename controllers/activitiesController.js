import Activity from '../models/activitiesModel.js'

const isNumeric = (value) => !isNaN(value) && !isNaN(parseFloat(value));

const getActivities = async (req, res) => {
  try {
    const id = req.query.id;

   
    if (id) {
      const activity = await Activity.findById(id);
      if (!activity) {
        return res.status(400).json({
          status: 'Error',
          message: 'Invalid activity Id',
          data: []
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Activity retrieved successfully',
        data: [activity]
      });
    }

  

    const page = req.body.pageNumber;
    const size =  req.body.pageSize;
    const sortBy = req.body.sort|| 'title';
    const sortOrder = req.body.sortOrder === 'desc' ? -1 : 1;

   
    if (page === '0' && size === '0') {
      const activities = await Activity.find({}).sort({ [sortBy]: sortOrder });
      return res.status(200).json({
        status: 'success',
        message: 'All activities retrieved',
        data: activities
      });
    }

  
    if (!isNumeric(page) || !isNumeric(size)) {
      return res.status(400).json({
        status: 'Error',
        message: 'Invalid headers. pageNumber and pageSize must be numbers.',
        data: []
      });
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);

    if (pageNumber < 1 || pageSize < 1) {
      return res.status(400).json({
        status: 'Error',
        message: 'Page number and page size must be positive integers',
        data: []
      });
    }

    const limit = pageSize;
    const skip = (pageNumber - 1) * pageSize;

    const activities = await Activity.find({})
      .limit(limit)
      .skip(skip)
      .sort({ [sortBy]: sortOrder });

    return res.status(200).json({
      status: 'success',
      message: 'Activities retrieved',
      data: activities
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
      data: []
    });
  }
};

const activityInfo= { getActivities };

export default activityInfo;
