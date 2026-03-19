import { Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function Dataset() {
  // Mock dataset images
  const mockImages = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: `cluster_sample_${i + 1}.jpg`,
    status: i % 3 === 0 ? 'Unlabeled' : 'Labeled',
    url: `https://picsum.photos/seed/car${i}/400/300` // Using picsum for placeholder images
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Dataset Management</h2>
          <p className="text-slate-400">Upload and manage instrument cluster images for training</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
          <Upload size={20} />
          Upload Images
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dataset Samples</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockImages.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-slate-700 border border-slate-600 hover:border-blue-500 transition-colors">
              <div className="aspect-video w-full bg-slate-800 relative">
                <img src={img.url} alt={img.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2">
                  {img.status === 'Labeled' ? (
                    <span className="bg-green-500/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> Labeled
                    </span>
                  ) : (
                    <span className="bg-yellow-500/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                      Unlabeled
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-slate-300 font-medium truncate flex items-center gap-2">
                  <ImageIcon size={14} className="text-slate-400" />
                  {img.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
