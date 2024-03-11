import { Space } from 'antd'
import type { NextPage } from 'next'
import Link from 'next/link'
import { blockPage, blockStat } from '../api'
import useSWR from 'swr'
import Layout from '../components/Layout'
import QuestionTip from '../components/QuestionTip'
import Search from '../components/Search'
import TableWithRequest from '../components/TableWithRequest'
import styles from '../styles/Block.module.scss'
import { Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { formatTime, formatBalance, formatAddress } from '../utils'
import HtmlHead from '../components/HtmlHead'
import { metaInfo } from '../api/constant'
import TableFilter from '../components/TableFilter'
import useTableFilterStore from '../store/useTableFilterStore'

function getTableNum(owner: string) {
  if (owner.endsWith('4@0')) {
    return 'TOP-EVM'
  }
  return owner.substring(owner.indexOf('@') + 1, owner.length)
}

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
    dataIndex: 'Shard',
    key: 'Shard',
    render(v: any, record: any) {
      return (
        <>
          Table{' '}
          {getTableNum(record.owner) === 'TOP-EVM' ? (
            <span className={styles.evm}>TOP-EVM</span>
          ) : (
            getTableNum(record.owner)
          )}
        </>
      )
    },
  },
  {
    title: (
      <Space>
        Block height
        <QuestionTip ml={0} text="The height of the Table block of TOP Chain" />
      </Space>
    ),
    dataIndex: 'height',
    key: 'height',
    render(v: any, record: any) {
      return (
        <Link
          href={`/block/blockDetail?owner=${record.owner}&height=${record.height}`}
        >
          <a className="link">
            {record.owner}#{record.height}
          </a>
        </Link>
      )
    },
  },
  {
    title: (
      <Space>
        Time
        <QuestionTip ml={0} text="Date and time of block production" />
      </Space>
    ),
    dataIndex: 'timestamp',
    key: 'timestamp',
    render(v: any, record: any) {
      return formatTime(v * 1000)
    },
  },
  {
    title: (
      <Space>
        Miner
        <QuestionTip ml={0} text="The miner who produced the block" />
      </Space>
    ),
    dataIndex: 'Miner',
    key: 'Miner',
    render(v: any, record: any) {
      if (record.auditor != '0') {
        return (
          <Link href={`/account/accountDetail?address=${record.auditor}`}>
            <a className="link">{formatAddress(record.auditor)}</a>
          </Link>
        )
      }
      if (record.validator != '0') {
        return (
          <Link href={`/account/accountDetail?address=${record.validator}`}>
            <a className="link">{formatAddress(record.validator)}</a>
          </Link>
        )
      }
    },
  },
  {
    title: (
      <Space>
        Transactions
        <QuestionTip
          ml={0}
          text="The number of transactions contained in this block"
        />
      </Space>
    ),
    dataIndex: 'blockTxNum',
    key: 'blockTxNum',
  },
  {
    title: (
      <Space>
        Block hash
        <QuestionTip ml={0} text="The hash of the block" />
      </Space>
    ),
    dataIndex: 'hash',
    key: 'hash',
    render(v: any, record: any) {
      return (
        <Link
          href={`/block/blockDetail?owner=${record.owner}&height=${record.height}`}
        >
          <a className="link">{formatAddress(v)}</a>
        </Link>
      )
    },
  },
]

const Block: NextPage = () => {
  const [serverTime, setServerTime] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const filterTable = useTableFilterStore((state) => state.blockFilter)
  const setFilterTable = useTableFilterStore((state) => state.changeBlockFilter)

  const { data, error }: any = useSWR('blockStat', () => {
    return blockStat()
  })

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
        title={metaInfo.Block.title}
        keyWords={metaInfo.Block.keywords}
        description={metaInfo.Block.description}
      />
      <Layout>
        <div className={styles.txlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.headFrame}>
              <Row>
                <Col span={8} className={styles.headLine}>
                  <div className={styles.headTitle}>
                    <QuestionTip
                      ml={0}
                      text="The number of blocks produced by all shards of TOP Chain yesterday"
                    ></QuestionTip>
                    <span> Number of blocks produced yesterday</span>&nbsp;
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.yesterdayBlocks)}
                  </div>
                </Col>
                <Col span={8} className={styles.headLine}>
                  <div className={styles.headTitle}>
                    <QuestionTip
                      ml={0}
                      text="The cumulative number of EVM table blocks produced in the TOP Chain until the current time (valid for 3 seconds)"
                    ></QuestionTip>
                    <span> Number of EVM table blocks</span>&nbsp;<span className={styles.evm}>TOP-EVM</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.totalEvmBlocks)}
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.headTitle}>
                    <QuestionTip
                      ml={0}
                      text="The cumulative number of blocks produced in the TOP Chain until the current time (valid for 3 seconds)"
                    ></QuestionTip>
                    <span> Cumulative number of blocks</span>&nbsp;
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.totalBlocks)}
                  </div>
                </Col>
              </Row>
            </div>

            <div
              className={styles.records}
              style={{ color: 'rgba(0, 0, 0, 0.15)' }}
            >
              Only the last {totalCount} records are displayed (updated at{' '}
              {formatTime(serverTime * 1000)} )
            </div>
            <TableFilter
              value={filterTable}
              onChange={(e: any) => setFilterTable(e)}
            />
            <div style={{ minHeight: '650px' }}>
              <TableWithRequest
                styleSet={true}
                id={'block'}
                rowKey="hash"
                extraBody={extraBody}
                fetcher={async (body: any) => {
                  const reqBody = {
                    ...body,
                    searchCount: false,
                  }
                  const data = await blockPage(reqBody)
                  setServerTime(data.serverTime)
                  setTotalCount(formatBalance(data.totalCount))
                  return data
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
