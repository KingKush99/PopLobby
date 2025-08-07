export const mockData = {
  defaultCharacter: {
    name: "Adventurer",
    hair: "brown_short",
    outfit: "casual_blue",
    accessories: [],
    skin: "light",
    eyes: "brown"
  },

  characterOptions: {
    hair: [
      { id: "brown_short", name: "Short Brown", image: "/images/hair/brown_short.png" },
      { id: "blonde_long", name: "Long Blonde", image: "/images/hair/blonde_long.png" },
      { id: "black_curly", name: "Curly Black", image: "/images/hair/black_curly.png" },
      { id: "red_wavy", name: "Wavy Red", image: "/images/hair/red_wavy.png" },
      { id: "purple_punk", name: "Punk Purple", image: "/images/hair/purple_punk.png" }
    ],
    outfit: [
      { id: "casual_blue", name: "Casual Blue", image: "/images/outfits/casual_blue.png" },
      { id: "formal_suit", name: "Formal Suit", image: "/images/outfits/formal_suit.png" },
      { id: "adventure_gear", name: "Adventure Gear", image: "/images/outfits/adventure_gear.png" },
      { id: "superhero", name: "Superhero", image: "/images/outfits/superhero.png" },
      { id: "pirate", name: "Pirate Costume", image: "/images/outfits/pirate.png" }
    ],
    accessories: [
      { id: "glasses", name: "Glasses", image: "/images/accessories/glasses.png" },
      { id: "hat", name: "Cool Hat", image: "/images/accessories/hat.png" },
      { id: "necklace", name: "Magic Necklace", image: "/images/accessories/necklace.png" },
      { id: "backpack", name: "Explorer Backpack", image: "/images/accessories/backpack.png" }
    ],
    skin: [
      { id: "light", name: "Light", color: "#FDBCB4" },
      { id: "medium", name: "Medium", color: "#E0AC69" },
      { id: "dark", name: "Dark", color: "#8D5524" },
      { id: "olive", name: "Olive", color: "#C68642" }
    ]
  },

  islands: [
    {
      id: "mythology",
      name: "Mythology Island",
      description: "Journey through ancient Greek myths and legends",
      difficulty: "Medium",
      image: "/images/islands/mythology.png",
      status: "available",
      quests: [
        {
          id: "quest_1",
          name: "Find the Golden Apple",
          description: "Help the gods retrieve the stolen golden apple",
          reward: "Hermes' Sandals",
          completed: false
        },
        {
          id: "quest_2", 
          name: "Escape the Labyrinth",
          description: "Navigate through the minotaur's maze",
          reward: "Thread of Ariadne",
          completed: false
        }
      ]
    },
    {
      id: "spy",
      name: "Spy Island",
      description: "Become a secret agent and stop the villains",
      difficulty: "Hard",
      image: "/images/islands/spy.png",
      status: "available",
      quests: [
        {
          id: "spy_quest_1",
          name: "Infiltrate the Hideout",
          description: "Sneak into the secret base undetected",
          reward: "Spy Gadgets",
          completed: false
        }
      ]
    },
    {
      id: "time_tangled",
      name: "Time Tangled Island",
      description: "Fix history by traveling through time",
      difficulty: "Easy",
      image: "/images/islands/time_tangled.png",
      status: "available",
      quests: [
        {
          id: "time_quest_1",
          name: "Repair the Timeline",
          description: "Return historical items to their proper time periods",
          reward: "Time Device",
          completed: false
        }
      ]
    },
    {
      id: "survival",
      name: "Survival Island",
      description: "Survive in the wilderness using your wits",
      difficulty: "Hard",
      image: "/images/islands/survival.png",
      status: "locked",
      quests: [
        {
          id: "survival_quest_1",
          name: "Build Shelter",
          description: "Create a safe place to survive the night",
          reward: "Survival Kit",
          completed: false
        }
      ]
    },
    {
      id: "shrink_ray",
      name: "Shrink Ray Island",
      description: "Get shrunk down to microscopic size",
      difficulty: "Medium",
      image: "/images/islands/shrink_ray.png",
      status: "available",
      quests: [
        {
          id: "shrink_quest_1",
          name: "Navigate the Microscopic World",
          description: "Find your way back to normal size",
          reward: "Shrink Ray Device",
          completed: false
        }
      ]
    },
    {
      id: "ghost_story",
      name: "Ghost Story Island",
      description: "Solve the mystery of the haunted mansion",
      difficulty: "Medium",
      image: "/images/islands/ghost_story.png",
      status: "available",
      quests: [
        {
          id: "ghost_quest_1",
          name: "Investigate the Mansion",
          description: "Uncover the secrets of the haunted house",
          reward: "Ghost Detector",
          completed: false
        }
      ]
    }
  ],

  storeItems: [
    {
      id: "premium_outfit_1",
      name: "Dragon Warrior Outfit",
      price: 250,
      category: "outfit",
      image: "/images/store/dragon_outfit.png",
      description: "Become a legendary dragon warrior!"
    },
    {
      id: "premium_hair_1", 
      name: "Rainbow Hair",
      price: 150,
      category: "hair",
      image: "/images/store/rainbow_hair.png",
      description: "Show off your colorful personality!"
    },
    {
      id: "premium_accessory_1",
      name: "Magic Wings",
      price: 300,
      category: "accessories",
      image: "/images/store/magic_wings.png",
      description: "Soar through the skies with magical wings!"
    }
  ],

  achievements: [
    {
      id: "first_island",
      name: "Island Explorer",
      description: "Complete your first island",
      icon: "🏝️",
      unlocked: false
    },
    {
      id: "customizer",
      name: "Style Master",
      description: "Customize your character 10 times",
      icon: "✨",
      unlocked: false
    },
    {
      id: "collector",
      name: "Item Collector",
      description: "Collect 25 items",
      icon: "💎",
      unlocked: false
    }
  ]
};