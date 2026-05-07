import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Truck, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import PromoBannersStrip from '../features/cms/components/PromoBannersStrip';
import FrameSequenceBackground from '../components/FrameSequenceBackground';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const goToApp = () =>
        navigate(user?.role === 'admin' ? '/admin' : user?.role === 'seller' ? '/dashboard' : '/buyer-marketplace');

    return (
        <div className="min-h-screen font-sans text-slate-900 relative isolate">
            <FrameSequenceBackground
                className="z-0"
                showHud={false}
                respectReducedMotion={false}
                overlays={false}
                whiteOverlayOpacity={0.1}
            />

            <div className="relative z-10">
                {/* Navbar */}
                <nav className="fixed top-0 w-full z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="dr-glass rounded-2xl px-5 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/logo.jpg"
                                    alt="DirectRoute AI"
                                    className="w-9 h-9 rounded-xl object-contain bg-white/80 border border-white/40 shadow-sm"
                                />
                                <span className="text-xl font-black tracking-tight">
                                    DirectRoute <span className="text-emerald-600">AI</span>
                                </span>
                            </div>

                            {isAuthenticated ? (
                                <button
                                    onClick={goToApp}
                                    className="text-sm font-black text-emerald-700 hover:text-emerald-800 transition-colors"
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
                                    className="text-sm font-black text-emerald-700 hover:text-emerald-800 transition-colors"
                                >
                                    Masuk Sekarang
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 items-center">
                        <div className="dr-glass rounded-3xl p-8 border border-white/40 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 dr-glass rounded-full text-xs font-black uppercase tracking-wider text-emerald-700">
                                <Zap size={14} /> Agentic Supply Chain Platform
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black leading-tight drop-shadow-[0_2px_0_rgba(255,255,255,0.35)]">
                                Potong Rantai Distribusi, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                                    Berdayakan UMKM.
                                </span>
                            </h1>

                            <p className="text-lg text-slate-900/90 max-w-lg leading-relaxed drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]">
                                Platform cerdas berbasis AI untuk membantu petani dan UMKM Indonesia menghindari tengkulak. Dapatkan
                                harga terbaik, rute logistik terefisiensi, dan akses pembeli langsung secara otomatis.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {isAuthenticated ? (
                                    <button
                                        onClick={goToApp}
                                        className="px-8 py-4 dr-glass-strong text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:-translate-y-1 border border-white/50"
                                    >
                                        Akses Platform <ArrowRight size={20} />
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="px-8 py-4 dr-glass-strong text-slate-900 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:-translate-y-1 border border-white/50"
                                        >
                                            Mulai Sekarang <ArrowRight size={20} />
                                        </button>
                                        <button
                                            onClick={() => navigate('/buyer-marketplace')}
                                            className="px-8 py-4 dr-glass hover:dr-glass-strong text-slate-900 rounded-2xl font-black border border-white/40 transition-all"
                                        >
                                            Jelajahi Demo
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Promo strip */}
                <section className="pb-10 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="dr-glass rounded-3xl p-3">
                            <PromoBannersStrip />
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <div className="dr-glass inline-block rounded-3xl px-8 py-6 border border-white/40">
                                <h2 className="text-3xl font-black drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]">
                                    Fitur Utama DirectRoute
                                </h2>
                                <p className="text-slate-800/80 font-bold mt-2">
                                    Teknologi Agentic Workflow yang bekerja untuk Anda.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <GlassCard className="dr-glass hover:dr-glass-strong transition-all hover:-translate-y-1">
                                <TrendingUp className="text-emerald-700 mb-4" size={34} />
                                <h4 className="text-xl font-black mb-2">Harga Real-time</h4>
                                <p className="text-sm text-slate-700">
                                    AI menganalisis harga pasar eceran vs tengkulak untuk memberikan rekomendasi harga jual paling adil
                                    bagi petani.
                                </p>
                            </GlassCard>

                            <GlassCard className="dr-glass hover:dr-glass-strong transition-all hover:-translate-y-1">
                                <Truck className="text-emerald-700 mb-4" size={34} />
                                <h4 className="text-xl font-black mb-2">Logistik Cerdas</h4>
                                <p className="text-sm text-slate-700">
                                    Pooling rute otomatis berbasis kapasitas dan prioritas barang perishable untuk menekan biaya
                                    transportasi.
                                </p>
                            </GlassCard>

                            <GlassCard className="dr-glass hover:dr-glass-strong transition-all hover:-translate-y-1">
                                <MessageSquare className="text-emerald-700 mb-4" size={34} />
                                <h4 className="text-xl font-black mb-2">Outreach Otomatis</h4>
                                <p className="text-sm text-slate-700">
                                    Penulisan draf penawaran persuasif ke hotel, restoran, dan katering serta pengiriman via WhatsApp
                                    satu klik.
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* Security */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                        <GlassCard className="dr-glass p-8 rounded-3xl">
                            <h2 className="text-3xl font-black mb-4">Aman & Terpercaya</h2>
                            <p className="text-slate-700 mb-6">
                                Aplikasi dilengkapi dengan lapisan keamanan siber untuk mendeteksi potensi penipuan pada setiap transaksi
                                dan komunikasi.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm font-black text-slate-800">
                                    <ShieldCheck className="text-emerald-700" size={20} /> AI Fraud Detection pada pesan penawaran.
                                </li>
                                <li className="flex items-center gap-3 text-sm font-black text-slate-800">
                                    <ShieldCheck className="text-emerald-700" size={20} /> Enkripsi data transaksi real-time.
                                </li>
                            </ul>
                        </GlassCard>

                        <div className="dr-glass-dark rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/25 rounded-full blur-3xl" />
                            <div>
                                <h3 className="text-xl font-black mb-3">Siap untuk CODE THE FUTURE 2026?</h3>
                                <p className="text-emerald-100/85 text-sm">
                                    Jadilah bagian dari revolusi rantai pasok digital untuk UMKM Indonesia.
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-8 w-full py-3 bg-white/90 text-emerald-950 rounded-xl font-black hover:bg-white transition-all"
                            >
                                Coba Demo Dashboard
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pb-14 px-6 text-center">
                    <div className="max-w-7xl mx-auto">
                        <div className="dr-glass rounded-2xl py-6 px-6">
                            <p className="text-slate-700 text-sm">
                                &copy; 2026 DirectRoute AI. Dibuat untuk Kompetisi CODE THE FUTURE.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
