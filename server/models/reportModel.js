import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Illegal Dumping',
        'Overflowing Bin',
        'Litter',
        'Hazardous Waste',
        'Recycling Issue',
        'Other',
      ],
      default: 'Other',
    },
    image: {
      type: String,
      required: [true, 'Please upload an image'],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    coordinates: {
      lat: {
        type: Number,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      lng: {
        type: Number,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Cleaned', 'Rejected'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [300, 'Admin notes cannot exceed 300 characters'],
    },
    resolvedAt: {
      type: Date,
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index for geospatial queries

// NOTE: we store coordinates as { lat, lng } for now. If you want to run geo $near queries,
// convert to GeoJSON Point (e.g., { type: 'Point', coordinates: [lng, lat] }) and create a
// 2dsphere index on that field. For now, remove the 2dsphere index to avoid index errors.

//reportSchema.index({ coordinates: '2dsphere' });

// Index for efficient queries
reportSchema.index({ user: 1, createdAt: -1 });
reportSchema.index({ status: 1, createdAt: -1 });

// Update resolvedAt when status changes to 'Cleaned'
reportSchema.pre('save', function (next) {
  if (
    this.isModified('status') &&
    this.status === 'Cleaned' &&
    !this.resolvedAt
  ) {
    this.resolvedAt = new Date();
  }
  next();
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
