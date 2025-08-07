import React from 'react';

const PoptropicaCharacter = ({ character, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-32 h-40',
    xl: 'w-48 h-56'
  };

  const getSkinColor = (skinId) => {
    const colors = {
      light: '#FDBCB4',
      medium: '#E0AC69',
      dark: '#8D5524',
      olive: '#C68642'
    };
    return colors[skinId] || colors.light;
  };

  const getHairStyle = (hairId) => {
    const styles = {
      brown_short: { color: '#8B4513', style: 'short' },
      blonde_long: { color: '#FFD700', style: 'long' },
      black_curly: { color: '#000000', style: 'curly' },
      red_wavy: { color: '#DC143C', style: 'wavy' },
      purple_punk: { color: '#8A2BE2', style: 'punk' }
    };
    return styles[hairId] || styles.brown_short;
  };

  const getOutfitColor = (outfitId) => {
    const outfits = {
      casual_blue: { primary: '#4169E1', secondary: '#87CEEB' },
      formal_suit: { primary: '#000000', secondary: '#FFFFFF' },
      adventure_gear: { primary: '#8B4513', secondary: '#F4A460' },
      superhero: { primary: '#FF0000', secondary: '#FFD700' },
      pirate: { primary: '#800000', secondary: '#000000' }
    };
    return outfits[outfitId] || outfits.casual_blue;
  };

  const skinColor = getSkinColor(character.skin);
  const hairData = getHairStyle(character.hair);
  const outfitData = getOutfitColor(character.outfit);
  const hasGlasses = character.accessories?.includes('glasses');
  const hasHat = character.accessories?.includes('hat');

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Character Body */}
        <ellipse cx="50" cy="95" rx="15" ry="20" fill={outfitData.primary} />
        
        {/* Arms */}
        <ellipse cx="30" cy="80" rx="8" ry="15" fill={skinColor} />
        <ellipse cx="70" cy="80" rx="8" ry="15" fill={skinColor} />
        
        {/* Legs */}
        <ellipse cx="42" cy="110" rx="6" ry="8" fill="#4169E1" />
        <ellipse cx="58" cy="110" rx="6" ry="8" fill="#4169E1" />
        
        {/* Shoes */}
        <ellipse cx="42" cy="118" rx="8" ry="3" fill="#8B4513" />
        <ellipse cx="58" cy="118" rx="8" ry="3" fill="#8B4513" />
        
        {/* Head */}
        <circle cx="50" cy="40" r="25" fill={skinColor} stroke="#000" strokeWidth="1" />
        
        {/* Hair */}
        {hairData.style === 'short' && (
          <path d="M 25 35 Q 50 15 75 35 Q 70 25 50 20 Q 30 25 25 35" fill={hairData.color} />
        )}
        {hairData.style === 'long' && (
          <path d="M 20 30 Q 50 10 80 30 Q 80 45 75 50 Q 70 35 50 20 Q 30 35 25 50 Q 20 45 20 30" fill={hairData.color} />
        )}
        {hairData.style === 'curly' && (
          <>
            <circle cx="35" cy="25" r="8" fill={hairData.color} />
            <circle cx="50" cy="20" r="10" fill={hairData.color} />
            <circle cx="65" cy="25" r="8" fill={hairData.color} />
          </>
        )}
        {hairData.style === 'wavy' && (
          <path d="M 25 30 Q 35 15 45 25 Q 55 15 65 25 Q 75 15 75 35 Q 70 30 50 20 Q 30 30 25 30" fill={hairData.color} />
        )}
        {hairData.style === 'punk' && (
          <>
            <path d="M 40 20 L 42 5 L 44 20" fill={hairData.color} />
            <path d="M 48 18 L 50 3 L 52 18" fill={hairData.color} />
            <path d="M 56 20 L 58 5 L 60 20" fill={hairData.color} />
          </>
        )}
        
        {/* Eyes - Classic Poptropica Style */}
        <circle cx="42" cy="38" r="4" fill="white" stroke="#000" strokeWidth="1" />
        <circle cx="58" cy="38" r="4" fill="white" stroke="#000" strokeWidth="1" />
        <circle cx="42" cy="38" r="2" fill="black" />
        <circle cx="58" cy="38" r="2" fill="black" />
        
        {/* Glasses */}
        {hasGlasses && (
          <>
            <circle cx="42" cy="38" r="6" fill="none" stroke="#000" strokeWidth="2" />
            <circle cx="58" cy="38" r="6" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="48" y1="38" x2="52" y2="38" stroke="#000" strokeWidth="2" />
          </>
        )}
        
        {/* Mouth */}
        <path d="M 45 48 Q 50 52 55 48" fill="none" stroke="#000" strokeWidth="1.5" />
        
        {/* Hat */}
        {hasHat && (
          <>
            <ellipse cx="50" cy="20" rx="20" ry="5" fill="#FF0000" />
            <ellipse cx="50" cy="18" rx="15" ry="8" fill="#FF0000" />
          </>
        )}
        
        {/* Outfit Details */}
        <ellipse cx="50" cy="85" rx="12" ry="15" fill={outfitData.secondary} />
        
        {/* Accessories indicators */}
        {character.accessories?.includes('necklace') && (
          <circle cx="50" cy="70" r="3" fill="#FFD700" stroke="#000" strokeWidth="0.5" />
        )}
        {character.accessories?.includes('backpack') && (
          <ellipse cx="65" cy="75" rx="5" ry="8" fill="#8B4513" stroke="#000" strokeWidth="1" />
        )}
      </svg>
      
      {/* Character Name */}
      <div className="text-center mt-1 text-xs font-bold text-gray-800">
        {character.name}
      </div>
    </div>
  );
};

export default PoptropicaCharacter;