import { Space } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'
import { accountPage, accountStat } from '../api'
import useSWR from 'swr'
import Layout from '../components/Layout'
import QuestionTip from '../components/QuestionTip'
import Search from '../components/Search'
import TableWithRequest from '../components/TableWithRequest'
import styles from '../styles/Block.module.scss'
import { Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { formatTime, accuracy, formatBalance, formatAddress } from '../utils'
import HtmlHead from '../components/HtmlHead'
import { metaInfo } from '../api/constant'
const Block: NextPage = () => {
  const [pageInfo, setPageInfo] = useState({ current: 1, size: 10 })
  const [serverTime, setServerTime] = useState(null as any)
  const [total, setTotal] = useState('0')

  const [accountType, setAccountType] = useState(0)

  const { data, error }: any = useSWR('accountStat', () => {
    return accountStat()
  })

  const columns = [
    {
      title: <Space>S/N</Space>,
      dataIndex: 'Shard',
      key: 'Shard',
      render(v: any, record: any, index: any) {
        return index + 1 + pageInfo.size * (pageInfo.current - 1)
      },
    },
    {
      title: <Space>Account</Space>,
      dataIndex: 'accountAddr',
      key: 'accountAddr',
      render(v: any, record: any) {
        return (
          <Link href={`/account/accountDetail?address=${v}`}>
            <a className="link">{formatAddress(v)}</a>
          </Link>
        )
      },
    },
    {
      title: <Space>TOP balance</Space>,
      dataIndex: 'balance',
      key: 'balance',
      render(v: any, record: any) {
        return accuracy(v, 6, 6)
      },
      sorter: (a: any, b: any) => a.balance - b.balance,
      showSorterTooltip: false,
      width: 200
    },
    {
      title: (
        <Space>
          <QuestionTip
            ml={0}
            text="The ratio of the number of TOP held by the account to the total amount of TOP tokens"
          />
          Ratio
        </Space>
      ),
      dataIndex: 'balanceProportion',
      key: 'balanceProportion',
      render(v: any, record: any) {
        return v + '%'
      },
    },
    {
      title: (
        <Space>
          <QuestionTip
            ml={0}
            text="The number of transactions associated with the current address, regardless of sending or receiving"
          />
          Transactions
        </Space>
      ),
      dataIndex: 'txNum',
      key: 'txNum',
      render(v: any, record: any) {
        return formatBalance(v)
      }
      // ,
      // sorter: (a: any, b: any) => a.txNum - b.txNum,
      // showSorterTooltip: false,
      // width: 200
    },
  ]

  return (
    <>
      <HtmlHead
        title={metaInfo.Account.title}
        keyWords={metaInfo.Account.keywords}
        description={metaInfo.Account.description}
      />
      <Layout>
        <div className={styles.txlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.headFrame}>
              <Row>
                <Col span={12} className={styles.headLine}>
                  <div className={styles.headTitle}>
                    <span>Number of active accounts yesterday</span>&nbsp;
                    <QuestionTip
                      ml={0}
                      text="The number of active accounts yesterday"
                    ></QuestionTip>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.yesterdayAcvives)}
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.headTitle}>
                    <span>Total accounts in real-time</span>&nbsp;
                    <QuestionTip
                      ml={0}
                      text="The number of accounts on the TOP chain in real-time, excluding contract accounts"
                    ></QuestionTip>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.totalAccounts)}
                  </div>
                </Col>
              </Row>
            </div>

            <div
              className={styles.records}
              style={{ color: 'rgba(0, 0, 0, 0.15)' }}
            >
              Only the last {total} records are displayed (updated at{' '}
              {formatTime(serverTime * 1000)} )
            </div>

            <div style={{ minHeight: '650px' }}>
              <TableWithRequest
                styleSet={true}
                id={'accountAddr'}
                rowKey="accountAddr"
                fetcher={async (body: any) => {
                  setPageInfo({ ...body })
                  const result = await accountPage({
                    ...body,
                    accountType,
                    searchCount: false,
                  })
                  setServerTime(result.serverTime)
                  setTotal(formatBalance(result.totalCount))
                  return result
                }}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Block
