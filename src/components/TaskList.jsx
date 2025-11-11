import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, Plus } from 'lucide-react';

function TaskList({ tasks, onAddTask, onDeleteTask, onToggleTask }) {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <Card className="backdrop-blur-sm bg-card/50 border-2 h-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span style={{ color: '#00B8D4' }}>
            Tasks
          </span>
          <span className="text-sm font-normal font-semibold" style={{ color: '#00B8D4' }}>
            {completedCount} / {totalCount}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 border-2"
            style={{ '--tw-ring-color': '#00B8D4' }}
          />
          <Button
            type="submit"
            size="icon"
            className="text-white"
            style={{
              backgroundColor: '#00B8D4'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0097B8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00B8D4'}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No tasks yet. Add one to get started!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all transform hover:scale-[1.02] ${
                  task.completed
                    ? 'bg-muted/30 border-muted'
                    : 'bg-card/80 border-border'
                }`}
                style={!task.completed ? {
                  borderColor: 'rgba(0, 184, 212, 0.3)'
                } : {}}
                onMouseEnter={(e) => {
                  if (!task.completed) {
                    e.currentTarget.style.borderColor = 'rgba(0, 184, 212, 0.5)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 184, 212, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!task.completed) {
                    e.currentTarget.style.borderColor = 'rgba(0, 184, 212, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'border-transparent'
                      : 'border-muted-foreground hover:scale-110'
                  }`}
                  style={task.completed ? {
                    backgroundColor: '#00B8D4'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (!task.completed) {
                      e.currentTarget.style.borderColor = '#00B8D4';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!task.completed) {
                      e.currentTarget.style.borderColor = '';
                    }
                  }}
                >
                  {task.completed && <Check className="h-4 w-4 text-white" />}
                </button>
                <span
                  className={`flex-1 ${
                    task.completed ? 'line-through text-muted-foreground' : 'font-medium'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-red-500 transition-all hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskList;
