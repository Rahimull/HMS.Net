const KPI = ({ title, value, color }) => {
  return (
    <div className={`p-5 rounded-xl text-white shadow bg-gradient-to-r ${color}`}>
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
  );
};

export default KPI;
