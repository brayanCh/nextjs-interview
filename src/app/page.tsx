'use client'
import { useCallback, useState } from 'react';

export default function Home() {
  const [points, setPoints] = useState([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const apiUrl = 'http://localhost:8000/geo/process';
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addPoint = useCallback(() => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setError('Please enter valid numbers for latitude and longitude');
      return;
    }

    if (latNum < -90 || latNum > 90) {
      setError('Latitude must be between -90 and 90');
      return;
    }

    if (lngNum < -180 || lngNum > 180) {
      setError('Longitude must be between -180 and 180');
      return;
    }

    setPoints([...points, { lat: latNum, lng: lngNum }]);
    setLat('');
    setLng('');
    setError('');
  }, [lat, lng, setLat, setLng, setPoints, setError]);

  const removePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Create a request to the Geo microservice
          </h1>

          {/* Add Coordinates Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add Coordinate Point
            </h2>
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  placeholder="-90 to 90"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  placeholder="-180 to 180"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={addPoint}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Coordinates List ({points.length})
            </h2>
            {points.length === 0 ? (
              <p className="text-gray-500 italic">No coordinates added yet</p>
            ) : (
              <div className="space-y-2">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex gap-6">
                      <span className="text-gray-600">
                        <strong>Lat:</strong> {point.lat}
                      </span>
                      <span className="text-gray-600">
                        <strong>Lng:</strong> {point.lng}
                      </span>
                    </div>
                    <button
                      onClick={() => removePoint(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
