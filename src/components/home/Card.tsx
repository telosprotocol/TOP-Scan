import type { NextPage } from 'next'
import styles from '../../styles/card.module.scss'
import { Card, Space } from 'antd'
import QuestionTip from '../QuestionTip'
import useGlobal from '../../hooks/useGlobal'
import { accuracy, formatBalance } from '../../utils'
import evm from '../../assets/images/evm.svg'

const CardList: NextPage = () => {
  const { result } = useGlobal()
  const gridStyle = {
    width: '25%',
    textAlign: 'left',
    boxShadow: 'none',
  } as any
  const borderTopLeftStyle = {
    borderTopLeftRadius: '8px',
  }
  const borderBottomLeftStyle = {
    borderTopLeftRadius: '8px',
  }
  const borderTopRightStyle = {
    borderTopRightRadius: '8px',
  }
  const borderBottomRightStyle = {
    borderBottomRightRadius: '8px',
  }
  return (
    <div className={styles.card}>
      <Card title="">
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderTopLeftStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={'The latest price of TOP Token'}
            ></QuestionTip>
            <span className={styles.label}>TOP price</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.tokenPrice)}</div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomLeftStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'The clock block height, which is the time of the TOP chain'
              }
            ></QuestionTip>
            <span className={styles.label}>Clock Block Height</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.timerClock)}</div>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Space>
            <QuestionTip
              ml={0}
              text={'Total number of miners of all types on the TOP chain'}
            ></QuestionTip>
            <span className={styles.label}>Miner</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.nodeCount)}</div>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Space>
            <QuestionTip
              ml={0}
              text={
                'An important indicator to measure whether the TOP ecosystem is healthy is obtained by calculating the total number of TOP Token pledges in the smart contracts on the TOP chain'
              }
            ></QuestionTip>
            <span className={styles.label}>Voting Deposit (TOP)</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(accuracy(result.totalVoteStakeToken, 6, 2))}
          </div>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Space>
            <QuestionTip
              ml={0}
              text={
                'The number of transactions on the TOP chain except EVM shard in the last 24 hours'
              }
            ></QuestionTip>
            <span className={styles.label}>Transactions(24h)</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(result.transactionCount)}
          </div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderTopRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                "TOP Chain is a sharded public chain. This value is the number of TOP Chain's physical shards except EVM shard"
              }
            ></QuestionTip>
            <span className={styles.label}>Shard number</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.shardCount)}</div>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Space>
            <QuestionTip
              ml={0}
              text={
                'The number of accounts on the TOP chain in real-time(Except EVM shard), excluding contract accounts'
              }
            ></QuestionTip>
            <span className={styles.label}>Accounts(Total)</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(result.accountCount)}
          </div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'Mainnet TPS is the number of requests per second that the current mainnet (Except EVM shard) can carry'
              }
            ></QuestionTip>
            <span className={styles.label}>TPS(MAX)</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.tpsMax)}</div>
        </Card.Grid>
        <div className={styles.EVMdata}>
          <img src={evm.src} alt="evm"></img>
          <span>TOP-EVM</span>
        </div>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'The number of transactions in EVM shards on the TOP chain in the last 24 hours'
              }
            ></QuestionTip>
            <span className={styles.label}>Transactions(24h)</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(result.evmTransactionCount)}
          </div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'TOP Chain is a sharded public chain. This value is the number of EVM shard in the TOP chain'
              }
            ></QuestionTip>
            <span className={styles.label}>Shard number</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(result.evmShardCount)}
          </div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'The number of accounts on the TOP chain EVM shard in real-time, excluding contract accounts'
              }
            ></QuestionTip>
            <span className={styles.label}>Accounts(Total)</span>
          </Space>
          <div className={styles.value}>
            {formatBalance(result.evmAccountCount)}
          </div>
        </Card.Grid>
        <Card.Grid
          style={{
            ...gridStyle,
            ...borderBottomRightStyle,
          }}
        >
          <Space>
            <QuestionTip
              ml={0}
              text={
                'EVM TPS is the number of requests that the current EVM shard can carry per second'
              }
            ></QuestionTip>
            <span className={styles.label}>TPS(MAX)</span>
          </Space>
          <div className={styles.value}>{formatBalance(result.evmTpsMax)}</div>
        </Card.Grid>
      </Card>
    </div>
  )
}

export default CardList
