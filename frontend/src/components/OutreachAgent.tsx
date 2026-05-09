import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { Send, MessageSquare, ShieldCheck, Zap, Copy, Users } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import type { OutreachData } from '../types';

interface OutreachAgentProps {
    data: OutreachData | null;
    isLoading: boolean;
}

interface BuyerProfile {
    id: string;
    username: string;
    phone: string;
}

const OutreachAgent: React.FC<OutreachAgentProps> = ({ data, isLoading }) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'formal' | 'casual'>('formal');
    const [formalText, setFormalText] = useState('');
    const [casualText, setCasualText] = useState('');
    const [buyers, setBuyers] = useState<BuyerProfile[]>([]);
    const [selectedBuyerId, setSelectedBuyerId] = useState('');
    const [loadingBuyers, setLoadingBuyers] = useState(false);

    useEffect(() => {
        const fetchBuyers = async () => {
            setLoadingBuyers(true);
            try {
                const { data: dbBuyers, error } = await supabase
                    .from('profiles')
                    .select('id, username, phone')
                    .eq('role', 'buyer');

                if (!error && dbBuyers && dbBuyers.length > 0) {
                    // Map profiles and handle null phones nicely
                    const formatted = dbBuyers.map((b: any) => ({
                        id: b.id,
                        username: b.username || 'Buyer Baru',
                        phone: b.phone || localStorage.getItem('juragan_ai_phone_' + b.id) || ''
                    }));
                    setBuyers(formatted);
                    if (formatted.length > 0) {
                        setSelectedBuyerId(formatted[0].id);
                    }
                } else {
                    const demoBuyers = [
                        { id: 'b1', username: 'Resto Sunda Nikmat', phone: '628123456789' },
                        { id: 'b2', username: 'Katering Bunda Sehat', phone: '6282123456789' },
                        { id: 'b3', username: 'Hotel Grand Royal Bandung', phone: '6285712345678' }
                    ];
                    setBuyers(demoBuyers);
                    setSelectedBuyerId(demoBuyers[0].id);
                }
            } catch (err) {
                console.error('Error fetching buyers for outreach:', err);
                const demoBuyers = [
                    { id: 'b1', username: 'Resto Sunda Nikmat', phone: '628123456789' },
                    { id: 'b2', username: 'Katering Bunda Sehat', phone: '6282123456789' },
                    { id: 'b3', username: 'Hotel Grand Royal Bandung', phone: '6285712345678' }
                ];
                setBuyers(demoBuyers);
                setSelectedBuyerId(demoBuyers[0].id);
            } finally {
                setLoadingBuyers(false);
            }
        };

        fetchBuyers();
    }, []);

    useEffect(() => {
        if (data) {
            setFormalText(data.formal_draft || '');
            setCasualText(data.casual_draft || '');
        } else {
            const seller = user?.username || 'Juragan';
            const biz = (user as any)?.business_name || 'Usaha Tani';
            setFormalText(`Yth. Bapak/Ibu Pimpinan,\n\nPerkenalkan saya ${seller} dari ${biz}. Kami adalah mitra penyedia komoditas pertanian premium yang terintegrasi di platform Juragan AI.\n\nKami menawarkan komoditas segar berkualitas tinggi dengan harga bersaing langsung dari lahan kami. Apakah kami dapat mengirimkan daftar harga dan mendiskusikan kebutuhan pasokan Anda?\n\nHormat kami,\n${seller}`);
            setCasualText(`Halo Kak!\n\nPerkenalkan saya ${seller} dari ${biz}. Mau nawarin komoditas pertanian fresh yang baru banget dipanen nih, kualitas super dan harganya bersahabat langsung dari petani.\n\nKira-kira lagi ada kebutuhan pasokan minggu ini kak? Silakan tanya-tanya detail atau nego harga di sini ya! 😊`);
        }
    }, [data, user]);

    if (isLoading) {
        return (
            <GlassCard className="h-full">
                <div className="animate-pulse space-y-6">
                    <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-48 bg-slate-200 rounded-xl"></div>
                    <div className="h-10 bg-slate-200 rounded-full"></div>
                </div>
            </GlassCard>
        );
    }

    const currentText = activeTab === 'formal' ? formalText : casualText;
    const setCurrentText = activeTab === 'formal' ? setFormalText : setCasualText;
    const activeBuyer = buyers.find(b => b.id === selectedBuyerId) || buyers[0];

    const handleSendWA = () => {
        let buyerPhone = activeBuyer?.phone || '6282123456789';

        // Sanitize phone number
        let cleanPhone = buyerPhone.replace(/[^0-9]/g, '');
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '62' + cleanPhone.slice(1);
        }

        window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(currentText)}`, '_blank');
    };

    const handleCopy = () => {
        void navigator.clipboard.writeText(currentText);
        alert('Teks berhasil disalin ke clipboard!');
    };

    return (
        <GlassCard className="h-full flex flex-col p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="text-emerald-500" size={20} />
                        AI Dynamic Outreach & Penawaran
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Kirim penawaran personal tertarget ke calon Buyer.</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 self-start sm:self-center">
                    <ShieldCheck size={12} />
                    SECURITY: {data?.security_status || 'SECURE'}
                </div>
            </div>

            {/* Buyer Selector */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    <Users size={14} className="text-slate-400" />
                    Pilih Target Buyer:
                </label>
                <select
                    value={selectedBuyerId}
                    onChange={e => setSelectedBuyerId(e.target.value)}
                    disabled={loadingBuyers}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                >
                    {buyers.map(b => (
                        <option key={b.id} value={b.id}>
                            {b.username} ({b.phone ? `+${b.phone}` : 'No. HP belum diisi'})
                        </option>
                    ))}
                </select>
            </div>

            {/* Tab Selectors */}
            <div className="flex p-1 bg-slate-100 rounded-lg">
                <button 
                    onClick={() => setActiveTab('formal')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        activeTab === 'formal' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Target: Korporasi / Swasta (Formal)
                </button>
                <button 
                    onClick={() => setActiveTab('casual')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                        activeTab === 'casual' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Target: Katering / UMKM (Casual)
                </button>
            </div>

            {/* Editable Text Area */}
            <div className="flex-1 flex flex-col relative">
                <textarea
                    value={currentText}
                    onChange={e => setCurrentText(e.target.value)}
                    className="w-full min-h-[160px] flex-1 bg-slate-50 hover:bg-slate-50/50 focus:bg-white border border-slate-100 focus:border-emerald-300 rounded-xl p-4 text-sm text-slate-700 leading-relaxed outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                    placeholder="Tulis pesan penawaran Anda..."
                />
                <button 
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white hover:text-emerald-500 text-slate-400 rounded-lg shadow-sm hover:shadow transition-all border border-slate-100"
                    onClick={handleCopy}
                    title="Salin Teks"
                >
                    <Copy size={14} />
                </button>
            </div>

            {/* Micro-learning Tips */}
            <div className="bg-emerald-50/50 border border-emerald-100/60 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-700 mb-1">
                    <Zap size={14} />
                    MSME MICRO-LEARNING & PACKING TIPS
                </div>
                <p className="text-xs text-emerald-600 italic">
                    "{data?.packing_tip || 'Gunakan keranjang kayu berlubang untuk sirkulasi optimal agar komoditas tidak mudah membusuk di jalan.'}"
                </p>
            </div>

            {/* Submit Button */}
            <button 
                onClick={handleSendWA}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 hover:shadow-emerald-200 active:scale-95 text-sm"
            >
                <Send size={16} />
                Kirim Penawaran ke {activeBuyer?.username || 'WhatsApp'}
            </button>
        </GlassCard>
    );
};

export default OutreachAgent;
