import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import { ThemeProvider } from './contexts/themeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import InteractiveCursor from './components/gamification/InteractiveCursor';
import ParticleBackground from './components/common/ParticleBackground';

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Router>
          <InteractiveCursor />
          <ParticleBackground />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </Router>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;