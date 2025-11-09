import React from 'react';

interface ConnectProps {
  currentUser: string | null;
}

const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. Arnaq',
    role: 'General Practitioner',
    avatar: 'https://i.pravatar.cc/150?u=drarnaq',
  },
  {
    id: 2,
    name: 'Nurse Siku',
    role: 'Oncology Nurse',
    avatar: 'https://i.pravatar.cc/150?u=nursesiku_professional',
  },
  {
    id: 3,
    name: 'Dr. Nanouk',
    role: 'Radiologist',
    avatar: 'https://i.pravatar.cc/150?u=drnanouk',
  },
];

const Connect: React.FC<ConnectProps> = ({ currentUser }) => {
  return (
    <div className="w-full space-y-8">
      {/* Banner Image */}
      <div>
        <div className="w-full max-w-4xl mx-auto aspect-[25/3] overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4w108WC9n0dxxz1J5C16JaMa0MyMplb636w&s"
            alt="The Wisdom of the Universe by Christi Belcourt"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-pink-700/80 text-center mt-1 italic">'The Wisdom of the Universe' by Christi Belcourt</p>
      </div>

      {currentUser === 'Aura' ? (
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-pink-700">Connect with Local Professionals</h1>
            <p className="text-md sm:text-lg text-pink-700/90 mt-2">
              Based at Qikiqtani General Hospital
            </p>
          </div>
          <div className="space-y-6">
            {mockProfessionals.map(prof => (
              <div key={prof.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                <div className="flex items-center text-center sm:text-left">
                  <img src={prof.avatar} alt={`Profile of ${prof.name}`} className="w-16 h-16 rounded-full border-2 border-pink-300 object-cover" />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800">{prof.name}</h3>
                    <p className="text-md text-gray-600">{prof.role}</p>
                  </div>
                </div>
                <button className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300 w-full sm:w-auto">
                  Send Message Request
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Content for all other users
        <div className="w-full max-w-3xl mx-auto text-center bg-white/70 backdrop-blur-sm p-6 sm:p-10 rounded-xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-pink-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-700 mb-4">Coming Soon!</h1>
          <p className="text-md sm:text-lg text-gray-700 leading-relaxed">
            We're working hard to build a secure communication platform to connect you with trusted medical professionals in your area. Please check back soon for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default Connect;