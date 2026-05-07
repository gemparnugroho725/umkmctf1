import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    TrendingUp, Truck, MessageSquare, ArrowRight, ShieldCheck, Zap, 
    Activity, Users, CheckCircle, ChevronDown, Award, Globe, HelpCircle, 
    MapPin, ChevronLeft, ChevronRight, Check, Star, ShieldAlert, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PromoBannersStrip from '../features/cms/components/PromoBannersStrip';

// -------------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------------

// Beautiful Kawung Batik Geometric Pattern SVG
const BatikKawungPattern: React.FC<{ className?: string }> = ({ className = 'opacity-[0.03]' }) => (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="batik-kawung" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M30,0 C20,15 20,45 30,60 C40,45 40,15 30,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M0,30 C15,20 45,20 60,30 C45,40 15,40 0,30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="30" cy="30" r="4" fill="currentColor" />
                <circle cx="0" cy="0" r="1.5" fill="currentColor" />
                <circle cx="60" cy="0" r="1.5" fill="currentColor" />
                <circle cx="0" cy="60" r="1.5" fill="currentColor" />
                <circle cx="60" cy="60" r="1.5" fill="currentColor" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-kawung)" />
    </svg>
);

// High-Fidelity Interactive Indonesian Logistics Node Map SVG
const IndonesianLogisticsMap: React.FC = () => (
    <svg viewBox="0 0 820 420" className="w-full h-full opacity-45 drop-shadow-[0_4px_12px_rgba(16,185,129,0.05)]" xmlns="http://www.w3.org/2000/svg">
        {/* Curved animated logistics connections */}
        <path d="M 150 180 Q 215 230 280 280" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,6" className="animate-[dash_12s_linear_infinite]" />
        <path d="M 320 150 Q 300 215 280 280" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,6" className="animate-[dash_10s_linear_infinite]" />
        <path d="M 440 160 Q 360 220 280 280" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,6" className="animate-[dash_8s_linear_infinite]" />
        <path d="M 440 160 Q 520 180 600 200" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,6" className="animate-[dash_14s_linear_infinite]" />
        <path d="M 320 150 Q 235 165 150 180" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6,6" className="animate-[dash_9s_linear_infinite]" />

        {/* Pulsing signal nodes along paths */}
        <circle r="4" fill="#f59e0b">
            <animateMotion dur="7s" repeatCount="indefinite" path="M 150 180 Q 215 230 280 280" />
        </circle>
        <circle r="4" fill="#10b981">
            <animateMotion dur="5s" repeatCount="indefinite" path="M 440 160 Q 360 220 280 280" />
        </circle>
        <circle r="4" fill="#10b981">
            <animateMotion dur="8s" repeatCount="indefinite" path="M 320 150 Q 300 215 280 280" />
        </circle>
        <circle r="4" fill="#f59e0b">
            <animateMotion dur="6s" repeatCount="indefinite" path="M 320 150 Q 235 165 150 180" />
        </circle>

        {/* SUMATERA */}
        <g transform="translate(150, 180)" className="cursor-pointer group">
            <circle r="12" fill="#10b981" className="opacity-20 group-hover:scale-150 transition-all duration-300" />
            <circle r="12" fill="#10b981" className="opacity-10 animate-ping" />
            <circle r="6" fill="#16a34a" />
            <text y="-16" textAnchor="middle" fill="#475569" className="text-[10px] font-black tracking-wider uppercase font-sans">Sumatera</text>
        </g>

        {/* JAVA (Main Hub) */}
        <g transform="translate(280, 280)" className="cursor-pointer group">
            <circle r="18" fill="#10b981" className="opacity-25 group-hover:scale-150 transition-all duration-300" />
            <circle r="18" fill="#10b981" className="opacity-15 animate-ping" />
            <circle r="9" fill="#15803d" />
            <circle r="4" fill="#f59e0b" />
            <text y="24" textAnchor="middle" fill="#0f172a" className="text-[11px] font-black tracking-widest uppercase font-sans">Jawa (HQ Hub)</text>
        </g>

        {/* KALIMANTAN */}
        <g transform="translate(320, 150)" className="cursor-pointer group">
            <circle r="12" fill="#10b981" className="opacity-20 group-hover:scale-150 transition-all duration-300" />
            <circle r="12" fill="#10b981" className="opacity-10 animate-ping" />
            <circle r="6" fill="#16a34a" />
            <text y="-16" textAnchor="middle" fill="#475569" className="text-[10px] font-black tracking-wider uppercase font-sans">Kalimantan</text>
        </g>

        {/* SULAWESI */}
        <g transform="translate(440, 160)" className="cursor-pointer group">
            <circle r="12" fill="#10b981" className="opacity-20 group-hover:scale-150 transition-all duration-300" />
            <circle r="12" fill="#10b981" className="opacity-10 animate-ping" />
            <circle r="6" fill="#16a34a" />
            <text y="-16" textAnchor="middle" fill="#475569" className="text-[10px] font-black tracking-wider uppercase font-sans">Sulawesi</text>
        </g>

        {/* PAPUA */}
        <g transform="translate(600, 200)" className="cursor-pointer group">
            <circle r="12" fill="#f59e0b" className="opacity-20 group-hover:scale-150 transition-all duration-300" />
            <circle r="12" fill="#f59e0b" className="opacity-10 animate-ping" />
            <circle r="6" fill="#f59e0b" />
            <text y="-16" textAnchor="middle" fill="#475569" className="text-[10px] font-black tracking-wider uppercase font-sans">Papua</text>
        </g>
    </svg>
);

