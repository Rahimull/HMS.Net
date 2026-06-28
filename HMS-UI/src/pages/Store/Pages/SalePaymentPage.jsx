import SalePaymentApi from "@/api/store/SalePaymentApi";
import { useMemo, useState } from "react";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import useLoadData from "@/hooks/useLoadData";
import DataTable from "@/components/common/DataTable";
import FilterCard from "@/components/filter/FilterCard";
import { Label } from "recharts";
import Input from "@/components/common/Input";
import CreateUpdateSalePayment from "./CreateUpdateSalePayment";



const SalePaymentPage = () => {

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

  const curd = useCreatUpdateForm(SalePaymentApi);

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
  } = useLoadData(SalePaymentApi, { filters, refreshKey:curd.refreshKey });

   const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "address", header: "Address  ", enableSorting: true },
  ];


  return (
    <>
      <FilterCard 
        title="Sale Payment Filters"
        subtitle="Filter Pharmacy Sale Payments"
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
            placeholder="Sale Payment Name"
            value={search}
            onChange={(e)=> {setSearch(e.target.value)}}
          />
        </div>
       
      </FilterCard>
      <CreateUpdateSalePayment curd={curd} />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        title="Sale Payment List"
        subTitle="Pharmacy Sale Payment List"
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

export default SalePaymentPage;
