import React, { useState, useEffect } from 'react';

// Define the structure for a user's data, including all onboarding answers
interface UserData {
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
  symptomLogs?: Array<{
    date: string;
    symptoms: string[];
    notes: string;
    timestamp: string;
  }>;
}

// Options for the edit form dropdowns, consistent with Onboarding.tsx
const ageRanges = ['18-25', '26-35', '35-50', '51-65', '65+'];
const communityTypes = ['Urban', 'Suburban', 'Rural', 'Remote'];
const climates = ['Tropical', 'Dry', 'Temperate', 'Continental', 'Polar'];
const patientStages = ['Seeking Diagnosis', 'In Treatment', 'Remission / Survivor'];
const provinces = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon'
];


const MyAccount: React.FC = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editedData, setEditedData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  useEffect(() => {
    // Retrieve user data from localStorage based on the current session
    const currentUser = sessionStorage.getItem('onAuraCurrentUser');
    if (currentUser) {
      setUsername(currentUser);
      const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
      const currentUserData = users[currentUser];
      setUserData(currentUserData);
      setEditedData(currentUserData); // Initialize form data
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // If canceling, reset editedData to the original userData
      setEditedData(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value as any });
    }
  };

  const handleSaveChanges = () => {
    const currentUser = sessionStorage.getItem('onAuraCurrentUser');
    if (currentUser && editedData) {
      const users = JSON.parse(localStorage.getItem('onAuraUsers') || '{}');
      users[currentUser] = editedData;
      localStorage.setItem('onAuraUsers', JSON.stringify(users));
      setUserData(editedData); // Update the view with the new data
      setIsEditing(false); // Exit edit mode
    }
  };

  const renderInfoItem = (label: string, value: string | null) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-pink-100 last:border-b-0">
      <p className="text-gray-600">{label}</p>
      <p className="font-bold text-pink-700 text-left sm:text-right">{value || 'Not specified'}</p>
    </div>
  );
  
  const renderSelectInput = (label: string, field: keyof UserData, options: string[]) => (
     <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
        <label htmlFor={String(field)} className="text-gray-600 font-semibold sm:col-span-1">{label}</label>
        <select
          id={String(field)}
          value={editedData?.[field] as string || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="sm:col-span-2 p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none w-full"
        >
          <option value="" disabled>Select an option</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
  );


  const renderViewMode = () => {
    if (!userData) {
      return <p>Loading your information...</p>;
    }

    return (
      <>
        <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">Your Profile Summary</h2>
        <div className="space-y-2">
            {renderInfoItem('Your Role', userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : null)}
            {userData.role === 'patient' && renderInfoItem('Current Stage', userData.status)}
            {userData.role === 'doctor' && renderInfoItem('Specialty', userData.specialty)}
            {renderInfoItem('Age Range', userData.ageRange)}
            {renderInfoItem('Community Type', userData.communityType)}
            {renderInfoItem('Climate', userData.climate)}
            {renderInfoItem('Local Hospital', userData.localHospital)}
            {renderInfoItem('Province', userData.province)}
        </div>
        <div className="mt-6 text-center">
            <button
              onClick={handleEditToggle}
              className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md"
            >
              Edit Profile
            </button>
        </div>
      </>
    );
  };
  
  const renderEditMode = () => {
     if (!editedData) {
      return <p>Loading editor...</p>;
    }
    
    return (
        <>
            <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">Edit Your Profile</h2>
            <div className="space-y-4">
                {editedData.role === 'patient' && renderSelectInput('Current Stage', 'status', patientStages)}
                {editedData.role === 'doctor' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                        <label htmlFor="specialty" className="text-gray-600 font-semibold sm:col-span-1">Specialty</label>
                        <input
                            type="text"
                            id="specialty"
                            value={editedData.specialty || ''}
                            onChange={(e) => handleInputChange('specialty', e.target.value)}
                            className="sm:col-span-2 p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none w-full"
                        />
                    </div>
                )}
                {renderSelectInput('Age Range', 'ageRange', ageRanges)}
                {renderSelectInput('Community Type', 'communityType', communityTypes)}
                {renderSelectInput('Climate', 'climate', climates)}
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-4">
                    <label htmlFor="localHospital" className="text-gray-600 font-semibold sm:col-span-1">Local Hospital</label>
                    <input
                        type="text"
                        id="localHospital"
                        value={editedData.localHospital || ''}
                        onChange={(e) => handleInputChange('localHospital', e.target.value)}
                        className="sm:col-span-2 p-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none w-full"
                    />
                </div>
                {renderSelectInput('Province', 'province', provinces)}
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleEditToggle}
                  className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md"
                >
                  Save Changes
                </button>
            </div>
        </>
    );
  };


  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-700">Hello, {username}!</h1>
        <p className="text-md sm:text-lg text-pink-700/90 mt-2">
          Here's a summary of your profile.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-500">
        {isEditing ? renderEditMode() : renderViewMode()}
      </div>

      {/* Symptom Logs Section */}
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">Your Symptom Log</h2>
        {userData?.symptomLogs && userData.symptomLogs.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {[...userData.symptomLogs].reverse().map((log, index) => (
              <div key={index} className="bg-white/50 p-4 rounded-lg border border-pink-100">
                <p className="font-bold text-gray-800">
                  Logged on: <span className="font-normal">{new Date(log.timestamp).toLocaleDateString()}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Observation Date: {log.date}
                </p>
                {log.symptoms.length > 0 && (
                    <div className="mt-2">
                        <h4 className="font-semibold text-pink-600">Symptoms:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            {log.symptoms.map(s => <li key={s}>{s}</li>)}
                        </ul>
                    </div>
                )}
                {log.notes && (
                    <div className="mt-2">
                        <h4 className="font-semibold text-pink-600">Notes:</h4>
                        <p className="text-sm text-gray-700 italic">"{log.notes}"</p>
                    </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't logged any symptoms yet.</p>
        )}
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">Recent Posts</h2>
        {userData?.posts && userData.posts.length > 0 ? (
          <div className="space-y-4">
            {userData.posts.map(post => (
              <div key={post.id}>
                <div 
                  className="bg-white/50 p-4 rounded-lg border border-pink-100 transition-shadow hover:shadow-md cursor-pointer"
                  onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  aria-expanded={expandedPostId === post.id}
                  aria-controls={`replies-for-${post.id}`}
                >
                  <h3 className="font-bold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Posted in <span className="font-semibold text-pink-600">{post.category}</span> &middot; {post.timestamp}
                  </p>
                </div>
                {expandedPostId === post.id && (
                  <div id={`replies-for-${post.id}`} className="pl-4 sm:pl-8 pt-4 pb-2">
                    <h4 className="text-md font-semibold text-pink-700 mb-2 border-b border-pink-100 pb-1">Replies</h4>
                    <div className="space-y-3">
                      {post.replies && post.replies.length > 0 ? (
                        post.replies.map(reply => (
                          <div key={reply.id} className="bg-pink-50/50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">{reply.content}</p>
                            <p className="text-xs text-gray-500 mt-2 text-right">
                              - {reply.author}, {reply.timestamp}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No replies yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't made any posts yet.</p>
        )}
      </div>

    </div>
  );
};

export default MyAccount;
