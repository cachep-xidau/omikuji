import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IPhoneFrame from './components/IPhoneFrame';
import HomeScreen from './screens/HomeScreen';
import StartScreen from './screens/StartScreen';
import AchieveScreen from './screens/AchieveScreen';
import AccountScreen from './screens/AccountScreen';
import DiscoverScreen from './screens/DiscoverScreen';

import DiaryLoadingScreen from './screens/DiaryLoadingScreen';
import DiaryScreen from './screens/DiaryScreen';
import DiaryHistoryScreen from './screens/DiaryHistoryScreen';

import { DiaryProvider } from './data/DiaryContext';
import { LanguageProvider } from './contexts/LanguageContext';
import DiaryEntryScreen from './screens/DiaryEntryScreen';

function App() {
  return (
    <LanguageProvider>
      <DiaryProvider>
        <Router basename="/omikuji">
          <IPhoneFrame>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/start" element={<StartScreen />} />
                <Route path="/achieve" element={<AchieveScreen />} />
                <Route path="/account" element={<AccountScreen />} />
                <Route path="/diary-loading" element={<DiaryLoadingScreen />} />
                <Route path="/diary" element={<DiaryScreen />} />
                <Route path="/diary/new" element={<DiaryEntryScreen />} />
                <Route path="/diary/history" element={<DiaryHistoryScreen />} />
                <Route path="/diary/entry/:id" element={<DiaryEntryScreen />} />

                {/* Placeholder routes */}
                <Route path="/discover" element={<DiscoverScreen />} />
              </Routes>
            </AnimatePresence>
          </IPhoneFrame>
        </Router>
      </DiaryProvider>
    </LanguageProvider>
  );
}

export default App;

