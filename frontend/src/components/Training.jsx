import { useState, useEffect } from 'react';
import { Play, Square, Activity, Save } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Training() {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [epoch, setEpoch] = useState(0);

  // Mock training metrics
  const maxEpochs = 50;
  
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    let interval;
    if (isTraining && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => Math.min(100, p + 2));
        setEpoch(e => Math.min(maxEpochs, e + 1));
        
        // Add new mock data point
        setMetricsData(prev => [...prev, {
          epoch: prev.length + 1,
          accuracy: Math.min(0.99, 0.4 + (prev.length * 0.01) + (Math.random() * 0.05)),
          loss: Math.max(0.05, 2.0 - (prev.length * 0.04) + (Math.random() * 0.1))
        }]);

      }, 1000);
    } else if (progress === 100) {
      setIsTraining(false);
    }
    return () => clearInterval(interval);
  }, [isTraining, progress]);

  const startTraining = () => {
    if (progress === 100) {
      setProgress(0);
      setEpoch(0);
      setMetricsData([]);
    }
    setIsTraining(true);
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Model Training (YOLOv8)</h2>
          <p className="text-slate-400">Train the object detection model on annotated dataset</p>
        </div>
        <div className="flex gap-3">
          {!isTraining ? (
            <button 
              onClick={startTraining}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              <Play size={20} />
              Start Training
            </button>
          ) : (
            <button 
              onClick={stopTraining}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
              <Square size={20} />
              Stop Training
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress & Status Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="text-blue-400" />
            Training Progress
          </h3>
          
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-white">Overall Progress</span>
                <span className="text-sm font-medium text-white">{progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Epochs</p>
                <p className="text-2xl font-bold text-white">{epoch} <span className="text-sm text-slate-500 font-normal">/ {maxEpochs}</span></p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Status</p>
                <p className={`text-lg font-bold ${isTraining ? 'text-blue-400 animate-pulse' : progress === 100 ? 'text-green-400' : 'text-slate-300'}`}>
                  {isTraining ? 'Training...' : progress === 100 ? 'Completed' : 'Idle'}
                </p>
              </div>
            </div>

            {progress === 100 && (
              <div className="mt-4 bg-green-900/40 border border-green-800 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-green-400 font-medium flex items-center gap-2">
                    <Save size={16} /> Model Saved
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Output: <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">yolov8_custom_100ep.pt</code></p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Download</button>
              </div>
            )}
          </div>
        </div>

        {/* Metrics Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 lg:col-span-2">
           <h3 className="text-lg font-semibold text-white mb-4">Training Metrics</h3>
           <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="epoch" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#4ade80" domain={[0, 1]} />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#4ade80" name="mAP50-95" activeDot={{ r: 8 }} isAnimationActive={false} />
                <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#f87171" name="Validation Loss" isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
}
