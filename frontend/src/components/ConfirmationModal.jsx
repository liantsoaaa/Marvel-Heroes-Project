import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmationModal = ({ character, onClose, onConfirm }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
                >
                    <div className="p-6">
                        <div className="text-center">
                            <div className="mx-auto bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-5">
                                <FaExclamationTriangle className="h-8 w-8 text-red-500" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">Confirmation</h2>
                            <p className="text-gray-300 mb-6">
                                Voulez-vous vraiment supprimer <span className="font-semibold text-red-400">{character?.name}</span> ?
                            </p>

                            <p className="text-sm text-gray-500 mb-8">
                                Cette action est irréversible et supprimera définitivement le personnage.
                            </p>
                        </div>

                        <div className="flex justify-center gap-4">
                            <motion.button
                                onClick={onClose}
                                className="px-5 py-2.5 bg-gray-700 text-gray-300 hover:text-white rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Annuler
                            </motion.button>
                            <motion.button
                                onClick={onConfirm}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
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