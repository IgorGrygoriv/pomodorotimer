import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettings from './TimerSettings';
import SessionInfo from './SessionInfo';

function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionType, setSessionType] = useState('work');
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (sessionType === 'work') {
      setSessionType('break');
      setTimeLeft(breakDuration * 60);
    } else {
      setSessionType('work');
      setTimeLeft(workDuration * 60);
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionType('work');
    setTimeLeft(workDuration * 60);
  };

  const handleWorkDurationChange = (newDuration) => {
    const duration = Math.max(1, Math.min(60, newDuration));
    setWorkDuration(duration);
    if (sessionType === 'work' && !isRunning) {
      setTimeLeft(duration * 60);
    }
  };

  const handleBreakDurationChange = (newDuration) => {
    const duration = Math.max(1, Math.min(30, newDuration));
    setBreakDuration(duration);
    if (sessionType === 'break' && !isRunning) {
      setTimeLeft(duration * 60);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-4xl">Pomodoro Timer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <SessionInfo sessionType={sessionType} />
            <TimerDisplay
              timeLeft={timeLeft}
              sessionType={sessionType}
            />
            <TimerControls
              isRunning={isRunning}
              onStartPause={handleStartPause}
              onReset={handleReset}
            />
            <TimerSettings
              workDuration={workDuration}
              breakDuration={breakDuration}
              onWorkDurationChange={handleWorkDurationChange}
              onBreakDurationChange={handleBreakDurationChange}
              disabled={isRunning}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PomodoroTimer;
