const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className="border p-2">{col.label}</th>
          ))}
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={col.key} className="border p-2">
                {row[col.key]}
              </td>
            ))}
            <td className="border p-2">
              <button onClick={() => onEdit(row)}>Edit</button>
              <button onClick={() => onDelete(row.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;