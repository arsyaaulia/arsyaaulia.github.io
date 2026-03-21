import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useMousePosition from '../../hooks/useMousePosition'

const InteractiveCursor = () => {
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer')
      setIsHovering(!!isClickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: x - 20,
          y: y - 20,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-purple-500/30 border-2 border-purple-400" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400" />
        </div>
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 20
        }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>
    </>
  )
}

export default InteractiveCursor