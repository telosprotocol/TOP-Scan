import { nodeStatistics } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useNodeStatics() {
  const { data, error }: any = useSWR("/v1/node/stake/stat", () => {
    return nodeStatistics();
  });
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useNodeStatics;
