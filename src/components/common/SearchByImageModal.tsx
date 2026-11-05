import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Sparkles, Check } from 'lucide-react';
import { ASSET_IMAGES } from '../../data/mockData';

interface SearchByImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSampleOrUpload: (categoryHint?: string) => void;
}

export const SearchByImageModal: React.FC<SearchByImageModalProps> = ({
  isOpen,
  onClose,
  onSelectSampleOrUpload,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateAnalysis = (imageSrc: string, hint: string) => {
    setSelectedPreview(imageSrc);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onSelectSampleOrUpload(hint);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Visual Stitch & Swatch Match
              </h3>
              <p className="text-xs text-stone-500">
                Upload a fabric sample, border photo, or sketch to find matching embroidery designs
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleSimulateAnalysis(ASSET_IMAGES.sareeBorder, 'Saree Borders');
          }}
          className={`mt-5 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver
              ? 'border-amber-600 bg-amber-50/50'
              : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
          }`}
        >
          {analyzing ? (
            <div className="py-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center animate-spin">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-stone-800">
                Analyzing embroidery density & needle motifs...
              </p>
              <p className="text-xs text-stone-500">
                Matching against 2,400+ production EMB files
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 text-stone-500 flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">
                  Drop fabric swatch photo here, or browse
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Supports JPG, PNG, WEBP up to 25MB
                </p>
              </div>
              <label className="inline-block px-4 py-2 text-xs font-semibold text-stone-900 bg-white border border-stone-300 rounded-lg shadow-sm hover:bg-stone-50 cursor-pointer">
                Select Photo from Device
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => handleSimulateAnalysis(ASSET_IMAGES.sareeBorder, 'Saree Borders')}
                />
              </label>
            </div>
          )}
        </div>

        {/* Quick Sample Presets */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
            Or test with sample swatch photos:
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Zari Border Swatch', img: ASSET_IMAGES.sareeBorder, hint: 'Saree Borders' },
              { label: 'Chikankari White', img: ASSET_IMAGES.chikankari, hint: 'Floral & Motifs' },
              { label: 'Bridal Sequin Jaal', img: ASSET_IMAGES.navySequin, hint: 'All-over Jaal' },
            ].map((sample) => (
              <button
                key={sample.label}
                onClick={() => handleSimulateAnalysis(sample.img, sample.hint)}
                className="group p-2 rounded-xl border border-stone-200 hover:border-amber-600 bg-white text-left transition-all overflow-hidden flex flex-col gap-1.5"
              >
                <img
                  src={sample.img}
                  alt={sample.label}
                  className="w-full h-14 object-cover rounded-md group-hover:scale-105 transition-transform"
                />
                <span className="text-[11px] font-medium text-stone-700 leading-tight">
                  {sample.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
