import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Food } from '@/pages/Index';
import { Database, Plus, Search } from 'lucide-react';

interface FoodDatabaseProps {
  foods: Food[];
  onAddEntry: (foodId: string, servings: number) => void;
}

export const FoodDatabase = ({ foods, onAddEntry }: FoodDatabaseProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [servingInputs, setServingInputs] = useState<Record<string, number>>({});

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServingChange = (foodId: string, value: number) => {
    setServingInputs(prev => ({ ...prev, [foodId]: value }));
  };

  const handleQuickAdd = (foodId: string) => {
    const servings = servingInputs[foodId] || 1;
    onAddEntry(foodId, servings);
    setServingInputs(prev => ({ ...prev, [foodId]: 1 }));
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Database className="h-5 w-5" />
          Food Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div
                key={food.id}
                className="p-3 rounded-lg bg-secondary/50 border border-border/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{food.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(food.calories || 0)} cal per serving
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <span className="text-purple-400">P: {food.protein}g</span>
                  <span className="text-cyan-400">C: {food.carbs}g</span>
                  <span className="text-amber-400">F: {food.fats}g</span>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={servingInputs[food.id] || 1}
                    onChange={(e) => handleServingChange(food.id, parseFloat(e.target.value) || 1)}
                    className="flex-1 h-8 text-sm"
                    placeholder="Servings"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleQuickAdd(food.id)}
                    className="h-8 px-3"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? (
                <p>No foods found matching "{searchTerm}"</p>
              ) : (
                <p>No foods in database. Add some foods to get started!</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};