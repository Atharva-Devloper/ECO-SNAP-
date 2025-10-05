import express from 'express';
import {
  createReport,
  getReports,
  getReport,
  updateReportStatus,
  deleteReport,
  getNearbyReports,
  getReportStats
} from '../controllers/reportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload, { handleUploadError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes (none for reports - all require authentication)

// Private routes (authenticated users)
router.route('/')
  .get(protect, getReports)
  .post(protect, upload.single('image'), handleUploadError, createReport);

router.get('/stats', protect, getReportStats);
router.get('/nearby', protect, getNearbyReports);

router.route('/:id')
  .get(protect, getReport)
  .patch(protect, admin, updateReportStatus)
  .delete(protect, admin, deleteReport);

export default router;
