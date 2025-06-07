import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodEntry } from '@/pages/Index';
import { Trash2, Clock } from 'lucide-react';

interface RecentMealsProps {
  entries: FoodEntry[];
  onDeleteEntry: (entryId: string) => void;
}

export const RecentMeals = ({ entries, onDeleteEntry }: RecentMealsProps) => {
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Meals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedEntries.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{entry.foodName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {entry.servings}x serving • {Math.round(entry.calories)} cal
                  </p>
                  <div className="flex gap-4 text-xs mt-1">
                    <span className="text-purple-400">P: {entry.protein.toFixed(1)}g</span>
                    <span className="text-cyan-400">C: {entry.carbs.toFixed(1)}g</span>
                    <span className="text-amber-400">F: {entry.fats.toFixed(1)}g</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No meals logged today.</p>
            <p className="text-sm mt-1">Start by adding some food!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};