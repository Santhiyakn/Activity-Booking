import express from 'express';
import activityInfo from '../controllers/activitiesController.js';

const router = express.Router();
const { getActivities } = activityInfo;
router.get('/get', getActivities);
export default router;