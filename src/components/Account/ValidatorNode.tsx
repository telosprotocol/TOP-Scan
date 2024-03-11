import type { NextPage } from "next";
import styles from "../../styles/node.module.scss";
import { Card, Space, Tabs } from "antd";
import CardDetails from "../../components/Account/cardDetails";
import LineChart from "../../components/Account/LineChart";
import BarChart from "../../components/Account/barChart";
import { fixedZero, fixZero, formatBalance, formatTime } from "../../utils";
import CreditScoreChangeHistory from "./CreditScoreChangeHistory";
type CProps = {
  data: any;
  accountAddr: string;
};
const AuditorNode: NextPage<CProps> = ({ data, accountAddr }: CProps) => {
  const { TabPane } = Tabs;
  return (
    <div className={styles.node}>
      <div className={styles.node__desc}>
        All nodes that meet the requirement of being audit nodes, and have not
        been elected as audit nodes have the chance of being elected as audit
        nodes in this round. The minimum requirement for audit node that the
        staking amount is greater than 1 million TOP and the number of votes
        obtained is greater than the staking amount.
      </div>
      <CardDetails>
        <CardDetails.Item label="Comprehensive stake ranking">
          {formatBalance(data.stakeRanking)}
        </CardDetails.Item>
        <CardDetails.Item
          label="Validator credit score"
          tip="Validator nodes and auditor nodes have different credit scores, the validator credit score of the node is displayed here."
        >
          {formatBalance(fixZero(data.credit))}
        </CardDetails.Item>
        <CardDetails.Item
          label="Blocks generated"
          tip="The total number of blocks generated since becoming a validator node."
        >
          {formatBalance(data.totalBlocks)}
        </CardDetails.Item>
        <CardDetails.Item
          label="First block time (local time)"
          tip="The first block time after becoming an validator node and joining the network"
        >
          {formatTime(data.firstBlockTime * 1000)}
        </CardDetails.Item>
      </CardDetails>
      <CreditScoreChangeHistory nodeRole={'validator'} accountAddr={accountAddr} />
      <div className={styles.tabs}>
        <Tabs type="card">
          <TabPane tab="Validator Stake" key="1">
            <LineChart
              type={"validatorStakeDailyData"}
              color={["#8DDD38", "#5B8FF9"]}
              title={"Validator Stake"}
              subtitle={"Description of validator stake"}
              desc={`Validator stake value = (node ​​deposit + obtained votes / 2) * Validator credit score. The larger the validator stake value in the validator candidate pool, the higher chance of being elected. Only when you are elected can you generate block and receive rewards.`}
            ></LineChart>
          </TabPane>
          <TabPane tab="Validator workload" key="2">
            <BarChart
              type={"validatorDatas"}
              title={"Validator workload"}
              subtitle={"Description of validator workload"}
              desc={`Validator workload = the number of all blocks generated by the validator node address * 2 + the total number of transactions sent and received by the node address. The more workload, the more rewards.`}
            ></BarChart>
          </TabPane>
          {/* <TabPane tab="Validator block signing rate" key="3">
            <LineChart
              
              resData={data}
              color={["#44D7B6", "#FA6400"]}
              title={"Validator block signing rate"}
              subtitle={"Description of validator block signing rate"}
              desc={`Validator signing rate = the number of times the node actually voted to sign the table block / the number of times the node should vote to sign the table block. The block signing rate will affect the node's validator credit score.`}
            ></LineChart>
          </TabPane> */}
          <TabPane tab="Validator credit score" key="4">
            <LineChart
              type={"validatorCreditDailyData"}
              color={["#B620E0", "#32C5FF"]}
              title={"Validator credit score"}
              subtitle={"Description of validator credit score"}
              desc={`When being elected as a validator for the first time, the credit score is 0.1. The system will reward and punish according to the credit score every 24 hours. For validators whose signing rate ranks in the top 80%, 0.03 credit scores will be added. For the validators have no workload in 24 hours, 0.1 credit scores will be deducted. The validator credit score is a key indicator for calculating your validator stake value. The greater the validator stake value, the higher chance of being elected.`}
            ></LineChart>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AuditorNode;
