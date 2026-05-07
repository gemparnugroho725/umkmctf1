import React, { useRef, useEffect } from 'react';
import { Terminal, Download } from 'lucide-react';

import type { LogEntry } from '../types';

interface TerminalLoggerProps {
    logs: LogEntry[];
    onExport: () => void;
    className?: string;
    compact?: boolean;
}

const TerminalLogger: React.FC<TerminalLoggerProps> = ({ logs, onExport, className = '', compact = false }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'SUCCESS': return 'text-emerald-400';
            case 'ERROR': return 'text-red-400';
            case 'AI': return 'text-blue-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className={`bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-900 ${className}`}>
            <div className="bg-slate-900/60 px-4 py-2.5 flex items-center justify-between border-b border-slate-900">
                <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold">
                    <Terminal size={16} />
                    <span>Integration Logger (Proof of Integration)</span>
                </div>
                <button 
                    onClick={onExport}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                    <Download size={14} />
                    Export Log
                </button>
            </div>
            <div 
                ref={scrollRef}
                className={`p-4 overflow-y-auto font-mono text-xs leading-relaxed terminal-scrollbar ${compact ? 'h-56' : 'h-72'}`}
            >
                {logs.length === 0 ? (
                    <div className="text-slate-400 italic">Waiting for agentic actions...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="mb-1">
                            <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                            <span className={`font-bold ${getLevelColor(log.level)}`}>{log.level}:</span>{' '}
                            <span className="text-slate-200">{log.message}</span>
                            {log.payload && (
                                <details className="ml-4 mt-1">
                                    <summary className="text-slate-400 cursor-pointer hover:text-slate-200">View Details</summary>
                                    <pre className="bg-black/30 p-2 rounded-lg mt-1 text-slate-200/80 overflow-x-auto border border-white/5">
                                        {JSON.stringify(log.payload, null, 2)}
                                    </pre>
                                </details>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TerminalLogger;
