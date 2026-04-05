// Table Component
const RecentPatientsTable = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2">Ahmad</td>
            <td className="p-2">Dr. Ali</td>
            <td className="p-2 text-green-600">Completed</td>
          </tr>
          <tr>
            <td className="p-2">Karim</td>
            <td className="p-2">Dr. Sara</td>
            <td className="p-2 text-yellow-600">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default RecentPatientsTable;