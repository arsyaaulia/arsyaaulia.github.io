import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useGame } from '../../contexts/GameContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useTheme()
  const { points, level } = useGame()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/projects', label: 'Projects', icon: '🎮' },
    { path: '/about', label: 'About', icon: '👾' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Portfolio.🎮
            </motion.div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-purple-400"
                  />
                )}
              </Link>
            ))}
            
            {/* XP Display */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-bold text-white">{points} XP</span>
              <span className="text-xs text-purple-300">Lv.{level}</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-500/20"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 transition-colors ${
                  location.pathname === item.path
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div className="pt-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-bold">{points} XP</span>
              </div>
              <button onClick={toggleDarkMode} className="p-2">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Header