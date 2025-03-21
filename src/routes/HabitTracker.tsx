import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

interface Habit {
  id: number;
  name: string;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const habit = { id: Date.now(), name: newHabit.trim() };
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter new habit"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') addHabit();
              }}
            />
            <Button onClick={addHabit}>Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Habit List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            No habits added yet. Add one to get started!
          </Card>
        ) : (
          habits.map((habit) => (
            <Card key={habit.id}>
              <div className="flex items-center justify-between p-4">
                <span className="text-md">{habit.name}</span>
                <Button variant="destructive" size="sm" onClick={() => deleteHabit(habit.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;