import React from 'react';

const OurMission: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-pink-700 text-center mb-6">Our Mission</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        At OncoScan, our mission is to empower Indigenous women with the knowledge and tools to take charge of their breast health. 
        Guided by the principles of Good Health and Wellbeing (UNSDG #3), we aim to bridge healthcare gaps by combining technology, cultural understanding, and community collaboration. 
        Our web app promotes early detection through accessible, educational, and privacy-focused resources that honour Indigenous voices and traditions. 
        By fostering awareness and improving access to life-saving information, we strive to create healthier futures where every woman — regardless of location or background — has the opportunity to detect, understand, and act on signs of breast cancer with confidence and care.
      </p>
    </div>
  );
};

export default OurMission;