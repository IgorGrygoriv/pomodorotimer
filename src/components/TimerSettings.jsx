import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

function TimerSettings({ workDuration, breakDuration, onWorkDurationChange, onBreakDurationChange, disabled }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#00B8D4' }}>
        Settings
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="work-duration" className="block text-sm font-medium text-muted-foreground">
            Work Duration (minutes)
          </label>
          <Input
            id="work-duration"
            type="number"
            min="1"
            max="60"
            value={workDuration}
            onChange={(e) => onWorkDurationChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full border-2"
            style={{ '--tw-ring-color': '#00B8D4' }}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="break-duration" className="block text-sm font-medium text-muted-foreground">
            Break Duration (minutes)
          </label>
          <Input
            id="break-duration"
            type="number"
            min="1"
            max="30"
            value={breakDuration}
            onChange={(e) => onBreakDurationChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full border-2"
            style={{ '--tw-ring-color': '#00B8D4' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default TimerSettings;
