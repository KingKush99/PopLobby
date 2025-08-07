import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Home, Save, RotateCcw } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { mockData } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const CharacterCustomization = () => {
  const navigate = useNavigate();
  const { character, updateCharacter } = useGame();
  const { toast } = useToast();
  const [tempCharacter, setTempCharacter] = useState({ ...character });
  const [characterName, setCharacterName] = useState(character.name);

  const handleCustomizationChange = (category, value) => {
    setTempCharacter(prev => ({ ...prev, [category]: value }));
  };

  const handleAccessoryToggle = (accessoryId) => {
    setTempCharacter(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessoryId)
        ? prev.accessories.filter(id => id !== accessoryId)
        : [...prev.accessories, accessoryId]
    }));
  };

  const saveCharacter = () => {
    updateCharacter({ ...tempCharacter, name: characterName });
    toast({
      title: "Character Saved!",
      description: "Your character customization has been saved successfully.",
    });
  };

  const resetToDefault = () => {
    setTempCharacter({ ...mockData.defaultCharacter });
    setCharacterName(mockData.defaultCharacter.name);
    toast({
      title: "Character Reset",
      description: "Your character has been reset to default settings.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-20 w-24 h-24 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-yellow-300 bg-opacity-25 rounded-full animate-bounce"></div>
        <div className="absolute bottom-24 left-1/3 w-20 h-20 bg-pink-300 bg-opacity-30 rounded-full animate-pulse delay-300"></div>
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
        
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Character Customization</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            onClick={resetToDefault}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button 
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={saveCharacter}
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Character Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">Your Character</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {/* Character Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Character Name
                  </label>
                  <Input
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="text-center font-medium text-lg"
                    placeholder="Enter character name"
                  />
                </div>

                {/* Character Avatar Preview */}
                <div className="mb-6 p-8 bg-gradient-to-b from-sky-200 to-emerald-200 rounded-lg">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-4xl text-white shadow-lg">
                    👤
                  </div>
                  <div className="mt-4 text-lg font-bold text-gray-700">
                    {characterName || 'Your Character'}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Outfit: {mockData.characterOptions.outfit.find(o => o.id === tempCharacter.outfit)?.name || 'Unknown'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Hair: {mockData.characterOptions.hair.find(h => h.id === tempCharacter.hair)?.name || 'Unknown'}
                  </div>
                  {tempCharacter.accessories.length > 0 && (
                    <div className="text-sm text-gray-600">
                      Accessories: {tempCharacter.accessories.length}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Style Points</div>
                    <div className="text-xl font-bold text-blue-600">
                      {tempCharacter.accessories.length * 25 + 100}
                    </div>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Uniqueness</div>
                    <div className="text-xl font-bold text-purple-600">
                      {Math.min(100, tempCharacter.accessories.length * 15 + 40)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="lg:col-span-2">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Customize Your Look</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hair" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="hair">Hair</TabsTrigger>
                    <TabsTrigger value="outfit">Outfits</TabsTrigger>
                    <TabsTrigger value="accessories">Accessories</TabsTrigger>
                    <TabsTrigger value="skin">Skin</TabsTrigger>
                  </TabsList>

                  {/* Hair Options */}
                  <TabsContent value="hair">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockData.characterOptions.hair.map((hair) => (
                        <div
                          key={hair.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                            tempCharacter.hair === hair.id
                              ? 'border-purple-500 bg-purple-100 shadow-lg transform scale-105'
                              : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('hair', hair.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                            💇‍♀️
                          </div>
                          <div className="text-center text-sm font-medium text-gray-700">
                            {hair.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Outfit Options */}
                  <TabsContent value="outfit">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockData.characterOptions.outfit.map((outfit) => (
                        <div
                          key={outfit.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                            tempCharacter.outfit === outfit.id
                              ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-105'
                              : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('outfit', outfit.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                            👕
                          </div>
                          <div className="text-center text-sm font-medium text-gray-700">
                            {outfit.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Accessories Options */}
                  <TabsContent value="accessories">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockData.characterOptions.accessories.map((accessory) => (
                        <div
                          key={accessory.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                            tempCharacter.accessories.includes(accessory.id)
                              ? 'border-green-500 bg-green-100 shadow-lg transform scale-105'
                              : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleAccessoryToggle(accessory.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                            ⭐
                          </div>
                          <div className="text-center text-sm font-medium text-gray-700">
                            {accessory.name}
                          </div>
                          {tempCharacter.accessories.includes(accessory.id) && (
                            <div className="text-center text-xs text-green-600 mt-1 font-medium">
                              ✓ Equipped
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Skin Options */}
                  <TabsContent value="skin">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockData.characterOptions.skin.map((skin) => (
                        <div
                          key={skin.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                            tempCharacter.skin === skin.id
                              ? 'border-orange-500 bg-orange-100 shadow-lg transform scale-105'
                              : 'border-gray-200 bg-gray-50 hover:border-orange-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('skin', skin.id)}
                        >
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-white shadow-md"
                            style={{ backgroundColor: skin.color }}
                          ></div>
                          <div className="text-center text-sm font-medium text-gray-700">
                            {skin.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;