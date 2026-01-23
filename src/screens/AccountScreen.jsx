import React, { useState } from 'react';
import { Search, Bell, HelpCircle, User, Heart, ShieldCheck, Lock, Scan, Globe, BellRing, MessageCircle, Flag, FileText, LogOut, Activity, BookOpen } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import SettingsItem from '../components/SettingsItem';

import { getImagePath } from '../utils/imagePath';
import { useSubscription } from '../contexts/SubscriptionContext';

const AccountScreen = () => {
    const [faceIdEnabled, setFaceIdEnabled] = useState(true);
    const { status, daysRemaining, expireTrial, resetTrial } = useSubscription();

    return (
        <div className="relative h-full bg-white flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
                    <h1 className="text-[24px] font-bold text-gray-900">Account</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Search size={22} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                            <Bell size={22} className="text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <HelpCircle size={22} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="bg-white px-6 py-6 flex items-center gap-4 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                        <img src={getImagePath('/images/user_avatar.jpg')} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-900">Miley Lien</h2>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-700">miley.lien@example.com</p>
                        </div>
                        {/* Subscription Badge */}
                        <div className="mt-1 flex gap-2">

                            {status === 'active' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full flex items-center gap-1">
                                    <ShieldCheck size={10} />
                                    Premium Plus
                                </span>
                            )}

                        </div>
                    </div>
                    <div className="w-[72px] h-[78px] flex items-center justify-center">
                        <img src={getImagePath('/images/eyes-logo.png')} alt="Eyes Logo" className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="px-6 py-4 grid grid-cols-2 gap-3 bg-white">
                    <button className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-[8px] px-5 h-[74px] flex items-center gap-3 shadow-none hover:bg-gray-200 transition-colors w-full">
                        <img src={getImagePath('/images/my-activity-icon.png')} alt="Activity" className="w-[32px] h-[32px] object-contain" />
                        <span className="font-medium text-[16px] text-gray-900 leading-tight text-left">My activity</span>
                    </button>
                    <button className="bg-[#F5F5F5] border border-[#E6E3E3] rounded-[8px] px-5 h-[74px] flex items-center gap-3 shadow-none hover:bg-gray-200 transition-colors w-full">
                        <img src={getImagePath('/images/my-library-icon.png')} alt="Library" className="w-[32px] h-[32px] object-contain" />
                        <span className="font-medium text-[16px] text-gray-900 leading-tight text-left">My library</span>
                    </button>
                </div>

                {/* Settings Lists */}
                <div className="mt-4">
                    {/* Account Section */}
                    <div className="bg-white border-y border-gray-100">
                        <div className="px-6 py-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase">Account</h3>
                        </div>
                        <SettingsItem icon={User} label="My account" />
                        <SettingsItem icon={Heart} label="Health connect" />
                        <SettingsItem icon={ShieldCheck} label="Verification method" />
                        <SettingsItem icon={Lock} label="Password" />
                        <SettingsItem icon={Scan} label="Face ID" toggle={faceIdEnabled} onClick={() => setFaceIdEnabled(!faceIdEnabled)} />
                        <SettingsItem icon={Globe} label="Language" value="English" />
                        <SettingsItem icon={BellRing} label="Notifications" />
                    </div>

                    {/* Help Section */}
                    <div className="bg-white border-y border-gray-100 mt-4">
                        <div className="px-6 py-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase">Help</h3>
                        </div>
                        <SettingsItem icon={MessageCircle} label="Virtual assistant" />
                        <SettingsItem icon={HelpCircle} label="Help center" />
                        <SettingsItem icon={Flag} label="Report an issue" />
                        <SettingsItem icon={FileText} label="Share log file" />
                    </div>

                    {/* Legal Section */}
                    <div className="bg-white border-y border-gray-100 mt-4">
                        <div className="px-6 py-3">
                            <h3 className="text-sm font-semibold text-gray-700 uppercase">Legal</h3>
                        </div>
                        <SettingsItem icon={FileText} label="Privacy policy" />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-6 flex flex-col items-center gap-2">
                    <button className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors">
                        <LogOut size={18} />
                        Sign out
                    </button>
                    <p className="text-sm text-gray-600">VERSION V1.10.1(1)</p>

                    {/* Developer Options */}
                    <div className="mt-4 pt-4 border-t border-gray-100 w-full px-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase text-center mb-2">Developer / Prototype</p>
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={expireTrial}
                                className="text-[10px] px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                            >
                                Force Expire Trial
                            </button>
                            <button
                                onClick={resetTrial}
                                className="text-[10px] px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                            >
                                Reset Trial
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default AccountScreen;
