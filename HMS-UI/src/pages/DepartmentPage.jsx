const DepartmentPage = () => {
  const {
    data,
    totalCount,
    pagination,
    setPagination,
    setSorting,
    search,
    setSearch,
    loading,
  } = useCrud(DepartmentApi);

  return (
    <Layout>
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={departmentColumns}
        data={data}
        pagination={pagination}
        totalCount={totalCount}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        loading={loading}
      />
    </Layout>
  );
};