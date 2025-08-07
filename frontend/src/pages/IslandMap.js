import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Home, Lock, Star, Clock, Zap } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { mockData } from '../data/mock';

const IslandMap = () => {
  const navigate = useNavigate();
  const { gameProgress } = useGame();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return <Star className="w-4 h-4" />;
      case 'Medium': return <Clock className="w-4 h-4" />;
      case 'Hard': return <Zap className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getIslandProgress = (islandId) => {
    const progress = gameProgress[islandId];
    if (!progress) return 0;
    const island = mockData.islands.find(i => i.id === islandId);
    if (!island) return 0;
    return Math.round((progress.completedQuests?.length || 0) / island.quests.length * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-500 relative overflow-hidden">
      {/* Animated clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-20 bg-white bg-opacity-30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-16 bg-white bg-opacity-25 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-24 bg-white bg-opacity-20 rounded-full animate-float"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 p-6 flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </Button>
        
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Island Map</h1>
        
        <div className="w-20"></div> {/* Spacer */}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Select an island to begin your quest. Each island offers unique challenges and exciting rewards!
          </p>
        </div>

        {/* Islands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mockData.islands.map((island) => {
            const progress = getIslandProgress(island.id);
            const isLocked = island.status === 'locked';
            const isCompleted = progress === 100;

            return (
              <Card 
                key={island.id}
                className={`relative overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border-0 shadow-2xl
                  ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-3xl'}
                  ${isCompleted ? 'ring-4 ring-yellow-400' : ''}`}
                onClick={() => !isLocked && navigate(`/game/${island.id}`)}
              >
                {/* Island Image/Background */}
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                  {/* Placeholder for island imagery */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="text-6xl">
                      {island.id === 'mythology' && '⚡'}
                      {island.id === 'spy' && '🕵️'}
                      {island.id === 'time_tangled' && '⏰'}
                      {island.id === 'survival' && '🏕️'}
                      {island.id === 'shrink_ray' && '🔬'}
                      {island.id === 'ghost_story' && '👻'}
                    </div>
                  </div>
                  
                  {/* Lock overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <Lock className="w-16 h-16 text-white" />
                    </div>
                  )}
                  
                  {/* Completion badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold text-sm flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Completed!
                    </div>
                  )}
                  
                  {/* Progress bar */}
                  {!isLocked && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-2">
                      <div className="bg-white bg-opacity-20 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-white text-xs mt-1 text-center">
                        Progress: {progress}%
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getDifficultyColor(island.difficulty)} text-white`}>
                      {getDifficultyIcon(island.difficulty)}
                      <span className="ml-1">{island.difficulty}</span>
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {island.quests.length} quest{island.quests.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl text-gray-800 mb-2">
                    {island.name}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600">
                    {island.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {isLocked ? (
                    <div className="text-center py-4">
                      <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Complete other islands to unlock</p>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg transform hover:scale-105 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/game/${island.id}`);
                      }}
                    >
                      {progress > 0 ? 'Continue Adventure' : 'Start Adventure'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Island Difficulty Guide</h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white">
                <Star className="w-4 h-4 mr-1" />
                Easy
              </Badge>
              <span className="text-white">Perfect for beginners</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-500 text-white">
                <Clock className="w-4 h-4 mr-1" />
                Medium
              </Badge>
              <span className="text-white">Some challenge required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-500 text-white">
                <Zap className="w-4 h-4 mr-1" />
                Hard
              </Badge>
              <span className="text-white">For experienced adventurers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-5px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(-8px); }
          66% { transform: translateY(-25px) translateX(12px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IslandMap;