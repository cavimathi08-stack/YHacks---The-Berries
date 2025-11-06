
import React from 'react';

const insurancePartners = [
  {
    id: 1,
    name: 'Wellness First Insurance',
    description: 'Offering comprehensive coverage for preventative care and diagnostics.',
    logo: (
      <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Equity Health Plans',
    description: 'Committed to providing affordable health plans for indigenous communities.',
    logo: (
      <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'FutureCare Assurance',
    description: 'Innovating in health insurance with a focus on telemedicine and at-home solutions.',
    logo: (
       <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
  },
];

const hospitalPartners = [
  {
    id: 1,
    name: 'Maple Leaf General Hospital',
    description: 'A leading national hospital with a renowned oncology department.',
    logo: (
      <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        <path d="M12 11h.01"></path><path d="M12 15h.01"></path>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Northern Lights Regional Health Centre',
    description: 'Serving remote and rural communities with state-of-the-art medical services.',
    logo: (
      <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    ),
  },
  {
    id: 3,
    name: "City Central Women's Clinic",
    description: "Specializing in comprehensive women's health from adolescence through post-menopause.",
    logo: (
      <svg className="w-16 h-16 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h.01"></path><path d="M7 12h.01"></path><path d="M10 12h.01"></path>
        <path d="M10 4.5V12h4V8a4 4 0 0 0-4-4z"></path>
        <path d="M4 12C4 7.58 7.58 4 12 4s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z"></path>
      </svg>
    ),
  },
];


const OurPartners: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-700">Our Partners</h1>
        <p className="text-lg text-pink-700/90 mt-2">
          We are proud to collaborate with leading organizations to expand access to care.
        </p>
      </div>

      {/* Health Insurance Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-8">Health Insurance Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insurancePartners.map((partner) => (
            <div key={partner.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4">{partner.logo}</div>
              <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Network Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-8">Hospital & Clinic Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitalPartners.map((partner) => (
            <div key={partner.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4">{partner.logo}</div>
              <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mt-2">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurPartners;
