import { globalData } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useGlobal() {
  const { data, error }: any = useSWR("/v1/home/global", () => {
    return globalData();
  }, {refreshInterval: 5000});
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useGlobal;
