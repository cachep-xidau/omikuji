import StatusBar from '../components/StatusBar';
import NavBar from '../components/NavBar';
import { Gift } from 'lucide-react';

const GachaScreen = () => {
    return (
        <div className="relative h-full bg-white flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
                <StatusBar />

                {/* Header */}
                <div className="px-6 py-4">
                    <h1 className="text-2xl font-semibold text-black">Gacha</h1>
                    <p className="text-sm text-gray-500 mt-1">Collect rewards and prizes</p>
                </div>

                {/* Placeholder Content */}
                <div className="flex flex-col items-center justify-center px-6 py-16">
                    <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                        <Gift size={40} className="text-purple-400" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h2>
                    <p className="text-sm text-gray-500 text-center">
                        Gacha collection and reward system will appear here.
                    </p>
                </div>
            </div>

            {/* Fixed NavBar */}
            <NavBar />
        </div>
    );
};

export default GachaScreen;
