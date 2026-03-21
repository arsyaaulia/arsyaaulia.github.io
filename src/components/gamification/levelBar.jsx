import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';

const LevelBar = () => {
  const { points, level } = useGame();
  const currentLevelPoints = points % 100;
  const progress = (currentLevelPoints / 100) * 100;

  return (
    <motion.div 
      className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-lg rounded-xl p-3 border border-purple-500"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-sm font-bold text-white mb-1">
        Level {level} 🎮
      </div>
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {currentLevelPoints}/100 XP
      </div>
    </motion.div>
  );
};

export default LevelBar;