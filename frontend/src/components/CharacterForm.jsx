import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const CharacterForm = ({ character, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        realName: '',
        universe: 'Earth-616'
    });

    useEffect(() => {
        if (character) {
            setFormData({
                name: character.name,
                realName: character.realName,
                universe: character.universe
            });
        }
    }, [character]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        // ... (dans le return)
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {character ? 'Modifier le héros' : 'Nouveau héros'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-gray-300 mb-2 text-sm" htmlFor="name">
                                    Nom du héros
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Spider-Man"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm" htmlFor="realName">
                                    Identité secrète
                                </label>
                                <input
                                    type="text"
                                    id="realName"
                                    name="realName"
                                    value={formData.realName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Peter Parker"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 text-sm" htmlFor="universe">
                                    Univers
                                </label>
                                <select
                                    id="universe"
                                    name="universe"
                                    value={formData.universe}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="Earth-616">Earth-616 (Univers principal)</option>
                                    <option value="Earth-1610">Earth-1610 (Ultimate Universe)</option>
                                    <option value="Earth-199999">Earth-199999 (MCU)</option>
                                    <option value="Other">Autre univers</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-gray-300 hover:text-white"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Annuler
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg hover:opacity-90 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {character ? 'MODIFIER' : 'CRÉER'}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CharacterForm;