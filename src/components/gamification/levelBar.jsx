import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../contexts/GameContext'

const LevelBar = () => {
  const { points, level } = useGame()
  const currentLevelPoints = points % 100
  const progress = (currentLevelPoints / 100) * 100
  const pointsToNext = 100 - currentLevelPoints

  return (
    <motion.div 
      className="fixed top-24 right-4 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 border border-purple-500 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-lg">🎮</span>
          </div>
          <div>
            <div className="text-xs text-gray-400">Level {level}</div>
            <div className="text-sm font-bold text-white">{points} XP</div>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, type: "spring" }}
            />
          </div>
          <AnimatePresence>
            {pointsToNext <= 20 && pointsToNext > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 right-0 text-xs text-yellow-400 whitespace-nowrap"
              >
                {pointsToNext} XP to next level!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default LevelBar