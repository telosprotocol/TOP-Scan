import { accountStatistics } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useAccountStatics() {
  const { data, error }: any = useSWR("/v1/account/statistics", () => {
    return accountStatistics();
  });
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useAccountStatics;
