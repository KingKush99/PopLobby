import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Home, Map, Package, CheckCircle, Clock, Star } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { mockData } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const GameWorld = () => {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const { gameProgress, completeQuest, addToInventory } = useGame();
  const { toast } = useToast();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isPlayingQuest, setIsPlayingQuest] = useState(false);
  
  const island = mockData.islands.find(i => i.id === islandId);
  const progress = gameProgress[islandId];
  const completedQuests = progress?.completedQuests || [];
  
  useEffect(() => {
    if (island && island.quests.length > 0 && !selectedQuest) {
      setSelectedQuest(island.quests[0]);
    }
  }, [island, selectedQuest]);

  if (!island) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Island Not Found</h1>
          <Button onClick={() => navigate('/map')} className="bg-white text-red-500">
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  const handleQuestComplete = (quest) => {
    if (completedQuests.includes(quest.id)) return;
    
    setIsPlayingQuest(true);
    
    // Simulate quest gameplay
    setTimeout(() => {
      completeQuest(islandId, quest.id);
      addToInventory({ 
        name: quest.reward, 
        type: 'reward', 
        island: island.name,
        questName: quest.name
      });
      
      toast({
        title: "Quest Completed!",
        description: `You've earned: ${quest.reward}`,
      });
      
      setIsPlayingQuest(false);
    }, 3000);
  };

  const islandProgressPercent = island.quests.length > 0 
    ? Math.round((completedQuests.length / island.quests.length) * 100) 
    : 0;

  const getIslandBackground = (id) => {
    const backgrounds = {
      mythology: 'from-purple-600 via-purple-500 to-pink-500',
      spy: 'from-gray-800 via-gray-700 to-black',
      time_tangled: 'from-blue-600 via-indigo-500 to-purple-600',
      survival: 'from-green-700 via-emerald-600 to-teal-500',
      shrink_ray: 'from-cyan-500 via-blue-500 to-indigo-600',
      ghost_story: 'from-gray-900 via-purple-900 to-indigo-900'
    };
    return backgrounds[id] || 'from-blue-500 to-purple-600';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getIslandBackground(islandId)} relative overflow-hidden`}>
      {/* Atmospheric background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-yellow-300 bg-opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-white bg-opacity-15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-purple-300 bg-opacity-25 rounded-full animate-ping"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 p-6 flex justify-between items-center bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            onClick={() => navigate('/map')}
          >
            <Map className="w-4 h-4 mr-1" />
            Map
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            onClick={() => navigate('/inventory')}
          >
            <Package className="w-4 h-4 mr-1" />
            Inventory
          </Button>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">{island.name}</h1>
          <div className="flex items-center justify-center space-x-2 mt-1">
            <Progress value={islandProgressPercent} className="w-32 h-2" />
            <span className="text-white text-sm">{islandProgressPercent}%</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {islandProgressPercent === 100 && (
            <Badge className="bg-yellow-500 text-yellow-900 font-bold">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Island Complete!
            </Badge>
          )}
        </div>
      </nav>

      {/* Main Game Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {isPlayingQuest ? (
          /* Quest Playing View */
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg bg-white bg-opacity-95 shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-gray-800">
                  Playing Quest...
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="text-2xl">🎮</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedQuest?.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedQuest?.description}
                  </p>
                </div>
                <Progress value={66} className="w-full" />
                <p className="text-sm text-gray-500">
                  Completing quest... Please wait!
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Normal Island View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Island Info */}
            <div className="lg:col-span-1">
              <Card className="bg-white bg-opacity-95 shadow-2xl border-0 mb-6">
                <CardHeader>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-4">
                      {islandId === 'mythology' && '⚡'}
                      {islandId === 'spy' && '🕵️'}
                      {islandId === 'time_tangled' && '⏰'}
                      {islandId === 'survival' && '🏕️'}
                      {islandId === 'shrink_ray' && '🔬'}
                      {islandId === 'ghost_story' && '👻'}
                    </div>
                    <CardTitle className="text-2xl text-gray-800 mb-2">
                      {island.name}
                    </CardTitle>
                    <p className="text-gray-600">{island.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="text-sm font-bold text-gray-800">
                        {completedQuests.length} / {island.quests.length} quests
                      </span>
                    </div>
                    
                    <Progress value={islandProgressPercent} className="w-full" />
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {island.difficulty}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        {island.quests.length} quest{island.quests.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Island Stats */}
              <Card className="bg-white bg-opacity-95 shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Island Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {completedQuests.length}
                      </div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {island.quests.length - completedQuests.length}
                      </div>
                      <div className="text-xs text-gray-600">Remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quests List */}
            <div className="lg:col-span-2">
              <Card className="bg-white bg-opacity-95 shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Available Quests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {island.quests.map((quest) => {
                      const isCompleted = completedQuests.includes(quest.id);
                      
                      return (
                        <div
                          key={quest.id}
                          className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                            isCompleted
                              ? 'border-green-300 bg-green-50'
                              : selectedQuest?.id === quest.id
                              ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-102'
                              : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:shadow-md hover:scale-101'
                          }`}
                          onClick={() => !isCompleted && setSelectedQuest(quest)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-bold text-gray-800">
                                  {quest.name}
                                </h3>
                                {isCompleted && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                              </div>
                              
                              <p className="text-gray-600 mb-3">
                                {quest.description}
                              </p>
                              
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Star className="w-4 h-4" />
                                  <span>Reward: {quest.reward}</span>
                                </div>
                                
                                {!isCompleted && (
                                  <div className="flex items-center space-x-1 text-sm text-blue-500">
                                    <Clock className="w-4 h-4" />
                                    <span>~5 min</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              {isCompleted ? (
                                <Badge className="bg-green-500 text-white">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Completed
                                </Badge>
                              ) : (
                                <Button
                                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold transform hover:scale-105 transition-all duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuestComplete(quest);
                                  }}
                                >
                                  Start Quest
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {island.quests.every(quest => completedQuests.includes(quest.id)) && (
                    <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-white">
                      <div className="text-4xl mb-4">🎉</div>
                      <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                      <p className="text-lg">You've completed all quests on {island.name}!</p>
                      <Button 
                        className="mt-4 bg-white text-orange-600 hover:bg-gray-100"
                        onClick={() => navigate('/map')}
                      >
                        Explore More Islands
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameWorld;