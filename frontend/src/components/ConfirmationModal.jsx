import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    RefreshCw,
    User,
    Edit3,
    Trash2,
    ArrowLeft,
    Save,
    AlertTriangle,
    Zap,
    Shield,
    Globe
} from 'lucide-react';

// Composant ConfirmationModal corrigé
const ConfirmationModal = ({ character, onClose, onConfirm }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-700/50 w-full max-w-sm shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="text-center">
                            <div className="mx-auto bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Confirmer la suppression</h2>
                            <p className="text-slate-300 mb-6">
                                Êtes-vous sûr de vouloir supprimer{' '}
                                <span className="font-bold text-red-400">{character?.name}</span> ?
                                <br />
                                <span className="text-sm text-slate-400">Cette action est irréversible.</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <motion.button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Annuler
                            </motion.button>
                            <motion.button
                                onClick={onConfirm}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Supprimer
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;