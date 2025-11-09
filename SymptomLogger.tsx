import React, { useState } from 'react';

interface SymptomLoggerProps {
  onBack: () => void;
  currentUser: string | null;
}

const commonSymptoms = [
  "New lump or knot",
  "Swelling or thickening",
  "Skin dimpling or puckering",
  "Nipple discharge (e.g., watery, bloody)",
  "Nipple pain or retraction (turning inward)",
  "Redness or warmth of the skin",
  "Change in breast size or shape"
];

const SymptomLogger: React.FC<SymptomLoggerProps> = ({ onBack, currentUser }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be sent to a secure backend.
    // For this demo, we'll store it in localStorage.
    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
        const user = users[currentUser];
        if (!user.symptomLogs) {
            user.symptomLogs = [];
        }
        user.symptomLogs.push({
            date: observationDate,
            symptoms: selectedSymptoms,
            notes: notes,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('onAuraUsers', JSON.stringify(users));
    }

    setIsSubmitted(true);
    // Automatically go back after a short delay
    setTimeout(() => {
        onBack();
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-700">Log Symptoms & Irregularities</h1>
        <button
          onClick={onBack}
          disabled={isSubmitted}
          className="bg-pink-100 text-pink-700 font-bold py-2 px-4 rounded-full hover:bg-pink-200 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {isSubmitted ? (
        <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-green-800">Symptoms Logged Successfully</h2>
            <p className="text-green-700 mt-2">
              Thank you. Your entry will help our AI provide a more accurate risk assessment over time. You will be returned to the previous page shortly.
            </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="observationDate" className="block text-lg font-semibold text-pink-700 mb-2">
              Date of Observation
            </label>
            <input
              type="date"
              id="observationDate"
              value={observationDate}
              onChange={(e) => setObservationDate(e.target.value)}
              required
              className="w-full max-w-xs p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-pink-700 mb-2">
              Select Observed Symptoms
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonSymptoms.map(symptom => (
                <div key={symptom} className="flex items-center p-2 rounded-md hover:bg-pink-50">
                  <input
                    type="checkbox"
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <label htmlFor={symptom} className="ml-3 text-gray-700 cursor-pointer">
                    {symptom}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-lg font-semibold text-pink-700 mb-2">
              Additional Notes or Details
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Describe any other changes you've noticed. For example, 'A small, pea-sized lump on the upper right side.' "
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none bg-pink-50 text-black placeholder-gray-500"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              Log Symptoms
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SymptomLogger;