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
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(237, 29, 36, 0.2), 0 10px 10px -5px rgba(237, 29, 36, 0.1)',
                zIndex: 10
            }}
            className="relative w-full max-w-[320px] mx-auto bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl border border-gray-800 transition-all transform hover:scale-[1.02] group"
        >

            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-white bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                            {character.name}
                        </h2>
                        <span className="bg-gradient-to-r from-red-600 to-red-800 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaIdBadge className="text-yellow-300" /> ID: {character.id}
                </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl">
                            <div className="bg-gradient-to-br from-red-600 to-red-800 p-2 rounded-lg mr-3">
                                <FaUserSecret className="h-5 w-5 text-yellow-300" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Identité secrète</p>
                                <p className="text-white font-medium">{character.realName}</p>
                            </div>
                        </div>

                        <div className="flex items-center bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg mr-3">
                                <FaGlobeAmericas className="h-5 w-5 text-blue-300" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Univers</p>
                                <p className="text-white font-medium">{character.universe}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/80 backdrop-blur-sm px-5 py-3 flex justify-end gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-lg"
                    >
                        <FaEdit /> Modifier
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDelete}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-lg"
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