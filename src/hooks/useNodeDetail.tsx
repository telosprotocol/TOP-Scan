import { nodeDetail } from "../api";
import useSWR from "swr";
function useNodeDetail(address: any) {
  const { data, error }: any = useSWR(address ? `/v1/node/-${address}` : null, (path) => {
    if (!address) {
      return;
    }
    return nodeDetail(path.split('-')[1]);
  });
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useNodeDetail;
