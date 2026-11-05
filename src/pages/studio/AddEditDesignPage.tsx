import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileCode,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  CATEGORY_OPTIONS,
  MACHINE_OPTIONS,
  MACHINE_TYPE_OPTIONS,
  DESIGN_TYPE_OPTIONS,
  FILE_FORMAT_OPTIONS,
  ASSET_IMAGES,
} from '../../data/mockData';

export const AddEditDesignPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { designs, user, addDesign, updateDesign, showToast } = useApp();

  const isEdit = Boolean(id);
  const existingDesign = isEdit ? designs.find((d) => d.id === id) : null;

  // Form Steps (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Step 1: Basic Information
  const [title, setTitle] = useState(existingDesign?.title || '');
  const [description, setDescription] = useState(existingDesign?.description || '');

  // Step 2: Classification
  const [machine, setMachine] = useState<any>(existingDesign?.machine || MACHINE_OPTIONS[0]);
  const [machineType, setMachineType] = useState<any>(existingDesign?.machineType || MACHINE_TYPE_OPTIONS[0]);
  const [category, setCategory] = useState<any>(existingDesign?.category || CATEGORY_OPTIONS[0]);
  const [designTypes, setDesignTypes] = useState<string[]>(existingDesign?.designTypes || ['Zari Work']);
  const [customTypeInput, setCustomTypeInput] = useState('');

  // Step 3: Specifications
  const [designNumber, setDesignNumber] = useState('TXH-' + Math.floor(1000 + Math.random() * 9000));
  const [stitches, setStitches] = useState<number>(existingDesign?.stitches || 45000);
  const [needles, setNeedles] = useState<number>(existingDesign?.needles || 6);
  const [heightMm, setHeightMm] = useState<number>(existingDesign?.heightMm || 120);
  const [widthMm, setWidthMm] = useState<number>(existingDesign?.widthMm || 350);
  const [sequenceType, setSequenceType] = useState<any>(existingDesign?.sequenceType || 'Standard 3mm Single');

  // Step 4: Pricing
  const [price, setPrice] = useState<number>(existingDesign?.price || 1499);
  const commissionRate = 0.15; // 15%
  const commissionAmount = price * commissionRate;
  const estimatedNet = price - commissionAmount;

  // Step 5: Files
  const [images, setImages] = useState<string[]>(
    existingDesign?.images || [ASSET_IMAGES.sareeBorder, ASSET_IMAGES.hero]
  );
  const [selectedFormats, setSelectedFormats] = useState<string[]>(
    existingDesign?.formats || ['EMB', 'DST', 'PES']
  );
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  // Auto calculate area
  const areaCm2 = Math.round((heightMm * widthMm) / 100);

  const toggleDesignType = (type: string) => {
    setDesignTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleAddCustomType = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTypeInput.trim() && !designTypes.includes(customTypeInput.trim())) {
      setDesignTypes((prev) => [...prev, customTypeInput.trim()]);
      setCustomTypeInput('');
    }
  };

  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const handleSimulateFileUpload = () => {
    setIsSimulatingUpload(true);
    setUploadProgress(20);
    setTimeout(() => setUploadProgress(65), 300);
    setTimeout(() => {
      setUploadProgress(100);
      setIsSimulatingUpload(false);
      showToast('Files Validated', 'All Wilcom EMB and Tajima DST punches passed stitch checks.', 'success');
    }, 700);
  };

  const handlePublish = (status: 'active' | 'draft') => {
    if (!title.trim()) {
      showToast('Title Required', 'Please enter a design title.', 'error');
      setCurrentStep(1);
      return;
    }

    const payload = {
      title,
      description,
      category,
      machine,
      machineType,
      designTypes,
      formats: selectedFormats as any,
      price,
      status,
      stitches,
      needles,
      heightMm,
      widthMm,
      areaCm2,
      sequenceType,
      images,
      files: [
        { name: `${title.replace(/\s+/g, '_')}.EMB`, format: 'EMB', size: '4.6 MB' },
        { name: `${title.replace(/\s+/g, '_')}.DST`, format: 'DST', size: '2.1 MB' },
        { name: `${title.replace(/\s+/g, '_')}.PES`, format: 'PES', size: '2.4 MB' },
      ],
      buyerProtection: 'Production guaranteed on multi-head and single needle machinery.',
    };

    if (isEdit && existingDesign) {
      updateDesign(existingDesign.id, payload);
      navigate('/studio/designs');
    } else {
      addDesign(payload);
      setPublishedSuccess(true);
    }
  };

  if (publishedSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-stone-200/90 p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Live in Marketplace
            </span>
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Design Published Successfully
            </h1>
            <p className="text-xs text-stone-500">
              "{title}" is now available to garment manufacturers, boutique designers, and export houses.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-left flex items-center gap-4">
            <img src={images[0]} alt={title} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <h4 className="font-serif text-xs font-bold text-stone-900">{title}</h4>
              <p className="text-[11px] text-stone-500">{category} · {machine}</p>
              <p className="text-xs font-mono font-bold text-stone-900 mt-1">₹{price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/studio/designs"
              className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs"
            >
              Back to My Designs Inventory
            </Link>
            <Link
              to="/explore"
              className="py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              View in Public Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stepsList = [
    { number: 1, label: 'Basic Info' },
    { number: 2, label: 'Classification' },
    { number: 3, label: 'Specifications' },
    { number: 4, label: 'Pricing' },
    { number: 5, label: 'Files & Previews' },
    { number: 6, label: 'Review & Publish' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/studio/designs"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-xl font-bold text-stone-900">
                {isEdit ? 'Edit Design Listing' : 'Upload Production Embroidery Design'}
              </h1>
              <p className="text-xs text-stone-500">
                Creator: <span className="font-semibold text-stone-800">{user.name}</span> ({user.location})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePublish('draft')}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Step Progress Tracker */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/90">
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {stepsList.map((step) => {
              const isCurrent = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setCurrentStep(step.number)}
                  className={`py-2 px-1 rounded-lg transition-colors flex flex-col items-center gap-1 ${
                    isCurrent
                      ? 'bg-stone-900 text-white font-bold'
                      : isCompleted
                      ? 'text-amber-900 bg-amber-50 font-semibold'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono border">
                    {isCompleted ? '✓' : step.number}
                  </span>
                  <span className="hidden sm:inline text-[11px] truncate max-w-full">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Container Form */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-xs">
          
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 1: Basic Information
                </h3>
                <p className="text-xs text-stone-500">
                  Provide an authentic title and notes for garment manufacturers.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3 text-xs">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <span className="text-stone-500 text-[11px]">Signing Digitizer</span>
                  <p className="font-semibold text-stone-900">{user.name} · {user.location}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Design Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Zari Saree Border with Lotus Medallion"
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700 block">
                  Technical Description & Fabric Suitability *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe thread formulas, recommended stabilizer, density adjustments, and fabric types..."
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Classification */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 2: Machinery & Classification
                </h3>
                <p className="text-xs text-stone-500">
                  Select matching machines and embroidery techniques.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Embroidery Machine</label>
                  <select
                    value={machine}
                    onChange={(e) => setMachine(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900"
                  >
                    {MACHINE_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-stone-700 block">Machine Calibration Type</label>
                  <select
                    value={machineType}
                    onChange={(e) => setMachineType(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900"
                  >
                    {MACHINE_TYPE_OPTIONS.map((mt) => (
                      <option key={mt} value={mt}>{mt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Design Types Multi-select & Custom Type */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Select Techniques (Multiple Allowed):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DESIGN_TYPE_OPTIONS.map((type) => {
                    const active = designTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleDesignType(type)}
                        className={`p-2.5 rounded-lg border text-xs text-left transition-colors flex items-center justify-between ${
                          active
                            ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        <span className="truncate">{type}</span>
                        {active && <Check className="w-3 h-3 text-amber-800 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Type Input */}
                <div className="pt-2 flex gap-2 max-w-sm">
                  <input
                    type="text"
                    value={customTypeInput}
                    onChange={(e) => setCustomTypeInput(e.target.value)}
                    placeholder="Add custom technique (e.g. 5mm Panni)"
                    className="flex-1 text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-stone-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomType}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Specifications */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 3: Needle & Stitch Specifications
                </h3>
                <p className="text-xs text-stone-500">
                  Accurate dimensions allow factories to calibrate hooping frames.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Design Code / Number</label>
                  <input
                    type="text"
                    value={designNumber}
                    onChange={(e) => setDesignNumber(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Total Stitch Count</label>
                  <input
                    type="number"
                    value={stitches}
                    onChange={(e) => setStitches(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Active Needle Count</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={needles}
                    onChange={(e) => setNeedles(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Height (mm)</label>
                  <input
                    type="number"
                    value={heightMm}
                    onChange={(e) => setHeightMm(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Width (mm)</label>
                  <input
                    type="number"
                    value={widthMm}
                    onChange={(e) => setWidthMm(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 block">Calculated Area</label>
                  <input
                    type="text"
                    disabled
                    value={`${areaCm2} cm²`}
                    className="w-full p-2.5 bg-stone-100 border border-stone-300 rounded-xl font-mono text-stone-600 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-stone-700 block">Sequence Mode</label>
                <select
                  value={sequenceType}
                  onChange={(e) => setSequenceType(e.target.value as any)}
                  className="w-full sm:w-1/2 p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900"
                >
                  <option value="None">None (Standard Thread)</option>
                  <option value="Standard 3mm Single">Standard 3mm Single</option>
                  <option value="Double Sequence (3mm + 5mm)">Double Sequence (3mm + 5mm)</option>
                  <option value="Reversible Sequin">Reversible Sequin</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Pricing & Commission Calculator */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 4: Pricing & Royalties
                </h3>
                <p className="text-xs text-stone-500">
                  Set your base price in Indian Rupees. We take a flat 15% platform infrastructure fee.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>
                    <strong>Test Mode Environment:</strong> All pricing calculations are estimates. You can adjust prices anytime.
                  </span>
                </div>
                <span className="font-mono uppercase font-bold text-[10px] bg-amber-200/80 px-2 py-0.5 rounded">
                  Test Sandbox
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Buyer Selling Price (₹ INR) *
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-stone-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-mono font-bold text-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              </div>

              {/* Commission Calculator Matrix */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <h4 className="font-semibold text-stone-800">
                  Estimated Earning Breakdown per Purchase:
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-stone-600">
                    <span>Gross Selling Price</span>
                    <span className="font-mono tabular-nums">₹{price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Platform Commission (15%)</span>
                    <span className="font-mono tabular-nums">-₹{commissionAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                    <span>Estimated Seller Net Payout</span>
                    <span className="font-mono text-emerald-800 text-base">
                      ₹{estimatedNet.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 pt-1">
                  * Note: This estimate reflects net payout per single transaction before any applicable GST reverse charges.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Files & Images */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 5: Stitch Files & Preview Photography
                </h3>
                <p className="text-xs text-stone-500">
                  Upload high-res stitch samples and original machine file archives.
                </p>
              </div>

              {/* Image Previews */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-stone-700 block">
                  Product Preview Images ({images.length} Loaded)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 group">
                      <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 p-1 bg-stone-900/80 hover:bg-stone-900 text-white rounded-md text-[10px]"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setImages([...images, ASSET_IMAGES.navySequin]);
                      showToast('Photo Added', 'Attached supplementary embroidery swatch.', 'info');
                    }}
                    className="border-2 border-dashed border-stone-300 hover:border-amber-700 rounded-xl flex flex-col items-center justify-center p-4 text-stone-500 text-xs gap-1 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 text-stone-400" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Format selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-stone-700 block">
                  Included Machine Formats:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {FILE_FORMAT_OPTIONS.map((fmt) => {
                    const active = selectedFormats.includes(fmt);
                    return (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => toggleFormat(fmt)}
                        className={`px-3 py-1.5 rounded-lg font-mono font-medium border transition-colors ${
                          active
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        {fmt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stitch File Upload Box with Validation Simulation */}
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center bg-stone-50/50 space-y-3">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-600">
                  <FileCode className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">
                    Drop Wilcom (.EMB) or Tajima (.DST) stitch files here
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Automatic needle jump & color stop validation
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSimulatingUpload}
                  onClick={handleSimulateFileUpload}
                  className="px-4 py-2 bg-white border border-stone-300 text-stone-800 text-xs font-semibold rounded-lg shadow-xs hover:bg-stone-50"
                >
                  {isSimulatingUpload ? `Validating Punch (${uploadProgress}%)...` : 'Simulate File Re-upload'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Publish */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Step 6: Review Listing Before Publishing
                </h3>
                <p className="text-xs text-stone-500">
                  Confirm all technical parameters and preview image presentation.
                </p>
              </div>

              {/* Preview Card */}
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-6">
                <div className="flex gap-4 items-start">
                  <img
                    src={images[0]}
                    alt={title}
                    className="w-24 h-24 rounded-xl object-cover border border-stone-300"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-amber-900 tracking-wider">
                      {category} · {machine}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-stone-900">
                      {title || 'Untitled Design'}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4 border-t border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Stitch Count</span>
                    <span className="font-mono font-bold text-stone-900">{stitches.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Needles</span>
                    <span className="font-mono font-bold text-stone-900">{needles} Needles</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Dimensions</span>
                    <span className="font-mono font-bold text-stone-900">{heightMm}×{widthMm} mm</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Price / Est. Net</span>
                    <span className="font-mono font-bold text-stone-900">₹{price} / ₹{estimatedNet.toFixed(0)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handlePublish('active')}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <UploadCloud className="w-4 h-4" />
                  Publish Live to Marketplace
                </button>
                <button
                  type="button"
                  onClick={() => handlePublish('draft')}
                  className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs transition-colors"
                >
                  Save as Unpublished Draft
                </button>
              </div>
            </div>
          )}

          {/* Form Step Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Step
            </button>

            {currentStep < 6 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(6, prev + 1))}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
