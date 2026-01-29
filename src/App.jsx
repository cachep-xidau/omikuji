import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IPhoneFrame from './components/IPhoneFrame';
import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import InsightScreen from './screens/InsightScreen';
import QuestScreen from './screens/QuestScreen';
import AccountScreen from './screens/AccountScreen';
import WalkingRecordScreen from './screens/WalkingRecordScreen';
import RewardScreen from './screens/RewardScreen';
import WalkingRouteScreen from './screens/WalkingRouteScreen';
import PremiumModal from './components/PremiumModal';
import IAPSheet from './components/IAPSheet';

import DiaryLoadingScreen from './screens/DiaryLoadingScreen';
import DiaryScreen from './screens/DiaryScreen';
import DiaryHistoryScreen from './screens/DiaryHistoryScreen';
import ChatDiaryScreen from './screens/ChatDiaryScreen';

import { DiaryProvider } from './data/DiaryContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import DiaryEntryScreen from './screens/DiaryEntryScreen';
import PaywallScreen from './screens/PaywallScreen';
import VideoCallScreen from './screens/VideoCallScreen';


function App() {
  return (
    <LanguageProvider>
      <SubscriptionProvider>
        <DiaryProvider>
          <Router>
            <IPhoneFrame>
              <PremiumModal />
              <IAPSheet />
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Main Navigation */}
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/activity" element={<ActivityScreen />} />
                  <Route path="/insight" element={<InsightScreen />} />
                  <Route path="/quest" element={<QuestScreen />} />
                  <Route path="/account" element={<AccountScreen />} />
                  <Route path="/activity/walking-record" element={<WalkingRecordScreen />} />
                  <Route path="/activity/walking-route" element={<WalkingRouteScreen />} />
                  <Route path="/reward" element={<RewardScreen />} />

                  {/* Diary Routes */}
                  <Route path="/diary-loading" element={<DiaryLoadingScreen />} />
                  <Route path="/diary" element={<DiaryScreen />} />
                  <Route path="/diary/new" element={<DiaryEntryScreen />} />
                  <Route path="/diary/history" element={<DiaryHistoryScreen />} />
                  <Route path="/diary/entry/:id" element={<DiaryEntryScreen />} />
                  <Route path="/chat-diary" element={<ChatDiaryScreen />} />

                  {/* Other Routes */}
                  <Route path="/video-call" element={<VideoCallScreen />} />
                  <Route path="/paywall" element={<PaywallScreen />} />
                </Routes>
              </AnimatePresence>
            </IPhoneFrame>
          </Router>
        </DiaryProvider>
      </SubscriptionProvider>
    </LanguageProvider>
  );
}

export default App;
