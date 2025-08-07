import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Play, Map, User, Package } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { character } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 bg-opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 bg-opacity-25 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-purple-300 bg-opacity-20 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-10 p-6 flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Poptropica</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
            <User className="w-5 h-5 text-white" />
            <span className="text-white font-medium">{character.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to Poptropica!
          </h1>
          <p className="text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Explore mysterious islands, solve exciting quests, and customize your character in the ultimate virtual adventure!
          </p>
          
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => navigate('/map')}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Adventure
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Explore Islands</CardTitle>
              <CardDescription className="text-gray-600">
                Discover amazing islands filled with quests and adventures
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                onClick={() => navigate('/map')}
              >
                View Island Map
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Customize Character</CardTitle>
              <CardDescription className="text-gray-600">
                Create your unique avatar with countless customization options
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline"
                className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200"
                onClick={() => navigate('/character')}
              >
                Customize Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-800">My Inventory</CardTitle>
              <CardDescription className="text-gray-600">
                Check out all the items and rewards you've collected
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline"
                className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200"
                onClick={() => navigate('/inventory')}
              >
                View Inventory
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Islands Preview */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">Featured Islands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Mythology Island", color: "from-purple-400 to-pink-400", emoji: "⚡" },
              { name: "Spy Island", color: "from-gray-700 to-gray-900", emoji: "🕵️" },
              { name: "Time Tangled Island", color: "from-blue-400 to-indigo-500", emoji: "⏰" }
            ].map((island, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${island.color} rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => navigate('/map')}
              >
                <div className="text-4xl mb-3">{island.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{island.name}</h3>
                <p className="text-sm opacity-90">Click to explore this amazing adventure!</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 bg-white bg-opacity-10 backdrop-blur-sm p-6 text-center text-white">
        <p className="text-lg">Ready for your next adventure? The islands are waiting for you!</p>
      </footer>
    </div>
  );
};

export default HomePage;