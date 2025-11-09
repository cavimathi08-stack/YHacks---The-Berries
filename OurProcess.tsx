
import React from 'react';

const OurProcess: React.FC = () => {
  return (
    <div className="w-full space-y-8">
       {/* Banner Image */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="aspect-[25/3] overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://nativecanadianarts.com/wp-content/uploads/2023/08/Woodland-Leah-Marie-Dorion-2020-Moon-Cycle-Dancers-3.jpg"
            alt="Art by Leah Marie Dorion depicting moon cycle dancers"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-pink-700/80 text-center mt-1 italic">'Moon Cycle Dancers' by Leah Marie Dorion</p>
      </div>
      
      <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-4xl font-bold text-pink-700 text-center mb-6">Our Process</h1>
        
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          Our app uses machine learning (ML) — a form of artificial intelligence that allows computers to learn from data — to help identify early signs of breast cancer and connect users with real healthcare support.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-600 border-b-2 border-pink-200 pb-2">Learning from Real Data</h2>
          <p className="text-gray-700 leading-relaxed">
            We train our ML model using thousands of verified mammogram images and clinical datasets, teaching it to recognize subtle visual cues — like masses, calcifications, or tissue irregularities — that could signal potential risk.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-600 border-b-2 border-pink-200 pb-2">Smart, Accessible Screening</h2>
          <p className="text-gray-700 leading-relaxed">
            When users upload scans or answer screening questions, the model analyzes those inputs and provides a personalized risk score that highlights any areas of concern. This doesn’t replace a medical diagnosis — it’s an early warning system that helps women understand when to seek further care.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-600 border-b-2 border-pink-200 pb-2">Local Medical Partnerships</h2>
          <p className="text-gray-700 leading-relaxed">
            If the app detects potential warning signs, users are immediately connected with medical professionals from local hospitals or community clinics who can review the results, provide guidance, and proceed with diagnostic steps. This ensures that users are supported by real, trusted healthcare providers within their own region and cultural context.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-600 border-b-2 border-pink-200 pb-2">Continuous Learning and Cultural Safety</h2>
          <p className="text-gray-700 leading-relaxed">
            With consent, anonymized data helps retrain and improve the system, ensuring accuracy across diverse body types, skin tones, and imaging environments. We collaborate with Indigenous health organizations to make sure the experience is culturally respectful, private, and empowering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;