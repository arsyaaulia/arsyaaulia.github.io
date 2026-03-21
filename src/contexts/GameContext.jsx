import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [points, setPoints] = useLocalStorage('user-points', 0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useLocalStorage('achievements', []);
  const [clickCount, setClickCount] = useState(0);
  const [combo, setCombo] = useState(0);

  // Hitung level berdasarkan points
  useEffect(() => {
    const newLevel = Math.floor(points / 100) + 1;
    setLevel(newLevel);
  }, [points]);

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
    setCombo(prev => prev + 1);
    
    // Bonus combo
    if (combo > 5) {
      setPoints(prev => prev + Math.floor(amount * 0.5));
    }
  };

  const unlockAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);
      addPoints(50); // Bonus points untuk achievement
      return true;
    }
    return false;
  };

  const resetCombo = () => {
    setCombo(0);
  };

  return (
    <GameContext.Provider value={{
      points,
      level,
      achievements,
      combo,
      addPoints,
      unlockAchievement,
      resetCombo,
      clickCount
    }}>
      {children}
    </GameContext.Provider>
  );
};