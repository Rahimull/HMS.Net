// import { useEffect, useState } from "react";

// const Button = ({ children, ...props }) => (
//   <button
//     {...props}
//     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//   >
//     {children}
//   </button>
// );

// export default function PurchasesUi() {
//   const [suppliers, setSuppliers] = useState([]);
//   const [itemsList, setItemsList] = useState([]);

//   const [header, setHeader] = useState({
//     supplierId: "",
//     date: new Date().toISOString().substring(0, 10),
//     notes: "",
//   });

//   const [rows, setRows] = useState([]);

//   // 🔥 simulate API
//   useEffect(() => {
//     setSuppliers([
//       { id: 1, name: "Supplier A" },
//       { id: 2, name: "Supplier B" },
//     ]);

//     setItemsList([
//       { id: 1, name: "Item 1", price: 100 },
//       { id: 2, name: "Item 2", price: 50 },
//     ]);
//   }, []);

//   const handleHeaderChange = (e) => {
//     setHeader({ ...header, [e.target.name]: e.target.value });
//   };

//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         id: Date.now(),
//         itemId: "",
//         batch: "",
//         expiry: "",
//         qty: 1,
//         price: 0,
//         total: 0,
//       },
//     ]);
//   };

//   const updateRow = (id, field, value) => {
//     const updated = rows.map((r) => {
//       if (r.id === id) {
//         let newRow = { ...r, [field]: value };

//         // 🔥 auto price when item selected
//         if (field === "itemId") {
//           const item = itemsList.find((i) => i.id == value);
//           if (item) newRow.price = item.price;
//         }

//         newRow.total = newRow.qty * newRow.price;
//         return newRow;
//       }
//       return r;
//     });
//     setRows(updated);
//   };

//   const removeRow = (id) => {
//     setRows(rows.filter((r) => r.id !== id));
//   };

//   const totalAmount = rows.reduce((sum, r) => sum + r.total, 0);

//   const handleSubmit = () => {
//     const payload = {
//       ...header,
//       totalAmount,
//       details: rows,
//     };

//     console.log("SEND TO API:", payload);
//     alert("Saved Successfully ✅");
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Purchases (Pro UX)</h1>

//       {/* Header */}
//       <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
//         <select
//           name="supplierId"
//           value={header.supplierId}
//           onChange={handleHeaderChange}
//           className="p-2 border rounded"
//         >
//           <option value="">Select Supplier</option>
//           {suppliers.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           name="date"
//           value={header.date}
//           onChange={handleHeaderChange}
//           className="p-2 border rounded"
//         />

//         <input
//           name="notes"
//           placeholder="Notes"
//           value={header.notes}
//           onChange={handleHeaderChange}
//           className="p-2 border rounded"
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white p-6 rounded shadow">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-lg font-semibold">Items</h2>
//           <Button onClick={addRow}>+ Add Item</Button>
//         </div>

//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th>Item</th>
//               <th>Batch</th>
//               <th>Expiry</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Total</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r) => (
//               <tr key={r.id} className="border-b">
//                 <td>
//                   <select
//                     value={r.itemId}
//                     onChange={(e) => updateRow(r.id, "itemId", e.target.value)}
//                     className="p-1 border rounded"
//                   >
//                     <option value="">Select</option>
//                     {itemsList.map((i) => (
//                       <option key={i.id} value={i.id}>
//                         {i.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 <td>
//                   <input
//                     value={r.batch}
//                     onChange={(e) => updateRow(r.id, "batch", e.target.value)}
//                     className="p-1 border rounded"
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="date"
//                     value={r.expiry}
//                     onChange={(e) => updateRow(r.id, "expiry", e.target.value)}
//                     className="p-1 border rounded"
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     value={r.qty}
//                     onChange={(e) => updateRow(r.id, "qty", +e.target.value)}
//                     className="p-1 border rounded w-20"
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="number"
//                     value={r.price}
//                     onChange={(e) => updateRow(r.id, "price", +e.target.value)}
//                     className="p-1 border rounded w-24"
//                   />
//                 </td>

//                 <td>{r.total}</td>

//                 <td>
//                   <Button onClick={() => removeRow(r.id)}>X</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="text-right mt-4 text-lg font-bold">
//           Total: {totalAmount}
//         </div>
//       </div>

//       {/* Save */}
//       <div className="text-right">
//         <Button onClick={handleSubmit}>Save Purchase</Button>
//       </div>
//     </div>
//   );
// }








import { useState } from "react";

const Card = ({ children }) => (
  <div className="bg-white shadow rounded-xl p-4">{children}</div>
);

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    {children}
  </button>
);

export default function PurchasesUi() {
  const [activeTab, setActiveTab] = useState("items");

  const tabs = ["items", "stock", "purchases", "suppliers"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Store Management System</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded ${
              activeTab === t ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ITEMS */}
      {activeTab === "items" && (
        <Card>
          <h2 className="font-bold mb-4">Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input placeholder="Name" className="border p-2 rounded" />
            <input placeholder="Category" className="border p-2 rounded" />
            <input placeholder="Unit" className="border p-2 rounded" />
            <input placeholder="Price" className="border p-2 rounded" />
          </div>
          <div className="mt-4">
            <Button>Add Item</Button>
          </div>
        </Card>
      )}

      {/* STOCK */}
      {activeTab === "stock" && (
        <Card>
          <h2 className="font-bold mb-4">Item Stock</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <select className="border p-2 rounded">
              <option>Select Item</option>
            </select>
            <input placeholder="Batch" className="border p-2 rounded" />
            <input type="date" className="border p-2 rounded" />
            <input placeholder="Quantity" className="border p-2 rounded" />
            <input placeholder="Location" className="border p-2 rounded" />
          </div>
          <div className="mt-4">
            <Button>Add Stock</Button>
          </div>
        </Card>
      )}

      {/* PURCHASES */}
      {activeTab === "purchases" && (
        <Card>
          <h2 className="font-bold mb-4">Purchases</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <select className="border p-2 rounded">
              <option>Supplier</option>
            </select>
            <input type="date" className="border p-2 rounded" />
            <input placeholder="Notes" className="border p-2 rounded" />
          </div>

          <div className="mt-4 border rounded p-3">
            <p className="text-sm text-gray-500">Items table goes here...</p>
          </div>

          <div className="mt-4">
            <Button>Save Purchase</Button>
          </div>
        </Card>
      )}

      {/* SUPPLIERS */}
      {activeTab === "suppliers" && (
        <Card>
          <h2 className="font-bold mb-4">Suppliers</h2>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Name" className="border p-2 rounded" />
            <input placeholder="Contact" className="border p-2 rounded" />
            <input placeholder="Address" className="border p-2 rounded" />
          </div>
          <div className="mt-4">
            <Button>Add Supplier</Button>
          </div>
        </Card>
      )}
    </div>
  );
}



