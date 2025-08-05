import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserSecret, FaGlobeAmericas,
    FaEdit, FaTrash,
    FaIdBadge
} from 'react-icons/fa';

const CharacterCard = ({ character, onEdit, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, type: "spring" }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 30px -10px rgba(237, 29, 36, 0.3)',
                zIndex: 10
            }}
            className="relative w-full max-w-[280px] mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl border border-gray-700 transition-all transform group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full flex flex-col">
                {/* En-tête de carte */}
                <div className="p-5 pb-3">
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold text-white text-center mb-2">
                            {character.name}
                        </h2>
                        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <FaIdBadge className="text-yellow-300" /> ID: {character.id}
                        </div>
                    </div>
                </div>

                {/* Corps de carte */}
                <div className="px-5 pb-4 flex-1">
                    <div className="space-y-4">
                        <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-2">
                                <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg mr-2">
                                    <FaUserSecret className="h-5 w-5 text-yellow-300" />
                                </div>
                                <p className="text-sm text-gray-300 font-medium">Identité secrète</p>
                            </div>
                            <p className="text-white font-semibold text-center">{character.realName}</p>
                        </div>

                        <div className="flex flex-col items-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-2">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg mr-2">
                                    <FaGlobeAmericas className="h-5 w-5 text-blue-300" />
                                </div>
                                <p className="text-sm text-gray-300 font-medium">Univers</p>
                            </div>
                            <p className="text-white font-semibold text-center">{character.universe}</p>
                        </div>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="bg-gray-900/80 backdrop-blur-sm px-5 py-4 flex justify-center gap-4 border-t border-gray-800">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#f59e0b' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="flex items-center gap-2 bg-amber-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium shadow-lg transition-all"
                    >
                        <FaEdit /> Modifier
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#dc2626' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        className="flex items-center gap-2 bg-red-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium shadow-lg transition-all"
                    >
                        <FaTrash /> Supprimer
                    </motion.button>
                </div>
            </div>

            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute -inset-4 bg-radial-gradient"></div>
            </div>
        </motion.div>
    );
};

export default CharacterCard;