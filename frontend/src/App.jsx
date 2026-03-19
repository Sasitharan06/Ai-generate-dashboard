import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Grip, BrainCircuit, Activity, History } from 'lucide-react';
import Dataset from './components/Dataset';
import Labeling from './components/Labeling';
import Training from './components/Training';
import Detection from './components/Detection';
import Results from './components/Results';

const SidebarLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'text-slate-400 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-white' : 'group-hover:text-blue-400 transition-colors'} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

function DashboardHome() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <Database size={24} />
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Total Images</h3>
          <p className="text-3xl font-bold text-white">1,248</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:border-green-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <BrainCircuit size={24} />
            </div>
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Model Accuracy</h3>
          <p className="text-3xl font-bold text-green-400">98.4%</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:border-red-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
              <Activity size={24} />
            </div>
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Detections Today</h3>
          <p className="text-3xl font-bold text-blue-400">342</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm hover:border-yellow-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
              <Grip size={24} />
            </div>
          </div>
          <h3 className="text-slate-400 font-medium mb-1">Labeled Data</h3>
          <p className="text-3xl font-bold text-white">1,102</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Pipeline Overview</h3>
          <div className="relative flex flex-col gap-8">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-700"></div>
            
            <div className="relative flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Database size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Dataset Collection</h4>
                <p className="text-slate-400 text-sm">Active scraping and upload from manufacturing line clusters.</p>
              </div>
            </div>

            <div className="relative flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center z-10 group-hover:border-blue-500 group-hover:bg-slate-800 transition-all">
                <Grip size={20} className="text-slate-400 group-hover:text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Data Labeling</h4>
                <p className="text-slate-400 text-sm">Annotations in progress. 88% of current dataset labeled.</p>
              </div>
            </div>

            <div className="relative flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center z-10 group-hover:border-green-500 group-hover:bg-slate-800 transition-all">
                <BrainCircuit size={20} className="text-slate-400 group-hover:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">YOLO Training</h4>
                <p className="text-slate-400 text-sm">Last successful training: 2 hours ago. Version 2.4.1</p>
              </div>
            </div>

            <div className="relative flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center z-10 group-hover:border-red-500 group-hover:bg-slate-800 transition-all">
                <Activity size={20} className="text-slate-400 group-hover:text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Live Detection</h4>
                <p className="text-slate-400 text-sm">System operational. Latency: 42ms. Active on Line A, B, C.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
           <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert size={48} className="text-blue-400" />
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Automotive Excellence</h3>
           <p className="text-slate-400 max-w-sm">
             Our AI-Powered Detection System ensures 100% accuracy in identifying instrument cluster warnings during the assembly stage.
           </p>
           <button className="mt-8 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium border border-slate-600">
             System Diagnostics
           </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#0b1120] text-slate-100 font-sans overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#0f172a] border-r border-slate-800 flex flex-col shadow-2xl z-20">
          <div className="p-8 border-b border-slate-800 mb-4">
            <h1 className="text-lg font-bold text-white flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <Activity className="w-5 h-5" />
              </div>
              CLUSTER AI
            </h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em] mt-3">Detection System v1.2</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 py-4">
            <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" />
            <div className="pt-4 pb-2 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pipeline</div>
            <SidebarLink to="/dataset" icon={Database} label="Dataset" />
            <SidebarLink to="/labeling" icon={Grip} label="Labeling" />
            <SidebarLink to="/training" icon={BrainCircuit} label="Model Training" />
            
            <div className="pt-6 pb-2 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Operation</div>
            <SidebarLink to="/detection" icon={Activity} label="Detection" />
            <SidebarLink to="/results" icon={History} label="Results History" />
          </nav>

          <div className="p-6 mt-auto border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 font-bold">
                OP
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Line Operator</span>
                <span className="text-[10px] text-green-400 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> SYSTEM SECURE
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-[#0b1120] relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent_50%)] pointer-events-none"></div>
          
          {/* Header */}
          <header className="h-20 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-10">
            <h2 className="text-xl font-medium text-white tracking-tight">AI-Powered Vehicle Cluster Tell-Tale Detection</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></span>
                <span className="text-xs font-semibold text-slate-300">GPU ACTIVE: NVIDIA RTX 4090</span>
              </div>
            </div>
          </header>
          
          {/* Main View Container */}
          <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/dataset" element={<Dataset />} />
                <Route path="/labeling" element={<Labeling />} />
                <Route path="/training" element={<Training />} />
                <Route path="/detection" element={<Detection />} />
                <Route path="/results" element={<Results />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0b1120;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}} />
    </Router>
  );
}

// Placeholder for components that use Lucide icons not defined in sidebar
const ShieldAlert = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export default App;
