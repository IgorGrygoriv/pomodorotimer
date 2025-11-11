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
        className="min-w-[140px] text-white font-semibold shadow-lg transition-all hover:scale-105"
        style={{
          backgroundColor: '#00B8D4',
          boxShadow: '0 10px 15px -3px rgba(0, 184, 212, 0.3)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0097B8'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00B8D4'}
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
        className="min-w-[140px] border-2 transition-all hover:scale-105"
        style={{ borderColor: '#00B8D4' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0, 184, 212, 0.1)';
          e.currentTarget.style.borderColor = '#00B8D4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = '#00B8D4';
        }}
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </motion.div>
  );
}

export default TimerControls;
