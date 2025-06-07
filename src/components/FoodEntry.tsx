import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Food } from '@/pages/Index';
import { Plus, Utensils } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FoodEntryProps {
  foods: Food[];
  onAddFood: (food: Omit<Food, 'id' | 'calories'>) => void;
  onAddEntry: (foodId: string, servings: number) => void;
}

export const FoodEntry = ({ foods, onAddFood, onAddEntry }: FoodEntryProps) => {
  const [newFood, setNewFood] = useState({
    name: '',
    protein: 0,
    carbs: 0,
    fats: 0
  });

  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [servings, setServings] = useState(1);

  const handleAddFood = () => {
    if (newFood.name.trim()) {
      onAddFood(newFood);
      setNewFood({ name: '', protein: 0, carbs: 0, fats: 0 });
    }
  };

  const handleLogFood = () => {
    if (selectedFoodId && servings > 0) {
      onAddEntry(selectedFoodId, servings);
      setSelectedFoodId('');
      setServings(1);
    }
  };

  const selectedFood = foods.find(f => f.id === selectedFoodId);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Utensils className="h-5 w-5" />
          Food Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="log">Log Food</TabsTrigger>
            <TabsTrigger value="add">Add New Food</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log" className="space-y-4">
            <div>
              <Label htmlFor="food-select">Select Food</Label>
              <Select value={selectedFoodId} onValueChange={setSelectedFoodId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a food..." />
                </SelectTrigger>
                <SelectContent>
                  {foods.map((food) => (
                    <SelectItem key={food.id} value={food.id}>
                      {food.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                min="0.1"
                step="0.1"
                value={servings}
                onChange={(e) => setServings(parseFloat(e.target.value) || 1)}
                className="mt-1"
              />
            </div>

            {selectedFood && (
              <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
                <h4 className="font-medium mb-2">Nutrition Preview</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: {Math.round((selectedFood.calories || 0) * servings)}</div>
                  <div>Protein: {(selectedFood.protein * servings).toFixed(1)}g</div>
                  <div>Carbs: {(selectedFood.carbs * servings).toFixed(1)}g</div>
                  <div>Fats: {(selectedFood.fats * servings).toFixed(1)}g</div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleLogFood} 
              disabled={!selectedFoodId || servings <= 0}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Log Food
            </Button>
          </TabsContent>
          
          <TabsContent value="add" className="space-y-4">
            <div>
              <Label htmlFor="food-name">Food Name</Label>
              <Input
                id="food-name"
                value={newFood.name}
                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Chicken Breast"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  min="0"
                  step="0.1"
                  value={newFood.protein}
                  onChange={(e) => setNewFood(prev => ({ ...prev, protein: parseFloat(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  value={newFood.carbs}
                  onChange={(e) => setNewFood(prev => ({ ...prev, carbs: parseFloat(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="fats">Fats (g)</Label>
                <Input
                  id="fats"
                  type="number"
                  min="0"
                  step="0.1"
                  value={newFood.fats}
                  onChange={(e) => setNewFood(prev => ({ ...prev, fats: parseFloat(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/50 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Calculated calories: {Math.round((newFood.protein * 4) + (newFood.carbs * 4) + (newFood.fats * 9))}
              </p>
            </div>

            <Button 
              onClick={handleAddFood} 
              disabled={!newFood.name.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Food to Database
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};