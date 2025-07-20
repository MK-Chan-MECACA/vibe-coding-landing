import React, { useState } from 'react';
import Layout from '../components/Layout';

const TestFormPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribed_newsletter: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submission completed!');
    setLoading(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subscribed_newsletter: false,
    });
  };

  return (
    <Layout seo={{ title: 'Test Form' }}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Test Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.subscribed_newsletter}
                  onChange={(e) => setFormData(prev => ({ ...prev, subscribed_newsletter: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                  Subscribe to newsletter
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  loading || !formData.name || !formData.email
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={() => console.log('Button clicked!')}
              >
                {loading ? 'Submitting...' : 'Submit Form'}
              </button>
            </form>
            
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-medium mb-2">Form State:</h3>
              <pre className="text-sm">
                {JSON.stringify({ formData, loading }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestFormPage; 