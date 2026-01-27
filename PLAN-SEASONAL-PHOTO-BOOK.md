# SEASONAL PHOTO BOOK - IMPLEMENTATION PLAN
## Print Book Feature for A2V Diary Prototype

**Feature Name:** 季節の写真集 (Seasonal Photo Book)
**Target:** Localhost prototype implementation
**Timeline:** 2-3 weeks (MVP)
**Tech Stack:** React + Vite + Tailwind CSS (existing)

---

## 📋 EXECUTIVE SUMMARY

### What We're Building
A feature that allows users to:
1. **Capture seasonal photos** during walks (72 microseason prompts)
2. **Organize photos** into seasonal collections (Spring/Summer/Autumn/Winter)
3. **Preview photo book** as a digital mockup
4. **Order physical print** (¥2,000) - integrated with print-on-demand service

### Why It's Special
- **Anti-gym bro:** NOT tracking fitness selfies, but capturing **beauty of impermanence** (物の哀れ)
- **Cultural depth:** Each photo tied to 72 microseasons (春分, 蝉始鳴, etc.)
- **Monetization:** Physical product (¥2,000/book) vs. subscription fatigue
- **Keepsake value:** Tangible memory, not digital clutter

---

## 🎯 FEATURE SPECS

### User Flow Overview
```
1. Pre-Walk: AI suggests seasonal photo prompt
   ↓
2. During Walk: User captures photo (camera or upload)
   ↓
3. Post-Walk: AI provides poetic feedback, adds to collection
   ↓
4. Throughout Year: User collects 72 seasonal moments
   ↓
5. End of Year: Preview digital book + Order physical print
```

### Core Components to Build

#### **Phase 1: Photo Capture & Storage (Week 1)**
1. `PhotoPromptCard.jsx` - Seasonal photo mission UI
2. `PhotoCaptureModal.jsx` - Camera integration
3. `PhotoContext.jsx` - State management for photos
4. `photoStorage.js` - IndexedDB wrapper for image storage

#### **Phase 2: Gallery & Organization (Week 2)**
5. `SeasonalGallery.jsx` - Grid view of photos by season
6. `PhotoDetailView.jsx` - Full-screen photo with metadata
7. `CollectionProgress.jsx` - "Collected 15/72 moments" tracker

#### **Phase 3: Book Preview & Print (Week 3)**
8. `BookPreviewModal.jsx` - Flip-through book preview
9. `PrintOrderFlow.jsx` - Order form & payment integration
10. `BookTemplateRenderer.jsx` - Generate print-ready PDF

---

## 🗂️ DETAILED IMPLEMENTATION

### Phase 1: Photo Capture & Storage

#### 1.1 Add Dependencies
```bash
cd /Users/lucasbraci/Desktop/Antigravity/projects/A2V\ Revolution/prototype

npm install idb  # IndexedDB wrapper
npm install react-webcam  # Camera access
npm install compressorjs  # Image compression
npm install jspdf jspdf-autotable  # PDF generation for book preview
```

#### 1.2 Create Data Structure

**File:** `src/data/microseasons.js`
```javascript
export const MICROSEASONS = [
  {
    id: 1,
    name_jp: "東風解凍",
    name_en: "East Wind Melts Ice",
    start_date: "02-04",
    end_date: "02-08",
    season: "spring",
    photo_prompts: [
      "最初に見つけた氷の融解 (First melted ice puddle)",
      "東風を感じる木の枝 (Branches swaying in east wind)",
      "春の兆しを見つけて (Any sign of spring's approach)"
    ],
    haiku_template: "東風吹かば / {your_observation} / 春の予感"
  },
  {
    id: 32,
    name_jp: "蝉始鳴",
    name_en: "First Cicadas Sing",
    start_date: "07-12",
    end_date: "07-16",
    season: "summer",
    photo_prompts: [
      "夏空の青さ (Deep blue summer sky)",
      "蝉の抜け殻 (Cicada shell)",
      "真夏の影 (Midsummer shadows)"
    ],
    haiku_template: "蝉の声 / {your_observation} / 夏の盛り"
  },
  // ... (All 72 microseasons - we'll create full dataset)
];

export const getCurrentMicroseason = () => {
  const today = new Date();
  const monthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return MICROSEASONS.find(ms =>
    monthDay >= ms.start_date && monthDay <= ms.end_date
  );
};
```

