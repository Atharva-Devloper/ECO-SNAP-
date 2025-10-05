import Report from '../models/reportModel.js';
import User from '../models/userModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Create new report
// @route   POST /api/reports
// @access  Private
export const createReport = async (req, res) => {
  try {
    const { description, category, location, coordinates } = req.body;

    // Validation
    if (!description || !coordinates) {
      return res.status(400).json({
        success: false,
        message: 'Please provide description and coordinates'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Parse coordinates if they're strings
    let lat, lng;
    if (typeof coordinates === 'string') {
      const coords = JSON.parse(coordinates);
      lat = parseFloat(coords.lat);
      lng = parseFloat(coords.lng);
    } else {
      lat = parseFloat(coordinates.lat);
      lng = parseFloat(coordinates.lng);
    }

    // Validate coordinates
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinates provided'
      });
    }

    // Create report
    const report = await Report.create({
      user: req.user._id,
      description,
      category: category || 'Other',
      image: req.file.filename,
      location: location || '',
      coordinates: {
        lat,
        lng
      }
    });

    // Populate user data
    await report.populate('user', 'username name email');

    res.status(201).json({
      success: true,
      data: {
        ...report.toObject(),
        imageUrl: `/uploads/${report.image}`
      },
      message: 'Report created successfully'
    });
  } catch (error) {
    console.error(error);
    
    // Delete uploaded file if report creation fails
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads/', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating report'
    });
  }
};

// @desc    Get all reports (admin) or user's reports
// @route   GET /api/reports
// @access  Private
export const getReports = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    // Build query
    let query = {};

    // If not admin, only show user's reports
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const reports = await Report.find(query)
      .populate('user', 'username name email')
      .populate('resolvedBy', 'username name')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Report.countDocuments(query);

    // Add imageUrl to each report
    const reportsWithImageUrl = reports.map(report => ({
      ...report.toObject(),
      imageUrl: `/uploads/${report.image}`
    }));

    res.json({
      success: true,
      data: reportsWithImageUrl,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reports'
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private
export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('user', 'username name email')
      .populate('resolvedBy', 'username name');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Check if user can access this report
    if (req.user.role !== 'admin' && report.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this report'
      });
    }

    res.json({
      success: true,
      data: {
        ...report.toObject(),
        imageUrl: `/uploads/${report.image}`
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching report'
    });
  }
};

// @desc    Update report status (admin only)
// @route   PATCH /api/reports/:id
// @access  Private/Admin
export const updateReportStatus = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Update fields
    if (status) report.status = status;
    if (priority) report.priority = priority;
    if (adminNotes !== undefined) report.adminNotes = adminNotes;

    // Set resolvedBy if status is being changed to 'Cleaned'
    if (status === 'Cleaned') {
      report.resolvedBy = req.user._id;
    }

    const updatedReport = await report.save();
    await updatedReport.populate('user', 'username name email');
    await updatedReport.populate('resolvedBy', 'username name');

    res.json({
      success: true,
      data: {
        ...updatedReport.toObject(),
        imageUrl: `/uploads/${updatedReport.image}`
      },
      message: 'Report updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating report'
    });
  }
};

// @desc    Delete report (admin only)
// @route   DELETE /api/reports/:id
// @access  Private/Admin
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Delete associated image file
    const imagePath = path.join(__dirname, '../uploads/', report.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Report.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting report'
    });
  }
};

// @desc    Get reports near location (for map view)
// @route   GET /api/reports/nearby
// @access  Private
export const getNearbyReports = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters, default 5km

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusInMeters = parseInt(radius);

    // Find reports within radius
    const reports = await Report.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusInMeters
        }
      }
    })
    .populate('user', 'username name')
    .select('description category coordinates status priority createdAt image')
    .limit(100); // Limit for performance

    // Add imageUrl to each report
    const reportsWithImageUrl = reports.map(report => ({
      ...report.toObject(),
      imageUrl: `/uploads/${report.image}`
    }));

    res.json({
      success: true,
      data: reportsWithImageUrl,
      count: reports.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching nearby reports'
    });
  }
};

// @desc    Get report statistics
// @route   GET /api/reports/stats
// @access  Private
export const getReportStats = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const matchStage = isAdmin ? {} : { user: req.user._id };

    const stats = await Report.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] }
          },
          cleaned: {
            $sum: { $cond: [{ $eq: ['$status', 'Cleaned'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Report.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats[0] || {
          total: 0,
          pending: 0,
          inProgress: 0,
          cleaned: 0,
          rejected: 0
        },
        byCategory: categoryStats
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};