// -------------------------------------------------------------
// MAIN LANDING PAGE COMPONENT
// -------------------------------------------------------------
const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Testimonial States
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    // FAQ Accordion States (indexes of opened questions)
    const [openedFaq, setOpenedFaq] = useState<number[]>([0]);

    const toggleFaq = (index: number) => {
        if (openedFaq.includes(index)) {
            setOpenedFaq(openedFaq.filter(i => i !== index));
        } else {
            setOpenedFaq([...openedFaq, index]);
        }
    };

    const goToApp = () =>
        navigate(user?.role === 'admin' ? '/admin' : user?.role === 'seller' ? '/dashboard' : '/buyer-marketplace');

    const testimonials = [
        {
            quote: "Semenjak menggunakan DirectRoute AI, hasil panen cabai saya dikirim langsung ke jaringan restoran besar di Semarang. Harga jual kami naik 2.4 kali lipat dibanding lewat tengkulak lokal!",
            author: "Pak Budi Sutrisno",
            role: "Petani Cabai & Ketua Gapoktan",
            region: "Boyolali, Jawa Tengah",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            tag: "Petani Lokal"
        },
        {
            quote: "Pemesanan bahan sayur untuk katering kami sekarang transparan, terjadwal, dan harganya sangat stabil karena langsung terhubung ke lahan pertanian tanpa biaya perantara gelap.",
            author: "Ibu Amalia Siregar",
            role: "Owner Katering 'Pondok Rasa'",
            region: "Jakarta Selatan",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            tag: "UMKM Kuliner"
        },
        {
            quote: "Optimasi rute logistik cerdas dan pooling muatan membantu armada truk kami menghemat konsumsi BBM hingga 35% tiap minggunya. Penjadwalan juga otomatis dibuat oleh AI.",
            author: "Hendra Wijaya",
            role: "Kepala Operasional Logistik",
            region: "Surabaya, Jawa Timur",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            rating: 5,
            tag: "Mitra Transportasi"
        }
    ];

    const faqs = [
        {
            q: "Bagaimana cara DirectRoute AI memotong rantai distribusi tengkulak?",
            a: "Sistem kami menghubungkan produsen tani dan UMKM secara langsung ke pembeli skala besar (hotel, restoran, katering, ritel) melalui algoritma optimasi pasar cerdas. Hal ini mengeliminasi biaya marjin perantara gelap, meningkatkan profit tani secara signifikan, sekaligus memberikan harga terbaik bagi pembeli."
        },
        {
            q: "Apakah aplikasi ini mudah digunakan oleh petani tradisional di pelosok daerah?",
            a: "Sangat mudah. Kami menyadari tantangan literasi digital, oleh karena itu kami menyediakan integrasi WhatsApp Bot AI khusus. Petani hanya perlu mengirim pesan WhatsApp berisi foto hasil panen dan perkiraan berat, dan AI kami otomatis memproses tawaran, merapikan deskripsi, serta memasarkannya ke database pembeli."
        },
        {
            q: "Bagaimana kecerdasan buatan (AI) menentukan harga pangan secara real-time?",
            a: "AI DirectRoute memindai dan menganalisis database harga pangan nasional, pasar induk regional, serta tren pasokan pasar ritel setiap detiknya. Dengan memperhitungkan faktor cuaca, biaya logistik aktual, dan perkiraan demand, AI kami merumuskan harga rekomendasi yang adil, stabil, serta transparan bagi kedua belah pihak."
        },
        {
            q: "Bagaimana rute pengiriman dan logistik bersama diatur?",
            a: "Sistem logistik cerdas kami menganalisis muatan beberapa UMKM di wilayah geografis terdekat yang memiliki tujuan pengiriman searah. Melalui algoritma 'Pooling Rute', sistem menjadwalkan satu armada truk logistik bersama untuk mengangkut muatan gabungan secara terjadwal, memotong emisi karbon serta menghemat biaya distribusi hingga 30%+."
        }
    ];

    return (
        <div className="min-h-screen font-sans text-slate-900 bg-[#F8FAF7] relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-950">
            {/* Global Decorative Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                {/* Thin Modern Tech Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4ebe2_1px,transparent_1px),linear-gradient(to_bottom,#e4ebe2_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-60" />
                
                {/* Kawung Batik Layer */}
                <BatikKawungPattern className="opacity-[0.025]" />

                {/* Soft Earthy Indonesian Orbs */}
                <div className="absolute top-[-15%] left-[-10%] w-[60rem] h-[60rem] rounded-full bg-emerald-500/5 blur-[130px]" />
                <div className="absolute top-[35%] right-[-15%] w-[50rem] h-[50rem] rounded-full bg-amber-500/5 blur-[110px]" />
                <div className="absolute bottom-[15%] left-[-5%] w-[55rem] h-[55rem] rounded-full bg-teal-500/5 blur-[140px]" />
            </div>

            <div className="relative z-10">
                {/* -------------------------------------------------------------
                    1. STICKY GLASSMORPHIC NAVBAR
                ------------------------------------------------------------- */}
                <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-[#F8FAF7]/80 border-b border-slate-200/50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        {/* Logo Block */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-forest-700 p-[1.5px] shadow-md shadow-emerald-600/10 flex items-center justify-center">
                                <img
                                    src="/logo.jpg"
                                    alt="DirectRoute AI"
                                    className="w-full h-full rounded-[10px] object-contain bg-white"
                                />
                            </div>
                            <span className="text-xl font-black tracking-tight text-slate-900">
                                DirectRoute <span className="text-emerald-600">AI</span>
                            </span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#tentang" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">Tentang</a>
                            <a href="#fitur" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">Fitur Bento</a>
                            <a href="#cara-kerja" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">Cara Kerja</a>
                            <a href="#dampak" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">Dampak Sosial</a>
                            <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors">FAQ</a>
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={goToApp}
                                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
                                >
                                    {user?.role === 'admin' ? 'Akses Admin' : 'Akses Dashboard'}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors px-4 py-2"
                                    >
                                        Masuk
                                    </button>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
                                    >
                                        Coba Gratis
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Hamburger Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-slate-200/60 bg-[#F8FAF7] px-6 py-6 space-y-4 shadow-lg animate-[slideUp_0.3s_ease-out]">
                            <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-emerald-700">Tentang</a>
                            <a href="#fitur" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-emerald-700">Fitur Bento</a>
                            <a href="#cara-kerja" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-emerald-700">Cara Kerja</a>
                            <a href="#dampak" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-emerald-700">Dampak Sosial</a>
                            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold text-slate-700 hover:text-emerald-700">FAQ</a>
                            
                            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <button
                                        onClick={() => { setMobileMenuOpen(false); goToApp(); }}
                                        className="w-full py-3 bg-emerald-600 text-white rounded-xl text-center font-bold"
                                    >
                                        Akses Dashboard
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                                            className="w-full py-3 border border-slate-200 text-slate-700 rounded-xl text-center font-bold"
                                        >
                                            Masuk
                                        </button>
                                        <button
                                            onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                                            className="w-full py-3 bg-emerald-600 text-white rounded-xl text-center font-bold shadow-md shadow-emerald-600/20"
                                        >
                                            Coba Gratis
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* -------------------------------------------------------------
                    2. CINEMATIC HERO SECTION
                ------------------------------------------------------------- */}
                <section className="pt-36 pb-20 px-6 relative" id="tentang">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* HERO LEFT - TEXT AND VALUE PROPOSITION */}
                        <div className="lg:col-span-7 space-y-8 animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)]">
                            {/* Accent Tag */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 border border-emerald-200/60 rounded-full text-emerald-800 text-xs font-black uppercase tracking-wider shadow-sm">
                                <Award size={14} className="text-amber-500 animate-[float_4s_ease-in-out_infinite]" /> 
                                Pelopor Rantai Pasok AI di Indonesia
                            </div>

                            {/* Massive Headline */}
                            <h1 className="text-5xl lg:text-7.5xl font-black leading-[1.05] tracking-tight text-slate-900">
                                Potong Rantai Distribusi,<br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 font-black">
                                    Berdayakan UMKM Indonesia.
                                    <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-amber-400 opacity-60 rounded-full" />
                                </span>
                            </h1>

                            {/* Supporting text */}
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                Hubungkan langsung petani lokal dan produsen UMKM ke jaringan restoran, hotel, dan katering besar secara transparan. Didukung oleh optimasi logistik rute logis, AI pricing pasar, serta sistem bot WhatsApp pintar.
                            </p>

                            {/* CTA Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-600/25 cursor-pointer group"
                                >
                                    Mulai Sekarang 
                                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/buyer-marketplace')}
                                    className="px-8 py-4 bg-white/80 backdrop-blur-md border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-sm cursor-pointer"
                                >
                                    Jelajahi Demo Marketplace
                                </button>
                            </div>

                            {/* Social Proof Row */}
                            <div className="pt-4 border-t border-slate-200/60 max-w-xl">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Dipercaya dari berbagai daerah:</p>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-60">
                                    <span className="text-sm font-black text-slate-700 flex items-center gap-1.5"><MapPin size={14} /> Boyolali Tani</span>
                                    <span className="text-sm font-black text-slate-700 flex items-center gap-1.5"><MapPin size={14} /> Gapoktan Kopeng</span>
                                    <span className="text-sm font-black text-slate-700 flex items-center gap-1.5"><MapPin size={14} /> UMKM Kuliner Solo</span>
                                    <span className="text-sm font-black text-slate-700 flex items-center gap-1.5"><MapPin size={14} /> Katering Jabar</span>
                                </div>
                            </div>
                        </div>

                        {/* HERO RIGHT - MODERN MOCKUP WITH FLOATING CARDS */}
                        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
                            
                            {/* Main Frame Mockup Container */}
                            <div className="bg-white border-2 border-slate-100 p-4 lg:p-5 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative z-10 w-full max-w-md hover:scale-[1.01] transition-transform duration-500">
                                <div className="bg-slate-50 border border-slate-100 rounded-[1.8rem] overflow-hidden aspect-[16/11] relative">
                                    <img
                                        src="https://rricoid-assets.obs.ap-southeast-4.myhuaweicloud.com/berita/Media-Fake-Digital.gif"
                                        alt="Platform Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/logo.jpg";
                                        }}
                                    />
                                    {/* Scanning Overlay Effect */}
                                    <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent top-0 animate-[shimmer_3s_infinite_linear]" />
                                </div>
                                <div className="mt-4 flex items-center justify-between px-2">
                                    <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                                        <Activity size={16} className="text-emerald-500 animate-pulse" />
                                        <span>DirectRoute Logistics Node AI</span>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                                        Realtime Optimization
                                    </span>
                                </div>
                            </div>

                            {/* FLOATING GLASS CARD 1: HARGA NAIK */}
                            <div className="absolute top-[8%] left-[-8%] z-20 bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center gap-3.5 animate-[float_6s_ease-in-out_infinite]">
                                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20">
                                    +140%
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Harga Tani Naik</div>
                                    <div className="text-sm font-black text-slate-800">Tanpa Tengkulak</div>
                                </div>
                            </div>

                            {/* FLOATING GLASS CARD 2: WHATSAPP BOT */}
                            <div className="absolute bottom-[20%] right-[-10%] z-20 bg-white/95 backdrop-blur-md border border-emerald-100 p-4 rounded-2xl shadow-lg shadow-emerald-950/5 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_1s]">
                                <div className="w-9 h-9 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black shadow-sm">
                                    WA
                                </div>
                                <div>
                                    <div className="text-xs font-black text-slate-800">WhatsApp AI Bot</div>
                                    <div className="text-[10px] text-emerald-600 font-bold">1-Klik Tani Upload</div>
                                </div>
                            </div>

                            {/* FLOATING GLASS CARD 3: LOGISTICS POOLING */}
                            <div className="absolute bottom-[-5%] left-[5%] z-20 bg-white/90 backdrop-blur-md border border-slate-100 p-3 px-4 rounded-2xl shadow-md shadow-slate-200/40 flex items-center gap-3 animate-[float_7s_ease-in-out_infinite_2s]">
                                <Truck size={18} className="text-amber-500" />
                                <div className="text-xs font-extrabold text-slate-800">30% Hemat Pengiriman</div>
                            </div>

                            {/* Background Glow Ring */}
                            <div className="absolute top-[20%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[70px] pointer-events-none" />
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    3. TRUST SECTION (PARTNERS & METRICS)
                ------------------------------------------------------------- */}
                <section className="py-12 bg-white border-y border-slate-200/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            
                            {/* Partner Info */}
                            <div className="lg:col-span-4 text-center lg:text-left space-y-1.5">
                                <h3 className="text-lg font-black text-slate-800">Kredibilitas & Dampak Nyata</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Membantu distribusi pangan Indonesia lebih efisien</p>
                            </div>

                            {/* Premium Metric Grid */}
                            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">30%+</div>
                                    <div className="text-xs font-extrabold text-slate-500 uppercase mt-1">Hemat Logistik</div>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">2.4x</div>
                                    <div className="text-xs font-extrabold text-slate-500 uppercase mt-1">Laba Petani</div>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">1-Klik</div>
                                    <div className="text-xs font-extrabold text-slate-500 uppercase mt-1">Outreach AI</div>
                                </div>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">98%</div>
                                    <div className="text-xs font-extrabold text-slate-500 uppercase mt-1">Akurasi Harga</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    4. FEATURES SECTION (MODERN BENTO GRID)
                ------------------------------------------------------------- */}
                <section className="py-20 px-6 relative" id="fitur">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100/50">
                                Alur Kerja Agentic AI
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                                Fitur Pintar <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Bento Box AI</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-lg">
                                Dirancang khusus untuk memodernisasi rantai pasok dengan kepintaran teknologi AI terbaru.
                            </p>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            
                            {/* Card 1: Harga Real-time (Col Span 7) */}
                            <div className="md:col-span-7 bg-white border border-slate-150 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group flex flex-col justify-between overflow-hidden relative">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                                <div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <TrendingUp size={22} />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Analisis Harga Pasar Real-time</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                                        AI memantau fluktuasi harga komoditas pangan dari pasar induk regional secara real-time. Memperkirakan deviasi harga pasar ritel vs tengkulak guna menjamin harga jual transparan.
                                    </p>
                                </div>
                                
                                {/* Micro Interactive Graphic - Chart Comparison */}
                                <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-end justify-between gap-2 aspect-[4/1]">
                                    <div className="w-1/4 h-1/2 bg-slate-200 rounded-lg relative group-hover:bg-slate-300 transition-all"><span className="absolute -top-6 left-0 right-0 text-[10px] font-bold text-center text-slate-400">Tengkulak</span></div>
                                    <div className="w-1/4 h-2/3 bg-slate-200 rounded-lg relative group-hover:bg-slate-300 transition-all"><span className="absolute -top-6 left-0 right-0 text-[10px] font-bold text-center text-slate-400">Pasar Ritel</span></div>
                                    <div className="w-1/4 h-[95%] bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-lg relative animate-pulse"><span className="absolute -top-6 left-0 right-0 text-[10px] font-extrabold text-center text-emerald-600">DirectRoute</span></div>
                                </div>
                            </div>

                            {/* Card 2: Logistik Cerdas (Col Span 5) */}
                            <div className="md:col-span-5 bg-white border border-slate-150 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group flex flex-col justify-between overflow-hidden">
                                <div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <Truck size={22} />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Pooling Logistik Cerdas</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Algoritma khusus menggabungkan muatan sayur/panen dari beberapa petani terdekat yang searah untuk diantar satu truk bersama. Memotong biaya kirim hingga 30%.
                                    </p>
                                </div>
                                
                                {/* Micro Graphic - Logistics Line Routing */}
                                <div className="mt-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                        <span>Rute Pengiriman Cerdas</span>
                                        <span className="text-emerald-600 animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" /> Active</span>
                                    </div>
                                    <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden flex items-center px-2">
                                        <div className="absolute left-0 top-0 h-full bg-emerald-100 w-[70%] transition-all" />
                                        <Truck size={14} className="text-emerald-600 relative z-10 animate-[float_4s_ease-in-out_infinite]" />
                                        <span className="text-[9px] font-extrabold text-emerald-700 relative z-10 ml-auto">Kapasitas Truk: 70%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Outreach Otomatis (Col Span 5) */}
                            <div className="md:col-span-5 bg-white border border-slate-150 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group flex flex-col justify-between overflow-hidden">
                                <div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <MessageSquare size={22} />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">AI Outreach Satu Klik</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        Menghemat waktu Anda. AI menyusun penulisan draf penawaran kerja sama persentase harga diskon untuk mitra restoran, kemudian mengirimkannya via WhatsApp dalam satu klik saja.
                                    </p>
                                </div>
                                
                                {/* Micro Graphic - Proposal Typing Mockup */}
                                <div className="mt-8 bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">WhatsApp Auto-Draf AI</div>
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-[11px] font-semibold text-slate-700">
                                        "Halo Resto Segar, berikut pasokan cabai segar Gapoktan Boyolali..."
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: AI Fraud Detection (Col Span 7) */}
                            <div className="md:col-span-7 bg-white border border-slate-150 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group flex flex-col justify-between overflow-hidden relative">
                                <div className="absolute right-0 bottom-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
                                <div>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                        <ShieldCheck size={22} />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Deteksi Fraud Transaksi AI</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                                        Sistem kami mendeteksi dini jika ada transaksi palsu atau pola manipulasi pengiriman oleh perantara gelap. Melindungi kredibilitas dan keamanan finansial petani.
                                    </p>
                                </div>
                                
                                {/* Micro Graphic - Fraud Scanner Verification */}
                                <div className="mt-8 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                        <span className="text-xs font-black text-slate-700">Transaksi Cabai Super: ID #0192</span>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle size={10} /> Verified Secure
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    5. HOW IT WORKS (TIMELINE WORKFLOW)
                ------------------------------------------------------------- */}
                <section className="py-20 bg-slate-50/70 border-y border-slate-200/50 px-6 relative" id="cara-kerja">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50">
                                Workflow Cerdas
                            </span>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                                Bagaimana DirectRoute AI Bekerja?
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Proses integrasi cepat dan efisien yang menghubungkan ladang tani langsung ke meja saji.
                            </p>
                        </div>

                        {/* Interactive Timeline Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                            {/* Horizontal line divider for Desktop */}
                            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald-100 via-amber-100 to-emerald-100 z-0" />

                            {/* Step 1 */}
                            <div className="relative z-10 space-y-4 group text-center md:text-left">
                                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform mx-auto md:mx-0">
                                    01
                                </div>
                                <h4 className="text-lg font-black text-slate-900">Petani Upload Hasil</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Petani mendaftarkan komoditas lewat WhatsApp Bot AI dengan foto dan rincian kuantitas secara instan.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative z-10 space-y-4 group text-center md:text-left">
                                <div className="w-14 h-14 bg-white border-2 border-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform mx-auto md:mx-0">
                                    02
                                </div>
                                <h4 className="text-lg font-black text-slate-900">AI Analisis Harga</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Sistem memproses data harga pasar induk regional untuk merumuskan harga pasar adil real-time.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative z-10 space-y-4 group text-center md:text-left">
                                <div className="w-14 h-14 bg-white border-2 border-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform mx-auto md:mx-0">
                                    03
                                </div>
                                <h4 className="text-lg font-black text-slate-900">Pooling Rute Truk</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Algoritma mengumpulkan pesanan dari wilayah serupa, menjadwalkan truk pooling searah guna hemat biaya logistik.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative z-10 space-y-4 group text-center md:text-left">
                                <div className="w-14 h-14 bg-white border-2 border-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform mx-auto md:mx-0">
                                    04
                                </div>
                                <h4 className="text-lg font-black text-slate-900">Outreach Cepat</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Mengirimkan draft penawaran digital otomatis lewat integrasi WhatsApp ke klien restoran/kuliner terdekat.
                                </p>
                            </div>

                            {/* Step 5 */}
                            <div className="relative z-10 space-y-4 group text-center md:text-left">
                                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform mx-auto md:mx-0">
                                    05
                                </div>
                                <h4 className="text-lg font-black text-slate-900">Kirim & Terima</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Penerima melacak truk secara realtime. Dana dirilis instan setelah barang lolos inspeksi penerimaan.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    6. INDONESIAN IMPACT (EMOTIONAL IMPACT MAP)
                ------------------------------------------------------------- */}
                <section className="py-20 px-6 relative bg-white overflow-hidden" id="dampak">
                    {/* Tiny Batik Pattern Overlay */}
                    <BatikKawungPattern className="opacity-[0.015]" />

                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Left Text Block */}
                            <div className="lg:col-span-5 space-y-6">
                                <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 rounded-full px-3.5 py-1 border border-amber-200">
                                    Pemberdayaan Sosial
                                </span>
                                <h2 className="text-4xl font-extrabold text-slate-950 leading-tight">
                                    Teknologi AI untuk Kedaulatan & Pemerataan Pangan
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    Misi utama DirectRoute AI bukan hanya sekadar optimalisasi bisnis, tetapi menyalurkan keadilan ekonomi bagi petani pejuang pangan Indonesia. Dengan memutus sistem rantai logistik monopoli, kita mewujudkan pemerataan ekonomi digital dari desa hingga perkotaan.
                                </p>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5 border border-emerald-100">
                                            <Check size={12} className="stroke-[3]" />
                                        </div>
                                        <div>
                                            <h5 className="font-extrabold text-slate-900 text-sm">Sertifikasi & Kemitraan Adil</h5>
                                            <p className="text-xs text-slate-500">Membantu kelompok tani terverifikasi mendapatkan kemitraan korporasi jangka panjang.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-0.5 border border-emerald-100">
                                            <Check size={12} className="stroke-[3]" />
                                        </div>
                                        <div>
                                            <h5 className="font-extrabold text-slate-900 text-sm">Pemberantasan Kartel Monopoli</h5>
                                            <p className="text-xs text-slate-500">Keterbukaan harga pangan pasar ritel langsung demi mencegah manipulasi harga sepihak.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Animated Interactive Logistics Node Map */}
                            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-inner relative flex flex-col items-center">
                                <div className="absolute top-4 left-4 bg-white border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    Logistics Map Nusantara
                                </div>
                                <IndonesianLogisticsMap />
                                <div className="mt-2 text-center text-xs font-bold text-slate-400">
                                    Peta visual sebaran titik pasokan sayur & logistics hub cerdas Nusantara
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    7. PREMIUM SECURITY SECTION (DARK MODE)
                ------------------------------------------------------------- */}
                <section className="py-24 px-6 bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-950 text-white relative overflow-hidden">
                    {/* Background Blueprints */}
                    <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:3rem_3rem] opacity-35" />
                    <BatikKawungPattern className="opacity-[0.015]" />

                    {/* Gradient Soft Rings */}
                    <div className="absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Security Left Shield Graphic */}
                            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                                <div className="w-56 h-56 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-[float_6s_ease-in-out_infinite]">
                                    <div className="w-40 h-40 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                            <ShieldCheck size={48} className="text-emerald-400 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                                {/* Scanning line */}
                                <div className="absolute top-[10%] w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[shimmer_4s_infinite_linear]" />
                            </div>

                            {/* Security Right Specs */}
                            <div className="lg:col-span-7 space-y-8">
                                <div className="space-y-3">
                                    <span className="text-xs font-black uppercase tracking-widest text-emerald-300 bg-emerald-900/50 border border-emerald-700/50 px-3.5 py-1 rounded-full">
                                        Keamanan & Proteksi Siber
                                    </span>
                                    <h3 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                                        Keamanan Finansial Petani & Transaksi Terenkripsi
                                    </h3>
                                    <p className="text-emerald-100/70 text-sm leading-relaxed max-w-xl">
                                        Kami menggunakan sistem deteksi anomali fraud berbasis AI mutakhir untuk melacak aktivitas manipulasi harga, perantara tidak berizin, serta menjamin seluruh alur dana aman.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                        <ShieldCheck size={24} className="text-emerald-400 mb-3" />
                                        <h5 className="font-extrabold text-white text-base mb-1.5">End-to-End Encryption</h5>
                                        <p className="text-xs text-emerald-200/60 leading-relaxed">Semua komunikasi kesepakatan harga bot WhatsApp dienkripsi penuh.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                        <Activity size={24} className="text-emerald-400 mb-3" />
                                        <h5 className="font-extrabold text-white text-base mb-1.5">Real-time Monitoring</h5>
                                        <p className="text-xs text-emerald-200/60 leading-relaxed">Pemantauan titik GPS armada logistik dan pelacakan muatan secara kontinu.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                        <ShieldAlert size={24} className="text-amber-400 mb-3" />
                                        <h5 className="font-extrabold text-white text-base mb-1.5">AI Fraud Scanner</h5>
                                        <p className="text-xs text-emerald-200/60 leading-relaxed">Deteksi otomatis kesepakatan harga mencurigakan di luar ketentuan.</p>
                                    </div>
                                    <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                        <CheckCircle size={24} className="text-emerald-400 mb-3" />
                                        <h5 className="font-extrabold text-white text-base mb-1.5">Escrow Dana Aman</h5>
                                        <p className="text-xs text-emerald-200/60 leading-relaxed">Dana aman dalam rekening bersama, baru dirilis setelah barang diterima sesuai spesifikasi.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    8. TESTIMONIAL CAROUSEL
                ------------------------------------------------------------- */}
                <section className="py-20 bg-white border-b border-slate-200/50 px-6">
                    <div className="max-w-5xl mx-auto">
                        
                        {/* Title block */}
                        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100/50">
                                Cerita Sukses Mitra
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                Testimonial Pengguna Nyata
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Bagikan kebahagiaan mereka yang sudah memotong jalur perantara bersama kami.
                            </p>
                        </div>

                        {/* Interactive Slide Container */}
                        <div className="bg-slate-50 border border-slate-150 p-8 lg:p-12 rounded-3xl shadow-sm relative overflow-hidden">
                            
                            {/* Quotes icon background decorative */}
                            <span className="absolute right-8 top-4 text-slate-200/40 text-[10rem] font-serif leading-none select-none pointer-events-none">“</span>

                            {/* Quote Content */}
                            <div className="space-y-6 relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-amber-400 stroke-amber-400" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-lg lg:text-xl font-medium text-slate-700 italic leading-relaxed">
                                    "{testimonials[activeTestimonial].quote}"
                                </p>

                                {/* Profile info */}
                                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                                    <img
                                        src={testimonials[activeTestimonial].avatar}
                                        alt={testimonials[activeTestimonial].author}
                                        className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-inner"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-slate-900 text-base">{testimonials[activeTestimonial].author}</span>
                                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                <CheckCircle size={10} /> Terverifikasi
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-bold mt-0.5">
                                            {testimonials[activeTestimonial].role} &middot; <span className="text-slate-400">{testimonials[activeTestimonial].region}</span>
                                        </p>
                                    </div>
                                    
                                    {/* Tag Badge */}
                                    <span className="ml-auto hidden sm:inline-block text-xs font-black text-slate-400 bg-white border border-slate-200/80 px-3 py-1 rounded-full">
                                        {testimonials[activeTestimonial].tag}
                                    </span>
                                </div>
                            </div>

                            {/* Carousel Navigation Buttons */}
                            <div className="flex items-center justify-end gap-3 mt-6 relative z-20">
                                <button 
                                    onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
                                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                                    aria-label="Previous Testimonial"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button 
                                    onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
                                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                                    aria-label="Next Testimonial"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    9. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
                ------------------------------------------------------------- */}
                <section className="py-20 bg-slate-50/70 border-b border-slate-200/50 px-6" id="faq">
                    <div className="max-w-4xl mx-auto">
                        
                        {/* FAQ Header */}
                        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100/50">
                                Tanya Jawab Umum
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                FAQ DirectRoute AI
                            </h2>
                            <p className="text-slate-500 font-medium text-sm">
                                Temukan jawaban cepat mengenai keunggulan, penggunaan, dan teknologi logistik DirectRoute.
                            </p>
                        </div>

                        {/* Accordion List */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const isOpened = openedFaq.includes(index);
                                return (
                                    <div 
                                        key={index} 
                                        className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                                    >
                                        {/* Question row */}
                                        <button 
                                            onClick={() => toggleFaq(index)}
                                            className="w-full p-5 lg:p-6 text-left flex items-center justify-between font-black text-slate-900 hover:text-emerald-700 transition-colors gap-4"
                                        >
                                            <span className="text-base flex items-center gap-3">
                                                <HelpCircle size={18} className="text-emerald-500 flex-shrink-0" />
                                                {faq.q}
                                            </span>
                                            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isOpened ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Answer row */}
                                        {isOpened && (
                                            <div className="px-5 pb-6 lg:px-6 lg:pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-50/50 pt-4 animate-[slideUp_0.25s_ease-out]">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </section>

                {/* -------------------------------------------------------------
                    10. IMMERSIVE GRAND GRADIENT FINAL CTA
                ------------------------------------------------------------- */}
                <section className="py-24 px-6 relative bg-gradient-to-tr from-emerald-900 via-emerald-950 to-slate-950 text-white overflow-hidden text-center">
                    
                    {/* Glowing map backdrop */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2rem_2rem]" />
                    <BatikKawungPattern className="opacity-[0.012]" />

                    {/* Gradient shapes */}
                    <div className="absolute bottom-[-10%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

                    <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                        <span className="inline-block text-xs font-black text-emerald-300 bg-emerald-800/60 border border-emerald-700/50 rounded-full px-4 py-1.5 uppercase tracking-widest animate-pulse">
                            Ciptakan Perubahan Bersama Kami
                        </span>
                        
                        <h2 className="text-4xl lg:text-5.5xl font-black tracking-tight leading-tight">
                            Siap Merevolusi Rantai Pasok Pangan Indonesia?
                        </h2>
                        
                        <p className="text-emerald-100/70 text-sm lg:text-base leading-relaxed max-w-xl mx-auto">
                            Mari pangkas tengkulak nakal, tingkatkan kemakmuran petani kita, dan nikmati sistem distribusi logistik pangan transparan berbasis kecerdasan buatan.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-950 hover:bg-slate-50 rounded-2xl font-black text-base shadow-xl shadow-black/10 transition-transform hover:scale-[1.01]"
                            >
                                Coba Demo Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/buyer-marketplace')}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/25 hover:bg-white/5 rounded-2xl font-black text-base transition-transform hover:scale-[1.01]"
                            >
                                Hubungi Tim Kami
                            </button>
                        </div>
                    </div>
                </section>

                {/* -------------------------------------------------------------
                    11. FOOTER (MULTI-COLUMN AND DETAILED LINKS)
                ------------------------------------------------------------- */}
                <footer className="pt-16 pb-12 bg-[#F8FAF7] border-t border-slate-200/70 px-6">
                    <div className="max-w-7xl mx-auto">
                        
                        {/* Upper row: Multi-Column layout */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-200/60">
                            
                            {/* Brand col */}
                            <div className="col-span-2 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 p-[1px] shadow-sm flex-shrink-0">
                                        <img
                                            src="/logo.jpg"
                                            alt="DirectRoute AI"
                                            className="w-full h-full rounded-[7px] object-contain bg-white"
                                        />
                                    </div>
                                    <span className="text-lg font-black text-slate-900">DirectRoute AI</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                                    Platform teknologi kecerdasan buatan pionir yang menghubungkan produsen pertanian lokal secara langsung ke pasar nasional.
                                </p>
                                <div className="text-xs font-bold text-slate-400">
                                    "Dibangun untuk masa depan rantai pasok Indonesia."
                                </div>
                            </div>

                            {/* Products col */}
                            <div className="space-y-3">
                                <h5 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Produk</h5>
                                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                                    <li><a href="#fitur" className="hover:text-emerald-700 transition-colors">Harga Pasar AI</a></li>
                                    <li><a href="#fitur" className="hover:text-emerald-700 transition-colors">Pooling Logistik</a></li>
                                    <li><a href="#fitur" className="hover:text-emerald-700 transition-colors">WhatsApp AI Bot</a></li>
                                    <li><a href="#fitur" className="hover:text-emerald-700 transition-colors">Secure Payment Escrow</a></li>
                                </ul>
                            </div>

                            {/* Company col */}
                            <div className="space-y-3">
                                <h5 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Perusahaan</h5>
                                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                                    <li><a href="#tentang" className="hover:text-emerald-700 transition-colors">Tentang Kami</a></li>
                                    <li><a href="#dampak" className="hover:text-emerald-700 transition-colors">Dampak Sosial</a></li>
                                    <li><span className="text-slate-400 cursor-not-allowed">Karir (Hiring)</span></li>
                                    <li><span className="text-slate-400 cursor-not-allowed">Press Kit</span></li>
                                </ul>
                            </div>

                            {/* Contact & Socials col */}
                            <div className="space-y-3">
                                <h5 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest">Kontak & Media</h5>
                                <ul className="space-y-2 text-xs font-semibold text-slate-600">
                                    <li><span className="text-slate-500">support@directroute.ai</span></li>
                                    <li><span className="text-slate-500">+62 821-2345-6789</span></li>
                                    <li><span className="text-slate-500">DKI Jakarta, Indonesia</span></li>
                                </ul>
                            </div>

                        </div>

                        {/* Lower row: copyright, standards */}
                        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
                            <p>&copy; 2026 DirectRoute AI. Seluruh hak cipta dilindungi undang-undang.</p>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 px-3.5 py-1.5 rounded-full shadow-inner">
                                <Users size={14} className="text-emerald-500" />
                                <span>Keadilan Sosial Bagi Seluruh Petani Indonesia</span>
                            </div>
                        </div>

                    </div>
                </footer>

            </div>
        </div>
    );
};

export default LandingPage;
