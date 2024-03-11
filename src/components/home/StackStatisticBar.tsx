import type { NextPage } from "next";
import styles from "../../styles/Home.module.scss";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import useNodeStatics from "../../hooks/useNodeStatics";
import { AnyMxRecord } from "dns";
import { formatBalance } from "../../utils";
const Bar = dynamic(
  () => import("@ant-design/plots").then((mod: any) => mod.Bar) as any,
  { ssr: false }
) as any;
const StackStatisticBar: NextPage = () => {
  const { result } = useNodeStatics();
  const [data, setData] = useState([]);
  const config = {
    data,
    height: 280,
    xField: "value",
    yField: "type",
    // xAxis: false,
    // autoFit: true,
    // padding: "auto",
    xAxis: {
      label: {
        formatter: (v: any) => {
          return formatBalance(v);
        },
      },
    },
    yAxis: {
      tickCount: 4,
    },
    label: {
      position: "right",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "black",
        opacity: 0.6,
      },
      formatter: (value: any) => {
        return formatBalance(value.value);
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: datum.type, value: formatBalance(datum.value) };
      },
    },
    seriesField: "type",
    legend: false,
    minBarWidth: 15,
    maxBarWidth: 15,
    color: ["#E4EFFF", "#B3CDF1", "#5599FF", "#1677FF"],
  };
  useEffect(() => {
    if (JSON.stringify(result) !== "{}") {
      let arr = [] as any;
      let obj = {} as any;
      for (var key in result) {
        obj = {};
        if (key === "auditor") {
          obj.type = "Auditor node";
          obj.value = result[key];
          arr.push(obj);
        } else if (key === "validator") {
          obj.type = "Validator node";
          obj.value = result[key];
          arr.push(obj);
        } else if (key === "rec") {
          obj.type = "Beacon Node";
          obj.value = result[key];
          arr.push(obj);
        } else if (key === "zec") {
          obj.type = "Sub-beacon";
          obj.value = result[key];
          arr.push(obj);
        }
      }
      setData(arr);
    }
  }, [result]);
  return (
    <div style={{padding:'0 20px'}}>
      <Bar {...config} />
    </div>
  );
};

export default memo(StackStatisticBar);
