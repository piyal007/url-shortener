'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { ArrowLeft, Copy, ExternalLink, Calendar, MousePointerClick } from 'lucide-react';

export default function UrlStatsPage() {
  const { shortCode } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUrlStats();
  }, [shortCode]);

  const fetchUrlStats = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/${shortCode}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch URL stats');
      }

      const data = await response.json();
      setUrlData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/${shortCode}`;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600">Loading stats...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            ) : urlData ? (
              <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">URL Statistics</h1>
                <p className="text-slate-600">Detailed analytics for your shortened URL</p>
              </div>

              {/* Short URL Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Short URL</h2>
                  <span className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                    {shortCode}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Copy size={18} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Original URL Card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Original URL</h2>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <a
                    href={urlData.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 break-all"
                  >
                    {urlData.originalUrl}
                  </a>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <MousePointerClick className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Total Clicks</p>
                      <p className="text-3xl font-bold text-slate-800">{urlData.clicks}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Calendar className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 font-medium">Created</p>
                      <p className="text-lg font-semibold text-slate-800">
                        {new Date(urlData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Share this short URL on social media, emails, or anywhere you need a clean, memorable link!
                </p>
              </div>
              </div>
            ) : null}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
