'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (must start with http:// or https://)');
      return;
    }

    setLoading(true);

    try {
      // Backend API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleShorten();
    }
  };

  return (
    <>
      <div className="flex justify-center pt-32 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-8 px-4">
          <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Shorten your URL</h2>
          <p className="text-slate-600 text-lg">Transform long links into short, shareable URLs</p>

          <div className="relative w-full max-w-2xl mx-auto space-y-4">
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 p-2 hover:shadow-xl transition-shadow duration-300">
              <svg className="absolute left-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20"
                  height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>

              <input 
                className="flex-1 pl-14 pr-4 py-4 text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent text-lg" 
                type="url" 
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              
              <button 
                onClick={handleShorten}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {shortUrl && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-4">
                <p className="text-slate-600 text-sm font-medium">Your shortened URL:</p>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={shortUrl} 
                    readOnly 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono"
                  />
                  <button 
                    onClick={handleCopy}
                    className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                  >
                    {copied ? (
                      <span className="flex items-center gap-2">
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
