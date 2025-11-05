import React from 'react';

const mockFounders = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    title: 'CEO & Co-Founder',
    bio: 'With over 20 years in oncology research, Evelyn is dedicated to leveraging technology to close the healthcare gap for underserved communities.',
    imageUrl: 'https://i.pravatar.cc/150?u=evelyn',
  },
  {
    id: 2,
    name: 'Aisha Khan',
    title: 'CTO & Co-Founder',
    bio: 'Aisha is a software architect with a passion for creating user-centric applications that are both powerful and accessible to everyone.',
    imageUrl: 'https://i.pravatar.cc/150?u=aisha',
  },
  {
    id: 3,
    name: 'Dr. Ben Carter',
    title: 'Chief Medical Officer',
    bio: 'Ben brings a wealth of clinical experience and a commitment to community-based healthcare initiatives and patient education.',
    imageUrl: 'https://i.pravatar.cc/150?u=ben',
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    title: 'Head of Community Outreach',
    bio: 'Maria specializes in building bridges between healthcare providers and Indigenous communities, ensuring our work is culturally sensitive and impactful.',
    imageUrl: 'https://i.pravatar.cc/150?u=maria',
  },
];

const OurTeam: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-700 text-center mb-10">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockFounders.map((founder) => (
          <div key={founder.id} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src={founder.imageUrl} 
              alt={`Profile of ${founder.name}`}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-300"
            />
            <h3 className="text-xl font-bold text-gray-800">{founder.name}</h3>
            <p className="text-md font-semibold text-pink-600 mb-2">{founder.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{founder.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;