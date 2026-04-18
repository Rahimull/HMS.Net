import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PharmacyPageUi() {
  const [header, setHeader] = useState({
    patient: "",
    doctor: "",
    prescription: "",
    notes: "",
  });

  const [rows, setRows] = useState([]);

  const handleHeaderChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        medicine: "",
        batch: "",
        qty: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const updateRow = (id, field, value) => {
    const updated = rows.map((r) => {
      if (r.id === id) {
        const newRow = { ...r, [field]: value };
        newRow.total = newRow.qty * newRow.price;
        return newRow;
      }
      return r;
    });
    setRows(updated);
  };

  const removeRow = (id) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const totalAmount = rows.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Pharmacy Sales System</h1>

      {/* Combined Section */}
      <Card className="rounded-2xl shadow">
        <CardContent className="p-6 space-y-6">

          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input name="patient" placeholder="Patient" value={header.patient} onChange={handleHeaderChange} className="p-2 border rounded" />
            <input name="doctor" placeholder="Doctor" value={header.doctor} onChange={handleHeaderChange} className="p-2 border rounded" />
            <input name="prescription" placeholder="Prescription" value={header.prescription} onChange={handleHeaderChange} className="p-2 border rounded" />
            <input name="notes" placeholder="Notes" value={header.notes} onChange={handleHeaderChange} className="p-2 border rounded" />
          </div>

          {/* Table */}
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Medicines</h2>
              <Button onClick={addRow}>+ Add</Button>
            </div>

            <table className="w-full text-left border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-2">Medicine</th>
                  <th className="p-2">Batch</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Total</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="p-2">
                      <input value={r.medicine} onChange={(e) => updateRow(r.id, "medicine", e.target.value)} className="p-1 border rounded w-full" />
                    </td>
                    <td className="p-2">
                      <input value={r.batch} onChange={(e) => updateRow(r.id, "batch", e.target.value)} className="p-1 border rounded w-full" />
                    </td>
                    <td className="p-2">
                      <input type="number" value={r.qty} onChange={(e) => updateRow(r.id, "qty", +e.target.value)} className="p-1 border rounded w-20" />
                    </td>
                    <td className="p-2">
                      <input type="number" value={r.price} onChange={(e) => updateRow(r.id, "price", +e.target.value)} className="p-1 border rounded w-24" />
                    </td>
                    <td className="p-2 font-medium">{r.total}</td>
                    <td className="p-2">
                      <Button onClick={() => removeRow(r.id)}>X</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="text-lg font-bold">Total: {totalAmount}</div>
            <Button className="px-6">Save Sale</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
