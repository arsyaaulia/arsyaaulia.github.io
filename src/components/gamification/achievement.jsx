import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'react-confetti';

const AchievementBadge = ({ title, icon, unlocked, onUnlock }) => {
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    if (unlocked && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [unlocked]);

  return (
    <>
      {showConfetti && <confetti />}
      <motion.div 
        className={`relative group cursor-pointer ${unlocked ? 'opacity-100' : 'opacity-40 grayscale'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onUnlock}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white whitespace-nowrap">
          {title}
        </div>
        {unlocked && (
          <motion.div 
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ⭐
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default AchievementBadge;