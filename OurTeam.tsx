import React from 'react';

// Data for the team member
const teamMembers = [
  {
    id: 1,
    name: 'Changavi Mathialagan',
    school: 'Markham District HS',
    grade: 12,
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQGE2uELmtdtxA/profile-displayphoto-crop_800_800/B4EZn_MRAjIMAI-/0/1760923030001?e=1764201600&v=beta&t=DpHrKX3YYsszW_W9LCv5qmrlwru_qb9F_SKDymbg7rU',
    linkedinUrl: 'https://www.linkedin.com/in/changavi-mathialagan-b9258731a/',
  },
  {
    id: 2,
    name: 'Dhanya Veluppillai',
    school: 'Markham District HS',
    grade: 11,
    imageUrl: 'https://i.ibb.co/mVWx046/dhanyaphtoto-ONAURA.png',
    linkedinUrl: 'https://www.linkedin.com/in/dhanya-veluppillai-082385397/',
  },
  {
    id: 3,
    name: 'Dipsa Gautam',
    school: 'St. John Paul II CHS',
    grade: 9,
    imageUrl: 'https://i.ibb.co/Q32kQHH/Screenshot-2025-11-08-212610.png',
    linkedinUrl: null,
  },
];


const OurTeam: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-700 text-center mb-10">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {teamMembers.map((member: any) => (
          <div key={member.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 flex flex-col">
            <img 
              src={member.imageUrl} 
              alt={`Profile of ${member.name}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-300 object-cover"
            />
            <div className="flex justify-center items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn Profile`} className="text-pink-600 hover:text-pink-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                  </a>
                )}
            </div>
            {member.title && <p className="text-md font-semibold text-pink-600">{member.title}</p>}
            <p className="text-sm text-gray-500 mb-3">Grade {member.grade}, {member.school}</p>
            {member.interests && (
                <div className="text-sm text-gray-600 leading-relaxed text-left border-t border-pink-200 pt-3 mt-auto">
                <p><span className="font-semibold">Interests:</span> {member.interests}</p>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;