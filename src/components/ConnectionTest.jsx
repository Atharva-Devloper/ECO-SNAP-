import { useState } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testing connection...');

    try {
      // Test basic connection to backend
      const response = await axios.get('http://localhost:5000/api/health');
      setStatus(`✅ Backend connected successfully! Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Connection test failed:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setStatus('❌ Network Error: Cannot connect to backend server at http://localhost:5000. Make sure the server is running.');
      } else {
        setStatus(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setStatus('Testing registration...');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        password: 'password123',
        name: 'Test User'
      });
      setStatus(`✅ Registration test successful! Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Registration test failed:', error);
      setStatus(`❌ Registration Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
      <h3 className="font-semibold text-gray-900 mb-3">Connection Test</h3>
      
      <div className="space-y-2 mb-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full text-sm bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <button
          onClick={testRegister}
          disabled={loading}
          className="w-full text-sm bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Registration API'}
        </button>
      </div>

      {status && (
        <div className="text-xs bg-gray-100 p-2 rounded border">
          <pre className="whitespace-pre-wrap">{status}</pre>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
