import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
    return (
        <div className={`dr-glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
