import { nodeDaliyJobsStatics } from "../api";
import useSWR from "swr";
import { useCallback, useEffect } from "react";
import dayjs from "dayjs";
function useBarChart(body: any) {
  const { data, error }: any = useSWR(
    `/v1/node/daily_workload_change-${body.accountAddr}-${body.value}`,
    (path) => {
      const params = path.split("-");
      const [, accountAddr, value] = params;
      if (!accountAddr) {
        return;
      }
      if (!value) {
        return;
      }
      let req = {
        accountAddr: accountAddr,
      } as any;
      if (value === "7") {
        // 7
        req.startDate = dayjs(new Date().getTime())
          .subtract(7, "day")
          .format("YYYY-MM-DD 00:00:00");
        req.endDate = dayjs(new Date().getTime()).format("YYYY-MM-DD 23:59:59");
      } else if (value === "15") {
        // 30
        req.startDate = dayjs(new Date().getTime())
          .subtract(15, "day")
          .format("YYYY-MM-DD 00:00:00");
        req.endDate = dayjs(new Date().getTime()).format("YYYY-MM-DD 23:59:59");
      } else if (value === "3") {
        // 3
        req.startDate = dayjs(new Date().getTime())
          .subtract(3, "month")
          .format("YYYY-MM-DD 00:00:00");
        req.endDate = dayjs(new Date().getTime()).format("YYYY-MM-DD 23:59:59");
      }
      return nodeDaliyJobsStatics(req);
    }
  );
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useBarChart;
