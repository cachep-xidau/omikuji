import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Save, Trash2 } from 'lucide-react';
import { useDiary } from '../data/DiaryContext';

const DiaryEntryScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { entries, addEntry, updateEntry, deleteEntry } = useDiary();

    const existingEntry = entries.find(e => e.id === id);
    const [content, setContent] = useState(existingEntry ? existingEntry.content : '');
    const [lastSaved, setLastSaved] = useState(null);

    // Auto-save simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (id && existingEntry && content !== existingEntry.content) {
                updateEntry(id, content);
                setLastSaved(new Date());
            }
        }, 3000); // 3 seconds debounce

        return () => clearTimeout(timer);
    }, [content, id, existingEntry, updateEntry]);

    const handleSave = () => {
        if (!content.trim()) return;

        if (id) {
            updateEntry(id, content);
        } else {
            addEntry(content);
        }
        navigate('/diary');
    };

    const handleDelete = () => {
        if (confirm("Permanently burn this entry?")) {
            if (id) deleteEntry(id);
            navigate('/diary');
        }
    };

    return (
        <div className="h-full flex flex-col pt-14 pb-8 px-6 relative bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                        {id ? 'Reflecting' : 'New Reflection'}
                    </span>
                    {lastSaved && (
                        <span className="text-[10px] text-green-600 font-medium">
                            Saved {lastSaved.toLocaleTimeString()}
                        </span>
                    )}
                </div>

                <button
                    onClick={handleSave}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all font-medium"
                >
                    <Save size={18} />
                </button>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind? The pages are locked..."
                    className="flex-1 w-full bg-transparent text-gray-900 text-lg leading-relaxed placeholder:text-gray-400 resize-none focus:outline-none scrollbar-hide"
                    autoFocus
                />

                <div className="absolute bottom-0 w-full flex justify-between items-center py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Lock size={12} />
                        <span>Encrypted & Local</span>
                    </div>

                    {id && (
                        <button
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-600 transition-colors p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiaryEntryScreen;
