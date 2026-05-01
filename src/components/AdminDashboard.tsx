import React, { useState, useEffect } from 'react';
import { getRestaurantData, updateRestaurantData, RestaurantData, MenuItem, Reservation } from '../services/dataService';
import { 
  LogOut, Save, Plus, Trash2, X, LayoutDashboard, Utensils, 
  Image as ImageIcon, BookOpen, MessageSquare, Clock, Check, AlertCircle, Trash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'identity' | 'gastronomy' | 'gallery' | 'story' | 'reservations' | 'reviews' | 'hours';

export default function AdminDashboard() {
  const [data, setData] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<Tab>('identity');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getRestaurantData();
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid data format received');
      }
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
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

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    if (!data) return;
    const newReservations = data.reservations.map(r => r.id === id ? { ...r, status } : r);
    setData({ ...data, reservations: newReservations });
  };

  const deleteReservation = (id: string) => {
    if (!data) return;
    const newReservations = data.reservations.filter(r => r.id !== id);
    setData({ ...data, reservations: newReservations });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#141414] text-[#B6915E]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#B6915E]/20 border-t-[#B6915E] rounded-full animate-spin" />
        <p className="font-serif italic">Loading Sanctuary Data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-[#141414] text-[#F5F1EA] flex-col gap-6 text-center p-6">
      <AlertCircle className="w-16 h-16 text-red-500/50" />
      <div>
        <h2 className="text-2xl font-serif mb-2">Connection Severed</h2>
        <p className="text-[#F5F1EA]/60">{error}</p>
      </div>
      <a href="/admin/login" className="px-8 py-3 bg-[#B6915E] text-[#141414] rounded-full font-bold uppercase tracking-widest text-xs">Re-authenticate</a>
    </div>
  );

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F1EA] font-sans flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#1E3328] border-r border-[#B6915E]/10 flex flex-col shrink-0">
        <div className="p-8 border-b border-[#B6915E]/10">
          <h1 className="font-serif text-2xl text-[#B6915E]">Treehouse</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B6915E]/50 mt-1">Management Suite</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem active={activeTab === 'identity'} icon={LayoutDashboard} label="Brand Identity" onClick={() => setActiveTab('identity')} />
          <NavItem active={activeTab === 'gastronomy'} icon={Utensils} label="Gastronomy" onClick={() => setActiveTab('gastronomy')} />
          <NavItem active={activeTab === 'gallery'} icon={ImageIcon} label="Visual Assets" onClick={() => setActiveTab('gallery')} />
          <NavItem active={activeTab === 'story'} icon={BookOpen} label="Our Story" onClick={() => setActiveTab('story')} />
          <NavItem active={activeTab === 'reservations'} icon={Clock} label="Reservations" count={data.reservations.filter(r => r.status === 'pending').length} onClick={() => setActiveTab('reservations')} />
          <NavItem active={activeTab === 'reviews'} icon={MessageSquare} label="Patron Voices" onClick={() => setActiveTab('reviews')} />
          <NavItem active={activeTab === 'hours'} icon={Clock} label="Operating Hours" onClick={() => setActiveTab('hours')} />
        </nav>

        <div className="p-4 border-t border-[#B6915E]/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Suite</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-24 border-b border-[#B6915E]/10 px-12 flex justify-between items-center bg-[#141414]/80 backdrop-blur-md z-10">
          <div>
            <h2 className="text-xl font-serif text-[#F5F1EA] capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-xs text-[#F5F1EA]/40">Last synced: {new Date().toLocaleTimeString()}</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg ${
              saveStatus === 'success' ? 'bg-green-600' : 'bg-[#B6915E] text-[#141414] hover:bg-[#A07D4F] active:scale-95'
            }`}
          >
            <Save className="w-4 h-4" />
            {saveStatus === 'saving' ? 'Syncing...' : saveStatus === 'success' ? 'Synchronized!' : 'Commit Changes'}
          </button>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'identity' && (
                <div className="max-w-4xl space-y-12">
                   <Section title="Basic Information">
                      <div className="grid grid-cols-2 gap-8">
                        <Field label="Restaurant Name" value={data.name} onChange={v => setData({...data, name: v})} />
                        <Field label="Phone Number" value={data.phone} onChange={v => setData({...data, phone: v})} />
                        <div className="col-span-2">
                          <Field label="Physical Address" value={data.address} onChange={v => setData({...data, address: v})} />
                        </div>
                      </div>
                   </Section>

                   <Section title="Social Presence">
                      <div className="grid grid-cols-2 gap-8">
                        <Field label="Instagram URL" value={data.socials[0]} onChange={v => {
                           const s = [...data.socials]; s[0] = v; setData({...data, socials: s});
                        }} />
                        <Field label="Facebook URL" value={data.socials[1]} onChange={v => {
                           const s = [...data.socials]; s[1] = v; setData({...data, socials: s});
                        }} />
                      </div>
                   </Section>
                </div>
              )}

              {activeTab === 'gastronomy' && (
                <div className="max-w-4xl space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-sm text-[#F5F1EA]/60 italic">Manage your culinary offerings and pricing.</p>
                    <button 
                      onClick={() => setData({...data, menu: [...data.menu, { category: 'New Selection', items: [] }]})}
                      className="text-xs flex items-center gap-2 text-[#B6915E] bg-[#B6915E]/10 px-4 py-2 rounded-full hover:bg-[#B6915E]/20"
                    >
                      <Plus className="w-4 h-4" /> Add Category
                    </button>
                  </div>

                  {data.menu.map((cat, catIdx) => (
                    <div key={catIdx} className="bg-[#1E3328]/20 border border-[#B6915E]/10 rounded-2xl p-8 relative group">
                      <button 
                        onClick={() => setData({...data, menu: data.menu.filter((_, i) => i !== catIdx)})}
                        className="absolute top-6 right-6 text-red-500/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <input 
                        value={cat.category}
                        onChange={e => {
                          const newMenu = [...data.menu];
                          newMenu[catIdx].category = e.target.value;
                          setData({...data, menu: newMenu});
                        }}
                        className="bg-transparent text-2xl font-serif text-[#B6915E] mb-8 focus:outline-none border-b border-transparent focus:border-[#B6915E]/30 w-full max-w-md"
                      />

                      <div className="space-y-6">
                        {cat.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="grid grid-cols-12 gap-4 items-start bg-[#141414]/40 p-4 rounded-xl border border-white/5">
                            <div className="col-span-5">
                              <label className="text-[8px] uppercase tracking-widest text-[#B6915E]/40 mb-1 block">Item Name</label>
                              <input 
                                value={item.name}
                                onChange={e => {
                                  const newMenu = [...data.menu];
                                  newMenu[catIdx].items[itemIdx].name = e.target.value;
                                  setData({...data, menu: newMenu});
                                }}
                                className="w-full bg-transparent border-b border-white/10 p-1 text-sm outline-none focus:border-[#B6915E]"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-[8px] uppercase tracking-widest text-[#B6915E]/40 mb-1 block">Price</label>
                              <input 
                                value={item.price}
                                onChange={e => {
                                  const newMenu = [...data.menu];
                                  newMenu[catIdx].items[itemIdx].price = e.target.value;
                                  setData({...data, menu: newMenu});
                                }}
                                className="w-full bg-transparent border-b border-white/10 p-1 text-sm outline-none focus:border-[#B6915E] text-[#B6915E]"
                              />
                            </div>
                            <div className="col-span-4">
                               <label className="text-[8px] uppercase tracking-widest text-[#B6915E]/40 mb-1 block">Dietary/Tag</label>
                               <input 
                                value={item.dietary || ''}
                                placeholder="e.g. Signature, Spicy"
                                onChange={e => {
                                  const newMenu = [...data.menu];
                                  newMenu[catIdx].items[itemIdx].dietary = e.target.value;
                                  setData({...data, menu: newMenu});
                                }}
                                className="w-full bg-transparent border-b border-white/10 p-1 text-sm outline-none focus:border-[#B6915E] italic"
                              />
                            </div>
                            <div className="col-span-1 pt-4 text-right">
                              <button 
                                onClick={() => {
                                  const newMenu = [...data.menu];
                                  newMenu[catIdx].items = newMenu[catIdx].items.filter((_, i) => i !== itemIdx);
                                  setData({...data, menu: newMenu});
                                }}
                                className="text-red-500/20 hover:text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="col-span-12">
                              <label className="text-[8px] uppercase tracking-widest text-[#B6915E]/40 mb-1 block">Description</label>
                              <textarea 
                                value={item.description || ''}
                                onChange={e => {
                                  const newMenu = [...data.menu];
                                  newMenu[catIdx].items[itemIdx].description = e.target.value;
                                  setData({...data, menu: newMenu});
                                }}
                                className="w-full bg-transparent border-b border-white/10 p-1 text-xs outline-none focus:border-[#B6915E] resize-none h-12 text-[#F5F1EA]/60"
                              />
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newMenu = [...data.menu];
                            newMenu[catIdx].items.push({ name: '', price: '', description: '', dietary: '' });
                            setData({...data, menu: newMenu});
                          }}
                          className="text-[10px] uppercase tracking-widest text-[#B6915E]/60 hover:text-[#B6915E] flex items-center gap-2 mt-4"
                        >
                          <Plus className="w-4 h-4" /> Add Item to {cat.category}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="max-w-5xl space-y-8">
                   <div className="flex justify-between items-center mb-8">
                    <p className="text-sm text-[#F5F1EA]/60 italic">Manage your high-resolution visual portfolio.</p>
                    <button 
                      onClick={() => setData({...data, gallery: ['', ...data.gallery]})}
                      className="text-xs flex items-center gap-2 text-[#B6915E] bg-[#B6915E]/10 px-4 py-2 rounded-full hover:bg-[#B6915E]/20"
                    >
                      <Plus className="w-4 h-4" /> Add URL
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.gallery.map((url, i) => (
                      <div key={i} className="group relative aspect-video bg-[#1E3328]/20 border border-[#B6915E]/10 rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex-1 flex items-center justify-center p-4 bg-black/20">
                          {url ? (
                            <img src={url} alt="" className="max-h-full max-w-full object-contain" />
                          ) : (
                            <span className="text-[10px] uppercase tracking-widest text-white/20">Awaiting URL</span>
                          )}
                        </div>
                        <div className="p-4 bg-[#1E3328]/40 border-t border-[#B6915E]/10 flex gap-3">
                          <input 
                            value={url}
                            placeholder="https://..."
                            onChange={e => {
                              const newGallery = [...data.gallery];
                              newGallery[i] = e.target.value;
                              setData({...data, gallery: newGallery});
                            }}
                            className="flex-1 bg-transparent text-[10px] outline-none text-[#B6915E] truncate"
                          />
                          <button 
                            onClick={() => setData({...data, gallery: data.gallery.filter((_, idx) => idx !== i)})}
                            className="text-red-500/40 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="max-w-4xl space-y-8">
                   <Section title="Our Narrative">
                      <p className="text-xs text-[#F5F1EA]/40 mb-6 italic">This story appears on the About page. Keep it evocative and premium.</p>
                      <textarea 
                        value={data.story}
                        onChange={e => setData({...data, story: e.target.value})}
                        className="w-full bg-[#1E3328]/20 border border-[#B6915E]/10 rounded-2xl p-8 h-[400px] font-serif text-lg leading-relaxed outline-none focus:border-[#B6915E]/40"
                        placeholder="Once upon a time..."
                      />
                   </Section>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div className="max-w-5xl space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-sm text-[#F5F1EA]/60 italic">Track and manage guest requests in real-time.</p>
                  </div>

                  <div className="space-y-4">
                    {data.reservations.length === 0 ? (
                      <div className="py-20 text-center border border-dashed border-[#B6915E]/20 rounded-3xl">
                        <p className="text-white/20 font-serif italic text-xl">No requests yet under the canopy.</p>
                      </div>
                    ) : (
                      data.reservations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((res) => (
                        <div key={res.id} className="bg-[#1E3328]/10 border border-[#B6915E]/10 rounded-2xl p-6 flex flex-wrap gap-8 items-center justify-between group">
                          <div className="flex gap-6 items-center">
                            <div className="w-12 h-12 bg-[#B6915E]/10 rounded-full flex items-center justify-center text-[#B6915E] font-serif text-lg">
                              {res.guests}
                            </div>
                            <div>
                              <h4 className="font-serif text-lg text-[#B6915E]">{res.name}</h4>
                              <p className="text-xs text-white/40">{res.email} • {res.phone}</p>
                            </div>
                          </div>

                          <div className="flex gap-8 items-center">
                            <div className="text-center">
                              <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Date</span>
                              <span className="text-sm">{res.date}</span>
                            </div>
                            <div className="text-center">
                              <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Time</span>
                              <span className="text-sm">{res.time}</span>
                            </div>
                            <div className="text-center min-w-[80px]">
                              <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Status</span>
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                                res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                                res.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {res.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {res.status === 'pending' && (
                              <>
                                <button onClick={() => updateReservationStatus(res.id, 'confirmed')} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                                  <Check className="w-4 h-4" />
                                </button>
                                <button onClick={() => updateReservationStatus(res.id, 'cancelled')} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button onClick={() => deleteReservation(res.id)} className="p-2 bg-white/5 text-white/20 rounded-lg hover:bg-white/10 hover:text-white/60">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="max-w-4xl space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <p className="text-sm text-[#F5F1EA]/60 italic">Curate the voices of your satisfied patrons.</p>
                    <button 
                      onClick={() => setData({...data, reviews: [...data.reviews, '']})}
                      className="text-xs flex items-center gap-2 text-[#B6915E] bg-[#B6915E]/10 px-4 py-2 rounded-full hover:bg-[#B6915E]/20"
                    >
                      <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {data.reviews.map((rev, i) => (
                      <div key={i} className="bg-[#1E3328]/10 border border-[#B6915E]/10 rounded-2xl p-6 flex gap-6 items-start group">
                         <MessageSquare className="w-6 h-6 text-[#B6915E]/40 shrink-0" />
                         <textarea 
                           value={rev}
                           onChange={e => {
                             const r = [...data.reviews]; r[i] = e.target.value; setData({...data, reviews: r});
                           }}
                           className="flex-1 bg-transparent text-sm leading-relaxed outline-none focus:text-[#B6915E] resize-none h-24"
                           placeholder="Enter testimonial text..."
                         />
                         <button 
                           onClick={() => setData({...data, reviews: data.reviews.filter((_, idx) => idx !== i)})}
                           className="text-red-500/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'hours' && (
                <div className="max-w-2xl space-y-6">
                   <Section title="Syncing with Time">
                      <div className="space-y-4">
                        {Object.entries(data.hours).map(([day, hours]) => (
                          <div key={day} className="flex items-center justify-between bg-[#1E3328]/10 p-5 rounded-2xl border border-[#B6915E]/5">
                            <span className="font-serif text-[#B6915E]">{day}</span>
                            <input 
                              value={hours}
                              onChange={e => setData({...data, hours: {...data.hours, [day]: e.target.value}})}
                              className="bg-transparent text-right text-sm text-[#F5F1EA]/60 outline-none focus:text-[#B6915E] focus:font-bold transition-all"
                            />
                          </div>
                        ))}
                      </div>
                   </Section>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick, count }: { active: boolean, icon: any, label: string, onClick: () => void, count?: number }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between w-full p-4 rounded-xl transition-all ${
        active ? 'bg-[#B6915E] text-[#141414] shadow-lg' : 'text-[#F5F1EA]/60 hover:bg-white/5 hover:text-[#F5F1EA]'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-[#141414] text-[#B6915E]' : 'bg-[#B6915E] text-[#141414]'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#B6915E] border-b border-[#B6915E]/10 pb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[8px] uppercase tracking-widest text-[#F5F1EA]/30 mb-2">{label}</label>
      <input 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#1E3328]/20 border border-[#B6915E]/10 p-4 rounded-xl focus:border-[#B6915E]/40 focus:bg-[#1E3328]/40 outline-none transition-all text-sm"
      />
    </div>
  );
}
