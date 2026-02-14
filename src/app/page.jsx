'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const validateUrl = (urlString) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    setError('');
    setShortUrl('');
    setCopied(false);

    // Validation
    if (!url.trim()) {
      const errorMsg = 'Please enter a URL';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!validateUrl(url)) {
      const errorMsg = 'Please enter a valid URL (must start with http:// or https://)';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (!user) {
      toast.error('Please login to shorten URLs');
      router.push('/login');
      return;
    }

    setLoading(true);

    const shortenPromise = (async () => {
      const token = await user.getIdToken();
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shorten`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setUrl('');
      return data;
    })();

    toast.promise(shortenPromise, {
      loading: 'Shortening URL...',
      success: 'URL shortened successfully!',
      error: (err) => err.message || 'Something went wrong'
    }).catch((err) => {
      setError(err.message || 'Something went wrong. Please try again.');
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleShorten();
    }
  };

  return (
    <>
      <div className="flex justify-center pt-16 sm:pt-24 md:pt-32 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="text-center space-y-6 sm:space-y-8 w-full max-w-4xl">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">
              Shorten your URL
            </h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              Transform long links into short, shareable URLs
            </p>
          </div>

          <div className="relative w-full space-y-4">
            {/* Input Section */}
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-lg border border-slate-200 p-2 hover:shadow-xl transition-shadow duration-300 gap-2 sm:gap-0">
              <div className="relative flex-1">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>

                <input 
                  className="w-full pl-12 pr-4 py-3 sm:py-4 text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent text-base sm:text-lg" 
                  type="url" 
                  placeholder="Paste your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
              
              <button 
                onClick={handleShorten}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-base cursor-pointer"
              >
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm sm:text-base">
                {error}
              </div>
            )}

            {/* Result Section */}
            {shortUrl && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 space-y-3 sm:space-y-4">
                <p className="text-slate-600 text-sm font-medium">Your shortened URL:</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input 
                    type="text" 
                    value={shortUrl} 
                    readOnly 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-sm sm:text-base break-all"
                  />
                  <button 
                    onClick={handleCopy}
                    className="w-full sm:w-auto bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    {copied ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                      </span>
                    ) : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
