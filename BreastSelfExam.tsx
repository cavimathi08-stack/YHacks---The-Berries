
import React from 'react';

interface BreastSelfExamProps {
  onBack: () => void;
}

const steps = [
  {
    title: "Look in the Mirror",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M12 14.5v-5.786c0-.923.38-1.808 1.03-2.468M12 14.5c-.501 0-1.002-.123-1.468-.364M12 14.5a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
    ),
    points: [
      "Stand with your shoulders straight and arms on your hips.",
      "Check for changes in size, shape, or skin texture — like dimpling, swelling, redness, or inverted nipples."
    ]
  },
  {
    title: "Raise Your Arms",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    points: [
      "Lift your arms overhead and look for the same changes.",
      "Also check for fluid or discharge from the nipples (watery, milky, or bloody)."
    ]
  },
  {
    title: "Feel While Standing or in the Shower",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.125 1.125 0 00.328-.788V12.01M21 12.01c0-1.6-1.123-2.994-2.707-3.227-1.087-.16-2.185-.283-3.293-.369V2.25L11.817 6.433a1.125 1.125 0 00-.328.788V12.01z" />
        </svg>
    ),
    points: [
      "Using the pads of your three middle fingers, move in small circular motions over the entire breast.",
      "Cover the area from collarbone to top of abdomen and armpit to cleavage.",
      "Use light, medium, and firm pressure to feel all layers of tissue."
    ]
  },
  {
    title: "Feel While Lying Down",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    points: [
      "Lie on your back with one arm behind your head.",
      "Use the opposite hand to examine the breast, again using circular motions from the nipple outward.",
      "This helps spread the tissue evenly for easier detection."
    ]
  },
  {
    title: "Know What’s Normal — and What’s Not",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    ),
    points: [
      "Breasts naturally feel lumpy in some areas, especially during menstrual cycles.",
      "But see a doctor if you notice:",
      "A new hard lump or knot",
      "Swelling, thickening, or dimpling of the skin",
      "Nipple discharge or pain",
      "Redness or warmth"
    ]
  },
  {
    title: "Do It Monthly",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h18" />
      </svg>
    ),
    points: [
      "Perform your self-exam once a month, ideally a week after your period when breast tissue is least tender.",
      "If you don’t menstruate, choose the same date each month to stay consistent."
    ]
  }
];

const BreastSelfExam: React.FC<BreastSelfExamProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-700">How to Perform a Breast Self-Exam</h1>
        <button
          onClick={onBack}
          className="bg-pink-100 text-pink-700 font-bold py-2 px-4 rounded-full hover:bg-pink-200 transition-colors duration-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white/50 p-6 rounded-lg border border-pink-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{step.icon}</div>
              <div>
                <h2 className="text-2xl font-semibold text-pink-600 mb-2">{index + 1}. {step.title}</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {step.points.map((point, pIndex) => {
                     // Special formatting for the list within step 5
                    if (index === 4 && pIndex > 1) {
                        return <li key={pIndex} className="ml-6 text-sm">- {point}</li>;
                    }
                    return <li key={pIndex}>{point}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreastSelfExam;
