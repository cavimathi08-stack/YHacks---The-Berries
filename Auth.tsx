import React, { useState } from 'react';

// A mock DB helper to interact with localStorage
const db = {
  getUsers: () => {
    const data = localStorage.getItem('onAuraUsers');
    return data ? JSON.parse(data) : {};
  },
  saveUsers: (users: any) => {
    localStorage.setItem('onAuraUsers', JSON.stringify(users));
  },
};

interface AuthProps {
  onLoginSuccess: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = db.getUsers();
    if (users[username] && users[username].password === password) {
      onLoginSuccess(username);
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!username.trim() || !password.trim()) {
        setError('Username and password cannot be empty.');
        return;
    }

    const users = db.getUsers();
    if (users[username]) {
      setError('Username already exists.');
      return;
    }

    users[username] = {
      password: password,
      onboardingComplete: false,
      role: null,
      status: null,
      specialty: null,
      ageRange: null,
      communityType: null,
      climate: null,
      localHospital: null,
      province: null,
      posts: [],
      symptomLogs: [],
    };
    db.saveUsers(users);
    onLoginSuccess(username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <img
            src="https://i.ibb.co/qMNnzDzq/Untitled-2.png"
            alt="OnAURA Logo"
            className="h-28 mx-auto"
            />
            <p className="text-lg text-pink-700 mt-2">The Future of Women's Health</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-3 bg-white border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition text-pink-700 font-semibold placeholder-pink-400"
                aria-label="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 bg-white border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition text-pink-700 font-semibold placeholder-pink-400"
                aria-label="Password"
              />
              {isRegistering && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full p-3 bg-white border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition text-pink-700 font-semibold placeholder-pink-400"
                  aria-label="Confirm Password"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 mt-6"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-sm text-pink-700 hover:underline"
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Create one'}
            </button>
          </div>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-pink-200"></div>
            <span className="flex-shrink mx-4 text-pink-500 text-sm">Or</span>
            <div className="flex-grow border-t border-pink-200"></div>
          </div>
          
          <button
            onClick={() => onLoginSuccess('Aura')}
            className="w-full bg-white text-pink-700 font-bold py-3 px-8 rounded-full hover:bg-pink-100 transition-colors duration-300 shadow-md border-2 border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
             View App Demo (as Aura)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
