import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSettings from './TimerSettings';
import TaskList from './TaskList';
import useLocalStorage from '../hooks/useLocalStorage';

function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [sessionType, setSessionType] = useState('work');
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useLocalStorage('pomodoro-tasks', []);

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

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const totalTime = sessionType === 'work' ? workDuration * 60 : breakDuration * 60;

  return (
    <div className="w-full mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold" style={{ color: '#00B8D4' }}>
          PomodoroTIME MWAHAHAHA
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <Card className="backdrop-blur-sm bg-card/50 border-2">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <TimerDisplay
                  timeLeft={timeLeft}
                  sessionType={sessionType}
                  totalTime={totalTime}
                />
                <TimerControls
                  isRunning={isRunning}
                  onStartPause={handleStartPause}
                  onReset={handleReset}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/50 border-2">
            <CardContent className="pt-6">
              <TimerSettings
                workDuration={workDuration}
                breakDuration={breakDuration}
                onWorkDurationChange={handleWorkDurationChange}
                onBreakDurationChange={handleBreakDurationChange}
                disabled={isRunning}
              />
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <div className="lg:sticky lg:top-4 h-fit">
          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
          />
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
