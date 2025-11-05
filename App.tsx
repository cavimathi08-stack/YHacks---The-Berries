import React, { useState, useRef, useEffect } from 'react';
import Onboarding from './Onboarding'; // Import the onboarding component
import Forum from './Forum'; // Import the new Forum component
import OurMission from './OurMission'; // Import the Our Mission component
import OurTeam from './OurTeam'; // Import the Our Team component

const App: React.FC = () => {
  // State to track if the user has started the app journey
  const [hasStarted, setHasStarted] = useState(false);
  // State to track if the onboarding process is complete
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  // State to manage the current page view
  const [currentPage, setCurrentPage] = useState<'home' | 'forum' | 'our-mission' | 'our-team'>('home');
  
  // State for menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Callback function to be called when onboarding is finished
  const handleOnboardingFinish = () => {
    setIsOnboardingComplete(true);
  };

  // Render the initial welcome screen if the user hasn't started
  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-screen bg-pink-200">
        <h1 className="text-5xl font-bold text-pink-700 mb-4">OncoScan</h1>
        <p className="text-lg text-pink-700 mb-8">The Future of Women's Health</p>
        <button
          onClick={() => setHasStarted(true)}
          className="bg-pink-600 text-white font-bold py-3 px-10 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 text-xl"
        >
          Get Started
        </button>
      </div>
    );
  }

  // Render the Onboarding component if started but not complete
  if (!isOnboardingComplete) {
    return <Onboarding onFinish={handleOnboardingFinish} />;
  }
  
  // Function to render the correct page based on state
  const renderPage = () => {
    switch(currentPage) {
      case 'forum':
        return <Forum />;
      case 'our-mission':
        return <OurMission />;
      case 'our-team':
        return <OurTeam />;
      case 'home':
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center h-full pt-16">
            <h1 className="text-7xl font-extrabold mb-6 text-pink-700 drop-shadow-sm">
              Welcome to OncoScan
            </h1>
            <p className="text-2xl text-pink-700/90 mt-2">The Future of Women's Health</p>
          </div>
        );
    }
  };

  return (
    // Main container with a vertical layout and a background color matching the logo
    <div className="flex flex-col min-h-screen bg-pink-200 text-gray-900 antialiased">
      {/* Header section */}
      <header className="w-full p-4 flex justify-between items-center text-pink-700 bg-pink-300 shadow-md backdrop-blur-sm sticky top-0 z-10">
        
        {/* Left side: Menu */}
        <div className="flex-1 flex justify-start">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="navigation-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <nav
                id="navigation-menu"
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              >
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Home</button>
                <button onClick={() => { setCurrentPage('forum'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Forum</button>
                <button onClick={() => { setCurrentPage('our-team'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Our Team</button>
                <button onClick={() => { setCurrentPage('our-mission'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Our Mission</button>
              </nav>
            )}
          </div>
        </div>

        {/* Center: Logo and Title */}
        <div className="flex-1 flex justify-center">
          <button onClick={() => setCurrentPage('home')} className="flex items-center focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-md p-1">
            <img src="http://www.w3.org/2000/svg" alt="OncoScan Logo" className="h-12 w-auto" />
          </button>
        </div>
        
        {/* Right side: Language Button */}
        <div className="flex-1 flex justify-end">
          <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
            </svg>
            <span className="font-medium hidden sm:inline">Language</span>
          </button>
        </div>
      </header>
      
      {/* Main content area, renders the current page */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;