import { motion } from 'framer-motion';

const MissionCard = ({ icon, title, level, status, progress = 0 }) => {
  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card-mission cursor-pointer"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="text-sm font-medium text-black mb-2">{title}</h4>
      <div className="flex items-center gap-2 mb-2">
        {level && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(level)}`}>
            {level}
          </span>
        )}
        <span className="text-xs text-gray-500">{status}</span>
      </div>
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-purple-700 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default MissionCard;
