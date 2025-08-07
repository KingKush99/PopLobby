# Poptropica Clone - API Contracts & Integration Plan

## Overview
This document defines the API contracts and integration plan for converting the frontend-only Poptropica clone to a full-stack application.

## Current Mock Data (to be replaced)
- **Character data**: Stored in localStorage via GameContext
- **Island progress**: Stored in localStorage 
- **Inventory items**: Stored in localStorage
- **Game state**: All managed through React Context with browser storage

## API Endpoints to Implement

### 1. Authentication & User Management
```
POST /api/auth/register - Create new user account
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user info
```

### 2. Character Management
```
GET /api/characters/me - Get user's character data
PUT /api/characters/me - Update character (appearance, name, etc.)
POST /api/characters/reset - Reset character to default
```

### 3. Islands & Game Progress
```
GET /api/islands - Get all available islands
GET /api/islands/:islandId - Get specific island details
GET /api/progress - Get user's game progress across all islands
PUT /api/progress/:islandId/quest/:questId - Complete a quest
GET /api/progress/:islandId - Get progress for specific island
```

### 4. Inventory System
```
GET /api/inventory - Get user's inventory items
POST /api/inventory - Add item to inventory (when quest completed)
DELETE /api/inventory/:itemId - Remove item from inventory
PUT /api/inventory/:itemId/equip - Equip/unequip item
```

### 5. Achievements & Stats
```
GET /api/achievements - Get user's achievements
POST /api/achievements/:achievementId - Unlock achievement
GET /api/stats - Get user's game statistics
```

## Database Models

### User
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  lastLoginAt: Date
}
```

### Character
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  hair: String,
  outfit: String,
  accessories: [String],
  skin: String,
  eyes: String,
  level: Number (default: 1),
  experience: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### GameProgress
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  islandId: String,
  completedQuests: [String],
  isCompleted: Boolean,
  lastPlayedAt: Date,
  totalTimeSpent: Number (minutes),
  createdAt: Date,
  updatedAt: Date
}
```

### InventoryItem
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  type: String, // 'reward', 'outfit', 'accessory'
  island: String,
  questName: String,
  isEquipped: Boolean (default: false),
  obtainedAt: Date
}
```

### Achievement
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  achievementId: String,
  unlockedAt: Date
}
```

## Frontend Integration Changes

### 1. Replace GameContext
- Remove localStorage dependencies
- Implement API calls using axios
- Add loading states and error handling
- Implement optimistic updates where appropriate

### 2. Add Authentication Flow
- Login/Register forms
- Protected routes
- JWT token management
- Auto-logout on token expiry

### 3. Update Component Integration
- **HomePage**: Add auth check, user welcome
- **CharacterCustomization**: Real-time character saving to API
- **IslandMap**: Fetch real progress from API
- **GameWorld**: Real quest completion with API calls
- **Inventory**: Real inventory management with API

## API Response Formats

### Success Response
```javascript
{
  success: true,
  data: {...},
  message: "Operation completed successfully"
}
```

### Error Response
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message"
  }
}
```

## Implementation Priority
1. **Phase 1**: User authentication and character system
2. **Phase 2**: Game progress and quest system
3. **Phase 3**: Inventory and achievements
4. **Phase 4**: Advanced features and optimizations

## Testing Strategy
- Unit tests for all API endpoints
- Integration tests for complete user flows
- Frontend testing for API integration
- End-to-end testing for critical user journeys

## Security Considerations
- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration for frontend access

## Performance Optimizations
- Database indexing on frequently queried fields
- Caching for static island data
- Pagination for inventory and progress lists
- Connection pooling for MongoDB

This contract serves as the blueprint for seamless backend integration while maintaining the existing frontend functionality.