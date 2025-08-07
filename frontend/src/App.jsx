import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    RefreshCw,
    User
} from 'lucide-react';

import CharacterCard from "./components/CharacterCard.jsx";
import CharacterForm from "./components/CharacterForm.jsx";
import ConfirmationModal from "./components/ConfirmationModal.jsx";

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characterToDelete, setCharacterToDelete] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/characters');
            if (!response.ok) throw new Error('Erreur réseau');
            const data = await response.json();
            setCharacters(data);
            setFilteredCharacters(data);
        } catch (error) {
            console.error("Erreur de chargement:", error);
            setError('Impossible de charger les personnages');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            character.realName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(filtered);
    }, [searchTerm, characters]);

    const handleCreate = async (character) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(character),
            });

            if (!response.ok) throw new Error('Erreur création');

            const newCharacter = await response.json();
            setCharacters(prev => [...prev, newCharacter]);
            setCurrentPage('home');
        } catch (error) {
            console.error("Erreur de création:", error);
            setError('Erreur lors de la création');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (character) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/characters/${selectedCharacter.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(character),
            });

            if (!response.ok) throw new Error('Erreur mise à jour');

            const updatedCharacter = await response.json();
            setCharacters(prev =>
                prev.map(c => c.id === updatedCharacter.id ? updatedCharacter : c)
            );
            setCurrentPage('home');
        } catch (error) {
            console.error("Erreur de mise à jour:", error);
            setError('Erreur lors de la mise à jour');
        } finally {
            setIsLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!characterToDelete) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/characters/${characterToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erreur suppression');

            setCharacters(prev => prev.filter(c => c.id !== characterToDelete.id));
            setShowConfirm(false);
        } catch (error) {
            console.error("Erreur de suppression:", error);
            setError('Erreur lors de la suppression');
        } finally {
            setIsLoading(false);
        }
    };

    const renderHomePage = () => (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center">
            <div className="max-w-5xl mx-auto w-full space-y-8 sm:space-y-10 md:space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8 md:mb-10 pt-4 sm:pt-6 md:pt-10"
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        MARVEL HEROES
                    </motion.h1>

                    <motion.p
                        className="text-lg text-slate-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Gérez votre équipe de super-héros
                    </motion.p>

                    <motion.div
                        className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-5xl sm:h-24 h-40 mx-auto mb-12 sm:mb-10 md:mb-12"
                >
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700/50 p-4 sm:p-6 shadow-2xl">
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                                <div className="flex items-center justify-center gap-4">
                                    <motion.div
                                        className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-3 font-bold shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <User size={20} />
                                        <span className="text-lg">{characters.length} héros</span>
                                    </motion.div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 bg-slate-700/70 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
                                >
                                    <RefreshCw size={18} />
                                    <span>Actualiser</span>
                                </motion.button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                <div className="relative w-full max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Rechercher un héros..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-slate-700/70 text-white px-6 py-4 pl-14 rounded-xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-lg text-center text-lg placeholder-slate-400"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                </div>

                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 30px rgba(237, 29, 36, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedCharacter(null);
                                        setCurrentPage('add');
                                    }}
                                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg text-lg min-w-[160px]"
                                >
                                    <Plus size={20} />
                                    <span>AJOUTER</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-8 sm:mt-10 md:mt-12">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center max-w-5xl mx-auto px-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <AnimatePresence>
                            {filteredCharacters.length === 0 ? (
                                <motion.div
                                    className="col-span-full text-center py-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="bg-slate-800/50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6 backdrop-blur-sm">
                                        <User className="h-12 w-12 text-slate-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">
                                        {searchTerm ? "Aucun héros trouvé" : "Aucun héros"}
                                    </h3>
                                    <p className="text-slate-400 mb-8 text-lg max-w-md mx-auto">
                                        {searchTerm ? "Essayez une autre recherche ou explorez d'autres héros" : "Commencez par ajouter votre premier super-héros à votre équipe"}
                                    </p>
                                    {!searchTerm && (
                                        <motion.button
                                            whileHover={{
                                                scale: 1.05,
                                                boxShadow: "0 10px 30px rgba(237, 29, 36, 0.4)"
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedCharacter(null);
                                                setCurrentPage('add');
                                            }}
                                            className="flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold mx-auto transition-all shadow-lg text-lg"
                                        >
                                            <Plus size={18} />
                                            AJOUTER UN HÉROS
                                        </motion.button>
                                    )}
                                </motion.div>
                            ) : (
                                filteredCharacters.map(character => (
                                    <motion.div
                                        key={character.id}
                                        variants={{
                                            hidden: { y: 20, opacity: 0, scale: 0.9 },
                                            visible: { y: 0, opacity: 1, scale: 1 }
                                        }}
                                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                        className="w-full max-w-sm"
                                    >
                                        <CharacterCard
                                            character={character}
                                            onEdit={() => {
                                                setSelectedCharacter(character);
                                                setCurrentPage('edit');
                                            }}
                                            onDelete={() => {
                                                setCharacterToDelete(character);
                                                setShowConfirm(true);
                                            }}
                                        />
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16 pb-8"
                >
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mb-4" />
                    <p className="text-slate-500 text-sm">
                        Inspired by Marvel Universe • {new Date().getFullYear()}. Created by liantsoaaa
                    </p>
                </motion.div>
            </div>
        </div>
    );

    return (
        <div className="app-container">
            {currentPage === 'home' && renderHomePage()}
            {(currentPage === 'add' || currentPage === 'edit') && (
                <CharacterForm
                    character={selectedCharacter}
                    onSubmit={selectedCharacter ? handleUpdate : handleCreate}
                    onBack={() => setCurrentPage('home')}
                />
            )}

            <AnimatePresence>
                {showConfirm && (
                    <ConfirmationModal
                        character={characterToDelete}
                        onClose={() => setShowConfirm(false)}
                        onConfirm={confirmDelete}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;