import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>Inline Styles Test</h1>
      <p>If you can see this red heading, React is working.</p>
      
      <h1 className="text-blue-500 text-2xl font-bold">TailwindCSS Test</h1>
      <p className="text-gray-600">If you can see this blue heading, TailwindCSS is working.</p>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        ✅ Success! TailwindCSS is working if you see this green box.
      </div>
    </div>
  );
};

export default SimpleTest; 