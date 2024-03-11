import type { NextPage } from 'next'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
type CProps = {
  text: string
  ml: number | undefined
}

const QuestionTip: NextPage<CProps> = ({ text, ml = 0 }) => {
  return (
    <Tooltip placement="top" title={text}>
      <QuestionCircleOutlined />
    </Tooltip>
  )
}

export default QuestionTip
