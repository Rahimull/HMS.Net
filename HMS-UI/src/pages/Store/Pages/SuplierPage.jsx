import SuplierApi from "@/api/store/SuplierApi";
import { useMemo, useState } from "react";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import useLoadData from "@/hooks/useLoadData";
import DataTable from "@/components/common/DataTable";
import FilterCard from "@/components/filter/FilterCard";
import { Label } from "recharts";
import Input from "@/components/common/Input";
import CreateUpdateSupplier from "./CreateUpdateSupplier";


const SupplierPage = () => {

  // for load data
  const [filterStatus, setFilterStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filters = useMemo(
    () => ({
      status: filterStatus,
      fromDate,
      toDate,
    }),
    [filterStatus, fromDate, toDate],
  );

  const curd = useCreatUpdateForm(SuplierApi);

  const {
    data,
    totalCount,
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    dataLoading,
  } = useLoadData(SuplierApi, { filters, refreshKey:curd.refreshKey });

   const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "address", header: "Address  ", enableSorting: true },
  ];


  return (
    <>
      <FilterCard 
        title="Supplier Filters"
        subtitle="Filter Pharmacy Suppliers"
        onApply={() => console.log("Applay")}
        onReset={()=>{
          setSearch("");
          setFilterStatus("");
          setFromDate("");
          setToDate("");
          setPagination((p)=>({
            ...p, pageIndex: 0,
          }))
        }}
      >
        {/* SERACH */} 
        <div>
          <Label name="search" />
          <Input 
            type="text"
            placeholder="Supplier Name"
            value={search}
            onChange={(e)=> {setSearch(e.target.value)}}
          />
        </div>
       
      </FilterCard>
      <CreateUpdateSupplier curd={curd} />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        title="Supplier List"
        subTitle="Pharmacy Supplier List"
        pagination={pagination}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={dataLoading}
        headerContent=""
        actions={curd.defaultAction}
        totalCount={totalCount}
        onAddBtn={curd.openCreate}
        onAddBtnText="Add"
      />
    </>
  );
};

export default SupplierPage;
