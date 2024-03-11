import { transactionStatisticsEVM } from "../api";
import useSWR from "swr";
function useTransactionStaticsEVM() {
  const { data, error }: any = useSWR("/v1/tx/evm/statistics", () => {
    return transactionStatisticsEVM();
  });
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : [];
  return {
    loading,
    result,
  };
}

export default useTransactionStaticsEVM;
