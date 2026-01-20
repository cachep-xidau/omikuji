import React from 'react';
import { Sparkles } from 'lucide-react';

const ReflectionCard = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm relative overflow-hidden my-2">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white rounded-full shadow-sm text-purple-600">
                    <Sparkles size={14} fill="currentColor" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    The Mirror • {data.topic}
                </span>
            </div>

            {/* Content */}
            <p className="text-gray-700 text-sm font-medium leading-relaxed font-serif italic">
                "{data.suggestion}"
            </p>
        </div>
    );
};

export default ReflectionCard;
