import { Space, Table } from 'antd'
import type { NextPage } from 'next'
import { shardList } from '../api'
import useSWR from 'swr'
import Layout from '../components/Layout'
import QuestionTip from '../components/QuestionTip'
import Search from '../components/Search'
import styles from '../styles/Shard.module.scss'
import { Row, Col } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { formatBalance } from '../utils'
import HtmlHead from '../components/HtmlHead'
import { metaInfo } from '../api/constant'
const beaconColumns = [
  {
    title: <Space>Name</Space>,
    dataIndex: 'shardId',
    key: 'shardId',
    render() {
      return `Beacon Network`
    },
  },
  {
    title: <Space>Transactions</Space>,
    dataIndex: 'txNum',
    key: 'txNum',
  },
  {
    title: <Space>Contracts</Space>,
    dataIndex: 'contractNum',
    key: 'contractNum',
  },
]

const columns = [
  {
    title: <Space>Shard</Space>,
    dataIndex: 'shardId',
    key: 'shardId',
    render(v: any, record: any) {
      return (
        <>
          validate Network{' '}
          {v === 5 ? <span className={styles.evm}>TOP-EVM</span> : v}
        </>
      )
    },
  },
  {
    title: <Space>Blocks</Space>,
    dataIndex: 'blockNum',
    key: 'blockNum',
  },

  {
    title: <Space>Accounts</Space>,
    dataIndex: 'accountNum',
    key: 'accountNum',
  },
  {
    title: <Space>Contracts</Space>,
    dataIndex: 'contractNum',
    key: 'contractNum',
  },
  {
    title: <Space>Transactions</Space>,
    dataIndex: 'txNum',
    key: 'txNum',
    render(v: any) {
      return formatBalance(v)
    },
  },
]

const Shard: NextPage = () => {
  const { data, error }: any = useSWR('shardList', () => {
    return shardList()
  })

  const loading = !error && !data

  return (
    <>
      <HtmlHead
        title={metaInfo.Shared.title}
        keyWords={metaInfo.Shared.keywords}
        description={metaInfo.Shared.description}
      />
      <Layout>
        <div className={styles.txlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.headFrame}>
              <Row>
                <Col span={8} className={styles.headLine + ' ' + styles.bb}>
                  <div className={styles.headTitle}>
                    <span>Physical shards</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.shardNum)}
                  </div>
                </Col>
                <Col span={8} className={styles.headLine + ' ' + styles.bb}>
                  <div className={styles.headTitle}>
                    <span>Virtual shards</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.shardVirtualNum)}
                  </div>
                </Col>
                <Col span={8} className={styles.bb}>
                  <div className={styles.headTitle}>
                    <span>Max TPS</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.maxTps)}
                  </div>
                </Col>
                <Col span={8} className={styles.headLine}>
                  <div className={styles.headTitle}>
                    <span>Physical shards</span>
                    <span className={styles.evm}>TOP-EVM</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.evmShardNum)}
                  </div>
                </Col>
                <Col span={8} className={styles.headLine}>
                  <div className={styles.headTitle}>
                    <span>Virtual shards</span>
                    <span className={styles.evm}>TOP-EVM</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.evmShardVirtualNum)}
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.headTitle}>
                    <span>Max TPS</span>
                    <span className={styles.evm}>TOP-EVM</span>
                  </div>
                  <div className={styles.headVal}>
                    {formatBalance(data?.result.evmMaxTps)}
                  </div>
                </Col>
              </Row>
            </div>

            <div
              className="table"
              style={{ minHeight: '150px', marginTop: '40px' }}
            >
              <Table
                loading={loading}
                rowKey={'shardId'}
                pagination={false}
                dataSource={data?.result.items}
                columns={beaconColumns}
              />
            </div>

            <div className="table">
              <Table
                loading={loading}
                rowKey={'shardId'}
                pagination={false}
                dataSource={data?.result.shards}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Shard
