import { nodeDaliyRewardStatics } from "../api";
import useSWR from "swr";
import { useEffect } from "react";
function useDaliyReward(body: any) {
  const { data, error }: any = useSWR(
    body.accountAddr && body.nodeFlag
      ? `v1nodedaily_reward_change${JSON.stringify(body)}`
      : null,
    (path) => {
      return nodeDaliyRewardStatics(
        JSON.parse(path.replace(/^v1nodedaily_reward_change/, ""))
      );
    }
  );
  const loading = !error && !data;
  const result = data?.message === "OK" ? data.result : {};
  return {
    loading,
    result,
  };
}

export default useDaliyReward;