**File:** `src/utils/photoStorage.js`
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
    season: photoData.season,
    image_blob: photoData.image_blob,  // Compressed JPEG blob
    prompt_used: photoData.prompt_used,
    captured_at: new Date().toISOString(),
    ai_haiku: photoData.ai_haiku,  // Generated haiku
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
  const count = await db.count(STORE_NAME);
  return count;
};
```

#### 1.3 Photo Prompt Component

**File:** `src/components/PhotoPromptCard.jsx`
```jsx
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentMicroseason } from '../data/microseasons';
import PhotoCaptureModal from './PhotoCaptureModal';

export default function PhotoPromptCard() {
  const [showCamera, setShowCamera] = useState(false);
  const microseason = getCurrentMicroseason();

  if (!microseason) return null;

  const randomPrompt = microseason.photo_prompts[
    Math.floor(Math.random() * microseason.photo_prompts.length)
  ];

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-pink-50 to-amber-50 rounded-2xl p-6 mb-6 border border-pink-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-4">
          <div className="bg-pink-100 rounded-full p-3">
            <Camera className="w-6 h-6 text-pink-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              📸 今日の写真テーマ
            </h3>
            <div className="text-sm text-gray-600 mb-3">
              {microseason.name_jp} ({microseason.name_en})
              <br />
              {microseason.start_date} - {microseason.end_date}
            </div>
            <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-pink-400">
              <p className="text-base text-gray-800 font-medium">
                "{randomPrompt}"
              </p>
            </div>
            <button
              onClick={() => setShowCamera(true)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              写真を撮る (Take Photo)
            </button>
          </div>
        </div>
      </motion.div>

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

#### 1.4 Photo Capture Modal

**File:** `src/components/PhotoCaptureModal.jsx`
```jsx
import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Compressor from 'compressorjs';
import { X, Camera, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { savePhoto } from '../utils/photoStorage';

export default function PhotoCaptureModal({ microseason, prompt, onClose }) {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userNote, setUserNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState('upload'); // 'camera' or 'upload'

  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    const imageData = capturedImage || uploadedImage;

    // Convert base64 to blob and compress
    const blob = await fetch(imageData).then(r => r.blob());

    new Compressor(blob, {
      quality: 0.8,
      maxWidth: 1200,
      maxHeight: 1200,
      success: async (compressedBlob) => {
        // Generate AI haiku (mock for now)
        const aiHaiku = generateHaiku(microseason, prompt);

        await savePhoto({
          microseason_id: microseason.id,
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
  };

  const generateHaiku = (microseason, prompt) => {
    // Mock AI haiku generation - replace with real AI later
    const templates = microseason.haiku_template || "{observation} / {season_word} / {emotion}";
    return templates.replace('{your_observation}', '美しい瞬間');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
            {/* Prompt Display */}
            <div className="bg-pink-50 rounded-xl p-4 mb-6 border-l-4 border-pink-400">
              <p className="text-gray-800">"{prompt}"</p>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode('upload')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'upload'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                アップロード (Upload)
              </button>
              <button
                onClick={() => setMode('camera')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'camera'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Camera className="w-5 h-5 inline mr-2" />
                カメラ (Camera)
              </button>
            </div>

            {/* Image Capture/Upload Area */}
            <div className="mb-6">
              {mode === 'camera' && !capturedImage && (
                <div className="space-y-4">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-xl"
                  />
                  <button
                    onClick={handleCapture}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                  >
                    <Camera className="w-5 h-5 inline mr-2" />
                    撮影 (Capture)
                  </button>
                </div>
              )}

              {mode === 'upload' && !uploadedImage && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50/50 transition-colors"
                >
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    クリックして写真を選択
                    <br />
                    <span className="text-sm text-gray-400">
                      Click to select photo
                    </span>
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {(capturedImage || uploadedImage) && (
                <div className="space-y-4">
                  <img
                    src={capturedImage || uploadedImage}
                    alt="Preview"
                    className="w-full rounded-xl"
                  />
                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      setUploadedImage(null);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    別の写真を選ぶ (Choose different photo)
                  </button>
                </div>
              )}
            </div>

            {/* User Note (Optional) */}
            {(capturedImage || uploadedImage) && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メモ（任意） - Personal Note (Optional)
                </label>
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="この写真について... (About this photo...)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
            )}

            {/* Save Button */}
            {(capturedImage || uploadedImage) && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    保存中... (Saving...)
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    写真を保存 (Save Photo)
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

### Phase 2: Gallery & Organization

#### 2.1 Seasonal Gallery Screen

**File:** `src/screens/SeasonalGalleryScreen.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Book, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllPhotos, getPhotoCount } from '../utils/photoStorage';
import PhotoDetailView from '../components/PhotoDetailView';
import BookPreviewModal from '../components/BookPreviewModal';

export default function SeasonalGalleryScreen() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showBookPreview, setShowBookPreview] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('all');

  useEffect(() => {
    loadPhotos();
  }, [selectedSeason]);

  const loadPhotos = async () => {
    const allPhotos = await getAllPhotos();
    const count = await getPhotoCount();
    setPhotoCount(count);

    if (selectedSeason === 'all') {
      setPhotos(allPhotos);
    } else {
      setPhotos(allPhotos.filter(p => p.season === selectedSeason));
    }
  };

  const photosBySeason = {
    spring: photos.filter(p => p.season === 'spring'),
    summer: photos.filter(p => p.season === 'summer'),
    autumn: photos.filter(p => p.season === 'autumn'),
    winter: photos.filter(p => p.season === 'winter'),
  };

  const seasonColors = {
    spring: 'bg-pink-100 text-pink-800',
    summer: 'bg-green-100 text-green-800',
    autumn: 'bg-amber-100 text-amber-800',
    winter: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-white/90 hover:text-white flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る (Back)
        </button>

        <h1 className="text-2xl font-bold mb-2">
          📷 季節の写真集
        </h1>
        <p className="text-white/90">
          Seasonal Photo Collection
        </p>

        {/* Progress */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">コレクション進捗 (Progress)</span>
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
      <div className="p-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedSeason('all')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
            selectedSeason === 'all'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          全て (All) {photos.length}
        </button>
        {['spring', 'summer', 'autumn', 'winter'].map(season => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              selectedSeason === season
                ? 'bg-purple-500 text-white'
                : `${seasonColors[season]} hover:opacity-80`
            }`}
          >
            {season === 'spring' && '🌸 春 (Spring)'}
            {season === 'summer' && '🌻 夏 (Summer)'}
            {season === 'autumn' && '🍂 秋 (Autumn)'}
            {season === 'winter' && '❄️ 冬 (Winter)'}
            {' '}
            {photosBySeason[season].length}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="p-4">
        {photos.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">
              まだ写真がありません
            </p>
            <p className="text-sm text-gray-400">
              No photos yet. Start your seasonal journey!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
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

      {/* Create Book Button (only if photos >= 12) */}
      {photoCount >= 12 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-0 right-0 px-4"
        >
          <button
            onClick={() => setShowBookPreview(true)}
            className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
          >
            <Book className="w-6 h-6" />
            写真集を作る (Create Photo Book)
          </button>
        </motion.div>
      )}

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailView
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {/* Book Preview Modal */}
      {showBookPreview && (
        <BookPreviewModal
          photos={photos}
          onClose={() => setShowBookPreview(false)}
        />
      )}
    </div>
  );
}
```

---

### Phase 3: Book Preview & Print

#### 3.1 Book Preview Component

**File:** `src/components/BookPreviewModal.jsx`
```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function BookPreviewModal({ photos, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showOrderFlow, setShowOrderFlow] = useState(false);

  // Organize photos by season for book layout
  const organizedPhotos = {
    spring: photos.filter(p => p.season === 'spring'),
    summer: photos.filter(p => p.season === 'summer'),
    autumn: photos.filter(p => p.season === 'autumn'),
    winter: photos.filter(p => p.season === 'winter'),
  };

  const pages = [
    { type: 'cover', title: '季節の写真集 2026' },
    { type: 'intro', content: 'あなたが歩いた一年の記憶' },
    { type: 'season', season: 'spring', title: '春 (Spring)', photos: organizedPhotos.spring },
    { type: 'season', season: 'summer', title: '夏 (Summer)', photos: organizedPhotos.summer },
    { type: 'season', season: 'autumn', title: '秋 (Autumn)', photos: organizedPhotos.autumn },
    { type: 'season', season: 'winter', title: '冬 (Winter)', photos: organizedPhotos.winter },
    { type: 'back', content: 'あなたの一年間の旅路' },
  ];

  const handleDownloadPDF = () => {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    // PDF generation logic here (simplified for demo)
    pdf.text('季節の写真集 2026', 20, 20);
    pdf.save('seasonal-photo-book-2026.pdf');
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPage = (page) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="h-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-center">
              {page.title}
            </h1>
            <p className="text-xl opacity-90">
              季節の記憶
            </p>
            <p className="mt-8 text-sm opacity-75">
              {photos.length} moments captured
            </p>
          </div>
        );

      case 'intro':
        return (
          <div className="h-full bg-cream p-12 flex items-center justify-center">
            <div className="text-center max-w-md">
              <p className="text-2xl text-gray-800 leading-relaxed mb-6">
                {page.content}
              </p>
              <p className="text-gray-600">
                この一年、あなたが歩いた道で
                <br />
                出会った美しい瞬間たち
              </p>
            </div>
          </div>
        );

      case 'season':
        return (
          <div className="h-full bg-white p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {page.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 h-[calc(100%-4rem)]">
              {page.photos.slice(0, 4).map((photo, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={URL.createObjectURL(photo.image_blob)}
                    alt={photo.prompt_used}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-xs line-clamp-2">
                      {photo.ai_haiku}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'back':
        return (
          <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white p-8">
            <div className="text-center">
              <p className="text-2xl mb-4">
                {page.content}
              </p>
              <p className="text-sm opacity-75">
                Created with A2V Diary
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              📖 写真集プレビュー (Book Preview)
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Book Preview Area */}
          <div className="flex-1 relative bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-2xl aspect-[3/4] bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                {renderPage(pages[currentPage])}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <span className="bg-white px-4 py-2 rounded-full shadow-lg font-medium">
                {currentPage + 1} / {pages.length}
              </span>

              <button
                onClick={handleNextPage}
                disabled={currentPage === pages.length - 1}
                className="bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t space-y-3">
            <button
              onClick={() => setShowOrderFlow(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-5 h-5" />
              印刷版を注文 (Order Print Book) - ¥2,000
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-xl hover:bg-gray-300 transition-all flex items-center justify-center gap-3"
            >
              <Download className="w-5 h-5" />
              PDFでダウンロード (Download as PDF)
            </button>
          </div>
        </motion.div>

        {/* Order Flow Modal (nested) */}
        {showOrderFlow && (
          <PrintOrderFlow
            photos={photos}
            onClose={() => setShowOrderFlow(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Separate component for order flow
function PrintOrderFlow({ photos, onClose }) {
  const [step, setStep] = useState(1); // 1: Info, 2: Address, 3: Payment, 4: Confirm

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/80 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <h2 className="text-2xl font-bold mb-6">
          印刷版の注文 (Order Print Book)
        </h2>

        {step === 1 && (
          <div>
            <div className="bg-pink-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">📦 製品仕様 (Product Details)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• サイズ: A4 (210×297mm)</li>
                <li>• ページ数: 約32ページ</li>
                <li>• 印刷: フルカラー</li>
                <li>• 製本: ハードカバー</li>
                <li>• 用紙: 高級マットペーパー</li>
                <li>• 配送: 2-3週間</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">合計 (Total)</span>
                <span className="text-3xl font-bold text-purple-600">¥2,000</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                送料込み (Shipping included)
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              配送先を入力 (Enter Shipping Address)
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-gray-600 mb-6">
              配送先情報を入力してください
            </p>
            {/* Address form fields here */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="お名前 (Full Name)"
                className="w-full px-4 py-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="郵便番号 (Postal Code)"
                className="w-full px-4 py-3 border rounded-xl"
              />
              <textarea
                placeholder="住所 (Address)"
                className="w-full px-4 py-3 border rounded-xl"
                rows="3"
              />
              <input
                type="tel"
                placeholder="電話番号 (Phone)"
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 rounded-xl"
              >
                戻る (Back)
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-purple-500 text-white font-bold py-3 rounded-xl"
              >
                お支払いへ (To Payment)
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-gray-600 mb-6">
              お支払い方法を選択してください
            </p>
            {/* Payment options here */}
            <div className="space-y-3 mb-6">
              <button className="w-full border-2 border-purple-500 bg-purple-50 text-purple-700 font-medium py-4 rounded-xl">
                クレジットカード (Credit Card)
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 font-medium py-4 rounded-xl">
                コンビニ決済 (Convenience Store)
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 font-medium py-4 rounded-xl">
                銀行振込 (Bank Transfer)
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-800 font-medium py-3 rounded-xl"
              >
                戻る (Back)
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-purple-500 text-white font-bold py-3 rounded-xl"
              >
                注文確定 (Confirm Order)
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              ご注文ありがとうございます！
            </h3>
            <p className="text-gray-600 mb-8">
              Your photo book has been ordered successfully!
              <br />
              Expected delivery: 2-3 weeks
            </p>

            <button
              onClick={onClose}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl"
            >
              閉じる (Close)
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
}
```

---

## 🔧 INTEGRATION STEPS

### Step 1: Update Routes

**File:** `src/App.jsx`
```jsx
import SeasonalGalleryScreen from './screens/SeasonalGalleryScreen';

// Add route:
<Route path="/gallery" element={<SeasonalGalleryScreen />} />
```

### Step 2: Add Navigation Link

**File:** `src/components/Navigation.jsx` (or wherever your nav is)
```jsx
<Link to="/gallery" className="...">
  <Camera className="w-6 h-6" />
  <span>写真集</span>
</Link>
```

### Step 3: Add Photo Prompt to Today Screen

**File:** `src/screens/TodayScreen.jsx` (or equivalent)
```jsx
import PhotoPromptCard from '../components/PhotoPromptCard';

// Add in render:
<PhotoPromptCard />
```

---

## 📦 DEPLOYMENT CHECKLIST

### Week 1: Foundation
- [ ] Install dependencies (`idb`, `react-webcam`, `compressorjs`, `jspdf`)
- [ ] Create 72 microseasons data file
- [ ] Implement `photoStorage.js` with IndexedDB
- [ ] Build `PhotoCaptureModal.jsx` component
- [ ] Build `PhotoPromptCard.jsx` component
- [ ] Test photo capture + storage locally

### Week 2: Gallery
- [ ] Build `SeasonalGalleryScreen.jsx`
- [ ] Build `PhotoDetailView.jsx`
- [ ] Implement season filtering
- [ ] Add progress tracker (X/72 photos)
- [ ] Test gallery display with sample photos

### Week 3: Print Book
- [ ] Build `BookPreviewModal.jsx` with page navigation
- [ ] Implement PDF generation
- [ ] Build `PrintOrderFlow.jsx` component
- [ ] Integrate print-on-demand service API (e.g., Printful, Gelato)
- [ ] Test full order flow (mock payment)

---

## 💰 MONETIZATION INTEGRATION

### Print-on-Demand Service Options

**Option 1: Printful (Recommended)**
- API: https://developers.printful.com/
- Products: Hardcover photo books, softcover
- Shipping: Japan supported
- Base cost: ~¥1,200/book → Sell for ¥2,000 (¥800 profit)

**Option 2: Gelato**
- API: https://developers.gelato.com/
- Global network (Japan included)
- Faster delivery
- Base cost: ~¥1,300/book

**Option 3: Custom Japanese Printer**
- パプリ (Papuri): https://papuri.jp/
- しまうまプリント: https://www.n-pri.jp/
- Higher quality, Japan-focused
- Base cost: ~¥1,500/book

### Payment Integration

**Stripe Integration** (for Japanese market):
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**File:** `src/utils/stripe.js`
```javascript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...');

export const createPaymentIntent = async (amount) => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amount * 100 }), // ¥2,000 → 200000 cents
  });
  return response.json();
};
```

---

## 🎨 DESIGN ASSETS NEEDED

### Photo Book Template
- Cover design (customizable with year)
- Interior layouts (2-4 photos per page)
- Season divider pages
- Back cover design

### UI Assets
- Seasonal icons (春夏秋冬)
- Book preview mockup backgrounds
- Progress indicators
- Success/confirmation animations

---

## 🧪 TESTING PLAN

### Unit Tests
- [ ] Photo storage (IndexedDB CRUD)
- [ ] Image compression
- [ ] Microseason date calculation
- [ ] Photo organization by season

### Integration Tests
- [ ] Full photo capture flow
- [ ] Gallery filtering
- [ ] Book preview navigation
- [ ] Order flow (mock API)

### User Testing
- [ ] Test with 5 Japanese users (50-65 age)
- [ ] Accessibility (large buttons, fonts)
- [ ] Performance (image loading speed)
- [ ] Cultural validation (haiku quality, seasonal accuracy)

---

## 🚀 LAUNCH STRATEGY

### Pre-Launch (Week 0)
- Create 72 microseason photo prompts (Japanese + English)
- Partner with print-on-demand service
- Set up Stripe payment account
- Design marketing materials

### Soft Launch (Week 4)
- Release to 50 beta users
- Collect feedback on photo quality, UX
- Monitor print order fulfillment
- Iterate based on feedback

### Full Launch (Week 6)
- Public release
- Marketing campaign (focus: "physical keepsake" angle)
- Social media sharing (haiku + photos)
- Influencer partnerships (Japanese lifestyle bloggers)

---

## 📊 SUCCESS METRICS

### Engagement Metrics
- **Photo capture rate:** 60% of users capture ≥1 photo/week
- **Collection completion:** 30% of users reach 24+ photos (1 season)
- **Gallery visits:** 5+ times/month per active user

### Monetization Metrics
- **Print book orders:** 15% of users with ≥12 photos order book
- **Average order value:** ¥2,000
- **Repeat orders:** 20% order second book (next year)

### Cultural Resonance
- **Haiku save rate:** 70% of users save AI-generated haiku
- **Social sharing:** 40% share photos/haiku on social media
- **"Feels authentically Japanese":** 85%+ agree (survey)

---

## 🔮 FUTURE ENHANCEMENTS

### Phase 4 (Post-MVP)
- **AR integration:** View photos in real-world locations
- **Collaborative books:** Family members contribute photos
- **Video moments:** 5-second seasonal video clips
- **Audio haiku:** AI reads haiku with traditional music
- **Multiple book themes:** Landscape vs. Portrait layouts
- **Gift mode:** Send photo books to family members

---

## 💡 TECHNICAL NOTES

### Image Storage Considerations
- **IndexedDB limit:** ~50MB in most browsers
- **Max photos at 1MB each:** ~50 photos (feasible for 72)
- **Alternative:** Integrate with cloud storage (Firebase Storage) if scaling
- **Optimization:** Aggressive compression (80% quality, 1200px max width)

### Performance Optimization
- Lazy load images in gallery
- Virtual scrolling for large collections
- Web Workers for image processing
- Service Worker for offline access

### Security & Privacy
- Photos stored locally (IndexedDB) by default
- Optional cloud backup with encryption
- Print service: Photos uploaded only during order (then deleted)
- GDPR compliance for EU users

---

## 📞 SUPPORT & RESOURCES

### Print-on-Demand APIs
- Printful API docs: https://developers.printful.com/
- Gelato API docs: https://developers.gelato.com/

### Image Processing
- Compressor.js: https://github.com/fengyuanchen/compressorjs
- jsPDF: https://github.com/parallax/jsPDF

### Cultural Research
- 72 Microseasons guide: https://www.kurashiki-tabi.jp/blog/72-seasons/
- Japanese haiku structure: https://www.haiku-poetry.org/

---

**End of Implementation Plan**

Ready to start? Run these commands:
```bash
cd /Users/lucasbraci/Desktop/Antigravity/projects/A2V\ Revolution/prototype
npm install idb react-webcam compressorjs jspdf jspdf-autotable
```

Then create the files in order:
1. `src/data/microseasons.js`
2. `src/utils/photoStorage.js`
3. `src/components/PhotoPromptCard.jsx`
4. `src/components/PhotoCaptureModal.jsx`
5. ... (continue with remaining components)
