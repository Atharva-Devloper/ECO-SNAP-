import { useState } from 'react';
import MapView from '../components/MapView';
import { useAuth } from '../contexts/AuthContext';

const Map = () => {
  const [viewMode, setViewMode] = useState('all'); // 'all', 'pending', 'cleaned'
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-4">
            Please log in to view the community waste reports map.
          </p>
          <a href="/login" className="btn-primary">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Map</h1>
              <p className="text-gray-600">
                Interactive map showing waste reports in your community
              </p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Reports</option>
                <option value="pending">Pending Only</option>
                <option value="cleaned">Cleaned Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container - Disabled */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="card text-center py-20" style={{ minHeight: 'calc(100vh - 300px)' }}>
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Interactive Map Feature</h3>
            <p className="text-gray-600 mb-6">
              View all reports on the Dashboard page.<br />
              The map feature requires library compatibility fixes.
            </p>
            <a href="/dashboard" className="btn-primary">
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Pending Reports</h3>
            <p className="text-sm text-gray-600">
              Issues that need attention from cleanup crews
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">In Progress</h3>
            <p className="text-sm text-gray-600">
              Reports currently being addressed by teams
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Cleaned</h3>
            <p className="text-sm text-gray-600">
              Successfully resolved waste issues
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use the Map</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Viewing Reports</h4>
              <ul className="space-y-1">
                <li>• Click on any marker to see report details</li>
                <li>• Use the filter dropdown to show specific statuses</li>
                <li>• Zoom and pan to explore different areas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Report Status</h4>
              <ul className="space-y-1">
                <li>• Red markers indicate pending issues</li>
                <li>• Yellow markers show work in progress</li>
                <li>• Green markers represent cleaned areas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
