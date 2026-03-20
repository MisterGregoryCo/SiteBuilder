'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IntakeForm } from '@/components/intake-form';
import { GenerationProgress } from '@/components/generation-progress';
import type { IntakeFormData, Site } from '@/lib/types/site-config';

type Step = 'intake' | 'generating' | 'error';

export default function NewSitePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('intake');
  const [error, setError] = useState('');
  const handleGenerate = async (data: IntakeFormData) => {
    setStep('generating');
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Generation failed');
      }

      const site: Site = result.site;
      router.push(`/sites/${site.id}/preview`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push('/sites')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Sites
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Generate New Site</h1>
          <p className="text-sm text-gray-500">Fill in the business details and we&apos;ll generate a complete website in seconds.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {step === 'intake' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <IntakeForm onSubmit={handleGenerate} isLoading={false} />
          </div>
        )}

        {step === 'generating' && <GenerationProgress />}

        {step === 'error' && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">&#9888;</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Generation Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => {
                setStep('intake');
                setError('');
              }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
