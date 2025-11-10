import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function TimerControls({ isRunning, onStartPause, onReset }) {
  return (
    <motion.div
      className="flex justify-center gap-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Button
        onClick={onStartPause}
        size="lg"
        variant="default"
        className="min-w-[140px]"
      >
        {isRunning ? (
          <>
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Start
          </>
        )}
      </Button>
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="min-w-[140px]"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </motion.div>
  );
}

export default TimerControls;
