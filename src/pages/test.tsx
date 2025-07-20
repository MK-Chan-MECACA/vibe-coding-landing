import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          TailwindCSS Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Primary Colors</h2>
            <div className="space-y-2">
              <div className="h-8 bg-blue-500 rounded flex items-center justify-center text-white font-medium">
                Blue 500
              </div>
              <div className="h-8 bg-blue-600 rounded flex items-center justify-center text-white font-medium">
                Blue 600
              </div>
              <div className="h-8 bg-blue-700 rounded flex items-center justify-center text-white font-medium">
                Blue 700
              </div>
            </div>
          </div>

          {/* Test Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gray Colors</h2>
            <div className="space-y-2">
              <div className="h-8 bg-gray-100 rounded flex items-center justify-center text-gray-800 font-medium">
                Gray 100
              </div>
              <div className="h-8 bg-gray-500 rounded flex items-center justify-center text-white font-medium">
                Gray 500
              </div>
              <div className="h-8 bg-gray-800 rounded flex items-center justify-center text-white font-medium">
                Gray 800
              </div>
            </div>
          </div>

          {/* Test Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Status Colors</h2>
            <div className="space-y-2">
              <div className="h-8 bg-green-500 rounded flex items-center justify-center text-white font-medium">
                Success
              </div>
              <div className="h-8 bg-red-500 rounded flex items-center justify-center text-white font-medium">
                Error
              </div>
              <div className="h-8 bg-yellow-500 rounded flex items-center justify-center text-white font-medium">
                Warning
              </div>
            </div>
          </div>
        </div>

        {/* Typography Test */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Typography Test</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Heading 1 - 4xl Bold</h1>
            <h2 className="text-3xl font-semibold text-gray-800">Heading 2 - 3xl Semibold</h2>
            <h3 className="text-2xl font-medium text-gray-700">Heading 3 - 2xl Medium</h3>
            <h4 className="text-xl font-normal text-gray-600">Heading 4 - xl Normal</h4>
            <p className="text-lg text-gray-600">Paragraph - lg size with gray-600 color</p>
            <p className="text-base text-gray-500">Base paragraph with gray-500 color</p>
            <p className="text-sm text-gray-400">Small text with gray-400 color</p>
          </div>
        </div>

        {/* Spacing Test */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Spacing Test</h2>
          <div className="space-y-4">
            <div className="bg-blue-100 p-2 rounded">Padding 2 (8px)</div>
            <div className="bg-blue-100 p-4 rounded">Padding 4 (16px)</div>
            <div className="bg-blue-100 p-6 rounded">Padding 6 (24px)</div>
            <div className="bg-blue-100 p-8 rounded">Padding 8 (32px)</div>
          </div>
        </div>

        {/* Button Test */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Test</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Danger Button
            </button>
            <button className="px-4 py-2 bg-transparent text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Outline Button
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ If you can see this styled message, TailwindCSS is working correctly!
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 