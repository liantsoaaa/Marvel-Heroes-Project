import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const CharacterFormPage = ({ character, onSubmit, onBack }) => {
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="flex justify-between items-center mb-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onBack}
                            className="flex items-center gap-2 bg-gray-700/70 hover:bg-gray-600 text-white py-3 px-5 rounded-xl shadow transition-all backdrop-blur-sm border border-gray-600"
                        >
                            <FaArrowLeft /> Retour
                        </motion.button>

                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 marvel-font">
                            {character ? 'MODIFIER UN HÉROS' : 'NOUVEAU HÉROS'}
                        </h1>
                    </div>

                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
                    >
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label className="block text-gray-300 text-sm font-medium" htmlFor="name">
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

                                <div className="space-y-1 mb-5">
                                    <label className="block text-gray-300 text-base font-medium mb-3 text-center" htmlFor="name">
                                        Nom du héros
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full max-w-md mx-auto bg-gray-700 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 block border border-gray-600"
                                        placeholder="Spider-Man"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-gray-300 text-sm font-medium mb-2 text-center" htmlFor="realName">
                                        Identité secrète
                                    </label>
                                    <input
                                        type="text"
                                        id="realName"
                                        name="realName"
                                        value={formData.realName}
                                        onChange={handleChange}
                                        className="w-full max-w-md mx-auto bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 block"
                                        placeholder="Peter Parker"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-gray-300 text-sm font-medium mb-2 text-center" htmlFor="universe">
                                        Univers
                                    </label>
                                    <select
                                        id="universe"
                                        name="universe"
                                        value={formData.universe}
                                        onChange={handleChange}
                                        className="w-full max-w-md mx-auto bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 block"
                                        required
                                    >
                                        <option value="Earth-616">Earth-616 (Univers principal)</option>
                                        <option value="Earth-1610">Earth-1610 (Ultimate Universe)</option>
                                        <option value="Earth-199999">Earth-199999 (MCU)</option>
                                        <option value="Other">Autre univers</option>
                                    </select>
                                </div>

                                <div className="pt-8">
                                    <motion.button
                                        type="submit"
                                        className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 px-6 rounded-xl shadow-lg transition-all font-bold text-lg"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaSave className="text-xl" />
                                        {character ? 'MODIFIER LE HÉROS' : 'CRÉER LE HÉROS'}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CharacterFormPage;