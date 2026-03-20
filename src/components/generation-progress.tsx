'use client';

import { useState, useEffect } from 'react';

const STAGES = [
  { label: 'Generating headline copy...', duration: 1500 },
  { label: 'Writing service descriptions...', duration: 2000 },
  { label: 'Crafting about section...', duration: 1500 },
  { label: 'Optimizing SEO metadata...', duration: 1000 },
  { label: 'Building your site...', duration: 2000 },
];

export function GenerationProgress() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    let totalDelay = 0;

    STAGES.forEach((stage, index) => {
      totalDelay += stage.duration;
      if (index < STAGES.length - 1) {
        const timer = setTimeout(() => {
          setCurrentStage(index + 1);
        }, totalDelay);
        timers.push(timer);
      }
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      {/* Animated spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full" style={{ border: '4px solid #2A2A2A' }} />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{ border: '4px solid transparent', borderTopColor: '#E8762D' }}
        />
        <div
          className="absolute inset-2 rounded-full animate-spin"
          style={{ border: '4px solid transparent', borderBottomColor: '#F59E4B', animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>

      {/* Stage indicator */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Creating Your Website
        </h2>
        <p className="text-lg mb-8 transition-all duration-500" style={{ color: '#9CA3AF' }}>
          {STAGES[currentStage]?.label}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {STAGES.map((_, index) => (
            <div
              key={index}
              className="w-2.5 h-2.5 rounded-full transition-all duration-500"
              style={{
                background: index <= currentStage ? '#E8762D' : '#2A2A2A',
                transform: index <= currentStage ? 'scale(1)' : 'scale(0.75)',
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm" style={{ color: '#6B7280' }}>
        This usually takes 5-8 seconds
      </p>
    </div>
  );
}
