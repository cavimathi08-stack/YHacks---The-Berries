import React from 'react';
import OurMission from './OurMission';
import OurPartners from './OurPartners';

type Page = 'mammo-at-home' | 'forum';

interface HomePageProps {
  navigateTo: (page: Page) => void;
  userRole: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo, userRole }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-16">
      
      {/* Banner Image */}
      <div className="w-full aspect-[25/4] overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://i.ibb.co/5XR0PvQf/Screenshot-2025-11-06-072628.png"
          alt="Breast cancer awareness banner with a diverse group of women"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-6 text-pink-700 drop-shadow-sm">
          Welcome to OnAURA
        </h1>
        <p className="text-2xl text-pink-700/90 mt-2">The Future of Women's Health</p>
      </div>

      {/* Navigation Cards */}
      <div className="w-full max-w-5xl flex flex-wrap justify-center gap-8 px-4">
        {userRole !== 'doctor' && (
          <div
            onClick={() => navigateTo('mammo-at-home')}
            className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between flex-1 min-w-[300px] max-w-md"
          >
            <div>
              <h2 className="text-2xl font-bold text-pink-700 mb-3">Your Private Health Calendar</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Track your health privately. Upload monthly images to monitor changes over time, securely and confidentially.</p>
            </div>
            <span className="font-bold text-pink-600 hover:text-pink-800 self-center">Explore Mammo-at-Home &rarr;</span>
          </div>
        )}
        <div
          onClick={() => navigateTo('forum')}
          className="bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-between flex-1 min-w-[300px] max-w-md"
        >
          <div>
            <h2 className="text-2xl font-bold text-pink-700 mb-3">Connect & Share</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Join our supportive community. Share experiences, ask questions, and connect with others in a safe and anonymous space.</p>
          </div>
          <span className="font-bold text-pink-600 hover:text-pink-800 self-center">Visit the Forum &rarr;</span>
        </div>
      </div>

      <section id="our-mission" className="w-full">
        <OurMission />
      </section>

      <section id="our-partners" className="w-full">
        <OurPartners />
      </section>
    </div>
  );
};

export default HomePage;