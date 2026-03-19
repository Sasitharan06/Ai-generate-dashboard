import { useState } from 'react';
import { UploadCloud, Zap, AlertTriangle, CheckCircle2, ShieldAlert, Activity } from 'lucide-react';

export default function Detection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [results, setResults] = useState(null); // Simulated results

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setResults(null);
    }
  };

  const runDetection = () => {
    if (!selectedImage) return;
    setIsDetecting(true);
    
    // Simulate AI inference delay
    setTimeout(() => {
      setIsDetecting(false);
      setResults({
        image: selectedImage, // We use the same image and overlay boxes via CSS for simulation
        detections: [
          { id: 1, name: 'Engine Check', confidence: 0.98, x: 25, y: 35, width: 12, height: 10, color: 'border-red-500', bg: 'bg-red-500', status: 'Critical' },
          { id: 2, name: 'Low Fuel', confidence: 0.85, x: 65, y: 35, width: 8, height: 8, color: 'border-yellow-500', bg: 'bg-yellow-500', status: 'Warning' },
        ]
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Live Detection System</h2>
          <p className="text-slate-400">Upload an instrument cluster image to detect active tell-tales using the trained YOLO model</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload and Controls Panel */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 lg:col-span-1 space-y-6">
          <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-blue-600/20 rounded-full">
                <UploadCloud className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Click to upload image</p>
                <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <button 
              onClick={runDetection}
              disabled={!selectedImage || isDetecting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                !selectedImage ? 'bg-slate-700 text-slate-500 cursor-not-allowed' :
                isDetecting ? 'bg-blue-600/50 text-white cursor-wait' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              <Zap className={isDetecting ? "animate-pulse" : ""} size={20} />
              {isDetecting ? 'Running YOLO Inference...' : 'Run AI Detection'}
            </button>
          </div>

          {results && (
            <div className="pt-4 border-t border-slate-700 space-y-3">
              <h3 className="text-white font-medium mb-3">Detection Summary</h3>
              {results.detections.map(det => (
                <div key={det.id} className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {det.status === 'Critical' ? <ShieldAlert className="text-red-500 w-4 h-4" /> : <AlertTriangle className="text-yellow-500 w-4 h-4" />}
                    <span className="text-sm text-white">{det.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400">Confidence</span>
                    <span className="text-sm font-bold text-white">{(det.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
              {results.detections.length === 0 && (
                <div className="flex items-center gap-2 text-green-400 bg-green-900/20 border border-green-800 p-3 rounded-lg">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium">No warnings detected</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Viewport */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 lg:col-span-2 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
          {!selectedImage ? (
            <div className="text-center text-slate-500">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} className="text-slate-400" />
              </div>
              <p>Upload an image to render preview</p>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Selected Cluster" 
                className={`max-w-full max-h-full object-contain transition-all duration-500 ${isDetecting ? 'opacity-50 blur-sm grayscale' : 'opacity-100'}`}
              />
              
              {/* Overlay scanning effect during detection */}
              {isDetecting && (
                <div className="absolute inset-0 bg-blue-500/10 z-10">
                  <div className="h-1 w-full bg-blue-500 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
              )}

              {/* Render Bounding Boxes */}
              {results && !isDetecting && results.detections.map(det => (
                <div 
                  key={det.id}
                  className={`absolute border-2 ${det.color} ${det.bg}/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  style={{
                    top: `calc(50% - 150px + ${det.y}%)`, /* Rough approximation for absolute centering mapping */
                    left: `calc(50% - 200px + ${det.x}%)`,
                    width: `${det.width}px`,
                    height: `${det.height}px`,
                    minWidth: '60px',
                    minHeight: '60px'
                  }}
                >
                  <div className={`absolute -top-7 left-[-2px] ${det.bg} text-white text-xs px-2 py-1 flex items-center gap-1 font-semibold whitespace-nowrap shadow-md`}>
                    {det.name} <span>{(det.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(500px); }
          100% { transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
