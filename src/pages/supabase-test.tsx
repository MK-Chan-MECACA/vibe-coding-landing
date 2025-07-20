import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { submitInterestForm } from '../utils/database';

const SupabaseTestPage: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      setStatus('Testing Supabase configuration...');
      
      // Test configuration
      const configStatus = isSupabaseConfigured();
      console.log('Configuration status:', configStatus);
      
      if (!configStatus) {
        setStatus('❌ Supabase not configured');
        return;
      }

      setStatus('Testing database connection...');
      
      // Test database connection by trying to select from the table
      const { data, error } = await supabase
        .from('interest_submissions')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Database connection error:', error);
        setStatus(`❌ Database error: ${error.message}`);
        setTestResult({ error: error.message, code: error.code });
        return;
      }

      setStatus('✅ Supabase connection successful!');
      setTestResult({ 
        success: true, 
        data: data,
        message: 'Database connection and table access working'
      });

    } catch (error) {
      console.error('Test error:', error);
      setStatus(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const testFormSubmission = async () => {
    try {
      setStatus('Testing form submission...');
      
      const testData = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        subscribed_newsletter: true,
        source: 'test_page'
      };

      const result = await submitInterestForm(testData, 'test_page');
      
      if (result.success) {
        setStatus('✅ Form submission successful!');
        setTestResult({ 
          success: true, 
          data: result.data,
          message: 'Form data submitted to database'
        });
      } else {
        setStatus(`❌ Form submission failed: ${result.error?.message}`);
        setTestResult({ error: result.error?.message });
      }

    } catch (error) {
      console.error('Submission test error:', error);
      setStatus(`❌ Submission test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTestResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <Layout seo={{ title: 'Supabase Test' }}>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Status</h2>
              <p className="text-lg">{status}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Test Results</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>

            <div className="space-y-4">
              <button
                onClick={testSupabaseConnection}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Test Connection
              </button>
              
              <button
                onClick={testFormSubmission}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
              >
                Test Form Submission
              </button>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Next Steps</h3>
              <p className="text-yellow-700 text-sm">
                If the connection test fails, you need to:
              </p>
              <ol className="list-decimal list-inside text-yellow-700 text-sm mt-2 space-y-1">
                <li>Go to your Supabase dashboard</li>
                <li>Open the SQL Editor</li>
                <li>Run the SQL script from <code>supabase-setup.sql</code></li>
                <li>This will create the required tables and policies</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupabaseTestPage; 