'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import EditUrlModal from '@/components/EditUrlModal';
import UrlFilters from '@/components/UrlFilters';
import Pagination from '@/components/Pagination';
import { DashboardSkeleton } from '@/components/LoadingSkeleton';
import Link from 'next/link';
import { Link as LinkIcon, Trash2, Edit, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUrl, setEditingUrl] = useState(null);
  
  // Filter & Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      toast.error('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    const result = await Swal.fire({
      title: 'Delete URL?',
      text: 'This action cannot be undone. Are you sure you want to delete this shortened URL?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/urls/${shortCode}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete URL');
      }

      setUrls(urls.filter(url => url.shortCode !== shortCode));
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'URL has been deleted successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: 'Failed to delete URL. Please try again.',
      });
    }
  };

  const handleEdit = async (shortCode, newOriginalUrl) => {
    const token = await user.getIdToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/urls/${shortCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ originalUrl: newOriginalUrl })
    });

    if (!response.ok) {
      throw new Error('Failed to update URL');
    }

    setUrls(urls.map(url => 
      url.shortCode === shortCode 
        ? { ...url, originalUrl: newOriginalUrl }
        : url
    ));
    
    toast.success('URL updated successfully!');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Filter, Sort, and Paginate URLs
  const filteredAndSortedUrls = useMemo(() => {
    let filtered = [...urls];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(url =>
        url.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Click filter
    if (filterBy === 'active') {
      filtered = filtered.filter(url => url.clicks > 0);
    } else if (filterBy === 'inactive') {
      filtered = filtered.filter(url => url.clicks === 0);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'most-clicks':
          return b.clicks - a.clicks;
        case 'least-clicks':
          return a.clicks - b.clicks;
        default:
          return 0;
      }
    });

    return filtered;
  }, [urls, searchTerm, sortBy, filterBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUrls.length / itemsPerPage);
  const paginatedUrls = filteredAndSortedUrls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, filterBy]);

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
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Short URLs</h1>
                <p className="text-slate-600">Manage all your shortened URLs</p>
              </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-slate-600 text-sm font-medium mb-1">Total URLs</p>
              <p className="text-3xl font-bold text-blue-600">{urls.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-slate-600 text-sm font-medium mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-green-600">
                {urls.reduce((sum, url) => sum + url.clicks, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-slate-600 text-sm font-medium mb-1">Avg Clicks</p>
              <p className="text-3xl font-bold text-purple-600">
                {urls.length > 0 ? Math.round(urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length) : 0}
              </p>
            </div>
          </div>

          {/* Create New Button */}
          <div className="mb-6">
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              <LinkIcon size={20} />
              Create New Short URL
            </Link>
          </div>

          {/* Search, Filter & Sort */}
          {urls.length > 0 && (
            <UrlFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          )}

          {/* URLs List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading your URLs...</p>
            </div>
          ) : urls.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <LinkIcon size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No URLs yet</h3>
              <p className="text-slate-600 mb-6">Create your first shortened URL to get started</p>
              <Link
                href="/dashboard/create"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Create Short URL
              </Link>
            </div>
          ) : filteredAndSortedUrls.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <LinkIcon size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No URLs found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {paginatedUrls.map((url) => (
                <div key={url._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 animate-slideDown">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                          {url.shortCode}
                        </span>
                        <span className="text-sm text-slate-500">
                          {url.clicks} clicks
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium mb-1 truncate">
                        {process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/{url.shortCode}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        → {url.originalUrl}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Created {new Date(url.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/${url.shortCode}`}
                        className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <BarChart3 size={16} />
                        Stats
                      </Link>
                      <button
                        onClick={() => setEditingUrl(url)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/${url.shortCode}`)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(url.shortCode)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
          )}
        </>
        )}
        </div>
      </DashboardLayout>

      {/* Edit Modal */}
      {editingUrl && (
        <EditUrlModal
          url={editingUrl}
          onClose={() => setEditingUrl(null)}
          onSave={handleEdit}
        />
      )}
    </ProtectedRoute>
  );
}
