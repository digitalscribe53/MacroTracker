import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface MacroChartProps {
  totals: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export const MacroChart = ({ totals }: MacroChartProps) => {
  const data = [
    { name: 'Protein', value: totals.protein * 4, grams: totals.protein, color: '#8b5cf6' },
    { name: 'Carbs', value: totals.carbs * 4, grams: totals.carbs, color: '#06b6d4' },
    { name: 'Fats', value: totals.fats * 9, grams: totals.fats, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.grams.toFixed(1)}g</p>
          <p className="text-sm text-muted-foreground">{data.value.toFixed(0)} calories</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">📈 Today's Macros</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart margin={{ top: 10, right: 40, bottom: 40, left: 40 }}>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              outerRadius={65}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              style={{ fontSize: '12px' }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <p className="text-sm font-medium">Protein</p>
            <p className="text-lg font-bold text-purple-400">{totals.protein.toFixed(1)}g</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <p className="text-sm font-medium">Carbs</p>
            <p className="text-lg font-bold text-cyan-400">{totals.carbs.toFixed(1)}g</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/20">
            <p className="text-sm font-medium">Fats</p>
            <p className="text-lg font-bold text-amber-400">{totals.fats.toFixed(1)}g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};