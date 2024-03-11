import type { NextPage } from "next";
import styles from "../../styles/node.module.scss";
import { Card, Space, Tabs } from "antd";
import CardDetails from "../../components/Account/cardDetails";
import LineChart from "../../components/Account/LineChart";
import BarChart from "../../components/Account/barChart";
import { fixZero, formatBalance, formatTime } from "../../utils";
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
          label="Audit credit score"
          tip="Validator nodes and auditor nodes have different credit scores, the auditor credit score of the node is displayed here."
        >
          {/* {formatTime(data.firstBlockTime * 1000)} */}
          {formatBalance(fixZero(data.credit))}
        </CardDetails.Item>
        <CardDetails.Item
          label="Blocks generated"
          tip="The total number of blocks (Table Blocks) generated since becoming an auditor node."
        >
          {formatBalance(data.totalBlocks)}
        </CardDetails.Item>
        <CardDetails.Item
          label="First block time (local time)"
          tip="The first block time after becoming an auditor node and joining the network"
        >
          {formatTime(data.firstBlockTime * 1000)}
        </CardDetails.Item>
      </CardDetails>
      <CreditScoreChangeHistory nodeRole={'auditor'} accountAddr={accountAddr} />
      <div className={styles.tabs}>
        <Tabs type="card">
          <TabPane tab="Auditor Stake" key="1">
            <LineChart
              type={"auditorStakeDailyData"}
              color={["#8DDD38", "#5B8FF9"]}
              title={"Auditor Stake"}
              subtitle={"Auditor Stake Description"}
              desc={`Auditor stake value = (node ​​deposit + obtained votes / 2) * auditor credit score. The greater the auditor stake value in the auditor candidate pool, the higher chance of being elected. Only when you are elected can you generate block and receive rewards.`}
            ></LineChart>
          </TabPane>
          <TabPane tab="Audit workload" key="2">
            <BarChart
              type={"auditorDatas"}
              title={"Audit workload"}
              subtitle={"Audit workload description"}
              desc={`Audit workload = the number of all blocks generated by the audit node address * 2 + number of transactions inside the blocks generated by the node address. The more workload, the more rewards.`}
            ></BarChart>
          </TabPane>
          {/* <TabPane tab="Audit block rate" key="3">
            <LineChart
              resData={data}
              color={["#44D7B6", "#FA6400"]}
              title={"Audit block rate"}
              subtitle={"Auditor Stake Description"}
              desc={`Auditor signing rate = the number of times the node actually voted to sign the table block / the number of times the node should vote to sign the table block. The block signing rate will affect the node's auditor credit score.`}
            ></LineChart>
          </TabPane> */}
          <TabPane tab="Audit credit score" key="4">
            <LineChart
              type={"auditorCreditDailyData"}
              color={["#B620E0", "#32C5FF"]}
              title={"Audit credit score"}
              subtitle={"Description of auditor credit score"}
              desc={`When being elected as an auditor for the first time, the credit score is 0.1. The system will reward and punish according to the credit score every 24 hours. For auditors whose signing rate ranks in the top 80%, 0.03 credit scores will be added. For the auditors have no workload in 24 hours, 0.1 credit scores will be deducted. The maximum credit score of the auditor is 1 point, and the minimum is 0.1 point.`}
            ></LineChart>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AuditorNode;
