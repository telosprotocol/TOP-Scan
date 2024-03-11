import { Space, Tooltip } from 'antd'
import TableWithRequest from '../TableWithRequest'
import iconDown from '../../assets/images/down.svg'
import { punishPage } from '../../api'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { fixZero, formatTime } from '../../utils'

const columns = [
  {
    title: (
      <Space style={{ fontWeight: 400 }}>Change time</Space>
    ),
    dataIndex: 'punishTime',
    key: 'punishTime',
    width: '25%',
    render(v: any) {
      return formatTime(Number(v) * 1000)
    },
  },
  {
    title: <Space style={{ fontWeight: 400 }}>Credit score before change</Space>,
    dataIndex: 'preCredit',
    key: 'preCredit',
    width: '25%',
    render(v: any) {
      return fixZero(v)
    },
  },
  {
    title: <Space style={{ fontWeight: 400 }}>Credit change</Space>,
    dataIndex: 'punishCredit',
    key: 'punishCredit',
    width: '25%',
    render(v: any, record: any) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={iconDown.src} alt=""></img>
          {fixZero(v)}
        </div>
      )
    },
  },
  {
    title: <Space style={{ fontWeight: 400 }}>Credit score after change</Space>,
    dataIndex: 'currentCredit',
    key: 'currentCredit',
    width: '25%',
    render(v: any) {
      return fixZero(v)
    },
  },
]

const CreditScoreChangeHistory: any = ({ accountAddr, nodeRole }: any) => {
  return (
    <div>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#000000',
          lineHeight: '22px',
          padding: '23px 16px 4px 16px',
        }}
      >
        <Tooltip placement="top" title="Display information for the past month">
          Credit score change history{'  '}
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <TableWithRequest
          styleSet={true}
          id={`CreditScoreChangeHistory-${accountAddr}-${nodeRole}`}
          rowKey="punishTime"
          size={5}
          fetcher={(body: any) =>
            punishPage({
              ...body,
              accountAddr,
              endTime: Math.floor(Date.now() / 1000),
              startTime: Math.floor(Date.now() / 1000) - 2592000,
              nodeRole,
              searchCount: true,
            })
          }
          columns={columns}
        />
      </div>
    </div>
  )
}

export default CreditScoreChangeHistory
