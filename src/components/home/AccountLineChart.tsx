import type { NextPage } from "next";
import styles from "../../styles/Home.module.scss";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import useAccountStatics from "../../hooks/useAccountStatics";
const Line = dynamic(
  () => import("@ant-design/plots").then((mod: any) => mod.Line) as any,
  { ssr: false }
) as any;
const AccountLineChart: NextPage = () => {
  const [data, setData] = useState([]);
  // activeAccountNums incrAccountNums totalAccountNums
  // Daily active Daily increase Daily total
  const { result } = useAccountStatics();
  useEffect(() => {
    if (JSON.stringify(result) !== "{}") {
      let arr = [] as any;
      for (var key in result) {
        if (key === "activeAccountNums") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any) => {
              item.category = "Daily active";
              item.dataCount = Number(item.dataCount);
            });
            arr = [...arr, ...result[key]];
          }
        } else if (key === "incrAccountNums") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any) => {
              item.category = "Daily increase";
              item.dataCount = Number(item.dataCount);
            });
            arr = [...arr, ...result[key]];
          }
        } else if (key === "totalAccountNums") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any) => {
              item.category = "Daily total";
              item.dataCount = Number(item.dataCount);
            });
            arr = [...arr, ...result[key]];
          }
        }
      }
      setData(arr?.reverse());
    }
  }, [result]);
  const config = {
    data,
    xField: "dailyDate",
    yField: "dataCount",
    seriesField: "category",
    slider: {
      start: 0,
      end: 1,
    },
    legend: {
      position: "top-right",
      // layout: "horizontal",
    },
    color: ["#5B8FF9", "#F671D5", "green"],
    point: {
      shape: "circle",
    },
  };
  return (
    <div style={{ padding: "18px 48px 0 28px" }}>
      <Line {...config} />
    </div>
  );
};

export default memo(AccountLineChart);
