import { motion } from 'framer-motion';

function TimerDisplay({ timeLeft, sessionType }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="text-8xl font-bold text-foreground tabular-nums"
        animate={{ scale: timeLeft <= 10 && timeLeft > 0 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.5, repeat: timeLeft <= 10 && timeLeft > 0 ? Infinity : 0 }}
      >
        {formattedTime}
      </motion.div>
    </motion.div>
  );
}

export default TimerDisplay;
