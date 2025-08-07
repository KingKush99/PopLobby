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
import PoptropicaCharacter from '../components/PoptropicaCharacter';

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
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-500 relative overflow-hidden">
      {/* Classic Poptropica Header */}
      <nav className="relative z-10 p-6 flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </Button>
        
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Character Creator</h1>
        
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
          
          {/* Character Preview - Classic Poptropica Style */}
          <div className="lg:col-span-1">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-4 border-yellow-400 sticky top-8">
              <CardHeader className="bg-yellow-400 text-center">
                <CardTitle className="text-2xl text-gray-800">Your Poptropican</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-8">
                {/* Character Name Input */}
                <div className="mb-6">
                  <Input
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="text-center font-bold text-lg border-2 border-yellow-400"
                    placeholder="Enter character name"
                  />
                </div>

                {/* Character Avatar - Now using the Poptropica-style component */}
                <div className="mb-6 p-6 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg border-4 border-blue-400">
                  <PoptropicaCharacter 
                    character={{ ...tempCharacter, name: characterName }} 
                    size="xl"
                  />
                </div>

                {/* Character Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-yellow-100 p-3 rounded-lg border-2 border-yellow-400">
                    <div className="text-sm text-gray-600">Style Points</div>
                    <div className="text-xl font-bold text-yellow-600">
                      {tempCharacter.accessories.length * 25 + 100}
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-400">
                    <div className="text-sm text-gray-600">Uniqueness</div>
                    <div className="text-xl font-bold text-blue-600">
                      {Math.min(100, tempCharacter.accessories.length * 15 + 40)}%
                    </div>
                  </div>
                </div>

                {/* Random Character Button */}
                <Button
                  className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2"
                  onClick={() => {
                    const randomHair = mockData.characterOptions.hair[Math.floor(Math.random() * mockData.characterOptions.hair.length)];
                    const randomOutfit = mockData.characterOptions.outfit[Math.floor(Math.random() * mockData.characterOptions.outfit.length)];
                    const randomSkin = mockData.characterOptions.skin[Math.floor(Math.random() * mockData.characterOptions.skin.length)];
                    setTempCharacter(prev => ({
                      ...prev,
                      hair: randomHair.id,
                      outfit: randomOutfit.id,
                      skin: randomSkin.id
                    }));
                  }}
                >
                  🎲 Random Look
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Customization Options - Classic Poptropica Style */}
          <div className="lg:col-span-2">
            <Card className="bg-white bg-opacity-95 shadow-2xl border-4 border-blue-400">
              <CardHeader className="bg-blue-400 text-white">
                <CardTitle className="text-2xl">Customize Your Poptropican</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="hair" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6 bg-yellow-400">
                    <TabsTrigger value="hair" className="data-[state=active]:bg-white">Hair</TabsTrigger>
                    <TabsTrigger value="outfit" className="data-[state=active]:bg-white">Outfits</TabsTrigger>
                    <TabsTrigger value="accessories" className="data-[state=active]:bg-white">Accessories</TabsTrigger>
                    <TabsTrigger value="skin" className="data-[state=active]:bg-white">Skin</TabsTrigger>
                  </TabsList>

                  {/* Hair Options */}
                  <TabsContent value="hair">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {mockData.characterOptions.hair.map((hair) => (
                        <div
                          key={hair.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-4 ${
                            tempCharacter.hair === hair.id
                              ? 'border-yellow-400 bg-yellow-100 shadow-lg transform scale-105'
                              : 'border-gray-300 bg-gray-50 hover:border-yellow-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('hair', hair.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl border-2 border-amber-600">
                            💇‍♀️
                          </div>
                          <div className="text-center text-sm font-bold text-gray-700">
                            {hair.name}
                          </div>
                          {tempCharacter.hair === hair.id && (
                            <div className="text-center text-xs text-yellow-600 mt-1 font-bold">
                              ✓ SELECTED
                            </div>
                          )}
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
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-4 ${
                            tempCharacter.outfit === outfit.id
                              ? 'border-blue-400 bg-blue-100 shadow-lg transform scale-105'
                              : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('outfit', outfit.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl border-2 border-blue-600">
                            👕
                          </div>
                          <div className="text-center text-sm font-bold text-gray-700">
                            {outfit.name}
                          </div>
                          {tempCharacter.outfit === outfit.id && (
                            <div className="text-center text-xs text-blue-600 mt-1 font-bold">
                              ✓ EQUIPPED
                            </div>
                          )}
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
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-4 ${
                            tempCharacter.accessories.includes(accessory.id)
                              ? 'border-green-400 bg-green-100 shadow-lg transform scale-105'
                              : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleAccessoryToggle(accessory.id)}
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl border-2 border-green-600">
                            ⭐
                          </div>
                          <div className="text-center text-sm font-bold text-gray-700">
                            {accessory.name}
                          </div>
                          {tempCharacter.accessories.includes(accessory.id) && (
                            <div className="text-center text-xs text-green-600 mt-1 font-bold">
                              ✓ EQUIPPED
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
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-4 ${
                            tempCharacter.skin === skin.id
                              ? 'border-orange-400 bg-orange-100 shadow-lg transform scale-105'
                              : 'border-gray-300 bg-gray-50 hover:border-orange-300 hover:shadow-md hover:scale-102'
                          }`}
                          onClick={() => handleCustomizationChange('skin', skin.id)}
                        >
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
                            style={{ backgroundColor: skin.color }}
                          ></div>
                          <div className="text-center text-sm font-bold text-gray-700">
                            {skin.name}
                          </div>
                          {tempCharacter.skin === skin.id && (
                            <div className="text-center text-xs text-orange-600 mt-1 font-bold">
                              ✓ SELECTED
                            </div>
                          )}
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