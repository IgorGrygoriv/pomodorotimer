import { useEffect } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import './App.css';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <PomodoroTimer />
    </div>
  );
}

export default App;
