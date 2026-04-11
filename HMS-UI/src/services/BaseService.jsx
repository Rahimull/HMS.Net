const [data, setData] = useState([]);
const [totalCount, setTotalCount] = useState(0);
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
});
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  patientService
    .getPaged({
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    })
    .then((res) => {
      setData(res.data);
      setTotalCount(res.totalCount);
    })
    .finally(() => setLoading(false));
}, [pagination]);