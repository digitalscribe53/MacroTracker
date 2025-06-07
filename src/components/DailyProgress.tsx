import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MacroGoals } from '@/pages/Index';

interface DailyProgressProps {
  totals: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
  goals: MacroGoals;
}

export const DailyProgress = ({ totals, goals }: DailyProgressProps) => {
  const getProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-purple-500';
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          📊 Daily Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Calories</span>
            <span>{Math.round(totals.calories)}/{goals.calories}</span>
          </div>
          <Progress 
            value={getProgress(totals.calories, goals.calories)} 
            className="h-3"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Protein</span>
            <span>{Math.round(totals.protein)}g/{goals.protein}g</span>
          </div>
          <Progress 
            value={getProgress(totals.protein, goals.protein)} 
            className="h-3"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Carbs</span>
            <span>{Math.round(totals.carbs)}g/{goals.carbs}g</span>
          </div>
          <Progress 
            value={getProgress(totals.carbs, goals.carbs)} 
            className="h-3"
          />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Fats</span>
            <span>{Math.round(totals.fats)}g/{goals.fats}g</span>
          </div>
          <Progress 
            value={getProgress(totals.fats, goals.fats)} 
            className="h-3"
          />
        </div>
      </CardContent>
    </Card>
  );
};