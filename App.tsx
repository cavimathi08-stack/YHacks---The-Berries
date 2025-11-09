import React, { useState, useRef, useEffect } from 'react';
import Onboarding from './Onboarding';
import Forum from './Forum';
import MammoAtHome from './MammoAtHome';
import PatientDatabase from './PatientDatabase';
import OurProcess from './OurProcess';
import HomePage from './HomePage';
import MyAccount from './MyAccount';
import Auth from './Auth'; // Import the new Auth component
import Connect from './Connect'; // Import the new Connect component
import OurTeam from './OurTeam'; // Import the OurTeam component

// Define the structure for a user's data
interface UserData {
  onboardingComplete: boolean;
  role: 'patient' | 'doctor' | null;
  status: string | null;
  specialty: string | null;
  ageRange: string | null;
  communityType: string | null;
  climate: string | null;
  localHospital: string | null;
  province: string | null;
  posts: Array<{ 
    id: number; 
    title: string; 
    timestamp: string; 
    category: string;
    replies: Array<{
      id: number;
      author: string;
      timestamp: string;
      content: string;
    }>;
  }>;
}

const NavButton: React.FC<{ page: string; label: string; current: string; onClick: () => void }> = ({ page, label, current, onClick }) => (
  <button
    onClick={onClick}
    className={`py-2 px-3 sm:px-4 rounded-md font-semibold transition-colors duration-200 text-sm whitespace-nowrap ${
      current === page
        ? 'bg-white text-pink-700 shadow-inner'
        : 'text-pink-100 hover:bg-pink-600 hover:text-white'
    }`}
  >
    {label}
  </button>
);

