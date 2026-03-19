import { useState } from 'react';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';

export default function Labeling() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock labeled data
  const labeledImages = [
    {
      id: 1,
      name: 'cluster_sample_1.jpg',
      url: 'https://images.unsplash.com/photo-1549558549-415fe4c37b60?auto=format&fit=crop&q=80&w=800',
      labels: [
        { id: 1, name: 'Engine Check', x: 20, y: 30, width: 15, height: 10, color: 'border-red-500' },
        { id: 2, name: 'Battery', x: 60, y: 40, width: 12, height: 8, color: 'border-yellow-500' },
      ],
    },
    {
      id: 2,
      name: 'cluster_sample_2.jpg',
      url: 'https://images.unsplash.com/photo-1595777038626-d62fceb3c8be?auto=format&fit=crop&q=80&w=800',
      labels: [
        { id: 3, name: 'ABS', x: 45, y: 70, width: 10, height: 10, color: 'border-green-500' },
      ],
    }
  ];

  const currentImage = labeledImages[currentImageIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Image Labeling Tool</h2>
          <p className="text-slate-400">Annotate bounding boxes for YOLO model training</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
          <Save size={20} />
          Save Annotations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Main Canvas Area */}
        <div className="lg:col-span-3 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex justify-center items-center relative">
          <img 
            src={currentImage.url} 
            alt={currentImage.name} 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Simulated Bounding Boxes */}
          {currentImage.labels.map(label => (
            <div 
              key={label.id}
              className={`absolute border-2 ${label.color} bg-${label.color.split('-')[1]}-500/20`}
              style={{
                top: `${label.y}%`,
                left: `${label.x}%`,
                width: `${label.width}%`,
                height: `${label.height}%`,
              }}
            >
              <span className={`absolute -top-6 left-0 bg-${label.color.split('-')[1]}-500 text-white text-xs px-2 py-0.5 whitespace-nowrap`}>
                {label.name}
              </span>
            </div>
          ))}

          {/* Navigation Overlay */}
          <div className="absolute inset-y-0 flex items-center justify-between w-full px-4">
            <button 
              onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
              className="p-2 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full backdrop-blur transition-all"
              disabled={currentImageIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentImageIndex(Math.min(labeledImages.length - 1, currentImageIndex + 1))}
              className="p-2 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full backdrop-blur transition-all"
              disabled={currentImageIndex === labeledImages.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Current Labels</h3>
            <p className="text-sm text-slate-400">{currentImage.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentImage.labels.map(label => (
              <div key={label.id} className="bg-slate-700 p-3 rounded-lg border border-slate-600 flex justify-between items-center group cursor-pointer hover:border-slate-500 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-${label.color.split('-')[1]}-500 inline-block`}></span>
                    {label.name}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    x: {label.x}, y: {label.y}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
