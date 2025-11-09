import React, { useState, useCallback, useRef } from 'react';

interface MonthlyImage {
  url: string;
  name: string;
  file: File;
}

interface MammoAtHomeProps {
  currentUser: string | null;
}

const MammoAtHome: React.FC<MammoAtHomeProps> = ({ currentUser }) => {
  const [months, setMonths] = useState<string[]>(['Month 1', 'Month 2', 'Month 3']);
  const [monthlyImages, setMonthlyImages] = useState<Record<string, MonthlyImage | null>>({});
  const [draggedOverMonth, setDraggedOverMonth] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0] && selectedMonth) {
      const file = files[0];
      const newImage = {
        url: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setMonthlyImages(prev => ({ ...prev, [selectedMonth]: newImage }));
      setSelectedMonth(null); // Reset after upload
    }
  };
  
  const handleCardClick = (month: string) => {
    setSelectedMonth(month);
    fileInputRef.current?.click();
  };

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>, month: string) => {
    event.preventDefault();
    setDraggedOverMonth(month);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggedOverMonth(null);
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>, month: string) => {
    event.preventDefault();
    setDraggedOverMonth(null);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const newImage = {
        url: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setMonthlyImages(prev => ({ ...prev, [month]: newImage }));
    }
  }, []);

  const addMonth = () => {
    setMonths(prev => [...prev, `Month ${prev.length + 1}`]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {currentUser === 'Aura' && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-8 shadow-md" role="alert">
          <p className="font-bold text-lg">Risk: Low</p>
          <p>Based on your consistent monthly monitoring, your current risk assessment is low. Keep up the great work!</p>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-700">Mammo-at-Home</h1>
        <p className="text-lg text-pink-700/90 mt-2">
          Your private monthly calendar. Upload a photo each month to track changes over time.
        </p>
        <p className="text-sm text-gray-500 mt-2">Your images are private and only visible to you.</p>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />

      {/* Monthly Calendar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {months.map((month) => {
          const image = monthlyImages[month];
          const isAuraCheckedMonth = currentUser === 'Aura' && (month === 'Month 1' || month === 'Month 2');

          if (isAuraCheckedMonth) {
            return (
              <div
                key={month}
                className="relative aspect-square bg-green-50/70 backdrop-blur-sm rounded-xl shadow-lg border-2 border-green-400 flex flex-col items-center justify-center text-center overflow-hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-green-800">{month}</h3>
                <p className="text-xs text-green-700 mt-1">
                  Complete
                </p>
              </div>
            );
          }

          return (
            <div
              key={month}
              className={`relative aspect-square bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border-2 border-dashed ${draggedOverMonth === month ? 'border-pink-500' : 'border-pink-300'} transition-all duration-300 flex items-center justify-center text-center cursor-pointer overflow-hidden group`}
              onClick={() => !image && handleCardClick(month)}
              onDragOver={(e) => onDragOver(e, month)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, month)}
            >
              {image ? (
                <>
                  <img src={image.url} alt={`${month} upload`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                    <p className="text-white font-bold text-lg">{month}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCardClick(month); }}
                      className="mt-2 bg-white/80 text-black text-xs font-bold py-1 px-3 rounded-full hover:bg-white"
                    >
                      Change Photo
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center p-4">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <h3 className="font-semibold text-pink-700">{month}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Click or drag to upload
                  </p>
                </div>
              )}
            </div>
          );
        })}
        {/* Add Month Button */}
        <div
          key="add-month"
          className="relative aspect-square bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border-2 border-dashed border-pink-300 hover:border-pink-500 hover:bg-white/80 transition-all duration-300 flex items-center justify-center text-center cursor-pointer"
          onClick={addMonth}
        >
          <div className="flex flex-col items-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-pink-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <h3 className="font-semibold text-pink-700">Add Month</h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MammoAtHome;