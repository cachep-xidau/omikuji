const HealthCard = ({ icon: Icon, title, value, unit, status = 'Mid' }) => {
  return (
    <div className="card-health">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={18} className="text-gray-600" />}
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-black">{value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      <div className="mt-1">
        <span className="text-xs text-gray-500">{status}</span>
      </div>
    </div>
  );
};

export default HealthCard;
