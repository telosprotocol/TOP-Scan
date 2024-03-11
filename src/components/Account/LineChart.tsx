import type { NextPage } from "next";
import styles from "../../styles/node.module.scss";
import dynamic from "next/dynamic";
import { memo, useEffect, useMemo, useState } from "react";
import { Checkbox } from "antd";
import { converModifyDate, formatBalance } from "../../utils";
import useLineChart from "../../hooks/useLineChart";
import { useRouter } from "next/router";
const Line = dynamic(
  () => import("@ant-design/plots").then((mod: any) => mod.Line) as any,
  { ssr: false }
) as any;
type CProps = {
  color: any;
  title: string;
  subtitle: string;
  desc: string;
  type: any;
};
const LineChart: NextPage<CProps> = ({
  color,
  title,
  subtitle,
  desc,
  type,
}: CProps) => {
  const router = useRouter();
  const { address } = router.query;
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([
    {
      label: "Last 7 days",
      value: 7,
      checked: true,
      disabled: true,
    },
    {
      label: "Last 15 days",
      value: 15,
      checked: false,
      disabled: false,
    },
    {
      label: "Last 3 months",
      value: 3,
      checked: false,
      disabled: false,
    },
  ]);
  const checkedItem = useMemo(() => {
    return options.find((item) => {
      return item.checked === true;
    });
  }, [options]);
  const { result } = useLineChart({
    accountAddr: address,
    value: checkedItem?.value,
  });
  const config = {
    data: data,
    xField: "dailyDate",
    yField: "value",
    yAxis: {
      label: {
        formatter: (v: any) => {
          return formatBalance(v);
        },
      },
    },
    seriesField: "type",
    legend: {
      position: "bottom",
      layout: "horizontal",
      maxItemWidth: 300,
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.type,
          value: formatBalance(datum.value),
        };
      },
    },
    // smooth: true,
    // animation: {
    //   appear: {
    //     animation: "path-in",
    //     duration: 5000,
    //   },
    // },
    slider: {
      start: 0,
      end: 1,
    },
    color: color,
    point: {
      shape: "circle",
    },
  };
  useEffect(() => {
    if (JSON.stringify(result) !== "{}") {
      let arr = [] as any;
      let obj = {} as any;
      for (var key in result) {
        obj = {};
        arr = [];
        if (key === type && type === "auditorStakeDailyData") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any, index: number) => {
              let obj2 = {};
              let obj3 = {};
              // dailyDate: "2022-05-09"
              // data: "0.330000"
              // dataMedian: "0.000000"
              obj2 = {
                type: "Auditor stake value of all the node",
                value: item.data,
                dailyDate: item.dailyDate,
              };
              obj3 = {
                type: "Stake median value of all auditor nodes",
                value: item.dataMedian,
                dailyDate: item.dailyDate,
              };
              arr.push(obj2);
              arr.push(obj3);
            });
          }
          break;
        } else if (key === type && type === "auditorCreditDailyData") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any, index: number) => {
              let obj2 = {};
              let obj3 = {};
              // dailyDate: "2022-05-09"
              // data: "0.330000"
              // dataMedian: "0.000000"
              obj2 = {
                type: "Auditor credit score",
                value: item.data,
                dailyDate: item.dailyDate,
              };
              obj3 = {
                type: "Auditor credit score of the node",
                value: item.dataMedian,
                dailyDate: item.dailyDate,
              };
              arr.push(obj2);
              arr.push(obj3);
            });
          }
          break;
        } else if (key === type && type === "validatorStakeDailyData") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any, index: number) => {
              let obj2 = {};
              let obj3 = {};
              // dailyDate: "2022-05-09"
              // data: "0.330000"
              // dataMedian: "0.000000"
              obj2 = {
                type: "Validator stake value of the node",
                value: item.data,
                dailyDate: item.dailyDate,
              };
              obj3 = {
                type: "Stake median value of all auditor nodes",
                value: item.dataMedian,
                dailyDate: item.dailyDate,
              };
              arr.push(obj2);
              arr.push(obj3);
            });
          }
          break;
        } else if (key === type && type === "validatorCreditDailyData") {
          if (Array.isArray(result[key]) && result[key].length > 0) {
            result[key].forEach((item: any, index: number) => {
              let obj2 = {};
              let obj3 = {};
              // dailyDate: "2022-05-09"
              // data: "0.330000"
              // dataMedian: "0.000000"
              obj2 = {
                type: "Validator credit score of the node",
                value: item.data,
                dailyDate: item.dailyDate,
              };
              obj3 = {
                type: "Validator credit score median value of all nodes",
                value: item.dataMedian,
                dailyDate: item.dailyDate,
              };
              arr.push(obj2);
              arr.push(obj3);
            });
          }
          break;
        }
      }
      setData(arr?.reverse());
    }
  }, [result, type]);
  return (
    <div className={styles.linechart}>
      <div className={styles.first}>
        <div className={styles.fl}>
          <span className={styles.fl_text1}>{title}</span>
          <span className={styles.fl_text2}>
            Data updated at (UTC+8) {converModifyDate(result.modifiedDate)}
          </span>
        </div>
        <div className={styles.fr}>
          {options.map((item, index) => (
            <Checkbox
              key={item.value}
              checked={item.checked}
              disabled={item.disabled}
              onChange={(e) => {
                if (!e.target.checked) {
                  return;
                }
                options.forEach((i) => {
                  i.checked = false;
                  i.disabled = false;
                });
                item.checked = true;
                item.disabled = true;
                options[index] = item;

                setOptions([...options]);
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </div>
      </div>
      <Line {...config} />
      <div className={styles.second}>
        <h3 className={styles.second__title}>{subtitle}</h3>
        <div className={styles.second__desc}>{desc}</div>
      </div>
    </div>
  );
};

export default memo(LineChart);
