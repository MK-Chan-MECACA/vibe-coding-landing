import React from 'react';
import Layout from '../components/Layout';
import { UIComponentsExample } from '../components/ui/UIComponentsExample';

const UIComponentsPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              UI Components Library
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              A comprehensive set of accessible, customizable UI components built with React and TypeScript.
            </p>
            <div className="mt-6">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                ← Back to Landing Page
              </a>
            </div>
          </div>
          
          <UIComponentsExample />
          
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Component Documentation
              </h3>
              <p className="text-gray-600 mb-4">
                For detailed documentation on these components, see:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>📁 <code className="bg-gray-100 px-2 py-1 rounded">src/components/ui/README.md</code></p>
                <p>📁 <code className="bg-gray-100 px-2 py-1 rounded">src/components/FORMS_README.md</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UIComponentsPage; 