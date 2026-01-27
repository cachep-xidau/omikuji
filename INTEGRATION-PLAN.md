# SEASONAL PHOTO BOOK - INTEGRATION PLAN
## Enhance Existing A2V Diary Prototype

**Goal:** Add Seasonal Photo Book feature vào **existing prototype** - NOT create new app
**Approach:** Extend DiaryContext, integrate with existing screens, enhance current features

---

## 🎯 INTEGRATION STRATEGY

### What We're Enhancing:

1. **DiaryContext** → Add photo storage management
2. **HomeScreen** → Add seasonal photo prompt widget
3. **DiaryScreen** → Add photo attachment to diary entries
4. **New Screen: SeasonalGalleryScreen** → View/organize photos by season
5. **New Feature: Book Preview & Order** → Monetization

---

## 📦 STEP-BY-STEP IMPLEMENTATION

### Phase 1: Setup & Dependencies (30 min)

#### 1.1 Install Required Packages

```bash
cd "/Users/lucasbraci/Desktop/Antigravity/projects/A2V Revolution/prototype"

npm install idb react-webcam compressorjs jspdf
```

#### 1.2 Verify Current Structure

Current app structure:
```
src/
├── App.jsx                 ← Add new route
├── data/
│   ├── DiaryContext.jsx    ← Extend with photo management
│   ├── microseasons.js     ← Already exists!
│   └── fortunes.js
├── screens/
│   ├── HomeScreen.jsx      ← Add PhotoPromptCard
│   ├── DiaryScreen.jsx     ← Link to gallery
│   └── (NEW) SeasonalGalleryScreen.jsx
├── components/
│   ├── NavBar.jsx          ← Add gallery nav item
│   └── (NEW) PhotoPromptCard.jsx
└── utils/
    └── (NEW) photoStorage.js
```

---

### Phase 2: Extend DiaryContext (1 hour)

#### 2.1 Add Photo Storage to DiaryContext

**File to modify:** `src/data/DiaryContext.jsx`

**Changes:**
1. Add photo-related state
2. Add photo CRUD functions
3. Integrate with existing localStorage pattern

**Implementation:**

```javascript
// Add to imports at top
import { initPhotoDatabase, savePhoto, getAllPhotos, getPhotosBySeason } from '../utils/photoStorage';

// Inside DiaryProvider component, add new state:
const [photos, setPhotos] = useState([]);
const [photoCount, setPhotoCount] = useState(0);

// Add useEffect to load photos
useEffect(() => {
  const loadPhotos = async () => {
    try {
      const allPhotos = await getAllPhotos();
      setPhotos(allPhotos);
      setPhotoCount(allPhotos.length);
    } catch (error) {
      console.error('Failed to load photos', error);
    }
  };

  if (!isLoading) {
    loadPhotos();
  }
}, [isLoading]);

// Add photo management functions
const addPhoto = async (photoData) => {
  try {
    const photoId = await savePhoto(photoData);

    // Reload photos
    const allPhotos = await getAllPhotos();
    setPhotos(allPhotos);
    setPhotoCount(allPhotos.length);

    // Optionally: Create diary entry about photo
    const microseasonName = photoData.microseason_name || 'today';
    const entryText = `📸 Captured a moment during "${microseasonName}": ${photoData.prompt_used}`;
    addEntry(entryText, 'photo_capture');

    return photoId;
  } catch (error) {
    console.error('Failed to save photo', error);
    throw error;
  }
};

const getPhotosBySeasonFilter = async (season) => {
  return await getPhotosBySeason(season);
};

// Add to return value in DiaryContext.Provider
return (
  <DiaryContext.Provider value={{
    // ... existing values ...

    // Photo features
    photos,
    photoCount,
    addPhoto,
    getPhotosBySeasonFilter,
  }}>
    {children}
  </DiaryContext.Provider>
);
```

**Full diff location:**
```
Line 27: Add state after existing state declarations
Line 90: Add photo loading in loadAll() function
Line 306: Add to Provider value
```

---

### Phase 3: Create Photo Storage Utility (1 hour)

#### 3.1 Create photoStorage.js

**File to create:** `src/utils/photoStorage.js`

