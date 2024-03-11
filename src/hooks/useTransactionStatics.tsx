import { transactionStatistics } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useTransactionStatics() {
  const { data, error }: any = useSWR("/v1/tx/statistics", () => {
    return transactionStatistics();
  });
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : [];
  return {
    loading,
    result,
  };
}

export default useTransactionStatics;
