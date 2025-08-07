import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { mockData } from '../data/mock';

const IslandMap = () => {
  const navigate = useNavigate();
  const { gameProgress } = useGame();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedIsland, setSelectedIsland] = useState(null);

  const getIslandProgress = (islandId) => {
    const progress = gameProgress[islandId];
    if (!progress) return 0;
    const island = mockData.islands.find(i => i.id === islandId);
    if (!island) return 0;
    return Math.round((progress.completedQuests?.length || 0) / island.quests.length * 100);
  };

  const getIslandStructure = (islandId) => {
    const structures = {
      'mythology': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">🏛️</div>
          <div className="absolute bottom-0 w-20 h-4 bg-amber-700 rounded-full"></div>
        </div>
      ),
      'spy': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">🏢</div>
          <div className="absolute bottom-0 w-20 h-4 bg-gray-600 rounded-full"></div>
        </div>
      ),
      'time_tangled': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">⏰</div>
          <div className="absolute bottom-0 w-20 h-4 bg-blue-600 rounded-full"></div>
        </div>
      ),
      'monster_carnival': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">🎪</div>
          <div className="absolute bottom-0 w-20 h-4 bg-red-600 rounded-full"></div>
        </div>
      ),
      'super_power': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">🦸‍♂️</div>
          <div className="absolute bottom-0 w-20 h-4 bg-yellow-600 rounded-full"></div>
        </div>
      ),
      'wild_west': (
        <div className="relative w-full h-32 flex items-end justify-center">
          <div className="text-6xl mb-2">🤠</div>
          <div className="absolute bottom-0 w-20 h-4 bg-brown-600 rounded-full"></div>
        </div>
      )
    };
    return structures[islandId] || (
      <div className="relative w-full h-32 flex items-end justify-center">
        <div className="text-6xl mb-2">🏝️</div>
        <div className="absolute bottom-0 w-20 h-4 bg-amber-600 rounded-full"></div>
      </div>
    );
  };

  const handleIslandClick = (island) => {
    if (island.status === 'locked') return;
    
    setSelectedIsland(island);
    setIsTransitioning(true);
    
    // Show clouds for 3 seconds then navigate
    setTimeout(() => {
      navigate(`/city/${island.id}`);
    }, 3000);
  };

  // Arrange islands in the classic Poptropica 2x3 grid layout
  const topRowIslands = mockData.islands.slice(0, 3);
  const bottomRowIslands = mockData.islands.slice(3, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-500 relative overflow-hidden">
      {/* Transition Clouds Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky-400">
          {/* Animated Clouds */}
          <div className="relative w-full h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full opacity-90 animate-float"
                style={{
                  width: `${Math.random() * 150 + 100}px`,
                  height: `${Math.random() * 80 + 60}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`
                }}
              />
            ))}
            
            {/* Transition Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                  Traveling to {selectedIsland?.name}...
                </h2>
                <div className="animate-spin text-6xl">🎈</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Classic Poptropica Header */}
      <div className="relative z-20 bg-sky-400 pb-4">
        {/* Top navigation bar */}
        <div className="px-6 py-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          
          {/* Classic Poptropica Logo */}
          <div className="flex items-center">
            <div className="text-5xl font-bold text-white drop-shadow-2xl tracking-wide">
              Poptropica
            </div>
          </div>

          {/* Top right icons area */}
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-lg">🏠</div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg">📊</div>
          </div>
        </div>

        {/* Clouds decoration */}
        <div className="absolute top-16 left-10 w-16 h-10 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 left-14 w-12 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-12 right-20 w-20 h-12 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-16 right-24 w-14 h-9 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Sandy Map Background with Texture */}
      <div 
        className="relative z-10 min-h-screen" 
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(240, 220, 130, 0.9) 0%, 
              rgba(218, 182, 91, 0.9) 30%,
              rgba(205, 165, 85, 0.9) 60%,
              rgba(195, 155, 80, 0.9) 100%
            ),
            radial-gradient(circle at 25% 25%, rgba(222, 184, 135, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(210, 180, 140, 0.3) 0%, transparent 40%),
            repeating-linear-gradient(
              45deg,
              rgba(160, 130, 80, 0.1) 0px,
              rgba(160, 130, 80, 0.1) 3px,
              transparent 3px,
              transparent 8px
            )
          `
        }}
      >
        
        {/* Navigation arrows */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30">
          <Button 
            variant="ghost" 
            size="lg"
            className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-none shadow-lg"
            style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)' }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        </div>
        
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30">
          <Button 
            variant="ghost" 
            size="lg"
            className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-none shadow-lg"
            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>

        {/* Yellow Balloon */}
        <div className="absolute top-20 right-32 z-20">
          <div className="text-6xl animate-float">🎈</div>
        </div>

        {/* Islands Grid - Classic Poptropica Layout */}
        <div className="container mx-auto px-20 py-16">
          
          {/* Top Row */}
          <div className="grid grid-cols-3 gap-16 mb-20">
            {topRowIslands.map((island) => {
              const progress = getIslandProgress(island.id);
              const isLocked = island.status === 'locked';
              const isCompleted = progress === 100;

              return (
                <div key={island.id} className="flex flex-col items-center">
                  {/* Island Platform */}
                  <Card 
                    className={`relative w-48 h-48 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 border-4 ${
                      isLocked ? 'opacity-60 cursor-not-allowed border-gray-400' : 
                      isCompleted ? 'border-yellow-400 shadow-yellow-400/50' : 'border-amber-600'
                    } shadow-2xl bg-gradient-to-b from-amber-100 to-amber-200`}
                    onClick={() => handleIslandClick(island)}
                  >
                    <CardContent className="p-0 h-full flex items-end justify-center relative">
                      {/* Island Structure */}
                      {getIslandStructure(island.id)}
                      
                      {/* White Clouds for Locked Islands */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-sky-200 bg-opacity-90 flex items-center justify-center rounded-3xl overflow-hidden">
                          {/* Multiple white clouds */}
                          <div className="absolute w-16 h-10 bg-white rounded-full opacity-90 top-4 left-4 animate-float"></div>
                          <div className="absolute w-20 h-12 bg-white rounded-full opacity-80 top-8 right-6 animate-float" style={{animationDelay: '1s'}}></div>
                          <div className="absolute w-14 h-8 bg-white rounded-full opacity-85 bottom-6 left-6 animate-float" style={{animationDelay: '0.5s'}}></div>
                          <div className="absolute w-18 h-11 bg-white rounded-full opacity-75 bottom-4 right-4 animate-float" style={{animationDelay: '1.5s'}}></div>
                          
                          {/* Lock icon in center */}
                          <div className="relative z-10 text-4xl">🔒</div>
                        </div>
                      )}
                      
                      {/* Completion star */}
                      {isCompleted && (
                        <div className="absolute top-2 right-2">
                          <div className="text-3xl animate-pulse">⭐</div>
                        </div>
                      )}

                      {/* Progress indicator */}
                      {!isLocked && progress > 0 && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black bg-opacity-30 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Island Label - Classic Yellow Style */}
                  <div className="mt-4">
                    <div className="bg-yellow-400 px-4 py-2 rounded-full border-2 border-yellow-600 shadow-lg">
                      <div className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                        {island.name.replace(' Island', '').replace(' ', ' ')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-16">
            {bottomRowIslands.map((island) => {
              const progress = getIslandProgress(island.id);
              const isLocked = island.status === 'locked';
              const isCompleted = progress === 100;

              return (
                <div key={island.id} className="flex flex-col items-center">
                  {/* Island Platform */}
                  <Card 
                    className={`relative w-48 h-48 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 border-4 ${
                      isLocked ? 'opacity-60 cursor-not-allowed border-gray-400' : 
                      isCompleted ? 'border-yellow-400 shadow-yellow-400/50' : 'border-amber-600'
                    } shadow-2xl bg-gradient-to-b from-amber-100 to-amber-200`}
                    onClick={() => handleIslandClick(island)}
                  >
                    <CardContent className="p-0 h-full flex items-end justify-center relative">
                      {/* Island Structure */}
                      {getIslandStructure(island.id)}
                      
                      {/* White Clouds for Locked Islands */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-sky-200 bg-opacity-90 flex items-center justify-center rounded-3xl overflow-hidden">
                          {/* Multiple white clouds */}
                          <div className="absolute w-16 h-10 bg-white rounded-full opacity-90 top-4 left-4 animate-float"></div>
                          <div className="absolute w-20 h-12 bg-white rounded-full opacity-80 top-8 right-6 animate-float" style={{animationDelay: '1s'}}></div>
                          <div className="absolute w-14 h-8 bg-white rounded-full opacity-85 bottom-6 left-6 animate-float" style={{animationDelay: '0.5s'}}></div>
                          <div className="absolute w-18 h-11 bg-white rounded-full opacity-75 bottom-4 right-4 animate-float" style={{animationDelay: '1.5s'}}></div>
                          
                          {/* Lock icon in center */}
                          <div className="relative z-10 text-4xl">🔒</div>
                        </div>
                      )}
                      
                      {/* Completion star */}
                      {isCompleted && (
                        <div className="absolute top-2 right-2">
                          <div className="text-3xl animate-pulse">⭐</div>
                        </div>
                      )}

                      {/* Progress indicator */}
                      {!isLocked && progress > 0 && (
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-black bg-opacity-30 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Island Label - Classic Yellow Style */}
                  <div className="mt-4">
                    <div className="bg-yellow-400 px-4 py-2 rounded-full border-2 border-yellow-600 shadow-lg">
                      <div className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                        {island.name.replace(' Island', '').replace(' ', ' ')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Navigation Dots */}
          <div className="flex justify-center mt-16 space-x-3">
            {[1, 2, 3, 4, 5, 6, 7].map((dot, index) => (
              <div 
                key={dot}
                className={`w-4 h-6 rounded-full border-2 ${
                  index === 3 ? 'bg-yellow-400 border-yellow-600' : 'bg-gray-300 border-gray-400'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Decorative elements scattered around the map */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-orange-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-amber-300 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IslandMap;