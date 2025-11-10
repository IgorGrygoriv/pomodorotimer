import { Briefcase, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

function SessionInfo({ sessionType }) {
  const isWorkSession = sessionType === 'work';

  return (
    <motion.div
      className="flex justify-center items-center"
      key={sessionType}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-secondary border border-border">
        {isWorkSession ? (
          <Briefcase className="h-6 w-6 text-secondary-foreground" />
        ) : (
          <Coffee className="h-6 w-6 text-secondary-foreground" />
        )}
        <span className="text-xl font-semibold text-secondary-foreground">
          {isWorkSession ? 'Work Session' : 'Break Time'}
        </span>
      </div>
    </motion.div>
  );
}

export default SessionInfo;
