import { History, Search, Filter, Download, ExternalLink } from 'lucide-react';

export default function Results() {
  const detections = [
    { id: 'DET-001', date: '2026-03-15 14:20', symbol: 'Engine Check', confidence: 0.98, status: 'Critical', image: 'cluster_sample_1.jpg' },
    { id: 'DET-002', date: '2026-03-15 14:15', symbol: 'Low Fuel', confidence: 0.85, status: 'Warning', image: 'cluster_sample_2.jpg' },
    { id: 'DET-003', date: '2026-03-15 13:50', symbol: 'ABS', confidence: 0.92, status: 'Normal', image: 'cluster_sample_3.jpg' },
    { id: 'DET-004', date: '2026-03-15 12:30', symbol: 'Brake Fluid', confidence: 0.76, status: 'Warning', image: 'cluster_sample_4.jpg' },
    { id: 'DET-005', date: '2026-03-14 11:10', symbol: 'Engine Check', confidence: 0.99, status: 'Critical', image: 'cluster_sample_5.jpg' },
    { id: 'DET-006', date: '2026-03-14 09:45', symbol: 'Coolant Temp', confidence: 0.88, status: 'Normal', image: 'cluster_sample_6.jpg' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Normal': return 'text-green-400 bg-green-400/10 border-green-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Detection History & Results</h2>
          <p className="text-slate-400">Review past tell-tale detection logs and analysis</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by Symbol or ID..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
              <Filter size={16} />
              Filters
            </button>
            <div className="h-6 w-[1px] bg-slate-700 mx-2"></div>
            <p className="text-sm text-slate-400">Total Results: <span className="text-white font-semibold">124</span></p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Detection ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Detected Symbol</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {detections.map((det) => (
                <tr key={det.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400">{det.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{det.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                        <History size={16} className="text-slate-500" />
                      </div>
                      <span className="text-sm font-medium text-white">{det.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-16 bg-slate-700 rounded-full h-1.5 min-w-[60px]">
                        <div 
                          className={`h-1.5 rounded-full ${det.confidence > 0.9 ? 'bg-green-500' : det.confidence > 0.8 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${det.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{(det.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(det.status)}`}>
                      {det.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-slate-400 hover:text-white transition-colors p-1">
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between">
          <p className="text-sm text-slate-400">Showing 1 to 6 of 124 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded hover:bg-slate-700 transition-colors text-sm">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">1</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded hover:bg-slate-700 transition-colors text-sm">2</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded hover:bg-slate-700 transition-colors text-sm">3</button>
            <button className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded hover:bg-slate-700 transition-colors text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
