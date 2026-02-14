export default function Card({ children, className = '', hover = false }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-md p-6 transition-all duration-200 ${
        hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StatsCard({ title, value, color = 'blue', icon: Icon }) {
  const colors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  return (
    <Card hover>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 bg-${color}-50 rounded-lg`}>
            <Icon className={colors[color]} size={24} />
          </div>
        )}
      </div>
    </Card>
  );
}
