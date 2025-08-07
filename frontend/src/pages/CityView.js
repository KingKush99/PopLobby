import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home, Map, Package } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { mockData } from '../data/mock';
import PoptropicaCharacter from '../components/PoptropicaCharacter';

const CityView = () => {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const { character } = useGame();
  
  // Character position and movement
  const [characterPos, setCharacterPos] = useState({ x: 400, y: 300 });
  const [isMoving, setIsMoving] = useState(false);
  const [facingDirection, setFacingDirection] = useState('right');
  const [currentBuilding, setCurrentBuilding] = useState(null);
  
  // Camera/viewport position
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });
  
  const island = mockData.islands.find(i => i.id === islandId);
  
  // City dimensions
  const CITY_WIDTH = 1600;
  const CITY_HEIGHT = 600;
  const VIEWPORT_WIDTH = 1920;
  const VIEWPORT_HEIGHT = 800;

  // Buildings and NPCs data
  const cityElements = {
    wild_west: {
      buildings: [
        { id: 'saloon', name: 'Golden Saloon', x: 200, y: 200, width: 120, height: 100, type: 'saloon' },
        { id: 'bank', name: 'First National Bank', x: 500, y: 180, width: 100, height: 120, type: 'bank' },
        { id: 'sheriff', name: 'Sheriff Office', x: 800, y: 190, width: 90, height: 110, type: 'sheriff' },
        { id: 'general', name: 'General Store', x: 1100, y: 200, width: 110, height: 100, type: 'store' },
        { id: 'hotel', name: 'Desert Rose Hotel', x: 1400, y: 180, width: 130, height: 120, type: 'hotel' }
      ],
      npcs: [
        { id: 'cowboy1', name: 'Sheriff Johnson', x: 850, y: 350, dialogue: "Howdy partner! Welcome to our little town.", type: 'sheriff' },
        { id: 'cowboy2', name: 'Saloon Sally', x: 250, y: 350, dialogue: "Come on in for a drink, stranger!", type: 'bartender' },
        { id: 'cowboy3', name: 'Old Pete', x: 600, y: 370, dialogue: "Been prospecting these parts for 30 years!", type: 'prospector' },
        { id: 'cowboy4', name: 'Miss Annie', x: 1200, y: 360, dialogue: "Need supplies? I got everything you need!", type: 'shopkeeper' }
      ]
    },
    // Add more city configurations for other islands
    default: {
      buildings: [
        { id: 'main', name: 'Main Building', x: 400, y: 200, width: 120, height: 100, type: 'main' },
        { id: 'shop', name: 'Shop', x: 700, y: 220, width: 100, height: 80, type: 'shop' }
      ],
      npcs: [
        { id: 'npc1', name: 'Friendly Local', x: 300, y: 350, dialogue: "Welcome to our island!", type: 'local' },
        { id: 'npc2', name: 'Quest Giver', x: 600, y: 370, dialogue: "I have a task for you!", type: 'quest' }
      ]
    }
  };

  const currentCity = cityElements[islandId] || cityElements.default;

  // Keyboard movement handling
  const handleKeyPress = useCallback((event) => {
    if (currentBuilding) return; // Don't move if inside building
    
    const speed = 5;
    const newPos = { ...characterPos };
    let direction = facingDirection;
    let moving = true;

    switch (event.key.toLowerCase()) {
      case 'arrowleft':
      case 'a':
        newPos.x = Math.max(30, newPos.x - speed);
        direction = 'left';
        break;
      case 'arrowright':
      case 'd':
        newPos.x = Math.min(CITY_WIDTH - 30, newPos.x + speed);
        direction = 'right';
        break;
      case 'arrowup':
      case 'w':
        newPos.y = Math.max(250, newPos.y - speed); // Don't go above road level
        break;
      case 'arrowdown':
      case 's':
        newPos.y = Math.min(CITY_HEIGHT - 100, newPos.y + speed);
        break;
      case 'enter':
      case ' ':
        checkInteractions();
        return;
      default:
        moving = false;
    }

    if (moving) {
      setCharacterPos(newPos);
      setFacingDirection(direction);
      setIsMoving(true);
      
      // Update camera to follow character
      const newCameraX = Math.max(0, Math.min(CITY_WIDTH - VIEWPORT_WIDTH, newPos.x - VIEWPORT_WIDTH / 2));
      setCameraPos({ x: newCameraX, y: 0 });
      
      // Stop moving animation after a short delay
      setTimeout(() => setIsMoving(false), 200);
    }
  }, [characterPos, facingDirection, currentBuilding]);

  const handleKeyUp = useCallback(() => {
    setIsMoving(false);
  }, []);

  // Check for interactions with NPCs and buildings
  const checkInteractions = () => {
    // Check NPC interactions
    currentCity.npcs.forEach(npc => {
      const distance = Math.sqrt(
        Math.pow(characterPos.x - npc.x, 2) + Math.pow(characterPos.y - npc.y, 2)
      );
      if (distance < 60) {
        alert(`${npc.name}: "${npc.dialogue}"`);
      }
    });

    // Check building entrances
    currentCity.buildings.forEach(building => {
      const distance = Math.sqrt(
        Math.pow(characterPos.x - (building.x + building.width/2), 2) + 
        Math.pow(characterPos.y - (building.y + building.height), 2)
      );
      if (distance < 50) {
        enterBuilding(building);
      }
    });
  };

  const enterBuilding = (building) => {
    setCurrentBuilding(building);
  };

  const exitBuilding = () => {
    setCurrentBuilding(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

  if (!island) {
    return (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">City Not Found</h1>
          <Button onClick={() => navigate('/map')} className="bg-white text-red-500">
            Back to Map
          </Button>
        </div>
      </div>
    );
  }

  if (currentBuilding) {
    return (
      <div className="min-h-screen bg-amber-800 relative overflow-hidden">
        {/* Building Interior */}
        <div 
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23D4A574"/><rect x="50" y="100" width="700" height="400" fill="%23F4E4BC" stroke="%23A0703C" stroke-width="4"/><rect x="100" y="150" width="150" height="100" fill="%238B4513" rx="5"/><rect x="300" y="150" width="200" height="150" fill="%23654321"/><circle cx="400" cy="225" r="30" fill="%23FFD700"/><rect x="550" y="180" width="120" height="120" fill="%23A0522D"/></svg>')
            `
          }}
        >
          {/* Interior Header */}
          <div className="absolute top-0 left-0 right-0 bg-amber-900 bg-opacity-80 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-yellow-200">
                {currentBuilding.name}
              </h2>
              <Button 
                onClick={exitBuilding}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Exit Building
              </Button>
            </div>
          </div>

          {/* Building Interior Content */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <PoptropicaCharacter character={character} size="lg" />
          </div>

          {/* Interactive Elements in Building */}
          <div className="absolute bottom-10 left-10">
            <div className="bg-amber-700 text-yellow-200 p-3 rounded-lg max-w-xs">
              <p className="text-sm">
                {currentBuilding.type === 'saloon' && "Welcome to the saloon! Order a drink or play some cards."}
                {currentBuilding.type === 'bank' && "Keep your gold safe here! We offer the best rates in town."}
                {currentBuilding.type === 'sheriff' && "Law and order keeps this town running smooth."}
                {currentBuilding.type === 'store' && "Everything you need for your adventures!"}
                {currentBuilding.type === 'hotel' && "Rest up, partner. Long roads ahead."}
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded">
            <p className="text-sm">Press Exit Building to go back outside</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-sky-400 to-sky-300 relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-50 p-4 flex justify-between items-center bg-black bg-opacity-30 backdrop-blur-sm">
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
        
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">{island.name}</h1>
        
        <div className="text-white text-sm">
          Use WASD or Arrow Keys to move
        </div>
      </nav>

      {/* City View - Scrollable */}
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{ transform: `translateX(-${cameraPos.x}px)` }}
      >
        {/* Desert/Western Ground */}
        <div 
          className="absolute bottom-0 w-full h-64"
          style={{
            width: `${CITY_WIDTH}px`,
            background: `
              linear-gradient(180deg, 
                rgba(218, 182, 91, 0.9) 0%, 
                rgba(205, 165, 85, 0.9) 50%,
                rgba(195, 155, 80, 0.9) 100%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(160, 130, 80, 0.1) 0px,
                rgba(160, 130, 80, 0.1) 20px,
                transparent 20px,
                transparent 40px
              )
            `
          }}
        />

        {/* Road */}
        <div 
          className="absolute bottom-20 h-16 bg-amber-700 border-t-2 border-b-2 border-amber-900"
          style={{ width: `${CITY_WIDTH}px` }}
        />

        {/* Buildings */}
        {currentCity.buildings.map((building) => (
          <div
            key={building.id}
            className="absolute cursor-pointer transform hover:scale-105 transition-transform duration-200"
            style={{
              left: `${building.x}px`,
              top: `${building.y}px`,
              width: `${building.width}px`,
              height: `${building.height}px`
            }}
          >
            {/* Building Structure */}
            <div className="w-full h-full bg-amber-600 border-4 border-amber-800 rounded-t-lg relative">
              {/* Roof */}
              <div 
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-full h-8 bg-red-800 rounded-t-lg"
                style={{ width: '110%' }}
              />
              
              {/* Door */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-amber-900 rounded-t-lg" />
              
              {/* Windows */}
              <div className="absolute top-4 left-2 w-6 h-6 bg-yellow-200 border-2 border-amber-900" />
              <div className="absolute top-4 right-2 w-6 h-6 bg-yellow-200 border-2 border-amber-900" />
              
              {/* Sign */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-2 py-1 rounded border-2 border-yellow-600">
                <div className="text-xs font-bold text-center text-gray-800 whitespace-nowrap">
                  {building.name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* NPCs */}
        {currentCity.npcs.map((npc) => (
          <div
            key={npc.id}
            className="absolute"
            style={{
              left: `${npc.x}px`,
              top: `${npc.y}px`
            }}
          >
            {/* NPC Character */}
            <div className="w-8 h-12 bg-brown-600 rounded-full flex items-center justify-center text-lg">
              🤠
            </div>
            {/* NPC Name */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
              {npc.name}
            </div>
          </div>
        ))}

        {/* Player Character */}
        <div
          className="absolute z-40 transition-all duration-200"
          style={{
            left: `${characterPos.x - 15}px`,
            top: `${characterPos.y - 30}px`,
            transform: `scaleX(${facingDirection === 'left' ? -1 : 1}) ${isMoving ? 'translateY(-2px)' : ''}`
          }}
        >
          <PoptropicaCharacter character={character} size="sm" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-40 left-100 text-4xl">🌵</div>
        <div className="absolute bottom-44 right-200 text-3xl">🌵</div>
        <div className="absolute bottom-36 left-600 text-2xl">🪨</div>
        <div className="absolute bottom-38 right-500 text-3xl">🏜️</div>
      </div>

      {/* Interaction Prompt */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-3 rounded-lg">
        <p className="text-sm text-center">
          Use WASD or Arrow Keys to move • Press SPACE or ENTER to interact
        </p>
      </div>
    </div>
  );
};

export default CityView;