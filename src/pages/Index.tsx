import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FoodEntry } from '@/components/FoodEntry';
import { MacroChart } from '@/components/MacroChart';
import { TrendChart } from '@/components/TrendChart';
import { FoodDatabase } from '@/components/FoodDatabase';
import { DailyProgress } from '@/components/DailyProgress';
import { RecentMeals } from '@/components/RecentMeals';
import { MacroGoals } from '@/components/MacroGoals';
import { toast } from '@/hooks/use-toast';
import { Calculator, TrendingUp, Database, Target } from 'lucide-react';

export interface Food {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  calories?: number;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  servings: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  timestamp: number;
  date: string;
}

export interface MacroGoals {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

const Index = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [goals, setGoals] = useState<MacroGoals>({
    protein: 150,
    carbs: 200,
    fats: 70,
    calories: 2000
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFoods = localStorage.getItem('macro-tracker-foods');
    const savedEntries = localStorage.getItem('macro-tracker-entries');
    const savedGoals = localStorage.getItem('macro-tracker-goals');
    
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('macro-tracker-foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('macro-tracker-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('macro-tracker-goals', JSON.stringify(goals));
  }, [goals]);

  const addFood = (food: Omit<Food, 'id' | 'calories'>) => {
    const calories = (food.protein * 4) + (food.carbs * 4) + (food.fats * 9);
    const newFood: Food = {
      ...food,
      id: Date.now().toString(),
      calories
    };
    setFoods(prev => [...prev, newFood]);
    toast({
      title: "Food Added",
      description: `${food.name} has been added to your database.`,
    });
  };

  const addEntry = (foodId: string, servings: number) => {
    const food = foods.find(f => f.id === foodId);
    if (!food) return;

    const entry: FoodEntry = {
      id: Date.now().toString(),
      foodId,
      foodName: food.name,
      servings,
      protein: food.protein * servings,
      carbs: food.carbs * servings,
      fats: food.fats * servings,
      calories: (food.calories || 0) * servings,
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setEntries(prev => [...prev, entry]);
    toast({
      title: "Entry Added",
      description: `${servings}x ${food.name} logged successfully.`,
    });
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(e => e.id !== entryId));
    toast({
      title: "Entry Deleted",
      description: "Food entry has been removed.",
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(entry => entry.date === today);
  
  const todayTotals = todayEntries.reduce(
    (acc, entry) => ({
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fats: acc.fats + entry.fats,
      calories: acc.calories + entry.calories
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            MacroTracker
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Track your nutrition with precision and style
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Progress & Goals */}
          <div className="lg:col-span-1 space-y-6">
            <DailyProgress totals={todayTotals} goals={goals} />
            <MacroGoals goals={goals} onUpdateGoals={setGoals} />
          </div>

          {/* Middle Column - Charts */}
          <div className="lg:col-span-1 space-y-6">
            <MacroChart totals={todayTotals} />
            <TrendChart entries={entries} />
          </div>

          {/* Right Column - Recent Activity */}
          <div className="lg:col-span-1 space-y-6">
            <RecentMeals 
              entries={todayEntries} 
              onDeleteEntry={deleteEntry}
            />
          </div>
        </div>

        {/* Bottom Section - Food Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FoodEntry 
            foods={foods} 
            onAddFood={addFood}
            onAddEntry={addEntry}
          />
          <FoodDatabase 
            foods={foods}
            onAddEntry={addEntry}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;