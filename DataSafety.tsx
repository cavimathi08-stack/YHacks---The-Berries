
import React from 'react';

const DataSafety: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-pink-700 mb-4">Your Data, Your Trust</h2>
          <p className="text-gray-700 leading-relaxed">
            At OnAURA, your privacy is our highest priority. We are committed to protecting your personal health information with the utmost care. All data is encrypted, stored securely, and is only ever used to provide you with the services you sign up for. 
            <br/><br/>
            <span className="font-bold">We will never sell your data to third parties.</span> You are in complete control of your information, always.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataSafety;
