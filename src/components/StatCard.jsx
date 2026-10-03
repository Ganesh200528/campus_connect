export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value} from last month
          </p>
        )}
      </div>
      {Icon && (
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
}
