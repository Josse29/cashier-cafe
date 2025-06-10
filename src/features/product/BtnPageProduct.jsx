import { Pagination } from "../../components/";

const BtnPageProduct = (props) => {
  const { totalPage, req, setReq, getAPI, setLoading } = props;
  return (
    <Pagination
      totalPage={totalPage}
      req={req}
      setReq={setReq}
      getAPI={getAPI}
      setLoading={setLoading}
    />
  );
};

export default BtnPageProduct;
