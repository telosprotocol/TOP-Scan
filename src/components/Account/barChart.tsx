import type { NextPage } from 'next'
import styles from '../../styles/node.module.scss'
import dynamic from 'next/dynamic'
import { memo, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd'
import useBarChart from '../../hooks/useBarChart'
import { useRouter } from 'next/router'
import { converModifyDate, formatBalance } from '../../utils'
import dayjs from 'dayjs'
const Column = dynamic(
  () => import('@ant-design/plots').then((mod: any) => mod.Column) as any,
  { ssr: false }
) as any
type CProps = {
  title: string
  subtitle: string
  desc: string
  type: any
}
const AccountLineChart: NextPage<CProps> = ({
  title,
  subtitle,
  desc,
  type,
}: CProps) => {
  const router = useRouter()
  const { address } = router.query
  const [data, setData] = useState([])
  const [options, setOptions] = useState([
    {
      label: 'Last 7 days',
      value: 7,
      checked: true,
      disabled: true,
    },
    {
      label: 'Last 15 days',
      value: 15,
      checked: false,
      disabled: false,
    },
    {
      label: 'Last 3 months',
      value: 3,
      checked: false,
      disabled: false,
    },
  ])
  const checkedItem = useMemo(() => {
    return options.find((item) => {
      return item.checked === true
    })
  }, [options])
  const { result } = useBarChart({
    accountAddr: address,
    value: checkedItem?.value,
  })
  const config = {
    data: data,
    xField: 'dailyDate',
    yField: 'data',
    yAxis: {
      label: {
        formatter: (v: any) => {
          return formatBalance(v)
        },
      },
    },
    xAxis: {
      label: {
        formatter: (v: any) => {
          return v.split(' ')[0]
        },
      },
    },
    label: {
      position: 'top',
      // 'top', 'bottom', 'middle',
      style: {
        fill: 'black',
        opacity: 0.6,
      },
      formatter: (v: any) => {
        return formatBalance(v.data)
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'workload',
          value: formatBalance(datum.data),
        }
      },
    },
    // xAxis: {
    //   label: {
    //     autoHide: true,
    //     autoRotate: false,
    //   },
    // },
    slider: {
      start: 0,
      end: 1,
    },
    minColumnWidth: 43,
    maxColumnWidth: 43,
  }
  useEffect(() => {
    if (JSON.stringify(result) !== '{}') {
      for (var key in result) {
        if (key === type && type === 'auditorDatas') {
          result[key].forEach((item: any) => {
            item.data = Number(item.data)
            item.dailyDate = dayjs(Number(item.dailyDate) * 1000).format('YYYY-MM-DD HH:mm:ss')
          })
          setData(result[key]?.reverse())
          console.log(result[key])
        } else if (key === type && type === 'validatorDatas') {
          result[key].forEach((item: any) => {
            item.data = Number(item.data)
            item.dailyDate = dayjs(Number(item.dailyDate) * 1000).format('YYYY-MM-DD HH:mm:ss')
          })
          setData(result[key]?.reverse())
        }
      }
    }
  }, [result, type])
  return (
    <div className={styles.barChart}>
      <div className={styles.first}>
        <div className={styles.fl}>
          <span className={styles.fl_text1}>{title}</span>
          <span className={styles.fl_text2}>
            {result.modifiedDate && (
              <>
                Data updated at (UTC+8){' '}
                {converModifyDate(result.modifiedDate)}
              </>
            )}
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
                  return
                }
                options.forEach((i, index) => {
                  i.checked = false
                  i.disabled = false
                })
                item.checked = e.target.checked
                item.disabled = true
                options[index] = item
                setOptions([...options])
              }}
            >
              {item.label}
            </Checkbox>
          ))}
        </div>
      </div>
      <Column {...config} />
      <div className={styles.second}>
        <h3 className={styles.second__title}>{subtitle}</h3>
        <div className={styles.second__desc}>{desc}</div>
      </div>
    </div>
  )
}

export default memo(AccountLineChart)