const MobileNavButton: React.FC<{ label: string; onClick: () => void; current: boolean }> = ({ label, onClick, current }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-3 px-4 text-lg font-semibold rounded-md ${
      current ? 'bg-pink-800 text-white' : 'text-pink-100 hover:bg-pink-600'
    }`}
  >
    {label}
  </button>
);


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'forum' | 'mammo-at-home' | 'my-patient-database' | 'our-process' | 'my-account' | 'connect' | 'our-team'>('home');
  
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Effect to check for a logged-in user on initial load and ensure demo user exists
  useEffect(() => {
    // Ensure Demo User exists
    const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
    if (!users['Aura']) {
        users['Aura'] = {
            password: 'demo', // simple password for manual login if desired
            onboardingComplete: true,
            role: 'patient',
            status: 'Seeking Diagnosis',
            specialty: null,
            ageRange: '35-50',
            communityType: 'Rural',
            climate: 'Polar',
            localHospital: 'Qikiqtani General Hospital',
            province: 'Nunavut',
            posts: [
              { 
                id: 1, 
                title: "Feeling anxious about my upcoming appointment", 
                timestamp: "2 days ago", 
                category: "Health & Wellness",
                replies: [
                  { id: 1, author: "Anonymous (Patient)", timestamp: "1 day ago", content: "It's totally normal to feel that way! I was a wreck before my first one. Just remember you're taking a brave step for your health." },
                  { id: 2, author: "Anonymous (Patient)", timestamp: "22 hours ago", content: "Deep breathing exercises helped me a lot. Also, maybe bring a book or some music to distract yourself in the waiting room." }
                ] 
              },
              { 
                id: 2, 
                title: "Any tips for staying warm and positive in a polar climate?", 
                timestamp: "1 week ago", 
                category: "Personal Growth",
                replies: [
                  { id: 1, author: "Anonymous (Patient)", timestamp: "6 days ago", content: "Vitamin D supplements are a game-changer! And I find that having a cozy hobby like knitting really helps pass the long nights." }
                ]
              },
              { 
                id: 3, 
                title: "Has anyone tried the at-home monitoring? Looking for advice.", 
                timestamp: "3 weeks ago", 
                category: "Mammo-at-Home",
                replies: [
                  { id: 1, author: "Anonymous (Patient)", timestamp: "3 weeks ago", content: "I've been using it for a few months. My advice is to pick the same day each month to do it so it becomes a routine. It feels a bit strange at first, but it gets easier!" },
                  { id: 2, author: "Anonymous (Doctor)", timestamp: "2 weeks ago", content: "Glad to see you're engaging with the tool, Aura. Consistency is key, as Emily mentioned. If you ever see anything that concerns you, please don't hesitate to flag it for professional review." }
                ]
              }
            ],
        };
        localStorage.setItem('onAuraUsers', JSON.stringify(users));
    }

    const loggedInUser = sessionStorage.getItem('onAuraCurrentUser');
    if (loggedInUser) {
      if (users[loggedInUser]) {
        setCurrentUser(loggedInUser);
        setUserData(users[loggedInUser]);
      }
    }
    setIsLoading(false);
  }, []);

  // Effect to handle clicks outside the menus to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginSuccess = (username: string) => {
    const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
    sessionStorage.setItem('onAuraCurrentUser', username);
    setCurrentUser(username);
    setUserData(users[username]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('onAuraCurrentUser');
    setCurrentUser(null);
    setUserData(null);
  };
  
  const handleOnboardingFinish = () => {
    if (currentUser) {
      const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
      users[currentUser].onboardingComplete = true;
      localStorage.setItem('onAuraUsers', JSON.stringify(users));
      setUserData(users[currentUser]);
    }
  };

  const navigateTo = (page: 'home' | 'forum' | 'mammo-at-home' | 'my-patient-database' | 'our-process' | 'my-account' | 'connect' | 'our-team') => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };
  
  const languages = ['English', 'Français', 'Cree', 'Inuktitut', 'Ojibwe'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-pink-200">
        <p className="text-lg text-pink-700">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  if (!userData?.onboardingComplete) {
    return <Onboarding currentUser={currentUser} onFinish={handleOnboardingFinish} />;
  }
  
  const renderPage = () => {
    switch(currentPage) {
      case 'forum': return <Forum />;
      case 'mammo-at-home': return <MammoAtHome currentUser={currentUser} />;
      case 'my-patient-database':
        return userData.role === 'doctor' ? <PatientDatabase /> : <div className="text-center text-pink-700">Access Denied. This feature is for doctors and researchers.</div>;
      case 'our-process': return <OurProcess />;
      case 'our-team': return <OurTeam />;
      case 'my-account': return <MyAccount />;
      case 'connect': return <Connect currentUser={currentUser} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} userRole={userData.role} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pink-200 text-gray-900 antialiased">
      <header className="w-full h-[96px] p-4 flex justify-between items-center text-pink-700 bg-pink-50 shadow-md backdrop-blur-sm sticky top-0 z-20">
        <div className="flex-1 flex justify-start items-center">
          <button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:hidden mr-2"
            aria-label="Open navigation menu"
            aria-haspopup="true"
            aria-expanded={isMobileMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img
            src="https://i.ibb.co/fV8hMfkD/NAURA-1-removebg-preview.png"
            alt="OnAURA Secondary Logo"
            className="h-10 sm:h-12"
          />
        </div>
        <div className="flex-shrink-0">
          <button onClick={() => navigateTo('home')} className="flex items-center focus:outline-none">
            <img src="https://i.ibb.co/qMNnzDzq/Untitled-2.png" alt="OnAURA Logo" className="h-14 sm:h-16" />
          </button>
        </div>
        <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
           <button 
             onClick={handleLogout} 
             className="font-semibold p-2 rounded-md hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
            >
              Logout
            </button>
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-pink-100/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Select language"
              aria-haspopup="true"
              aria-expanded={isLanguageMenuOpen}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
              </svg>
              <span className="font-medium hidden sm:inline">Language</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setIsLanguageMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="sm:hidden absolute top-[96px] left-0 right-0 bg-pink-700 shadow-lg p-4 z-10 flex flex-col items-start gap-2">
            <MobileNavButton label="Home" current={currentPage === 'home'} onClick={() => navigateTo('home')} />
            <MobileNavButton label="My Account" current={currentPage === 'my-account'} onClick={() => navigateTo('my-account')} />
            {userData.role !== 'doctor' && (
                <MobileNavButton label="Mammo-at-Home" current={currentPage === 'mammo-at-home'} onClick={() => navigateTo('mammo-at-home')} />
            )}
            <MobileNavButton label="Forum" current={currentPage === 'forum'} onClick={() => navigateTo('forum')} />
            <MobileNavButton label="Connect" current={currentPage === 'connect'} onClick={() => navigateTo('connect')} />
            {userData.role === 'doctor' && (
                <MobileNavButton label="Patient Database" current={currentPage === 'my-patient-database'} onClick={() => navigateTo('my-patient-database')} />
            )}
            <MobileNavButton label="Our Process" current={currentPage === 'our-process'} onClick={() => navigateTo('our-process')} />
            <MobileNavButton label="Our Team" current={currentPage === 'our-team'} onClick={() => navigateTo('our-team')} />
        </div>
      )}

      {/* Desktop Horizontal Nav */}
      <nav className="w-full bg-pink-700 shadow-md p-2 hidden sm:flex justify-center items-center gap-2 sticky top-[96px] z-10">
        <NavButton page="home" label="Home" current={currentPage} onClick={() => navigateTo('home')} />
        <NavButton page="my-account" label="My Account" current={currentPage} onClick={() => navigateTo('my-account')} />
        {userData.role !== 'doctor' && (
            <NavButton page="mammo-at-home" label="Mammo-at-Home" current={currentPage} onClick={() => navigateTo('mammo-at-home')} />
        )}
        <NavButton page="forum" label="Forum" current={currentPage} onClick={() => navigateTo('forum')} />
        <NavButton page="connect" label="Connect" current={currentPage} onClick={() => navigateTo('connect')} />
        {userData.role === 'doctor' && (
            <NavButton page="my-patient-database" label="Patient Database" current={currentPage} onClick={() => navigateTo('my-patient-database')} />
        )}
        <NavButton page="our-process" label="Our Process" current={currentPage} onClick={() => navigateTo('our-process')} />
        <NavButton page="our-team" label="Our Team" current={currentPage} onClick={() => navigateTo('our-team')} />
      </nav>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;