import { useMemo, useState } from "react";
import useCreatUpdateForm from "@/hooks/useCreateUpdateForm";
import useLoadData from "@/hooks/useLoadData";
import DataTable from "@/components/common/DataTable";
import FilterCard from "@/components/filter/FilterCard";
import { Label } from "recharts";
import Input from "@/components/common/Input";
import CreateUpdateCategory from "./CreateUpdateCategory";
import CategoryApi from "@/api/Common/Category";


const CategoryPage = () => {

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

  const curd = useCreatUpdateForm(CategoryApi);

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
  } = useLoadData(CategoryApi, { filters, refreshKey:curd.refreshKey });

   const columns = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    { accessorKey: "name", header: "Name", enableSorting: true },
  ];


  return (
    <>
      <FilterCard 
        title="Category Filters"
        subtitle="Filter Pharmacy Categories"
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
            placeholder="Category Name"
            value={search}
            onChange={(e)=> {setSearch(e.target.value)}}
          />
        </div>
       
      </FilterCard>
      <CreateUpdateCategory curd={curd} />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        title="Category List"
        subTitle="Pharmacy Category List"
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

export default CategoryPage;
