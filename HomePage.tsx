import React from 'react';
import OurMission from './OurMission';
import OurPartners from './OurPartners';
import DataSafety from './DataSafety'; // Import the new component
import Testimonials from './Testimonials'; // Import the new Testimonials component

type Page = 'mammo-at-home' | 'forum' | 'my-account';

interface HomePageProps {
  navigateTo: (page: Page) => void;
  userRole: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo, userRole }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-12 md:space-y-16">
      
      {/* Banner Image */}
      <div className="w-full aspect-[25/5] overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://i.ibb.co/5XR0PvQf/Screenshot-2025-11-06-072628.png"
          alt="Breast cancer awareness banner with a diverse group of women"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-pink-700 drop-shadow-sm">
          Welcome to OnAURA
        </h1>
        <p className="text-xl sm:text-2xl text-pink-700/90 mt-2">The Future of Women's Health</p>
        <button
          onClick={() => navigateTo('my-account')}
          className="mt-8 bg-white text-pink-700 font-bold py-3 px-10 rounded-full hover:bg-pink-100 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 text-lg sm:text-xl border-2 border-pink-500"
        >
          My Account
        </button>
      </div>

      {/* Navigation Cards */}
      <div className="w-full max-w-5xl flex flex-row flex-wrap justify-center gap-4 sm:gap-8 px-4">
        {userRole !== 'doctor' && (
          <div
            onClick={() => navigateTo('mammo-at-home')}
            className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-center sm:justify-between flex-1"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-pink-700 sm:mb-3">Your Private Health Calendar</h2>
              <p className="hidden sm:block text-gray-600 leading-relaxed mt-2 mb-6">Track your health privately. Upload monthly images to monitor changes over time, securely and confidentially.</p>
            </div>
            <span className="hidden sm:block font-bold text-pink-600 hover:text-pink-800 self-center">Explore Mammo-at-Home &rarr;</span>
          </div>
        )}
        <div
          onClick={() => navigateTo('forum')}
          className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col justify-center sm:justify-between flex-1"
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-pink-700 sm:mb-3">Connect & Share</h2>
            <p className="hidden sm:block text-gray-600 leading-relaxed mt-2 mb-6">Join our supportive community. Share experiences, ask questions, and connect with others in a safe and anonymous space.</p>
          </div>
          <span className="hidden sm:block font-bold text-pink-600 hover:text-pink-800 self-center">Visit the Forum &rarr;</span>
        </div>
      </div>

      <section id="our-mission" className="w-full">
        <OurMission />
      </section>

      <section id="our-partners" className="w-full">
        <OurPartners />
      </section>

      <section id="data-safety" className="w-full">
        <DataSafety />
      </section>

      <section id="testimonials" className="w-full">
        <Testimonials />
      </section>
    </div>
  );
};

export default HomePage;