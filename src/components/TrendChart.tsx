import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FoodEntry } from '@/pages/Index';

interface TrendChartProps {
  entries: FoodEntry[];
}

export const TrendChart = ({ entries }: TrendChartProps) => {
  // Group entries by date and calculate daily totals
  const dailyTotals = entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = { date, protein: 0, carbs: 0, fats: 0, calories: 0 };
    }
    acc[date].protein += entry.protein;
    acc[date].carbs += entry.carbs;
    acc[date].fats += entry.fats;
    acc[date].calories += entry.calories;
    return acc;
  }, {} as Record<string, any>);

  // Convert to array and sort by date (last 7 days)
  const chartData = Object.values(dailyTotals)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map((day: any) => ({
      ...day,
      date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}
              {entry.dataKey === 'calories' ? ' cal' : 'g'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">📊 7-Day Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="protein" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Protein (g)"
              />
              <Line 
                type="monotone" 
                dataKey="carbs" 
                stroke="#06b6d4" 
                strokeWidth={2}
                name="Carbs (g)"
              />
              <Line 
                type="monotone" 
                dataKey="fats" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Fats (g)"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            <p>Start logging food to see your trends!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};