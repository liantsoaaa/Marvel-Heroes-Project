import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    User,
    Shield,
    Globe,
    Sparkles,
    AlertTriangle
} from 'lucide-react';

const CharacterForm = ({ character, onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        realName: '',
        universe: 'Earth-616'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom du héros est requis';
        }

        if (!formData.realName.trim()) {
            newErrors.realName = 'L\'identité secrète est requise';
        }

        if (!formData.universe.trim()) {
            newErrors.universe = 'L\'univers est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit(formData);
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            {/* Particules d'arrière-plan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg mx-auto relative z-10"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="inline-flex items-center gap-2 bg-slate-700/70 hover:bg-slate-600 text-white px-4 py-2.5 rounded-xl transition-all mb-4"
                    >
                        <ArrowLeft size={16} />
                        Retour
                    </motion.button>

                    <motion.h1
                        className="text-3xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {character ? 'MODIFIER LE HÉROS' : 'NOUVEAU HÉROS'}
                    </motion.h1>

                    <motion.p
                        className="text-slate-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Remplissez tous les champs pour {character ? 'modifier' : 'créer'} votre héros
                    </motion.p>

                    <motion.div
                        className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mt-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                </motion.div>

                {/* Formulaire */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
                >
                    {/* Header du formulaire */}
                    <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-6 border-b border-slate-700/50 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                <Shield size={24} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Informations du héros</h2>
                                <p className="text-slate-300 text-sm">Tous les champs sont obligatoires</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            {/* Nom du héros */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-center"
                            >
                                <label className="flex items-center justify-center gap-2 text-slate-200 font-medium mb-3">
                                    <Sparkles size={16} className="text-yellow-400" />
                                    Nom du héros
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-700/70 text-white px-4 py-3 rounded-xl border ${
                                        errors.name
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-slate-600/50 focus:border-red-500'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all placeholder-slate-400 text-center`}
                                    placeholder="Spider-Man"
                                />
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm mt-2 flex items-center justify-center gap-1"
                                    >
                                        <AlertTriangle size={14} />
                                        {errors.name}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Identité secrète */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-center"
                            >
                                <label className="flex items-center justify-center gap-2 text-slate-200 font-medium mb-3">
                                    <User size={16} className="text-amber-400" />
                                    Identité secrète
                                </label>
                                <input
                                    type="text"
                                    name="realName"
                                    value={formData.realName}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-700/70 text-white px-4 py-3 rounded-xl border ${
                                        errors.realName
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-slate-600/50 focus:border-red-500'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all placeholder-slate-400 text-center`}
                                    placeholder="Peter Parker"
                                />
                                {errors.realName && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm mt-2 flex items-center justify-center gap-1"
                                    >
                                        <AlertTriangle size={14} />
                                        {errors.realName}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Univers */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-center"
                            >
                                <label className="flex items-center justify-center gap-2 text-slate-200 font-medium mb-3">
                                    <Globe size={16} className="text-blue-400" />
                                    Univers
                                </label>
                                <select
                                    name="universe"
                                    value={formData.universe}
                                    onChange={handleChange}
                                    className={`w-full bg-slate-700/70 text-white px-4 py-3 rounded-xl border ${
                                        errors.universe
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-slate-600/50 focus:border-red-500'
                                    } focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-center`}
                                >
                                    <option value="Earth-616">Earth-616 (Marvel Prime)</option>
                                    <option value="Earth-1610">Earth-1610 (Ultimate)</option>
                                    <option value="Earth-199999">Earth-199999 (MCU)</option>
                                    <option value="Earth-65">Earth-65 (Spider-Gwen)</option>
                                    <option value="Earth-928">Earth-928 (Spider-Man 2099)</option>
                                    <option value="Other">Autre univers</option>
                                </select>
                                {errors.universe && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-sm mt-2 flex items-center justify-center gap-1"
                                    >
                                        <AlertTriangle size={14} />
                                        {errors.universe}
                                    </motion.p>
                                )}
                            </motion.div>

                            {/* Bouton */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex justify-center pt-4"
                            >
                                <motion.button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    whileHover={{
                                        scale: isSubmitting ? 1 : 1.05,
                                        boxShadow: isSubmitting ? undefined : "0 10px 30px rgba(237, 29, 36, 0.4)"
                                    }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className={`flex items-center justify-center gap-3 py-3.5 px-8 rounded-xl font-bold text-lg shadow-lg transition-all min-w-[200px] ${
                                        isSubmitting
                                            ? 'bg-slate-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
                                    } text-white`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            Traitement...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            {character ? 'MODIFIER' : 'CRÉER'}
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CharacterForm;