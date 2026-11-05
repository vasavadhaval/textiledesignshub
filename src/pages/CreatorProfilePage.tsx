import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Calendar,
  Award,
  Layers,
  Heart,
  UserCheck,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';
import { CollectionCard } from '../components/common/CollectionCard';
import { CREATORS } from '../data/mockData';

export const CreatorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { designs, collections, showToast } = useApp();

  const creator = CREATORS.find((c) => c.id === id) || CREATORS[0];
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'designs' | 'collections'>('designs');

  const creatorDesigns = designs.filter((d) => d.sellerId === creator.id || d.sellerName === creator.name);
  const creatorCollections = collections.filter((c) => c.sellerId === creator.id || c.sellerName === creator.name);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    showToast(
      isFollowing ? 'Unfollowed Creator' : `Following ${creator.name}`,
      isFollowing ? 'You will no longer receive drops from this studio.' : 'You will be notified whenever new embroidery punches are published.',
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Profile Header */}
      <div className="bg-stone-900 text-stone-100 border-b border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-amber-400/30 shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {creator.name}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                    Master Digitizer
                  </span>
                </div>

                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <span>{creator.handle}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {creator.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    Digitizing since {creator.joinedDate}
                  </span>
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {creator.badges.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] font-semibold bg-stone-800 text-stone-300 px-2 py-0.5 rounded-md border border-stone-700 flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-amber-400" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Follow & Metrics Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-6 text-xs text-center border-t sm:border-t-0 border-stone-800 pt-3 sm:pt-0 w-full sm:w-auto justify-around sm:justify-start">
                <div>
                  <span className="font-serif font-bold text-lg text-white block">
                    {creatorDesigns.length}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">Designs</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-white block">
                    {creator.totalSales}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">Sales Runs</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-amber-300 block flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {creator.rating}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider">Rating</span>
                </div>
              </div>

              <button
                onClick={handleFollowToggle}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  isFollowing
                    ? 'bg-stone-800 text-white border border-stone-700 hover:bg-stone-700'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Following Studio
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Follow Studio Drops
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Studio Bio & Machinery Speciality */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">
              About the Digitizer
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {creator.bio}
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-xs shrink-0 space-y-1">
            <span className="font-semibold text-stone-700 block">Machine Specialization</span>
            <p className="text-stone-900 font-mono font-medium">{creator.machineSpeciality}</p>
            <p className="text-[11px] text-emerald-800 font-medium">✓ Tajima & Barudan Factory Calibrated</p>
          </div>
        </div>

        {/* Tab switch: Designs vs Collections */}
        <div className="flex border-b border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('designs')}
            className={`py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'designs'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Machine Designs ({creatorDesigns.length})
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`py-3 px-6 border-b-2 transition-colors ${
              activeTab === 'collections'
                ? 'border-stone-900 text-stone-900 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Collections & Suites ({creatorCollections.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'designs' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorDesigns.map((d) => (
              <DesignCard key={d.id} design={d} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorCollections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
