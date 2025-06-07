import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MacroGoals as MacroGoalsType } from '@/pages/Index';
import { Edit3, Save, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MacroGoalsProps {
  goals: MacroGoalsType;
  onUpdateGoals: (goals: MacroGoalsType) => void;
}

export const MacroGoals = ({ goals, onUpdateGoals }: MacroGoalsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editGoals, setEditGoals] = useState(goals);

  const handleSave = () => {
    onUpdateGoals(editGoals);
    setIsEditing(false);
    toast({
      title: "Goals Updated",
      description: "Your macro goals have been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditGoals(goals);
    setIsEditing(false);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            🎯 Daily Goals
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-purple-400 hover:text-purple-300"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="text-green-400 hover:text-green-300"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-red-400 hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                value={editGoals.calories}
                onChange={(e) => setEditGoals(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                value={editGoals.protein}
                onChange={(e) => setEditGoals(prev => ({ ...prev, protein: parseInt(e.target.value) || 0 }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                value={editGoals.carbs}
                onChange={(e) => setEditGoals(prev => ({ ...prev, carbs: parseInt(e.target.value) || 0 }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                type="number"
                value={editGoals.fats}
                onChange={(e) => setEditGoals(prev => ({ ...prev, fats: parseInt(e.target.value) || 0 }))}
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Calories:</span>
              <span className="font-medium">{goals.calories}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Protein:</span>
              <span className="font-medium">{goals.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carbs:</span>
              <span className="font-medium">{goals.carbs}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fats:</span>
              <span className="font-medium">{goals.fats}g</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};