import React, { useState, useRef, useEffect } from 'react';

const App: React.FC = () => {
  // State for menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the menu to close it, improving UX
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

  return (
    // Main container with a vertical layout and a background color matching the logo
    <div className="flex flex-col min-h-screen bg-pink-200 text-gray-900 antialiased">
      {/* Header section */}
      <header className="w-full p-4 flex justify-between items-center text-pink-600">
        
        {/* Menu (left side) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              <a href="#team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Our Team</a>
              <a href="#mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Our Mission</a>
              <a href="#forum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-100">Forum</a>
            </nav>
          )}
        </div>

        {/* Language Button (right side) */}
        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-pink-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
          </svg>
          <span className="font-medium hidden sm:inline">Language</span>
        </button>
      </header>
      
      {/* Main content area, centered */}
      <main className="flex-grow flex items-center justify-center p-8">
        {/* The OncoScan logo image */}
        <img src="https://storage.googleapis.com/awe-persistent-files/19a9b2b8-93ff-46a2-a9b0-985160b83e39.png" alt="OncoScan Logo - The Future of Women's Health" className="mx-auto w-full max-w-md" />
      </main>
    </div>
  );
};

export default App;
