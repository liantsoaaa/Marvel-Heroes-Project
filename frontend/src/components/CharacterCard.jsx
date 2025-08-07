import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Edit3,
    Trash2,
    Zap,
    Shield,
    Globe,
    Star
} from 'lucide-react';

const CharacterCard = ({ character, onEdit, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 25 }
            }}
            className="group relative w-full min-h-[200px] mx-auto my-4 sm:my-6 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-xl overflow-hidden shadow-xl border border-slate-700/50 backdrop-blur-sm"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />

            <div className="absolute top-3 right-3 z-20">
                <motion.div
                    className="flex items-center gap-1 bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-sm text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold shadow-lg"
                    whileHover={{ scale: 1.1 }}
                >
                    <Zap size={10} className="sm:w-3 sm:h-3" />
                    <span>#{character.id}</span>
                </motion.div>
            </div>

            <div className="absolute top-3 left-3 z-20">
                <motion.div
                    className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Star size={10} />
                    HERO
                </motion.div>
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                        <Shield size={28} className="text-white" />
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-extrabold text-white tracking-wide truncate">
                        {character.name}
                    </h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-2 rounded-full" />
                </div>

                <div className="space-y-3 text-sm text-slate-300 font-medium">
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-amber-400" />
                        <span className="text-slate-400">Identité:</span>
                        <span className="text-white truncate font-semibold">{character.realName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe size={16} className="text-blue-400" />
                        <span className="text-slate-400">Univers:</span>
                        <span className="text-white truncate font-semibold">{character.universe}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-green-400 font-semibold">ACTIF</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-slate-700/30">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-xl font-bold text-xs transition-all shadow-lg"
                    >
                        <Edit3 size={14} />
                        Modifier
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white py-2 rounded-xl font-bold text-xs transition-all shadow-lg"
                    >
                        <Trash2 size={14} />
                        Supprimer
                    </motion.button>
                </div>
            </div>

            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                }}
                initial={{ x: '-100%', skewX: -45 }}
                whileHover={{
                    x: '100%',
                    transition: { duration: 0.8, ease: 'easeInOut' }
                }}
            />
        </motion.div>
    );
};

export default CharacterCard;