import type { NextPage } from "next";
import styles from "../../styles/AreaChart.module.scss";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import { accuracy, formatBalance } from "../../utils";
import QuestionTip from "../../components/QuestionTip";
const Area = dynamic(
  () => import("@ant-design/plots").then((mod: any) => mod.Area) as any,
  { ssr: false }
) as any;
type CProps = {
  xField: string;
  yField: string;
  resData: any;
  title: string;
  icon?: React.ReactNode;
  style?: any;
  type: string;
  tips?: string;
};

const TransactionsLineChart: NextPage<CProps> = ({
  xField,
  yField,
  resData,
  title,
  icon,
  style = {},
  type,
  tips,
}: CProps) => {
  const tmpResData = [...resData]
  tmpResData?.reverse()
  const config = {
    data: tmpResData,
    xField: xField,
    yField: yField,
    yAxis: {
      label: {
        formatter: (v: any) => {
          if (type === "transaction") {
            return formatBalance(v);
          } else if (type === "reward") {
            return formatBalance(accuracy(v, 6, 6));
          } else {
            return formatBalance(v);
          }
        },
      },
      grid: {
        line: {
          style: {
            stroke: "rgb(150,160,171)",
            lineDash: [4, 5],
          },
        },
      },
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#5B8FF9",
      };
    },
    tooltip: {
      formatter: (datum: any) => {
        if (type === "transaction") {
          return { name: "Transaction", value: formatBalance(datum.dataCount) };
        } else if (type === "reward") {
          return {
            name: "Reward",
            value: formatBalance(accuracy(datum.data, 6, 6)),
          };
        } else {
          return { name: datum.type, value: formatBalance(datum.value) };
        }
      },
    },
    // xAxis: {
    //   tickCount: 5,
    // },
    width: 100,
    height: 300,
    // tooltip: {
    //   formatter: (datum: any) => {
    //     return { name: "daliy count", value: datum.dataCount };
    //   },
    // },

    animation: false,
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: true,
      },
    },
  };
  return (
    <div className={styles.part2_lineChart}>
      <h2 style={style}>
        {icon}
        <span style={{ marginRight: "5px" }}>{title}</span>
        {tips && <QuestionTip ml={0} text={tips}></QuestionTip>}
      </h2>
      <Area {...config} />
    </div>
  );
};

export default memo(TransactionsLineChart);
