import { blockPage } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useBlock(body: any) {
  const { data, error }: any = useSWR(
    "/v1/block/page",
    () => {
      return blockPage(body);
    },
    { refreshInterval: 3000 }
  );
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : [];
  return {
    loading,
    result: result.reverse(),
  };
}

export default useBlock;
