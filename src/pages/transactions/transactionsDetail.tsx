import type { NextPage } from 'next'
import styles from '../../styles/TransactionsDetail.module.scss'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { txDetails } from '../../api'
import Search from '../../components/Search'
import { Card, Space, Spin, Typography, Empty, Table } from 'antd'
import txDetailsIcon from '../../assets/images/txDetailsIcon.svg'
import ContentDetails from '../../components/ContentDetails'
import {
  accuracy,
  checkTOPAddr,
  formatBalance,
  formatTime,
  isEmpty,
} from '../../utils'
import top_token_logo from '../../assets/images/TOP.svg'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import HtmlHead from '../../components/HtmlHead'
import { metaInfo } from '../../api/constant'
import useErc20InputDecode from '../../hooks/useErc20InputDecode'
import useGlobal from '../../hooks/useGlobal'
const { Paragraph } = Typography

const TransactionsDetail: NextPage = () => {
  const router = useRouter()
  const { hash } = router.query

  const { data, error }: any = useSWR(
    hash ? `${hash}-TransactionsDetail` : null,
    (path) => {
      const params = path.split('-')
      return txDetails(params[0])
    }
  )

  const loading = !error && !data
  const tx = data?.message === 'OK' ? data.result : {}
  let receiverActionParam = !isEmpty(tx.receiverActionParam)
    ? ''
    : tx.receiverActionParam.length < 10000
    ? tx.receiverActionParam
    : tx.receiverActionParam.substr(0, 10000)
  try {
    if (
      tx.txType === 'run_contract' &&
      tx.receiverActionName === 'claimVoterDividend' &&
      tx.recvBlockInfo.logs
    ) {
      const logs = JSON.parse(tx.recvBlockInfo.logs)
      if (logs[0] && logs[0].data.match(/^0x[0-9a-fA-F]+$/)) {
        receiverActionParam = `{"data": ${parseInt(logs[0].data, 16)}}`
      }
    }
  } catch (error) {}

  const { name, params } = useErc20InputDecode(tx?.evm?.input)

  const { result } = useGlobal()
  const ethUsdPrice = Number(result.ethUsdPrice) || 0

  return (
    <>
      <HtmlHead
        title={metaInfo.TransactionsDetail.title}
        keyWords={metaInfo.TransactionsDetail.keywords}
        description={metaInfo.TransactionsDetail.description}
      />
      <Layout>
        <div className={styles.txDetails}>
          <div className={styles.top}>
            <div className={`container`}>
              <Breadcrumbs
                links={[
                  {
                    name: 'Home',
                    link: '/',
                  },
                  {
                    name: 'Transactions',
                    link: '/transactions',
                  },
                  {
                    name: 'Transaction details',
                    link: '',
                  },
                ]}
              ></Breadcrumbs>
            </div>
          </div>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.txContent}>
              {loading ? (
                <div className={styles.loading}>
                  <Spin />
                </div>
              ) : tx.txHash ? (
                <div>
                  <Card
                    title={
                      <Space>
                        <img alt="txDetailsIcon" src={txDetailsIcon.src}></img>
                        Transaction details
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div>
                      <ContentDetails>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Transaction hash:"
                          tip="The hash consists of a 64-bit string. A unique hash is generated for every single transaction."
                        >
                          <Paragraph
                            copyable={{ text: hash?.toString() || '' }}
                            style={{ marginBottom: '0' }}
                          >
                            {hash}
                          </Paragraph>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Status:"
                          tip="The final consensus result of the transaction. There are two results: succeeded and failed"
                        >
                          <span className={styles[tx.txState]}>
                            {tx.txState}
                          </span>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Time:"
                          tip="The time the transaction was sent"
                        >
                          {formatTime(tx.sendTimestamp * 1000)}
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Transaction type:"
                          tip="There are the following transaction types: Transfer, Call contract, Lock (lock for vote, lock for gas), Vote, Unlock (unlock vote, unlock gas), and Cancel vote."
                        >
                          {tx.txType}
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Confirm block height:"
                          tip="The block number. It is used to record the location of the transaction, which refers to the block height where the transaction is located when it was sent."
                        >
                          <Link
                            href={`/block/blockDetail?owner=${tx.confirmBlockInfo.account}&height=${tx.confirmBlockInfo.height}`}
                          >
                            <a className="link">
                              #{tx.confirmBlockInfo.height}
                            </a>
                          </Link>
                        </ContentDetails.Item>
                      </ContentDetails>
                      <ContentDetails>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Shard / Height:"
                          tip="TOP Chain is a sharded public chain. Currently, TOP has 4 physical shards and 64 virtual shards. The shards here refer to virtual shards."
                        >
                          <span className={styles.blockHeight}>
                            Table{' '}
                            {tx.senderZoneId === 4
                              ? 'TOP-EVM'
                              : tx.senderTableId}{' '}
                            {tx.sendBlockInfo && tx.sendBlockInfo.account && (
                              <>
                                / Height (
                                <Link
                                  href={`/block/blockDetail?owner=${tx.sendBlockInfo.account}&height=${tx.sendBlockInfo.height}`}
                                >
                                  <a className="link">
                                    #{tx.sendBlockInfo.height}
                                  </a>
                                </Link>
                                )
                              </>
                            )}
                          </span>
                          {' > '}
                          <span className={styles.blockHeight}>
                            Table{' '}
                            {tx.receiverZoneId ? 'TOP-EVM' : tx.receiverTableId}{' '}
                            {tx.recvBlockInfo && tx.recvBlockInfo.account && (
                              <>
                                / Height (
                                <Link
                                  href={`/block/blockDetail?owner=${tx.recvBlockInfo.account}&height=${tx.recvBlockInfo.height}`}
                                >
                                  <a className="link">
                                    #{tx.recvBlockInfo.height}
                                  </a>
                                </Link>
                                )
                              </>
                            )}
                          </span>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="From:"
                          tip="The sender of the transaction"
                        >
                          <div>
                            <Paragraph
                              copyable={{
                                text: tx.senderAccount?.toString() || '',
                              }}
                              style={{ marginBottom: '0' }}
                            >
                              {checkTOPAddr(tx.senderAccount) ? (
                                <Link
                                  href={`/account/accountDetail?address=${tx.senderAccount}`}
                                >
                                  <a className="link">{tx.senderAccount}</a>
                                </Link>
                              ) : (
                                tx.senderAccount
                              )}
                            </Paragraph>
                          </div>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="To:"
                          tip="The receiver of the transaction"
                        >
                          <div>
                            <Paragraph
                              copyable={{
                                text: tx.receiverAccount?.toString() || '',
                              }}
                              style={{ marginBottom: '0' }}
                            >
                              {checkTOPAddr(tx.receiverAccount) ? (
                                <Link
                                  href={`/account/accountDetail?address=${tx.receiverAccount}`}
                                >
                                  <a className="link">{tx.receiverAccount}</a>
                                </Link>
                              ) : (
                                tx.receiverAccount
                              )}
                            </Paragraph>
                          </div>
                        </ContentDetails.Item>
                      </ContentDetails>
                      {tx.evm ? (
                        <ContentDetails>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Amount:"
                            tip="The amount and token type of the transaction"
                          >
                            {isEmpty(tx.tokenName) && tx.tokenName=='ETH' ?  formatBalance(accuracy(tx.amount, 18, 6)): formatBalance(accuracy(tx.amount, 6, 6))}
                            <img
                              src={top_token_logo.src}
                              alt=""
                              style={{ margin: '0 4px 0 16px' }}
                            />
                            {isEmpty(tx.tokenName) ? tx.tokenName : 'TOP'}
                            {'(Native Token)'}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Gas limit:"
                            tip="Gas limit"
                          >
                            {formatBalance(tx.evm.gas)}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Gas Used:"
                            tip="Gas Used"
                          >
                            {/* {formatBalance(accuracy(tx.evm.gasUsed, 6, 6))} */}
                            {formatBalance(tx.evm.gasUsed)}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Gas Price:"
                            tip="Gas Price"
                          >
                            {/* {formatBalance(accuracy(tx.evm.gasUsed, 6, 6))} */}
                            {formatBalance(
                              accuracy(3200 * tx.evm.effectiveGasPrice, 9, 9),
                              9
                            )}{' '}
                            TOP&nbsp;&nbsp;(
                            {formatBalance(
                              accuracy(tx.evm.effectiveGasPrice, 9, 9),
                              9
                            )}{' '}
                            Gwei)
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Gas Fee:"
                            tip="Gas Fee"
                          >
                            {formatBalance(
                              accuracy(
                                tx.evm.gasUsed * tx.evm.effectiveGasPrice,
                                18,
                                18
                              ),
                              18
                            )}{' '}
                            ETH&nbsp;&nbsp;($
                            {formatBalance(
                              accuracy(
                                tx.evm.gasUsed *
                                  tx.evm.effectiveGasPrice *
                                  ethUsdPrice,
                                18,
                                18
                              ),
                              2
                            )}
                            )
                          </ContentDetails.Item>
                        </ContentDetails>
                      ) : (
                        <ContentDetails>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Amount:"
                            tip="The amount and token type of the transaction"
                          >
                            {formatBalance(accuracy(tx.amount, 6, 6))}
                            <img
                              src={top_token_logo.src}
                              alt=""
                              style={{ margin: '0 4px 0 16px' }}
                            />
                            {isEmpty(tx.tokenName) ? tx.tokenName : 'TOP'}
                            {'(Native Token)'}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Gas fee:"
                            tip="The gas fee consumed by this transaction. The gas fee of each transaction is deducted from the deposit, and the remaining part of the deposit will be returned to the sender's account"
                          >
                            {accuracy(
                              isEmpty(tx.sendBlockInfo)
                                ? tx.sendBlockInfo.txFee +
                                    tx.sendBlockInfo.usedDeposit
                                : 0 + tx.confirmBlockInfo.usedDeposit,
                              6,
                              6
                            )}
                            TOP
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Deposit:"
                            tip="The deposit of the transaction. It will be charged for each transaction and will be returned after the transaction is completed. When the gas fee of the transaction is insufficient, it will be deducted from the deposit"
                          >
                            {accuracy(tx.txDeposit, 6, 6)} TOP
                          </ContentDetails.Item>
                        </ContentDetails>
                      )}

                      {tx.txType === 'transfer' || tx.evm ? (
                        ''
                      ) : (
                        <ContentDetails>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Contract function:"
                            tip="Contract function"
                          >
                            {tx.receiverActionName}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Content executed by sender:"
                            tip="Content executed by sender"
                          >
                            {!isEmpty(tx.senderActionParam)
                              ? ''
                              : tx.senderActionParam.length < 10000
                              ? tx.senderActionParam
                              : tx.senderActionParam.substr(0, 10000)}
                          </ContentDetails.Item>
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Content executed by receiver:"
                            tip="Content executed by receiver"
                          >
                            {receiverActionParam}
                          </ContentDetails.Item>
                        </ContentDetails>
                      )}

                      <ContentDetails>
                        {tx.evm ? (
                          <>
                            {tx.txType !== 'transfer' && (
                              <ContentDetails.Item
                                style={{ width: '314px' }}
                                label="Contract function:"
                                tip="Contract function"
                              >
                                {name}
                              </ContentDetails.Item>
                            )}
                            <ContentDetails.Item
                              style={{ width: '314px' }}
                              label="Input:"
                              tip="Input"
                            >
                              {params.length > 0 ? (
                                <div style={{ width: '100%' }}>
                                  <Table
                                    rowKey={name}
                                    dataSource={params}
                                    pagination={false}
                                    columns={[
                                      {
                                        title: '#',
                                        dataIndex: 'name',
                                        key: 'name',
                                        render(value, record, index) {
                                          return index + 1
                                        },
                                      },
                                      {
                                        title: 'Name',
                                        dataIndex: 'name',
                                        key: 'name',
                                      },
                                      {
                                        title: 'Type',
                                        dataIndex: 'type',
                                        key: 'type',
                                      },
                                      {
                                        title: 'Data',
                                        dataIndex: 'value',
                                        key: 'value',
                                        render(value) {
                                          return typeof value === 'object'
                                            ? JSON.stringify(value)
                                            : value
                                        },
                                      },
                                    ]}
                                  />
                                </div>
                              ) : (
                                tx.evm.input
                              )}
                            </ContentDetails.Item>
                          </>
                        ) : (
                          <ContentDetails.Item
                            style={{ width: '314px' }}
                            label="Size:"
                            tip="The size of the transaction"
                          >
                            {tx.txLen}
                          </ContentDetails.Item>
                        )}

                        <ContentDetails.Item
                          style={{ width: '314px' }}
                          label="Remark:"
                          tip="Remark in a transaction"
                        >
                          {tx.note}
                        </ContentDetails.Item>
                      </ContentDetails>
                    </div>
                  </Card>
                </div>
              ) : (
                <div style={{ marginTop: '100px' }}>
                  <Empty></Empty>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default TransactionsDetail
