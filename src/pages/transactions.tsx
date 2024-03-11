import { Space, Typography } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { txPage } from '../api'
import Layout from '../components/Layout'
import QuestionTip from '../components/QuestionTip'
import Search from '../components/Search'
import TableWithRequest from '../components/TableWithRequest'
import styles from '../styles/Transactions.module.scss'
import {
  accuracy,
  checkTOPAddr,
  formatAddress,
  formatBalance,
  formatTime,
  isEmpty,
} from '../utils'
import top_token_logo from '../assets/images/TOP.svg'
import HtmlHead from '../components/HtmlHead'
import { metaInfo } from '../api/constant'
import TableFilter from '../components/TableFilter'
import useTableFilterStore from '../store/useTableFilterStore'
const { Paragraph } = Typography
const columns = [
  {
    title: (
      <Space>
        Shard
        <QuestionTip
          ml={0}
          text="TOP Chain is a sharded public chain. Currently, TOP has 4 physical shards and 64 virtual shards. The shards here refer to virtual shards."
        />
      </Space>
    ),
    key: 'Shard',
    dataIndex: 'Shard',
    render: (v: any, record: any) => (
      <>
        Table{' '}
        {record.senderZoneId === 4 ? (
          <span className={styles.evm}>TOP-EVM</span>
        ) : (
          record.senderTableId
        )}
        {' > Table '}
        {record.receiverZoneId === 4 ? (
          <span className={styles.evm}>TOP-EVM</span>
        ) : (
          record.receiverTableId
        )}
      </>
    ),
  },
  {
    title: (
      <Space>
        Transaction hash
        <QuestionTip ml={0} text="The hash of the transaction" />
      </Space>
    ),
    dataIndex: 'txHash',
    key: 'txHash',
    render(v: any) {
      return (
        <Paragraph
          copyable={{ text: v?.toString() || '' }}
          style={{ marginBottom: '0' }}
        >
          <Link href={`/transactions/transactionsDetail?hash=${v}`}>
            <a className="link"> {formatAddress(v)} </a>
          </Link>
        </Paragraph>
      )
    },
  },
  {
    title: (
      <Space>
        <div>Block height</div>
        <QuestionTip
          ml={0}
          text="The block number. It is used to record the location of the transaction, which refers to the block height where the transaction is located when it was sent."
        />
      </Space>
    ),
    dataIndex: 'tableHeight',
    key: 'tableHeight',
    render(v: any, record: any) {
      return (
        <Link href={`/block/blockDetail?owner=${record.account}&height=${v}`}>
          <a className="link">
            {' '}
            {record.account}#{v}{' '}
          </a>
        </Link>
      )
    },
  },
  {
    title: (
      <Space>
        From
        <QuestionTip ml={0} text="Transaction sender" />
      </Space>
    ),
    dataIndex: 'senderAccount',
    key: 'senderAccount',
    render(v: any) {
      return checkTOPAddr(v) ? (
        <Link href={`/account/accountDetail?address=${v}`}>
          <a className="link">{formatAddress(v)}</a>
        </Link>
      ) : (
        formatAddress(v)
      )
    },
  },
  {
    title: (
      <Space>
        To
        <QuestionTip ml={0} text="Transaction receiver" />
      </Space>
    ),
    dataIndex: 'receiverAccount',
    key: 'receiverAccount',
    render(v: any) {
      return checkTOPAddr(v) ? (
        <Link href={`/account/accountDetail?address=${v}`}>
          <a className="link">{formatAddress(v)}</a>
        </Link>
      ) : (
        formatAddress(v)
      )
    },
  },
  {
    title: (
      <Space>
        Types
        <QuestionTip
          ml={0}
          text="There are the following transaction types: Transfer, Call contract, Lock (lock for vote, lock for gas), Vote, Unlock (unlock vote, unlock gas), and Cancel vote."
        />
      </Space>
    ),
    dataIndex: 'txType',
    key: 'txType',
  },
  {
    title: (
      <Space>
        Amount
        <QuestionTip ml={0} text="The number of tokens in the transaction" />
      </Space>
    ),
    dataIndex: 'Amount',
    key: 'Amount',
    render: (v: any, record: any) => (
      <>
      {isEmpty(record.tokenName) && record.tokenName=='ETH' ?  formatBalance(accuracy(record.amount, 18, 6)): formatBalance(accuracy(record.amount, 6, 6))}
        {/* {formatBalance(accuracy(record.amount, 6, 6))}{' '} */}
        <img src={top_token_logo.src} alt="" />
        &nbsp;
        {isEmpty(record.tokenName) ? record.tokenName : 'TOP'}
      </>
    ),
  },
  {
    title: (
      <Space>
        Time
        <QuestionTip ml={0} text="Time of the transaction" />
      </Space>
    ),
    dataIndex: 'sendTimestamp',
    key: 'sendTimestamp',
    render: (v: any) => <>{formatTime(v * 1000)}</>,
  },
]

const Transactions: NextPage = () => {
  const [serverTime, setServerTime] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  // const [filterTable, setFilterTable] = useState('')
  const filterTable = useTableFilterStore((state) => state.transFilter)
  const setFilterTable = useTableFilterStore((state) => state.changeTransFilter)

  const extraBody = useMemo(() => {
    if (filterTable) {
      return {
        tableShard: filterTable,
      }
    }
    return {}
  }, [filterTable])

  return (
    <>
      <HtmlHead
        title={metaInfo.Transactions.title}
        keyWords={metaInfo.Transactions.keywords}
        description={metaInfo.Transactions.description}
      />
      <Layout>
        <div className={styles.txlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>
            <div className={styles.records}>
              Only the last {totalCount} records are displayed (updated at{' '}
              {formatTime(serverTime * 1000)})
            </div>

            <div className={styles.transWrap}>
              <div style={{ paddingLeft: '16px' }}>
                <TableFilter
                  value={filterTable}
                  onChange={(e: any) => setFilterTable(e)}
                />
              </div>
              <TableWithRequest
                styleSet={true}
                id={'transactions'}
                rowKey="txHash"
                extraBody={extraBody}
                fetcher={async (body: any) => {
                  const result = await txPage({
                    ...body,
                    searchCount: false,
                  })
                  setServerTime(result.serverTime)
                  setTotalCount(formatBalance(result.totalCount))
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

export default Transactions
