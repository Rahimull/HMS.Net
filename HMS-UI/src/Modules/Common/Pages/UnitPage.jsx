import UnitApi from "../../../api/Common/UnitApi";
import { useMemo, useState } from "react";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import useLoadData from "@/hooks/useLoadData";
import DataTable from "@/components/common/DataTable";
import FilterCard from "@/components/filter/FilterCard";
import { Label } from "recharts";
import Input from "@/components/common/Input";
import CreateUpdateUnit from "./CreateUpdateUnit";


const UnitPage = () => {

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

  const curd = useCreatUpdateForm(UnitApi);

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
  } = useLoadData(UnitApi, { filters, refreshKey:curd.refreshKey });

   const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
  ];


  return (
    <>
      <FilterCard 
        title="Unit Filters"
        subtitle="Filter Pharmacy Units"
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
            placeholder="Unit Name"
            value={search}
            onChange={(e)=> {setSearch(e.target.value)}}
          />
        </div>
       
      </FilterCard>
      <CreateUpdateUnit curd={curd} />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        title="Unit List"
        subTitle="Pharmacy Unit List"
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

export default UnitPage;
