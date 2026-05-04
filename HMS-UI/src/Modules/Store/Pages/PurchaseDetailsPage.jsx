import CurrentStockApi from "@/api/store/CurrentStockApi";
import { useEffect, useMemo, useState } from "react";
import KPI from "../component/KPI";
import Input from "@/components/common/Input";
import Chart from "@/components/common/Chart";
import DataTable from "@/components/common/DataTable";
import BaseCrudPage from "@/pages/Template/BaseCrudPage";

export default function StockDashboard() {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [totalCount, setTotalCount]= useState(0)
  const [sorting, setSorting] = useState(null);

  useEffect(() => {
    loadData();
  }, [pagination, sorting]);

  const loadData = async () => {
    const res = await CurrentStockApi.getPaged({ page: 1, pageSize: 1000 });
    const data = res.data.data.data ?? res.data.data ?? res.data ?? [];
    setStock(Array.isArray(data) ? data : []);

    setTotalCount(res.data.data.totalCount ?? data.length);
  };

  const filtered = useMemo(() => {
    return stock.filter((x) =>
      x.itemName?.toLowerCase().includes(search.toLocaleLowerCase()),
    );
  }, [stock, search]);

 const lowStock = useMemo(
  ()=> stock.filter(x=> stock.length < (x.menLevel ?? 10 )),
  [stock]
 )

  const outStock = useMemo(
    () => stock.filter((x) => x.quantity === 0),
    [stock],
  );


  const columns = useMemo(()=>[
    {accessorKey: "itemName", header: "Item" },
    {accessorKey: "quantity", header: "Qty" },
    {accessorKey: "minLevel", header: "Min", cell: ({row}) => row.original.minLevel ?? 10 },
    {accessorKey: "status", header: "Status", cell: ({row})=> {const item = row.original;
      const status = item.quantity === 0? "OUT" : item.quantity < (item.minLevel ?? 10) ? "LOW" : "GOOD";
      const style = status === "OUT" ? "text-red-600" : status === "LOW" ? "text-yellow-600" : "text-green-600";
      return <span className={style}>{status}</span>
    } },

  ],[]);

  


 

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold"> Stock Dashboard</h1>
        <p className="text-gray-500">Modular ERP Enventory System</p>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-4">
        <KPI
          title="Total Items"
          value={stock.length}
          color="from-blue-500 to-blue-700"
        />
        <KPI 
          title="Low Stock"
          value={lowStock.length}
          color="from-yellow-500 to-yellow-700"
        />
        <KPI
          title="Out of Stock"
          value={outStock.length}
          color="from-red-500 to-red-700"
        />
        <KPI
          title="Active"
          value={stock.length - outStock.length}
          color="from-purple-500 to-purple-700"
        />
      </div>

      {/* SEARCH */}
      <Input 
        placeholder="Search items..."
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />

        {/* cHART */}
        <Chart 
          data={filtered.slice(0,15)} />

        {/* TABLE */}
        <DataTable 
          columns={columns}
          data={stock}
          pagination={pagination}
          totalCount={totalCount}
          loading={false}
          onPaginationChange={setPagination}
          onSortingChange={(sort)=> {setSorting(sort);}}
          onEdit={(row)=> {console.log("edit", row)}}
          onDelete={(row)=> {console.log("delete", row)}}
          tableTitle="Current Stock"

        />
     

    </div>

  );
}
