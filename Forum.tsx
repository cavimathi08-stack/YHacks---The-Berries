import React from 'react';

// Mock data for the forum threads
const mockThreads = [
  {
    id: 1,
    title: "How do you all deal with imposter syndrome at work?",
    author: "Anonymous",
    timestamp: "3 hours ago",
    replies: 12,
    category: "Career & Ambition",
    categoryColor: "bg-purple-200 text-purple-800",
  },
  {
    id: 2,
    title: "Seeking advice on setting healthy boundaries with family.",
    author: "Anonymous",
    timestamp: "8 hours ago",
    replies: 25,
    category: "Relationships",
    categoryColor: "bg-blue-200 text-blue-800",
  },
  {
    id: 3,
    title: "Favorite self-care routines that don't break the bank?",
    author: "Anonymous",
    timestamp: "1 day ago",
    replies: 42,
    category: "Health & Wellness",
    categoryColor: "bg-green-200 text-green-800",
  },
  {
    id: 4,
    title: "Navigating friendships as you get older.",
    author: "Anonymous",
    timestamp: "2 days ago",
    replies: 18,
    category: "Personal Growth",
    categoryColor: "bg-yellow-200 text-yellow-800",
  },
  {
    id: 5,
    title: "Tips for staying motivated with fitness goals?",
    author: "Anonymous",
    timestamp: "3 days ago",
    replies: 31,
    category: "Health & Wellness",
    categoryColor: "bg-green-200 text-green-800",
  },
];

const Forum: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      {/* Banner Image */}
      <div>
        <div className="w-full aspect-[25/3] overflow-hidden rounded-xl shadow-lg">
          <img
            src="https://thefulcrum.ca/wp-content/uploads/2022/10/norval-morrisseau-scaled.jpg"
            alt="Art by Norval Morrisseau"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-pink-700/80 text-center mt-1 italic">'Artist and Shaman between Two Worlds' by Norval Morrisseau</p>
      </div>

      {/* Forum Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-pink-700">Community Forum</h1>
        <button className="bg-pink-600 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300">
          New Post
        </button>
      </div>

      {/* Forum Threads */}
      <div className="space-y-4">
        {mockThreads.map((thread) => (
          <div key={thread.id} className="bg-white/80 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${thread.categoryColor} mb-2`}>
                  {thread.category}
                </span>
                <h2 className="text-xl font-bold text-gray-800 hover:text-pink-700">{thread.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by <span className="font-semibold">{thread.author}</span> &middot; {thread.timestamp}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-left sm:text-right">
                <div className="text-lg font-semibold text-gray-700">{thread.replies}</div>
                <div className="text-sm text-gray-500">Replies</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;