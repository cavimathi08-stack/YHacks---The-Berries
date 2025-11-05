import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'patient' | 'doctor' | 'explorer' | null>(null);

  const totalSteps = 3; // All paths now have 3 steps

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">Tell us who you are</h2>
            <div className="space-y-4">
              <button
                onClick={() => { setRole('patient'); setStep(2); }}
                className="w-full max-w-sm bg-white text-pink-600 font-bold py-4 px-6 rounded-lg border-2 border-pink-500 hover:bg-pink-100 transition-colors duration-300 shadow-md"
              >
                I'm a Patient
              </button>
              <button
                onClick={() => { setRole('doctor'); setStep(2); }}
                className="w-full max-w-sm bg-white text-pink-600 font-bold py-4 px-6 rounded-lg border-2 border-pink-500 hover:bg-pink-100 transition-colors duration-300 shadow-md"
              >
                I'm a Doctor or Researcher
              </button>
              <button
                onClick={() => { setRole('explorer'); setStep(2); }}
                className="w-full max-w-sm bg-white text-pink-600 font-bold py-4 px-6 rounded-lg border-2 border-pink-500 hover:bg-pink-100 transition-colors duration-300 shadow-md"
              >
                Just Exploring
              </button>
            </div>
          </div>
        );
      case 2:
        if (role === 'patient') {
          return (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">What is your current stage?</h2>
              <div className="space-y-4">
                {['Seeking Diagnosis', 'In Treatment', 'Remission / Survivor'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setStep(3)}
                    className="w-full max-w-sm bg-white text-pink-600 font-semibold py-3 px-6 rounded-lg border border-pink-400 hover:bg-pink-100 transition-colors duration-300"
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          );
        }
        if (role === 'doctor') {
          return (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">What is your specialty?</h2>
              <input
                type="text"
                placeholder="e.g., Oncologist, Radiologist"
                className="w-full max-w-sm p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
              <button
                onClick={() => setStep(3)}
                className="mt-6 bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg"
              >
                Next
              </button>
            </div>
          );
        }
        if (role === 'explorer') {
          return (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">Welcome, Explorer!</h2>
              <p className="text-lg text-pink-700 mb-8">Feel free to look around and see what our community has to offer.</p>
              <button
                onClick={() => setStep(3)}
                className="mt-6 bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg"
              >
                Continue
              </button>
            </div>
          );
        }
        return null;
      case 3:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-pink-600 mb-2">You're all set!</h1>
            <p className="text-lg text-pink-700 mb-8">We're glad you're here. Let's make a difference together.</p>
            <button
              onClick={onFinish}
              className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              Enter the App
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pink-200 text-gray-900 antialiased items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-pink-50 p-8 rounded-2xl shadow-2xl">
          {renderStep()}
        </div>
        <div className="mt-6 text-center text-pink-600 font-semibold">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;