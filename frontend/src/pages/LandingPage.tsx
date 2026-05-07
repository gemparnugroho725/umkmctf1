import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Truck, MessageSquare, ArrowRight, ShieldCheck, Zap, Activity, Users, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import PromoBannersStrip from '../features/cms/components/PromoBannersStrip';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const goToApp = () =>
        navigate(user?.role === 'admin' ? '/admin' : user?.role === 'seller' ? '/dashboard' : '/buyer-marketplace');

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-white relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
            {/* Decorative Background Grid & Soft Glowing Blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                {/* Clean Light Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
                
                {/* Soft Abstract Glowing Lights */}
                <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute top-[25%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-teal-500/5 blur-[100px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[45rem] h-[45rem] rounded-full bg-emerald-400/5 blur-[120px]" />
            </div>

            <div className="relative z-10">
                {/* Navbar */}
                <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-slate-100 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="/logo.jpg"
                                    alt="DirectRoute AI"
                                    className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-100 shadow-sm"
                                />
                                <span className="text-xl font-black tracking-tight text-slate-900">
                                    DirectRoute <span className="text-emerald-600">AI</span>
                                </span>
                            </div>

                            {/* CTAs */}
                            <div>
                                {isAuthenticated ? (
                                    <button
                                        onClick={goToApp}
                                        className="text-sm font-black text-emerald-700 hover:text-emerald-800 transition-colors px-4 py-2 bg-emerald-50 rounded-xl hover:bg-emerald-100 border border-emerald-100/50"
                                    >
                                        {user?.role === 'admin'
                                            ? 'Masuk Admin'
                                            : user?.role === 'seller'
                                              ? 'Masuk Dashboard'
                                              : 'Masuk Marketplace'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-sm font-black text-emerald-700 hover:text-emerald-800 transition-colors px-4 py-2 bg-emerald-50 rounded-xl hover:bg-emerald-100 border border-emerald-100/50"
                                    >
                                        Masuk Sekarang
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-36 pb-16 px-6 relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Text Box */}
                        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-xl shadow-slate-100 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-100/50">
                                <Zap size={14} className="animate-pulse" /> Agentic Supply Chain Platform
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900">
                                Potong Rantai Distribusi, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                    Berdayakan UMKM.
                                </span>
                            </h1>

                            <p className="text-base text-slate-600 max-w-lg leading-relaxed">
                                Platform cerdas berbasis AI untuk membantu petani dan UMKM Indonesia menghindari tengkulak. Dapatkan harga terbaik, rute logistik terefisiensi, dan akses pembeli langsung secara otomatis.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                {isAuthenticated ? (
                                    <button
                                        onClick={goToApp}
                                        className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20"
                                    >
                                        Akses Platform <ArrowRight size={20} />
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-600/20"
                                        >
                                            Mulai Sekarang <ArrowRight size={20} />
                                        </button>
                                        <button
                                            onClick={() => navigate('/buyer-marketplace')}
                                            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-black border border-slate-200 transition-all shadow-sm"
                                        >
                                            Jelajahi Demo
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Core Statistics Bar - Highly Informative */}
                            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
                                <div>
                                    <div className="text-3xl font-black text-emerald-600">30%+</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Hemat Logistik</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-emerald-600">2.4x</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Laba Petani</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-emerald-600">1-Klik</div>
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">AI WhatsApp</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Preview Card */}
                        <div className="relative">
                            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xl shadow-slate-100 relative z-10">
                                <img
                                    src="https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Media-Fake-Digital.gif"
                                    alt="Platform Preview"
                                    className="w-full rounded-2xl shadow-sm object-cover aspect-[16/10] bg-slate-50 border border-slate-100"
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        const img = e.currentTarget;
                                        if (!img.dataset.fallback) {
                                            img.dataset.fallback = '1';
                                            img.src = '/logo.jpg';
                                            return;
                                        }
                                        img.style.display = 'none';
                                    }}
                                />
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                        <Activity size={16} className="text-emerald-500" />
                                        <span>DirectRoute Logistics AI Dashboard</span>
                                    </div>
                                    <div className="text-xs font-black text-emerald-700 bg-emerald-50 rounded-full px-3 py-1 border border-emerald-100">
                                        Live Demo
                                    </div>
                                </div>
                            </div>
                            
                            {/* Accent decorative shapes */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20 pointer-events-none" />
                        </div>
                    </div>
                </section>

                {/* Promo strip Section */}
                <section className="pb-10 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-4 shadow-md shadow-slate-100/50">
                            <PromoBannersStrip />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Features Title */}
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-100/50">
                                Alur Kerja Agentic AI
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                                Fitur Unggulan DirectRoute
                            </h2>
                            <p className="text-slate-500 font-medium mt-3 text-lg leading-relaxed">
                                Otomatisasi cerdas dari hulu ke hilir yang siap membantu pertumbuhan bisnis UMKM dan kesejahteraan petani.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 group relative overflow-hidden">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                    <TrendingUp size={26} />
                                </div>
                                <h4 className="text-xl font-extrabold text-slate-950 mb-3 group-hover:text-emerald-700 transition-colors">Harga Real-time</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    AI menganalisis tren harga pasar eceran vs tengkulak secara harian, memberikan rekomendasi harga jual paling adil dan optimal bagi para petani.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 group relative overflow-hidden">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                    <Truck size={26} />
                                </div>
                                <h4 className="text-xl font-extrabold text-slate-950 mb-3 group-hover:text-emerald-700 transition-colors">Logistik Cerdas</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Pooling rute pengiriman otomatis berbasis kapasitas armada dan prioritas ketahanan barang pangan (perishable) untuk memotong biaya logistik.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-md shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 group relative overflow-hidden">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                                    <MessageSquare size={26} />
                                </div>
                                <h4 className="text-xl font-extrabold text-slate-950 mb-3 group-hover:text-emerald-700 transition-colors">Outreach Otomatis</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Penulisan pesan penawaran otomatis oleh AI yang sangat persuasif ditujukan ke hotel, restoran, dan katering dengan opsi pengiriman WhatsApp sekali klik.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security & Staging Call To Action */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                        {/* Security Box */}
                        <div className="bg-white border border-slate-100 p-8 lg:p-10 rounded-3xl shadow-xl shadow-slate-100 flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-4 border border-emerald-100/50">
                                    Keamanan Terjamin
                                </div>
                                <h3 className="text-3xl font-extrabold text-slate-950 mb-4">Aman & Terpercaya</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    DirectRoute AI dilengkapi dengan algoritma deteksi anomali real-time untuk mendeteksi potensi fraud/penipuan dalam komunikasi, transaksi, dan logistik.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                                    <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100/50 shadow-sm flex-shrink-0">
                                        <CheckCircle size={14} />
                                    </div>
                                    <span>AI Fraud Detection aktif menganalisis pesan & penawaran.</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-slate-800">
                                    <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100/50 shadow-sm flex-shrink-0">
                                        <CheckCircle size={14} />
                                    </div>
                                    <span>Enkripsi ujung-ke-ujung (End-to-End) data transaksi.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Premium Dark CTA Card for Contrast */}
                        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-emerald-950/20">
                            {/* Decorative Grid Overlays inside Dark Card */}
                            <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:2rem_2rem] opacity-30 pointer-events-none" />
                            <div className="absolute top-[-20%] right-[-10%] w-[25rem] h-[25rem] rounded-full bg-emerald-500/20 blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                <span className="inline-block text-xs font-bold text-emerald-300 uppercase tracking-widest bg-emerald-800/50 border border-emerald-700/50 rounded-full px-3 py-1 mb-4">
                                    CODE THE FUTURE 2026
                                </span>
                                <h3 className="text-3xl font-black mb-4 tracking-tight leading-tight">
                                    Siap Merevolusi Rantai Pasok UMKM Indonesia?
                                </h3>
                                <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm">
                                    Jadilah bagian dari ekosistem distribusi pangan masa depan. Mari potong tengkulak, bantu petani lokal, dan nikmati logistik transparan.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-8 w-full py-4 bg-white text-emerald-950 hover:bg-slate-100 rounded-2xl font-black transition-all hover:scale-[1.01] shadow-lg shadow-black/10 relative z-10"
                            >
                                Coba Demo Dashboard
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pb-14 px-6 text-center">
                    <div className="max-w-7xl mx-auto">
                        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-slate-400 text-sm font-medium">
                                &copy; 2026 DirectRoute AI. Dibuat untuk Kompetisi CODE THE FUTURE.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-4 py-1.5 shadow-inner">
                                <Users size={14} className="text-emerald-500" />
                                <span>Pemberdayaan Digital UMKM & Petani</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