```javascript
import { openDB } from 'idb';

const DB_NAME = 'a2v_seasonal_photos';
const STORE_NAME = 'photos';

export const initPhotoDatabase = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('microseason_id', 'microseason_id');
        store.createIndex('season', 'season');
        store.createIndex('captured_at', 'captured_at');
      }
    },
  });
};

export const savePhoto = async (photoData) => {
  const db = await initPhotoDatabase();
  const id = await db.add(STORE_NAME, {
    microseason_id: photoData.microseason_id,
    microseason_name: photoData.microseason_name,
    season: photoData.season,
    image_blob: photoData.image_blob,
    prompt_used: photoData.prompt_used,
    captured_at: new Date().toISOString(),
    ai_haiku: photoData.ai_haiku || '',
    user_note: photoData.user_note || '',
  });
  return id;
};

export const getPhotosBySeason = async (season) => {
  const db = await initPhotoDatabase();
  return await db.getAllFromIndex(STORE_NAME, 'season', season);
};

export const getAllPhotos = async () => {
  const db = await initPhotoDatabase();
  return await db.getAll(STORE_NAME);
};

export const getPhotoCount = async () => {
  const db = await initPhotoDatabase();
  return await db.count(STORE_NAME);
};

export const deletePhoto = async (id) => {
  const db = await initPhotoDatabase();
  await db.delete(STORE_NAME, id);
};
```

---

### Phase 4: Add Photo Prompt to HomeScreen (1 hour)

#### 4.1 Create PhotoPromptCard Component

**File to create:** `src/components/PhotoPromptCard.jsx`

```jsx
import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentMicroseason } from '../data/microseasons';
import { useDiary } from '../data/DiaryContext';
import PhotoCaptureModal from './PhotoCaptureModal';

export default function PhotoPromptCard() {
  const [showCamera, setShowCamera] = useState(false);
  const microseason = getCurrentMicroseason(new Date());
  const { photoCount } = useDiary();

  if (!microseason) return null;

  // Get random prompt from microseason
  const randomPrompt = microseason.photo_prompts?.[0] ||
    `Capture a moment of "${microseason.name_en}"`;

  return (
    <>
      <motion.section
        className="px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <Camera className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  📸 Today's Photo Mission
                </h3>
                <p className="text-xs text-gray-600">
                  {photoCount}/72 collected
                </p>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-pink-500" />
          </div>

          {/* Microseason Info */}
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-800">
              {microseason.name_jp}
            </p>
            <p className="text-xs text-gray-600">
              {microseason.name_en} ({microseason.start_date} - {microseason.end_date})
            </p>
          </div>

          {/* Photo Prompt */}
          <div className="bg-white rounded-xl p-3 mb-4 border-l-4 border-pink-400">
            <p className="text-sm text-gray-800">
              "{randomPrompt}"
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowCamera(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Capture Moment
          </button>
        </div>
      </motion.section>

      {showCamera && (
        <PhotoCaptureModal
          microseason={microseason}
          prompt={randomPrompt}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
}
```

#### 4.2 Integrate into HomeScreen

**File to modify:** `src/screens/HomeScreen.jsx`

```javascript
// Add import at top
import PhotoPromptCard from '../components/PhotoPromptCard';

// Add after "Welcome Text" section (around line 48)
// Insert between "Good morning" and "Today Mission Section"

{/* Seasonal Photo Prompt - NEW */}
<PhotoPromptCard />
```

**Exact location:**
```jsx
// Line 46-48 (existing)
<div className="px-6 pb-4">
  <h1 className="text-2xl font-semibold text-black">Good morning, Miley!</h1>
</div>

{/* ADD HERE */}
<PhotoPromptCard />

{/* Today Mission Section */}
<section className="px-6 py-4">
  ...
```

---

### Phase 5: Create Photo Capture Modal (2 hours)

**File to create:** `src/components/PhotoCaptureModal.jsx`

**Note:** This is a SIMPLIFIED version for MVP. Full version in separate file.

