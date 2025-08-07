import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mock';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [character, setCharacter] = useState(() => {
    const saved = localStorage.getItem('poptropica_character');
    return saved ? JSON.parse(saved) : mockData.defaultCharacter;
  });
  
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('poptropica_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  const [gameProgress, setGameProgress] = useState(() => {
    const saved = localStorage.getItem('poptropica_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentIsland, setCurrentIsland] = useState(null);

  useEffect(() => {
    localStorage.setItem('poptropica_character', JSON.stringify(character));
  }, [character]);

  useEffect(() => {
    localStorage.setItem('poptropica_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('poptropica_progress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  const updateCharacter = (updates) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const addToInventory = (item) => {
    setInventory(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const completeQuest = (islandId, questId) => {
    setGameProgress(prev => ({
      ...prev,
      [islandId]: {
        ...prev[islandId],
        completedQuests: [...(prev[islandId]?.completedQuests || []), questId],
        isCompleted: mockData.islands.find(i => i.id === islandId)?.quests.every(q => 
          [...(prev[islandId]?.completedQuests || []), questId].includes(q.id)
        )
      }
    }));
  };

  const value = {
    character,
    inventory,
    gameProgress,
    currentIsland,
    updateCharacter,
    addToInventory,
    completeQuest,
    setCurrentIsland
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};