import React from 'react';

// Mock patient data
const mockPatients = [
  { id: 'p001', name: 'Eleanor Vance', age: 45, status: 'In Treatment', lastCheckin: '2024-07-15', avatar: 'https://i.pravatar.cc/150?u=p001' },
  { id: 'p002', name: 'Sofia Reyes', age: 52, status: 'Remission', lastCheckin: '2024-06-28', avatar: 'https://i.pravatar.cc/150?u=p002' },
  { id: 'p003', name: 'Isabella Chen', age: 38, status: 'Seeking Diagnosis', lastCheckin: '2024-07-20', avatar: 'https://i.pravatar.cc/150?u=p003' },
  { id: 'p004', name: 'Chloe Dubois', age: 61, status: 'Stable', lastCheckin: '2024-07-05', avatar: 'https://i.pravatar.cc/150?u=p004' },
  { id: 'p005', name: 'Amelia Garcia', age: 49, status: 'In Treatment', lastCheckin: '2024-07-18', avatar: 'https://i.pravatar.cc/150?u=p005' },
  { id: 'p006', name: 'Hannah Wilson', age: 55, status: 'Remission', lastCheckin: '2024-05-30', avatar: 'https://i.pravatar.cc/150?u=p006' },
];

const statusColors: { [key: string]: string } = {
  'In Treatment': 'bg-yellow-100 text-yellow-800',
  'Remission': 'bg-green-100 text-green-800',
  'Seeking Diagnosis': 'bg-red-100 text-red-800',
  'Stable': 'bg-blue-100 text-blue-800',
};

const PatientDatabase: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-pink-700">My Patient Database</h1>
        <p className="text-md sm:text-lg text-pink-700/90 mt-2">
          Manage and review patient information.
        </p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input 
            type="text" 
            placeholder="Search patients..."
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none w-full sm:w-auto"
            aria-label="Search patients"
          />
          <button className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md w-full sm:w-auto">
            + Add Patient
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Check-in</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={patient.avatar} alt={`${patient.name}'s profile picture`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[patient.status] || 'bg-gray-100 text-gray-800'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.lastCheckin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-pink-600 hover:text-pink-900 focus:outline-none focus:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDatabase;