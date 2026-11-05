import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number; viewMode?: 'grid' | 'list' }> = ({
  count = 6,
  viewMode = 'grid',
}) => {
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse'
          : 'flex flex-col gap-4 animate-pulse'
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-stone-200 p-4 space-y-4"
        >
          <div className="bg-stone-200 rounded-lg aspect-[4/3] w-full" />
          <div className="space-y-2">
            <div className="h-3 bg-stone-200 rounded w-1/3" />
            <div className="h-4 bg-stone-200 rounded w-3/4" />
            <div className="h-3 bg-stone-200 rounded w-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-stone-200 rounded w-1/4" />
            <div className="h-8 bg-stone-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};
