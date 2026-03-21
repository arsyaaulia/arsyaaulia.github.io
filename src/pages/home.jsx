import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import Typewriter from 'react-typewriter-effect';
import FloatingShapes from '../components/common/FloatingShapes';

const Home = () => {
  const { addPoints, points } = useGame();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloatingShapes />
      
      <motion.div 
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addPoints(10)}
          className="cursor-pointer inline-block"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-4xl">👾</span>
          </div>
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Hi, I'm [Your Name]
        </h1>
        
        <div className="text-2xl text-gray-300 mb-6">
          <Typewriter
            textStyle={{ color: '#a78bfa' }}
            startDelay={100}
            cursorColor="#c084fc"
            text="Creative Developer | Tech Enthusiast | Gamer"
            typeSpeed={50}
          />
        </div>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Building cool stuff with code, creativity, and a touch of gamification! 🚀
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white shadow-lg"
            onClick={() => addPoints(25)}
          >
            Click Me! (+25 XP)
          </motion.button>
          
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 border-2 border-purple-500 rounded-full font-bold text-purple-400 hover:bg-purple-500/20 transition"
          >
            View Projects →
          </motion.a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Current XP: {points} | Click anywhere for bonus points!
        </div>
      </motion.div>
    </div>
  );
};

export default Home;