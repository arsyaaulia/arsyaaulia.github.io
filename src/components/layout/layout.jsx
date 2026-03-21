import React from 'react'
import Header from './header'
import Footer from './footer'
import LevelBar from '../gamification/levelBar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <LevelBar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout