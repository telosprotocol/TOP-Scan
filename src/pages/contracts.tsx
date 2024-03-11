import { Space } from 'antd'
import type { NextPage } from 'next'
import { accountPage, accountStat } from '../api'
import Layout from '../components/Layout'
import QuestionTip from '../components/QuestionTip'
import Search from '../components/Search'
import TableWithRequest from '../components/TableWithRequest'
import styles from '../styles/Contracts.module.scss'
import { Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { formatTime, formatBalance, formatAddress, accuracy } from '../utils'
import HtmlHead from '../components/HtmlHead'
import { metaInfo } from '../api/constant'
const Contract: NextPage = () => {
  const [accountType, setAccountType] = useState(1)

  const [pageInfo, setPageInfo] = useState({ current: 1, size: 10 })

  const [serverTime, setServerTime] = useState<any>('0')
  const [total, setTotal] = useState('0')

  const columns = [
    {
      title: (
        <Space>
          <QuestionTip ml={0} text="S/N" />
          S/N
        </Space>
      ),
      dataIndex: 'Shard',
      key: 'Shard',
      render(v: any, record: any, index: any) {
        return index + 1 + pageInfo.size * (pageInfo.current - 1)
      },
    },
    {
      title: (
        <Space>
          Account
          {/* <QuestionTip ml={0} text="Account" /> */}
        </Space>
      ),
      dataIndex: 'accountAddr',
      key: 'accountAddr',
      render(v: any, record: any) {
        return v
      },
    },
    {
      title: (
        <Space>
          <QuestionTip
            ml={0}
            text="There are the following transaction types: Transfer, Call contract, Lock (lock for vote, lock for gas), Vote, Unlock (unlock vote, unlock gas), and Cancel vote."
          />
          Contract Type
        </Space>
      ),
      dataIndex: 'ContractType',
      key: 'ContractType',
      render(v: any, record: any) {
        if (
          record.accountAddr.startsWith('T0') ||
          record.accountAddr.startsWith('T8')
        ) {
          return 'Customer contract'
        }
        if (record.accountAddr.startsWith('T6')) {
          return 'Ethereum contract'
        }
        return 'System contract'
      },
    },
    {
      title: (
        <Space>
          <QuestionTip ml={0} text="The number of transactions" />
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
    },
    {
      title: <Space>TOP balance</Space>,
      dataIndex: 'balance',
      key: 'balance',
      render(v: any, record: any) {
        return formatBalance(accuracy(v, 6, 6))
      },
      sorter: (a: any, b: any) => a.balance - b.balance,
      showSorterTooltip: false,
    },
  ]

  return (
    <>
      <HtmlHead
        title={metaInfo.Contracts.title}
        keyWords={metaInfo.Contracts.keywords}
        description={metaInfo.Contracts.description}
      />
      <Layout>
        <div className={styles.contractlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.records} style={{ color: '#ffffff' }}>
              The list only shows the top {total} accounts, in descending order
              of TOP balance by default (updated at {serverTime})
            </div>

            <div style={{ minHeight: '650px' }}>
              <TableWithRequest
                styleSet={true}
                id={'contracts'}
                rowKey="accountAddr"
                fetcher={async (body: any) => {
                  setPageInfo({ ...body })
                  const result = await accountPage({
                    ...body,
                    accountType,
                    searchCount: false,
                  })
                  setServerTime(formatTime(result.serverTime * 1000))
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

export default Contract
