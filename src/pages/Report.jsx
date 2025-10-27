import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { handleApiError, reportsAPI } from '../services/api';

const Report = () => {
  const [formData, setFormData] = useState({
    description: '',
    category: 'Other',
    location: '',
    coordinates: { lat: null, lng: null },
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualEntry, setManualEntry] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Get user's current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }));
        setManualEntry(false);
        setLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Please enter it manually.');
        setManualEntry(true); //auto show manual input
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error when user types
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target; // 'lat' or 'lng'
    const parsed = value === '' ? null : parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [name]: Number.isFinite(parsed) ? parsed : null,
      },
    }));
    setError('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.description.trim()) {
      setError('Please provide a description');
      setLoading(false);
      return;
    }

    if (!formData.photo) {
      setError('Please upload a photo');
      setLoading(false);
      return;
    }

    const hasCoords =
      formData.coordinates &&
      Number.isFinite(formData.coordinates.lat) &&
      Number.isFinite(formData.coordinates.lng);
    const hasLocationText =
      formData.location && formData.location.trim().length > 0;

    if (!hasCoords && !hasLocationText) {
      setError(
        'Location coordinates are required. Please allow location access or enter coordinates manually.'
      );
      setLoading(false);
      return;
    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('location', formData.location);

      if (hasCoords) {
        submitData.append('coordinates', JSON.stringify(formData.coordinates));
      }

      submitData.append('image', formData.photo);

      const response = await reportsAPI.createReport(submitData);

      if (response.data.success) {
        setSuccess(true);
        // Reset form after success
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating report:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // --- Defensive numeric parsing for display ---
  const latNum = Number(formData.coordinates?.lat);
  const lngNum = Number(formData.coordinates?.lng);
  const hasValidCoords = Number.isFinite(latNum) && Number.isFinite(lngNum);
  // ------------------------------------------------

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Report Submitted!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for helping keep our community clean. Your report has been
            submitted successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Report Waste Issue
          </h1>
          <p className="text-gray-600">
            Help us keep the community clean by reporting waste issues
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Location Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-blue-900">
                    {locationLoading
                      ? 'Getting your location...'
                      : hasValidCoords
                      ? 'Location detected'
                      : 'Location required'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {!locationLoading && (
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      {hasValidCoords ? 'Update' : 'Get Location'}
                    </button>
                  )}
                  {!hasValidCoords && (
                    <button
                      type="button"
                      onClick={() => setManualEntry((prev) => !prev)}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      {manualEntry ? 'Hide manual input' : 'Enter manually'}
                    </button>
                  )}
                </div>
              </div>

              {hasValidCoords && (
                <p className="text-xs text-blue-700 mt-1">
                  Coordinates: {latNum.toFixed(6)}, {lngNum.toFixed(6)}
                </p>
              )}

              {/* NEW: Manual coordinate inputs */}
              {manualEntry && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      name="lat"
                      type="number"
                      step="any"
                      value={formData.coordinates.lat ?? ''}
                      onChange={handleCoordinateChange}
                      className="input-field"
                      placeholder="e.g., 12.9715987"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      name="lng"
                      type="number"
                      step="any"
                      value={formData.coordinates.lng ?? ''}
                      onChange={handleCoordinateChange}
                      className="input-field"
                      placeholder="e.g., 77.5945627"
                    />
                  </div>
                  <p className="text-xs text-gray-500 col-span-2">
                    Not sure how to get coordinates? You can paste them from
                    Google Maps (right-click a point & click "What's here?").
                    Alternatively, enter a street address in the Location
                    Details field below.
                  </p>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Overflowing Bin">Overflowing Bin</option>
                <option value="Litter">Litter</option>
                <option value="Hazardous Waste">Hazardous Waste</option>
                <option value="Recycling Issue">Recycling Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                {photoPreview ? (
                  <div className="space-y-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoPreview(null);
                        setFormData({ ...formData, photo: null });
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-gray-600 mb-2">
                      Click to upload a photo of the waste issue
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {!photoPreview && (
                  <label
                    htmlFor="photo"
                    className="btn-primary mt-4 cursor-pointer inline-block"
                    aria-required="true"
                  >
                    Choose Photo
                  </label>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Describe the waste issue (e.g., overflowing trash bin, illegal dumping, litter...)"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location Details
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="Street address or landmark (e.g., Main St & 5th Ave, Central Park entrance)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Add specific location details to help cleanup crews
                find the issue
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || locationLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
