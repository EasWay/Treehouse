import React, { useState, useEffect } from 'react';
import { getRestaurantData, updateRestaurantData, RestaurantData } from '../services/dataService';
import { LogOut, Save, Plus, Trash2, X } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      console.log('Fetching restaurant data...');
      const result = await getRestaurantData();
      console.log('Data received:', result);
      if (result && result.error) {
        throw new Error(result.error);
      }
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid data format received from server');
      }
      setData(result);
    } catch (err: any) {
      console.error('Fetch error:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. The server might be slow or unresponsive.');
      } else {
        setError(err.message || 'Failed to load data. Please login again.');
      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setSaveStatus('saving');
    try {
      await updateRestaurantData(data);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#141414] text-[#F5F1EA]">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen bg-[#141414] text-[#F5F1EA] flex-col gap-4">
    <p>{error}</p>
    <a href="/admin/login" className="px-6 py-2 bg-[#B6915E] text-[#141414] rounded">Go to Login</a>
  </div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F1EA] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1E3328] border-b border-[#B6915E]/20 p-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <h1 className="font-serif text-2xl text-[#B6915E]">Command Center</h1>
          <span className="text-[10px] uppercase tracking-widest bg-[#B6915E]/10 text-[#B6915E] px-2 py-1 rounded">Real-time DB</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`flex items-center gap-2 px-6 py-2 rounded font-bold transition-all ${
              saveStatus === 'success' ? 'bg-green-600' : 'bg-[#B6915E] text-[#141414] hover:bg-[#A07D4F]'
            }`}
          >
            <Save className="w-4 h-4" />
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Publish Changes'}
          </button>
          <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded transition-colors text-[#F5F1EA]/60 hover:text-[#F5F1EA]">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 space-y-12 pb-32">
        {/* Basic Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-serif text-[#B6915E] border-b border-white/10 pb-2">Business Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#F5F1EA]/40 mb-2">Restaurant Name</label>
              <input 
                value={data.name} 
                onChange={e => setData({...data, name: e.target.value})}
                className="w-full bg-[#1E3328] border border-[#B6915E]/20 p-3 rounded focus:border-[#B6915E] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#F5F1EA]/40 mb-2">Phone Number</label>
              <input 
                value={data.phone} 
                onChange={e => setData({...data, phone: e.target.value})}
                className="w-full bg-[#1E3328] border border-[#B6915E]/20 p-3 rounded focus:border-[#B6915E] outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-wider text-[#F5F1EA]/40 mb-2">Physical Address</label>
              <input 
                value={data.address} 
                onChange={e => setData({...data, address: e.target.value})}
                className="w-full bg-[#1E3328] border border-[#B6915E]/20 p-3 rounded focus:border-[#B6915E] outline-none"
              />
            </div>
          </div>
        </section>

        {/* Menu Editor */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h2 className="text-xl font-serif text-[#B6915E]">Gastronomy (Menu)</h2>
            <button 
              onClick={() => setData({...data, menu: [...data.menu, { category: 'New Category', items: [] }]})}
              className="text-xs flex items-center gap-1 text-[#B6915E] hover:underline"
            >
              <Plus className="w-3 h-3" /> Add Category
            </button>
          </div>
          
          <div className="space-y-8">
            {data.menu.map((cat, catIdx) => (
              <div key={catIdx} className="bg-[#1E3328]/40 border border-[#B6915E]/10 p-6 rounded-lg relative group">
                <button 
                  onClick={() => setData({...data, menu: data.menu.filter((_, i) => i !== catIdx)})}
                  className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <input 
                  value={cat.category}
                  onChange={e => {
                    const newMenu = [...data.menu];
                    newMenu[catIdx].category = e.target.value;
                    setData({...data, menu: newMenu});
                  }}
                  className="bg-transparent text-xl font-serif text-[#B6915E] mb-6 focus:border-b border-[#B6915E] outline-none w-full max-w-sm"
                />

                <div className="space-y-4">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-4 items-center">
                      <input 
                        value={item.name}
                        placeholder="Item name"
                        onChange={e => {
                          const newMenu = [...data.menu];
                          newMenu[catIdx].items[itemIdx].name = e.target.value;
                          setData({...data, menu: newMenu});
                        }}
                        className="flex-1 bg-[#141414] border border-white/5 p-2 rounded text-sm focus:border-[#B6915E]/50 outline-none"
                      />
                      <input 
                        value={item.price}
                        placeholder="Price"
                        onChange={e => {
                          const newMenu = [...data.menu];
                          newMenu[catIdx].items[itemIdx].price = e.target.value;
                          setData({...data, menu: newMenu});
                        }}
                        className="w-24 bg-[#141414] border border-white/5 p-2 rounded text-sm focus:border-[#B6915E]/50 outline-none text-[#B6915E]"
                      />
                      <button 
                        onClick={() => {
                          const newMenu = [...data.menu];
                          newMenu[catIdx].items = newMenu[catIdx].items.filter((_, i) => i !== itemIdx);
                          setData({...data, menu: newMenu});
                        }}
                        className="text-red-500/40 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newMenu = [...data.menu];
                      newMenu[catIdx].items.push({ name: '', price: '' });
                      setData({...data, menu: newMenu});
                    }}
                    className="text-[10px] uppercase tracking-widest text-[#B6915E]/60 hover:text-[#B6915E] flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Socials */}
        <section className="space-y-6">
          <h2 className="text-xl font-serif text-[#B6915E] border-b border-white/10 pb-2">Social Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#F5F1EA]/40 mb-2">Instagram (Full URL)</label>
              <input 
                value={data.socials[0]} 
                onChange={e => {
                  const newSocials = [...data.socials];
                  newSocials[0] = e.target.value;
                  setData({...data, socials: newSocials});
                }}
                className="w-full bg-[#1E3328] border border-[#B6915E]/20 p-3 rounded focus:border-[#B6915E] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#F5F1EA]/40 mb-2">Facebook (Full URL)</label>
              <input 
                value={data.socials[1]} 
                onChange={e => {
                  const newSocials = [...data.socials];
                  newSocials[1] = e.target.value;
                  setData({...data, socials: newSocials});
                }}
                className="w-full bg-[#1E3328] border border-[#B6915E]/20 p-3 rounded focus:border-[#B6915E] outline-none"
              />
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <h2 className="text-xl font-serif text-[#B6915E]">Visual Assets (Gallery URLs)</h2>
            <button 
              onClick={() => setData({...data, images: [...data.images, '']})}
              className="text-xs flex items-center gap-1 text-[#B6915E] hover:underline"
            >
              <Plus className="w-3 h-3" /> Add Image
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.images.map((img, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input 
                  value={img}
                  placeholder="Image URL"
                  onChange={e => {
                    const newImages = [...data.images];
                    newImages[i] = e.target.value;
                    setData({...data, images: newImages});
                  }}
                  className="flex-1 bg-[#1E3328] border border-[#B6915E]/10 p-3 rounded text-sm outline-none focus:border-[#B6915E]"
                />
                <button 
                  onClick={() => setData({...data, images: data.images.filter((_, idx) => idx !== i)})}
                  className="text-red-500/40 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Operating Hours */}
        <section className="space-y-6">
          <h2 className="text-xl font-serif text-[#B6915E] border-b border-white/10 pb-2">Patron Voices (Reviews)</h2>
          <div className="space-y-4">
            {data.reviews.map((rev, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#1E3328]/20 p-4 rounded border border-white/5">
                <textarea 
                  value={rev}
                  onChange={e => {
                    const newReviews = [...data.reviews];
                    newReviews[i] = e.target.value;
                    setData({...data, reviews: newReviews});
                  }}
                  className="flex-1 bg-transparent text-sm text-[#F5F1EA]/80 outline-none focus:text-[#B6915E] resize-none h-20"
                />
                <button 
                  onClick={() => setData({...data, reviews: data.reviews.filter((_, idx) => idx !== i)})}
                  className="text-red-500/40 hover:text-red-500 pt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button 
              onClick={() => setData({...data, reviews: [...data.reviews, '']})}
              className="text-[10px] uppercase tracking-widest text-[#B6915E]/60 hover:text-[#B6915E] flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Review
            </button>
          </div>
        </section>

        {/* Operating Hours */}
        <section className="space-y-6">
          <h2 className="text-xl font-serif text-[#B6915E] border-b border-white/10 pb-2">Operating Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between bg-[#1E3328]/20 p-3 rounded border border-white/5">
                <span className="text-sm font-medium w-24">{day}</span>
                <input 
                  value={hours}
                  onChange={e => setData({...data, hours: {...data.hours, [day]: e.target.value}})}
                  className="flex-1 bg-transparent text-right text-sm text-[#F5F1EA]/60 outline-none focus:text-[#B6915E]"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
