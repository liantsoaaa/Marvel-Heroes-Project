import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaSadTear, FaUser, FaSync, FaSearch, FaHome } from 'react-icons/fa';
import CharacterCard from './components/CharacterCard';
import CharacterForm from './components/CharacterForm.jsx';
import ConfirmationModal from './components/ConfirmationModal';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [characterToDelete, setCharacterToDelete] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            character.realName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharacters(filtered);
    }, [searchTerm, characters]);

    const fetchCharacters = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/characters');
            const data = await response.json();
            setCharacters(data);
            setFilteredCharacters(data);
        } catch (error) {
            console.error("Erreur de chargement des personnages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (character) => {
        try {
            await fetch('http://localhost:5000/characters', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(character)
            });
            fetchCharacters();
            setCurrentPage('home');
        } catch (error) {
            console.error("Erreur de création:", error);
        }
    };

    const handleUpdate = async (character) => {
        try {
            await fetch(`http://localhost:5000/characters/${selectedCharacter.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(character)
            });
            fetchCharacters();
            setCurrentPage('home');
        } catch (error) {
            console.error("Erreur de mise à jour:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await fetch(`http://localhost:5000/characters/${characterToDelete.id}`, {
                method: 'DELETE'
            });
            fetchCharacters();
            setShowConfirm(false);
        } catch (error) {
            console.error("Erreur de suppression:", error);
        }
    };

    const renderHomePage = () => (
        <div className="min-h-screen py-8 px-4 sm:px-6 bg-gradient-to-br from-gray-900 to-black">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full mix-blend-soft-light filter blur-[100px] opacity-10 animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-600 rounded-full mix-blend-soft-light filter blur-[80px] opacity-10 animate-float animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-amber-600 rounded-full mix-blend-soft-light filter blur-[90px] opacity-10 animate-float animation-delay-4000"></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >

                <header className="text-center mb-12 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-red-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-20"></div>

                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 marvel-font"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                    >
                        MARVEL CHARACTERS
                    </motion.h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-6">
                        Gérer votre équipe de super-héros préférés
                    </p>

                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto rounded-full"></div>
                </header>

                <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-800/30 backdrop-blur-sm p-5 rounded-2xl border border-gray-700">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium mb-2">
                            <FaUser /> {characters.length} personnages
                        </div>
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            {characters.length > 0
                                ? "Cliquez sur un héros pour le modifier"
                                : "Commencez par ajouter votre premier héros"}
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Rechercher un héros..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-700/80 border-2 border-gray-600 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-red-500 backdrop-blur-sm transition-all"
                            />
                            <div className="absolute left-4 top-3.5 text-gray-400">
                                <FaSearch className="text-lg" />
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={fetchCharacters}
                                className="flex items-center justify-center gap-2 bg-gray-700/80 hover:bg-gray-600 text-white py-3.5 px-6 rounded-xl shadow transition-all backdrop-blur-sm border-2 border-gray-600"
                                disabled={isLoading}
                            >
                                <FaSync className={`text-lg ${isLoading ? "animate-spin" : ""}`} />
                                <span className="hidden sm:inline">Actualiser</span>
                            </motion.button>

                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 0 25px rgba(237, 29, 36, 0.4)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSelectedCharacter(null);
                                    setCurrentPage('add');
                                }}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3.5 px-6 rounded-xl shadow-lg transition-all font-bold"
                            >
                                <FaPlus className="text-lg" />
                                <span>AJOUTER</span>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto mb-6"></div>
                        <p className="text-gray-400">Chargement des héros...</p>
                    </div>
                ) : filteredCharacters.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6 p-4">
                            <FaSadTear className="h-16 w-16 text-red-500/50" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                            {searchTerm ? "Aucun résultat trouvé" : "Aucun héros trouvé"}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            {searchTerm
                                ? "Essayez une autre recherche"
                                : "Commencez par ajouter votre premier héros Marvel"}
                        </p>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 20px rgba(237, 29, 36, 0.5)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSelectedCharacter(null);
                                setCurrentPage('add');
                            }}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 px-6 rounded-xl shadow-lg transition-all font-bold"
                        >
                            <FaPlus className="text-lg" /> AJOUTER UN HÉROS
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <AnimatePresence>
                            {filteredCharacters.map(character => (
                                <motion.div
                                    key={character.id}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 }
                                    }}
                                    className="flex justify-center"
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
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
            </motion.div>
        </div>
    );

    const renderFormPage = () => (
        <CharacterForm
            character={selectedCharacter}
            onSubmit={selectedCharacter ? handleUpdate : handleCreate}
            onBack={() => setCurrentPage('home')}
        />
    );

    return (
        <>
            {currentPage === 'home' && renderHomePage()}
            {(currentPage === 'add' || currentPage === 'edit') && renderFormPage()}
        </>
    );
};

export default App;