import type { NextPage } from 'next'
import styles from '../../styles/Transactions.module.scss'
import { Row, Col, Space, Typography } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import TransactionsLineChart from './TransactionsLineChart'
import TableWithRequest from '../../components/TableWithRequest'
import { txPage } from '../../api'
import Link from 'next/link'
import {
  accuracy,
  checkTOPAddr,
  formatAddress,
  formatTime,
  isEmpty,
} from '../../utils'
import useTransactionStatics from '../../hooks/useTransactionStatics'
import top_token_logo from '../../assets/images/TOP.svg'
import useTransactionStaticsEVM from '../../hooks/useTransactionStaticsEVM'

const { Paragraph } = Typography
const columns = [
  {
    title: <Space>Transaction hash</Space>,
    dataIndex: 'txHash',
    key: 'txHash',
    render(v: any) {
      return (
        <Link href={`/transactions/transactionsDetail?hash=${v}`}>
          <a className="link"> {formatAddress(v)} </a>
        </Link>
      )
    },
  },
  {
    title: <Space>From</Space>,
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
    title: <Space>To</Space>,
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
    title: <Space>Amount</Space>,
    dataIndex: 'Amount',
    key: 'Amount',
    render: (v: any, record: any) => (
      <>
       {isEmpty(record.tokenName) && record.tokenName=='ETH' ?  accuracy(record.amount, 18, 6): accuracy(record.amount, 6, 6)}
        {/* {accuracy(record.amount, 6, 6)}  */}
        <img src={top_token_logo.src} alt="" />
        &nbsp;
        {isEmpty(record.tokenName) ? record.tokenName : 'TOP'}
        <br />
      </>
    ),
  },
  {
    title: <Space>Time</Space>,
    dataIndex: 'sendTimestamp',
    key: 'sendTimestamp',
    render: (v: any) => <>{formatTime(v * 1000)}</>,
  },
]
const Transaction: NextPage = () => {
  const { result } = useTransactionStatics()
  const { result: resultEVM } = useTransactionStaticsEVM()
  return (
    <div className={styles.transactions}>
      <Row>
        <Col span={10}>
          <div
            style={{
              paddingRight: '44px',
            }}
          >
            <TransactionsLineChart
              type={'transaction'}
              xField={'dailyDate'}
              yField={'dataCount'}
              resData={result}
              title={'Transactions per day (14 days)'}
            ></TransactionsLineChart>
          </div>
        </Col>
        <Col span={14}>
          <div
            style={{
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '1px',
            }}
          >
            <TableWithRequest
              styleSet={true}
              isRefresh={true}
              id={'homeTransactions'}
              rowKey="txHash"
              fetcher={(body: any) =>
                txPage({
                  ...body,
                  size: 6,
                  tableShard: 'TOP',
                  searchCount: false,
                })
              }
              columns={columns}
              showPage={false}
            />
          </div>
        </Col>
      </Row>
      <div>
        <br />
      </div>
      <Row>
        <Col span={10}>
          <div
            style={{
              paddingRight: '44px',
            }}
          >
            <TransactionsLineChart
              type={'transaction'}
              xField={'dailyDate'}
              yField={'dataCount'}
              resData={resultEVM}
              title={'TOP-EVM table transactions per day (14 days)'}
            ></TransactionsLineChart>
          </div>
        </Col>
        <Col span={14}>
          <div
            style={{
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '1px',
            }}
          >
            <TableWithRequest
              styleSet={true}
              isRefresh={true}
              id={'homeTransactionsEVM'}
              rowKey="txHash"
              fetcher={(body: any) =>
                txPage({
                  ...body,
                  size: 6,
                  tableShard: 'EVM',
                  searchCount: false,
                })
              }
              columns={columns}
              showPage={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Transaction
