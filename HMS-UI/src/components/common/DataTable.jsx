const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={col.key} className="p-2">
                {col.label}
              </th>
            ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr className="border-b hover:bg-gray-100" key={row.id}>
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {row[col.key]}
                </td>
              ))}
              <td className="p-2 text-green-600">
                <button
                  onClick={() => onEdit(row)}
                  className="font-semibold mr-2 cursor-pointer hover:text-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="font-semibold text-red-500 cursor-pointer hover:text-red-950"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
