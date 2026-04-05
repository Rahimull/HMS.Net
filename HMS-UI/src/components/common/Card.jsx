// Card Component
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
};

// Cards Section
const StatsSection = () => {
  const data = [
    { title: "Total Patients", value: "1200" },
    { title: "OPD Today", value: "120" },
    { title: "Admitted", value: "45" },
    { title: "Revenue", value: "$5000" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {data.map((card, i) => (
        <StatCard key={i} title={card.title} value={card.value} />
      ))}
    </div>
  );
};
export default StatsSection;
