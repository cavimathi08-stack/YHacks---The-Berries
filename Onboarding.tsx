import React, { useState } from 'react';

// Mock DB helper to interact with localStorage
const db = {
  getUsers: () => {
    const data = localStorage.getItem('onAuraUsers');
    return data ? JSON.parse(data) : {};
  },
  saveUsers: (users: any) => {
    localStorage.setItem('onAuraUsers', JSON.stringify(users));
  },
};

interface OnboardingProps {
  currentUser: string;
  onFinish: () => void;
}

const provinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon'
];

const Onboarding: React.FC<OnboardingProps> = ({ currentUser, onFinish }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'patient' | 'doctor' | null>(null);
  const [specialty, setSpecialty] = useState('');
  const [localHospital, setLocalHospital] = useState('');
  const [province, setProvince] = useState('');


  const totalSteps = 7;

  const updateUser = (data: object) => {
    const users = db.getUsers();
    users[currentUser] = { ...users[currentUser], ...data };
    db.saveUsers(users);
  };

  const handleRoleSelection = (selectedRole: 'patient' | 'doctor') => {
    updateUser({ role: selectedRole });
    setRole(selectedRole);
    setStep(2);
  };

  const handlePatientStageSelection = (stage: string) => {
    updateUser({ status: stage });
    setStep(3);
  };

  const handleDoctorSpecialtySubmit = () => {
    updateUser({ specialty: specialty });
    setStep(3);
  };

  const handleSelection = (field: string, value: string, nextStep: number) => {
    updateUser({ [field]: value });
    setStep(nextStep);
  };

  const handleHospitalAndProvinceSubmit = () => {
    updateUser({ localHospital, province });
    setStep(7);
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">Tell us who you are</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelection('patient')}
                className="w-full max-w-sm bg-white text-pink-700 font-bold py-4 px-6 rounded-lg border-2 border-pink-500 hover:bg-pink-100 transition-colors duration-300 shadow-md"
              >
                I'm a Patient
              </button>
              <button
                onClick={() => handleRoleSelection('doctor')}
                className="w-full max-w-sm bg-white text-pink-700 font-bold py-4 px-6 rounded-lg border-2 border-pink-500 hover:bg-pink-100 transition-colors duration-300 shadow-md"
              >
                I'm a Doctor or Researcher
              </button>
            </div>
          </div>
        );
      case 2:
        if (role === 'patient') {
          return (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-pink-700 mb-6">What is your current stage?</h2>
              <div className="space-y-4">
                {['Seeking Diagnosis', 'In Treatment', 'Remission / Survivor'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handlePatientStageSelection(stage)}
                    className="w-full max-w-sm bg-white text-pink-700 font-semibold py-3 px-6 rounded-lg border border-pink-400 hover:bg-pink-100 transition-colors duration-300"
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
              <h2 className="text-3xl font-bold text-pink-700 mb-6">What is your specialty?</h2>
              <input
                type="text"
                placeholder="e.g., Oncologist, Radiologist"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full max-w-sm p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
              <button
                onClick={handleDoctorSpecialtySubmit}
                className="mt-6 bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg"
              >
                Next
              </button>
            </div>
          );
        }
        return null;
      case 3:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">What is your age range?</h2>
            <div className="space-y-4">
              {['18-25', '26-35', '35-50', '51-65', '65+'].map((age) => (
                <button key={age} onClick={() => handleSelection('ageRange', age, 4)} className="w-full max-w-sm bg-white text-pink-700 font-semibold py-3 px-6 rounded-lg border border-pink-400 hover:bg-pink-100 transition-colors duration-300">
                  {age}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">What type of community do you live in?</h2>
            <div className="space-y-4">
              {['Urban', 'Suburban', 'Rural', 'Remote'].map((community) => (
                <button key={community} onClick={() => handleSelection('communityType', community, 5)} className="w-full max-w-sm bg-white text-pink-700 font-semibold py-3 px-6 rounded-lg border border-pink-400 hover:bg-pink-100 transition-colors duration-300">
                  {community}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">What type of climate do you live in?</h2>
            <div className="space-y-4">
              {['Tropical', 'Dry', 'Temperate', 'Continental', 'Polar'].map((climate) => (
                <button key={climate} onClick={() => handleSelection('climate', climate, 6)} className="w-full max-w-sm bg-white text-pink-700 font-semibold py-3 px-6 rounded-lg border border-pink-400 hover:bg-pink-100 transition-colors duration-300">
                  {climate}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">What is your local hospital?</h2>
            <div className="space-y-4 max-w-sm mx-auto">
              <input
                type="text"
                placeholder="e.g., St. Mary's General Hospital"
                value={localHospital}
                onChange={(e) => setLocalHospital(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
               <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
              >
                <option value="" disabled>Select your province/territory</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button
              onClick={handleHospitalAndProvinceSubmit}
              disabled={!localHospital || !province}
              className="mt-6 bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg disabled:bg-pink-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        );
      case 7:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-pink-700 mb-2">You're all set!</h1>
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
        <div className="mt-6 text-center text-pink-700 font-semibold">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
