'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import AnalyticsChart from '@/components/AnalyticsChart';
import { DashboardSkeleton } from '@/components/LoadingSkeleton';
import { BarChart3, TrendingUp, MousePointerClick, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/urls`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }

      const data = await response.json();
      setUrls(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const avgClicks = urls.length > 0 ? Math.round(totalClicks / urls.length) : 0;
  const mostClickedUrl = urls.length > 0 ? urls.reduce((max, url) => url.clicks > max.clicks ? url : max, urls[0]) : null;
  const activeUrls = urls.filter(url => url.clicks > 0).length;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-4 lg:p-8">
          {loading ? (
            <DashboardSkeleton />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Analytics</h1>
                <p className="text-slate-600">Comprehensive insights into your shortened URLs</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <LinkIcon className="text-blue-600" size={20} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Total URLs</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{urls.length}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MousePointerClick className="text-green-600" size={20} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Total Clicks</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{totalClicks}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="text-purple-600" size={20} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Avg Clicks</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{avgClicks}</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <BarChart3 className="text-orange-600" size={20} />
                    </div>
                    <p className="text-slate-600 text-sm font-medium">Active URLs</p>
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{activeUrls}</p>
                </div>
              </div>

              {/* Charts Section */}
              {urls.length > 0 ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Click Analytics</h2>
                    <AnalyticsChart urls={urls} />
                  </div>

                  {/* Top Performing URL */}
                  {mostClickedUrl && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h2 className="text-xl font-bold text-slate-800 mb-4">Top Performing URL</h2>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                              {mostClickedUrl.shortCode}
                            </span>
                            <span className="text-sm font-semibold text-green-600">
                              {mostClickedUrl.clicks} clicks
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 truncate">
                            {mostClickedUrl.originalUrl}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <BarChart3 size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Analytics Data</h3>
                  <p className="text-slate-600 mb-6">Create some URLs to see analytics</p>
                </div>
              )}
            </>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
