import { motion } from 'framer-motion';

function TimerDisplay({ timeLeft, sessionType, totalTime }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Calculate progress percentage
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 140; // radius = 140
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const isWorkSession = sessionType === 'work';
  const ringColor = '#00B8D4'; // Miami blue

  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        {/* Circular Progress Ring */}
        <svg className="transform -rotate-90" width="320" height="320">
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="160"
            cy="160"
            r="140"
            stroke={ringColor}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 184, 212, 0.5))' }}
          />
        </svg>

        {/* Timer Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-7xl font-bold tabular-nums"
            style={{ color: '#00B8D4' }}
            animate={{ scale: timeLeft <= 10 && timeLeft > 0 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.5, repeat: timeLeft <= 10 && timeLeft > 0 ? Infinity : 0 }}
          >
            {formattedTime}
          </motion.div>
          <motion.div
            className="text-sm font-medium text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {isWorkSession ? 'Focus Time' : 'Break Time'}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TimerDisplay;
