'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import { Link as LinkIcon, Copy, ExternalLink, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateUrlPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await user.getIdToken();
      const payload = { url: originalUrl };
      
      // Only add customCode if it's not empty
      if (customCode.trim()) {
        payload.customCode = customCode.trim();
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setShortenedUrl(data);
      toast.success('URL shortened successfully!');
      setOriginalUrl('');
      setCustomCode('');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setShortenedUrl(null);
    setOriginalUrl('');
    setCustomCode('');
    setError('');
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-4 lg:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Short URL</h1>
              <p className="text-slate-600">Transform your long URLs into short, shareable links</p>
            </div>

            {/* URL Shortener Form */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 mb-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Original URL Input */}
                <div>
                  <label htmlFor="originalUrl" className="block text-sm font-semibold text-slate-700 mb-2">
                    Enter your long URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="url"
                      id="originalUrl"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                      placeholder="https://example.com/very-long-url"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Custom Code Input (Optional) */}
                <div>
                  <label htmlFor="customCode" className="block text-sm font-semibold text-slate-700 mb-2">
                    Custom short code (optional)
                  </label>
                  <div className="relative">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      id="customCode"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      placeholder="my-custom-link"
                      pattern="[a-zA-Z0-9-_]+"
                      title="Only letters, numbers, hyphens, and underscores allowed"
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Leave empty for auto-generated code. Only letters, numbers, hyphens, and underscores.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Shortening...
                    </>
                  ) : (
                    <>
                      <LinkIcon size={20} />
                      Shorten URL
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Result Card */}
            {shortenedUrl && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-md p-6 lg:p-8 animate-slideDown">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">URL Shortened Successfully!</h3>
                </div>

                {/* Short URL Display */}
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-sm text-slate-600 mb-2 font-medium">Your shortened URL:</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={shortenedUrl.shortUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(shortenedUrl.shortUrl)}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Copy size={18} />
                      Copy
                    </button>
                    <a
                      href={shortenedUrl.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Original URL */}
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-sm text-slate-600 mb-2 font-medium">Original URL:</p>
                  <p className="text-sm text-slate-700 break-all">{shortenedUrl.originalUrl}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Create Another URL
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors border border-slate-300"
                  >
                    View All URLs
                  </button>
                </div>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Custom short codes make your links more memorable and branded. Perfect for marketing campaigns!
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
