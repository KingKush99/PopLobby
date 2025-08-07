import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Home, Search, Filter, Star, Package, Shirt, Sparkles } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Inventory = () => {
  const navigate = useNavigate();
  const { inventory, character } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'reward', name: 'Quest Rewards', icon: Star },
    { id: 'outfit', name: 'Outfits', icon: Shirt },
    { id: 'accessory', name: 'Accessories', icon: Sparkles }
  ];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.island && item.island.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getItemIcon = (type) => {
    switch (type) {
      case 'reward': return '🏆';
      case 'outfit': return '👕';
      case 'accessory': return '⭐';
      default: return '📦';
    }
  };

  const getItemColor = (type) => {
    switch (type) {
      case 'reward': return 'from-yellow-400 to-orange-500';
      case 'outfit': return 'from-blue-400 to-indigo-500';
      case 'accessory': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const totalItems = inventory.length;
  const rewardItems = inventory.filter(item => item.type === 'reward').length;
  const outfitItems = inventory.filter(item => item.type === 'outfit').length;
  const accessoryItems = inventory.filter(item => item.type === 'accessory').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-16 h-16 bg-white bg-opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-24 w-12 h-12 bg-yellow-300 bg-opacity-25 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-pink-300 bg-opacity-20 rounded-full animate-bounce"></div>
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
        
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">My Inventory</h1>
        
        <div className="flex items-center space-x-2 text-white">
          <Package className="w-5 h-5" />
          <span className="font-medium">{totalItems} items</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white bg-opacity-95 shadow-xl border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalItems}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white bg-opacity-95 shadow-xl border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{rewardItems}</div>
              <div className="text-sm text-gray-600">Quest Rewards</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white bg-opacity-95 shadow-xl border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{outfitItems}</div>
              <div className="text-sm text-gray-600">Outfits</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white bg-opacity-95 shadow-xl border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">{accessoryItems}</div>
              <div className="text-sm text-gray-600">Accessories</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-800 mb-3">Categories</h3>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const count = category.id === 'all' ? totalItems : 
                                 inventory.filter(item => item.type === category.id).length;
                    
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          selectedCategory === category.id 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        <span className="flex-1 text-left">{category.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  My Items
                  {searchTerm && (
                    <Badge variant="outline" className="ml-2">
                      {filteredInventory.length} result{filteredInventory.length !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredInventory.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {inventory.length === 0 ? 'Your inventory is empty' : 'No items found'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {inventory.length === 0 
                        ? 'Complete quests and explore islands to collect items!'
                        : 'Try adjusting your search or filter settings.'
                      }
                    </p>
                    {inventory.length === 0 && (
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        onClick={() => navigate('/map')}
                      >
                        Explore Islands
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredInventory.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                      >
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${getItemColor(item.type)} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                            {getItemIcon(item.type)}
                          </div>
                          
                          <h3 className="font-bold text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          
                          <Badge 
                            variant="outline"
                            className={`mb-2 ${
                              item.type === 'reward' ? 'border-yellow-500 text-yellow-700' :
                              item.type === 'outfit' ? 'border-blue-500 text-blue-700' :
                              item.type === 'accessory' ? 'border-purple-500 text-purple-700' :
                              'border-gray-500 text-gray-700'
                            }`}
                          >
                            {item.type === 'reward' && <Star className="w-3 h-3 mr-1" />}
                            {item.type === 'outfit' && <Shirt className="w-3 h-3 mr-1" />}
                            {item.type === 'accessory' && <Sparkles className="w-3 h-3 mr-1" />}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          {item.island && (
                            <div>
                              <span className="font-medium">From:</span> {item.island}
                            </div>
                          )}
                          {item.questName && (
                            <div>
                              <span className="font-medium">Quest:</span> {item.questName}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Obtained:</span>{' '}
                            {new Date(item.id).toLocaleDateString()}
                          </div>
                        </div>

                        {(item.type === 'outfit' || item.type === 'accessory') && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                            onClick={() => navigate('/character')}
                          >
                            Use Item
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(8px); }
          66% { transform: translateY(-8px) translateX(-5px); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(-6px); }
          66% { transform: translateY(-20px) translateX(10px); }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Inventory;