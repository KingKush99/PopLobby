import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from './contexts/GameContext';
import HomePage from './pages/HomePage';
import IslandMap from './pages/IslandMap';
import CharacterCustomization from './pages/CharacterCustomization';
import GameWorld from './pages/GameWorld';
import CityView from './pages/CityView';
import Inventory from './pages/Inventory';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<IslandMap />} />
            <Route path="/character" element={<CharacterCustomization />} />
            <Route path="/game/:islandId" element={<GameWorld />} />
            <Route path="/city/:islandId" element={<CityView />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GameProvider>
  );
}

export default App;