```jsx
import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Compressor from 'compressorjs';
import { useDiary } from '../data/DiaryContext';

export default function PhotoCaptureModal({ microseason, prompt, onClose }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userNote, setUserNote] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { addPhoto } = useDiary();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!uploadedImage) return;

    setSaving(true);

    try {
      // Convert base64 to blob
      const blob = await fetch(uploadedImage).then(r => r.blob());

      // Compress
      new Compressor(blob, {
        quality: 0.8,
        maxWidth: 1200,
        maxHeight: 1200,
        success: async (compressedBlob) => {
          // Generate simple haiku (mock)
          const aiHaiku = `${microseason.name_jp} / Beautiful moment captured / Spring's gentle touch`;

          // Save photo
          await addPhoto({
            microseason_id: microseason.id,
            microseason_name: microseason.name_en,
            season: microseason.season,
            image_blob: compressedBlob,
            prompt_used: prompt,
            ai_haiku: aiHaiku,
            user_note: userNote,
          });

          setSaving(false);
          onClose();
        },
        error: (err) => {
          console.error('Compression error:', err);
          setSaving(false);
        },
      });
    } catch (error) {
      console.error('Save error:', error);
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              📸 {microseason.name_jp}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Prompt */}
            <div className="bg-pink-50 rounded-xl p-4 mb-6 border-l-4 border-pink-400">
              <p className="text-gray-800">"{prompt}"</p>
            </div>

            {/* Upload Area */}
            {!uploadedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-all"
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Click to select photo
                  <br />
                  <span className="text-sm text-gray-400">or drag and drop</span>
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full rounded-xl"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Choose different photo
                </button>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Note (Optional)
                  </label>
                  <textarea
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="About this moment..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                </div>

                {/* Save */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Save Photo
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### Phase 6: Add Gallery Screen (2 hours)

#### 6.1 Create SeasonalGalleryScreen

**File to create:** `src/screens/SeasonalGalleryScreen.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Image as ImageIcon, Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDiary } from '../data/DiaryContext';
import StatusBar from '../components/StatusBar';

export default function SeasonalGalleryScreen() {
  const navigate = useNavigate();
  const { photos, photoCount } = useDiary();
  const [selectedSeason, setSelectedSeason] = useState('all');

  const filteredPhotos = selectedSeason === 'all'
    ? photos
    : photos.filter(p => p.season === selectedSeason);

  const photosBySeason = {
    spring: photos.filter(p => p.season === 'spring'),
    summer: photos.filter(p => p.season === 'summer'),
    autumn: photos.filter(p => p.season === 'autumn'),
    winter: photos.filter(p => p.season === 'winter'),
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-white/90 hover:text-white flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-2xl font-bold mb-2">
          📷 Seasonal Collection
        </h1>
        <p className="text-white/90 text-sm">
          Your year in moments
        </p>

        {/* Progress */}
        <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Progress</span>
            <span className="text-lg font-bold">{photoCount}/72</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(photoCount / 72) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Season Filter */}
      <div className="p-4 flex gap-2 overflow-x-auto bg-white border-b">
        <button
          onClick={() => setSelectedSeason('all')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
            selectedSeason === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({photos.length})
        </button>
        {['spring', 'summer', 'autumn', 'winter'].map(season => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedSeason === season
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {season === 'spring' && '🌸 Spring'}
            {season === 'summer' && '🌻 Summer'}
            {season === 'autumn' && '🍂 Autumn'}
            {season === 'winter' && '❄️ Winter'}
            {' '}({photosBySeason[season].length})
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">
              No photos yet
            </p>
            <p className="text-sm text-gray-400">
              Start capturing seasonal moments!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img
                  src={URL.createObjectURL(photo.image_blob)}
                  alt={photo.prompt_used}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Create Book Button */}
      {photoCount >= 12 && (
        <div className="p-4 bg-white border-t">
          <button
            onClick={() => alert('Book creation coming soon!')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
          >
            <Book className="w-6 h-6" />
            Create Photo Book (¥2,000)
          </button>
        </div>
      )}
    </div>
  );
}
```

#### 6.2 Add Route to App.jsx

**File to modify:** `src/App.jsx`

```javascript
// Add import
import SeasonalGalleryScreen from './screens/SeasonalGalleryScreen';

// Add route (after line 39)
<Route path="/gallery" element={<SeasonalGalleryScreen />} />
```

#### 6.3 Add Navigation to NavBar

**File to modify:** `src/components/NavBar.jsx`

Find the nav items and add:

```jsx
<Link to="/gallery" className="flex flex-col items-center gap-1">
  <Camera className="w-6 h-6" />
  <span className="text-xs">Gallery</span>
</Link>
```

---

### Phase 7: Enhance Microseasons Data (1 hour)

**File to modify:** `src/data/microseasons.js`

Add `photo_prompts` to each microseason:

```javascript
export const MICROSEASONS = [
  {
    id: 1,
    name_jp: "東風解凍",
    name_en: "East Wind Melts Ice",
    start_date: "02-04",
    end_date: "02-08",
    season: "spring",

    // ADD THIS:
    photo_prompts: [
      "First puddle of melted ice",
      "Branches swaying in east wind",
      "Any sign of spring's approach"
    ]
  },
  // ... repeat for all 72 microseasons
];
```

**Note:** I can generate all 72 prompts if needed.

---

## 🚀 IMPLEMENTATION CHECKLIST

### Week 1: Foundation
- [ ] Install dependencies (`npm install idb react-webcam compressorjs jspdf`)
- [ ] Create `src/utils/photoStorage.js`
- [ ] Extend `DiaryContext.jsx` with photo state
- [ ] Add photo_prompts to all 72 microseasons

### Week 2: UI Components
- [ ] Create `PhotoPromptCard.jsx`
- [ ] Create `PhotoCaptureModal.jsx`
- [ ] Add PhotoPromptCard to HomeScreen
- [ ] Test photo capture → IndexedDB storage

### Week 3: Gallery
- [ ] Create `SeasonalGalleryScreen.jsx`
- [ ] Add route to App.jsx
- [ ] Add gallery nav to NavBar
- [ ] Test photo display by season

### Week 4: Book Preview (Optional for MVP)
- [ ] Create `BookPreviewModal.jsx`
- [ ] Implement PDF generation
- [ ] Add print order flow
- [ ] Integrate Printful API

---

## 🎨 DESIGN CONSISTENCY

### Use Existing Patterns

**Colors (from existing app):**
- Primary: Pink/Purple gradient (`from-pink-500 to-purple-500`)
- Background: `bg-gray-50`, `bg-white`
- Borders: `border-gray-300`, `border-pink-200`

**Components to Reuse:**
- `StatusBar` (already in HomeScreen)
- `NavBar` (bottom navigation)
- Existing card styles (rounded-2xl, border, etc.)

**Animations:**
- Use existing `framer-motion` patterns
- `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`

---

## 💾 DATA FLOW

```
User Action → Component → DiaryContext → IndexedDB
                ↓
          UI Update ← State Update ← Success
```

**Example: Capture Photo**
```
1. User clicks "Capture Moment" on PhotoPromptCard
2. PhotoCaptureModal opens
3. User uploads/captures image
4. Component calls addPhoto() from DiaryContext
5. DiaryContext → photoStorage.savePhoto() → IndexedDB
6. DiaryContext updates photos state
7. PhotoPromptCard shows updated count (X+1/72)
```

---

## 🧪 TESTING PLAN

### Manual Testing Steps

1. **Photo Capture:**
   - [ ] Open HomeScreen
   - [ ] See PhotoPromptCard with current microseason
   - [ ] Click "Capture Moment"
   - [ ] Upload photo
   - [ ] Add note
   - [ ] Save → Check IndexedDB (DevTools → Application → IndexedDB)

2. **Gallery View:**
   - [ ] Navigate to /gallery
   - [ ] See all photos in grid
   - [ ] Filter by season
   - [ ] Check progress bar (X/72)

3. **Integration:**
   - [ ] Capture photo → Check DiaryScreen timeline for auto-entry
   - [ ] Verify photo count updates everywhere
   - [ ] Test on mobile viewport (iPhone frame)

---

## 📱 MOBILE OPTIMIZATION

### Existing IPhoneFrame
App already uses `IPhoneFrame` wrapper - all new components automatically mobile-optimized.

### Touch Targets
- Buttons: `py-3` minimum (48px touch target)
- Camera icon: `w-6 h-6` (24px)
- Use existing patterns from HomeScreen

---

## 🔮 FUTURE ENHANCEMENTS (Post-MVP)

1. **Photo Editing:**
   - Crop/rotate before save
   - Filters (vintage, black & white)

2. **Haiku AI:**
   - Real AI generation (OpenAI API)
   - Personalized based on user's diary tone

3. **Social Sharing:**
   - Share photo + haiku to social media
   - Beautiful templates

4. **Print Book:**
   - Full book preview with page flip
   - Printful API integration
   - Multiple layouts (landscape/portrait)

---

## 💰 MONETIZATION INTEGRATION

### Phase 1 (MVP): Free
- All photo features free
- "Create Book" button shows price ¥2,000
- Clicking → "Coming soon" message

### Phase 2: Print Orders
- Integrate Printful API
- Payment via Stripe
- Order tracking

### Phase 3: Premium
- Unlimited photos (free tier: 72 limit)
- HD quality (free tier: compressed)
- Video moments (5-second clips)

---

## 🚨 POTENTIAL ISSUES & SOLUTIONS

### Issue 1: IndexedDB Storage Limit
**Problem:** Browser limit ~50MB
**Solution:** Aggressive compression (quality: 0.8, maxWidth: 1200px)
**Math:** 72 photos × 500KB = 36MB (safe margin)

### Issue 2: Photo Loading Performance
**Problem:** Loading 72 images at once
**Solution:**
- Lazy loading in gallery grid
- Show thumbnails first
- Load full resolution on tap

### Issue 3: iOS Safari Quirks
**Problem:** File upload camera access
**Solution:** Use `accept="image/*"` + `capture="environment"`

---

## 📞 SUPPORT COMMANDS

### Development
```bash
cd "/Users/lucasbraci/Desktop/Antigravity/projects/A2V Revolution/prototype"

# Install deps
npm install idb react-webcam compressorjs jspdf

# Run dev server
npm run dev

# Build
npm run build
```

### Debug IndexedDB
```javascript
// Browser console
const db = await indexedDB.open('a2v_seasonal_photos');
db.objectStoreNames; // Should show 'photos'
```

---

## ✅ READY TO START?

I can help you implement:

1. **Option A: Step-by-step** - I create each file one by one, you test each step
2. **Option B: Batch creation** - I create all files at once, you review
3. **Option C: Guided** - I give you code snippets, you paste and modify

Which approach do you prefer?
