import React from 'react';
import { ChevronRight } from 'lucide-react';

const SettingsItem = ({ icon: Icon, label, value, toggle, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon size={20} className="text-gray-400" />}
                <span className="text-gray-900">{label}</span>
            </div>

            <div className="flex items-center gap-2">
                {value && <span className="text-gray-500 text-sm">{value}</span>}
                {toggle !== undefined ? (
                    <div className={`w-11 h-6 rounded-full p-1 transition-colors ${toggle ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${toggle ? 'translate-x-5' : ''}`}></div>
                    </div>
                ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                )}
            </div>
        </button>
    );
};

export default SettingsItem;
