import React, { useState, useCallback } from 'react';

const MammoAtHome: React.FC = () => {
  const [images, setImages] = useState<{ url: string; name: string; date: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        date: new Date().toLocaleDateString(),
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleFileChange(files);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-700">Mammo-at-Home</h1>
        <p className="text-lg text-pink-700/90 mt-2">
          A private space to track changes over time. Upload regular photos for your personal records.
        </p>
      </div>

      {/* File Upload Section */}
      <div 
        className={`bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-lg border-4 border-dashed ${isDragging ? 'border-pink-500' : 'border-pink-300'} transition-colors duration-300`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          id="fileUpload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <label htmlFor="fileUpload" className="flex flex-col items-center justify-center cursor-pointer text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-pink-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700">Drag & drop your images here</h3>
          <p className="text-gray-500 mt-1">or click to select files</p>
          <p className="text-xs text-gray-400 mt-4">Your images are private and only visible to you.</p>
        </label>
      </div>

      {/* Image Gallery Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-pink-700 mb-6">Your Upload History</h2>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div key={index} className="bg-white/70 p-3 rounded-lg shadow-md group relative overflow-hidden">
                <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded-md" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold truncate">{image.name}</p>
                  <p>{image.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white/70 p-8 rounded-xl shadow-md">
            <p className="text-gray-500">Your uploaded photos will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MammoAtHome;