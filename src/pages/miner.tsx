import { Space } from "antd";
import type { NextPage } from "next";
import { nodePage, nodeRoleTypeList } from "../api";
import useSWR from "swr";
import Layout from "../components/Layout";
import QuestionTip from "../components/QuestionTip";
import Search from "../components/Search";
import TableWithRequest from "../components/TableWithRequest";
import styles from "../styles/Block.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  formatBalance,
  formatNodeType,
  handleCreditScore,
  isEmpty,
  isZero,
} from "../utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import HtmlHead from "../components/HtmlHead";
import { metaInfo } from "../api/constant";

const RingProgress = dynamic(
  () => import("@ant-design/plots").then((mod: any) => mod.RingProgress) as any,
  { ssr: false }
) as any;

const Node: NextPage = () => {
  const [pageInfo, setPageInfo] = useState({ current: 1, size: 10 });
  const [total, setTotal] = useState("0");
  const [nodeRole, setNodeRole] = useState("auditor");

  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    if (nodeRole === "archive") {
      setColumns([
        {
          title: <Space>#</Space>,
          dataIndex: "Index",
          key: "Index",
          render(v: any, record: any, index: any) {
            return index + 1 + pageInfo.size * (pageInfo.current - 1);
          },
        },
        {
          title: <Space>Miner Name</Space>,
          dataIndex: "nodename",
          key: "nodename",
          render(v: any, record: any) {
            return (
              <Link
                href={`/account/accountDetail?address=${record.accountAddr}`}
              >
                <a className="link"> {v} </a>
              </Link>
            );
          },
        },
        {
          title: <Space>Status</Space>,
          dataIndex: "nodeState",
          key: "nodeState",
          render(v: any, record: any) {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {v === "election" ? (
                  <span className={styles.workingDot}></span>
                ) : (
                  <span className={styles.backupDot}></span>
                )}
                {capitalizeFirstLetter(v)}
              </div>
            );
          },
        },

        {
          title: <Space>Miner Type</Space>,
          dataIndex: "registeredNodeType",
          key: "registeredNodeType",
          render(v: any, record: any) {
            return formatNodeType(v);
          },
        },
        {
          title: <Space>Margin(TOP)</Space>,
          dataIndex: "CreditScore",
          key: "CreditScore",
          render: (text: any, record: any) => (
            <>
              {isEmpty(record.nodeDeposit)
                ? isZero((record.nodeDeposit / 1000000).toFixed(6))
                : "--"}
            </>
          ),
        },
      ]);
    } else if (nodeRole === "auditor") {
      setColumns([
        {
          title: <Space>#</Space>,
          dataIndex: "Index",
          key: "Index",
          render(v: any, record: any, index: any) {
            return index + 1 + pageInfo.size * (pageInfo.current - 1);
          },
        },
        {
          title: <Space>Miner Name</Space>,
          dataIndex: "nodename",
          key: "nodename",
          render(v: any, record: any) {
            return (
              <Link
                href={`/account/accountDetail?address=${record.accountAddr}`}
              >
                <a className="link"> {v} </a>
              </Link>
            );
          },
        },
        {
          title: <Space>Status</Space>,
          dataIndex: "nodeState",
          key: "nodeState",
          render(v: any, record: any) {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {v === "election" ? (
                  <span className={styles.workingDot}></span>
                ) : (
                  <span className={styles.backupDot}></span>
                )}
                {capitalizeFirstLetter(v)}
              </div>
            );
          },
        },
        {
          title: <Space>Miner Type</Space>,
          dataIndex: "registeredNodeType",
          key: "registeredNodeType",
          render(v: any, record: any) {
            return formatNodeType(v);
          },
        },
        {
          title: <Space>Auditor node Stake</Space>,
          dataIndex: "NodeStake",
          key: "NodeStake",
          render(v: any, record: any) {
            return record.auditorStake;
          },
        },
        {
          title: <Space>Shard</Space>,
          dataIndex: "Shard",
          key: "Shard",
          render(v: any, record: any) {
            return "Audit Network " + record.tableId;
          },
        },
        {
          title: <Space>Tickets</Space>,
          dataIndex: "Tickets",
          key: "Tickets",
          render(v: any, record: any) {
            return record.votePercent + "%" + "(" + record.voteAmount + ")";
          },
        },
        {
          title: <Space>Credit Score</Space>,
          dataIndex: "auditorCredit",
          key: "auditorCredit",
          render(v: any) {
            return handleCreditScore(v);
          },
        },
      ]);
    } else if (nodeRole === "edge") {
      setColumns([
        {
          title: <Space>#</Space>,
          dataIndex: "Index",
          key: "Index",
          render(v: any, record: any, index: any) {
            return index + 1 + pageInfo.size * (pageInfo.current - 1);
          },
        },
        {
          title: <Space>Miner Name</Space>,
          dataIndex: "nodename",
          key: "nodename",
          render(v: any, record: any) {
            return (
              <Link
                href={`/account/accountDetail?address=${record.accountAddr}`}
              >
                <a className="link"> {v} </a>
              </Link>
            );
          },
        },
        {
          title: <Space>Status</Space>,
          dataIndex: "nodeState",
          key: "nodeState",
          render(v: any, record: any) {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {v === "election" ? (
                  <span className={styles.workingDot}></span>
                ) : (
                  <span className={styles.backupDot}></span>
                )}
                {capitalizeFirstLetter(v)}
              </div>
            );
          },
        },
        {
          title: <Space>Miner Type</Space>,
          dataIndex: "registeredNodeType",
          key: "registeredNodeType",
          render(v: any, record: any) {
            return formatNodeType(v);
          },
        },
        {
          title: <Space>Transactions</Space>,
          dataIndex: "txNum",
          key: "txNum",
        },
        {
          title: <Space>Margin(TOP)</Space>,
          dataIndex: "CreditScore",
          key: "CreditScore",
          render: (text: any, record: any) => (
            <>
              {isEmpty(record.nodeDeposit)
                ? isZero((record.nodeDeposit / 1000000).toFixed(6))
                : "--"}
            </>
          ),
        },
      ]);
    } else if (nodeRole === "exchange" || nodeRole === "root_beacon") {
      setColumns([
        {
          title: <Space>#</Space>,
          dataIndex: "Index",
          key: "Index",
          render(v: any, record: any, index: any) {
            return index + 1 + pageInfo.size * (pageInfo.current - 1);
          },
        },
        {
          title: <Space>Miner Name</Space>,
          dataIndex: "nodename",
          key: "nodename",
          render(v: any, record: any) {
            return (
              <Link
                href={`/account/accountDetail?address=${record.accountAddr}`}
              >
                <a className="link"> {v} </a>
              </Link>
            );
          },
        },
        {
          title: <Space>Status</Space>,
          dataIndex: "nodeState",
          key: "nodeState",
          render(v: any, record: any) {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {v === "election" ? (
                  <span className={styles.workingDot}></span>
                ) : (
                  <span className={styles.backupDot}></span>
                )}
                {capitalizeFirstLetter(v)}
              </div>
            );
          },
        },
        {
          title: <Space>Miner Type</Space>,
          dataIndex: "registeredNodeType",
          key: "registeredNodeType",
          render(v: any, record: any) {
            return formatNodeType(v);
          },
        },
        {
          title: <Space>Margin(TOP)</Space>,
          dataIndex: "CreditScore",
          key: "CreditScore",
          render: (text: any, record: any) => (
            <>
              {isEmpty(record.nodeDeposit)
                ? isZero((record.nodeDeposit / 1000000).toFixed(6))
                : "--"}
            </>
          ),
        },
      ]);
    } else if (nodeRole === "validator") {
      setColumns([
        {
          title: <Space>#</Space>,
          dataIndex: "Index",
          key: "Index",
          render(v: any, record: any, index: any) {
            return index + 1 + pageInfo.size * (pageInfo.current - 1);
          },
        },
        {
          title: <Space>Miner Name</Space>,
          dataIndex: "nodename",
          key: "nodename",
          render(v: any, record: any) {
            return (
              <Link
                href={`/account/accountDetail?address=${record.accountAddr}`}
              >
                <a className="link"> {v} </a>
              </Link>
            );
          },
        },
        {
          title: <Space>Status</Space>,
          dataIndex: "nodeState",
          key: "nodeState",
          render(v: any, record: any) {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {v === "election" ? (
                  <span className={styles.workingDot}></span>
                ) : (
                  <span className={styles.backupDot}></span>
                )}
                {capitalizeFirstLetter(v)}
              </div>
            );
          },
        },
        {
          title: <Space>Miner Type</Space>,
          dataIndex: "registeredNodeType",
          key: "registeredNodeType",
          render(v: any, record: any) {
            return formatNodeType(v);
          },
        },
        {
          title: <Space>Stake</Space>,
          dataIndex: "NodeStake",
          key: "NodeStake",
          render(v: any, record: any) {
            return record.validatorStake;
          },
        },
        {
          title: <Space>Shard</Space>,
          dataIndex: "Shard",
          key: "Shard",
          render(v: any, record: any) {
            return "Validate Network " + record.tableId;
          },
        },
        {
          title: <Space>Credit Score</Space>,
          dataIndex: "validatorCredit",
          key: "validatorCredit",
          render(v: any) {
            return handleCreditScore(v);
          },
        },
        {
          title: <Space>Margin(TOP)</Space>,
          dataIndex: "CreditScore",
          key: "CreditScore",
          render: (text: any, record: any) => (
            <>
              {isEmpty(record.nodeDeposit)
                ? isZero((record.nodeDeposit / 1000000).toFixed(6))
                : "--"}
            </>
          ),
        },
      ]);
    }
  }, [nodeRole, pageInfo]);

  const { data, error }: any = useSWR("nodeRoleTypeList", () => {
    return nodeRoleTypeList();
  });

  return (
    <>
      <HtmlHead
        title={metaInfo.Miner.title}
        keyWords={metaInfo.Miner.keywords}
        description={metaInfo.Miner.description}
      />
      <Layout>
        <div className={styles.txlist + " minerlist"}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div className={styles.headFrame + " " + styles.nimerheadFrame}>
              <div className={styles.minerTypes}>
                {data?.result.map((item: any) => {
                  return (
                    <div
                      className={
                        styles.minerItem +
                        " " +
                        (item.nodeRole === nodeRole
                          ? styles.minerItemSelect
                          : "")
                      }
                      key={item.nodeRole}
                      onClick={() => setNodeRole(item.nodeRole)}
                    >
                      <div className={styles.minerTitle}>
                        <div>
                          {capitalizeFirstLetter(item.nodeRole)} node
                        </div>
                        <span>{formatBalance(item.electionCount + item.candidateCount)}</span>
                      </div>
                      <div className={styles.minerVal}>
                        <div>
                          <div className={styles.dotwrap}>
                            <span className={styles.workingDot}></span>Working:{" "}
                            {item.electionCount}
                          </div>
                          <div className={styles.dotwrap}>
                            <span className={styles.backupDot}></span>Backup:{" "}
                            {item.candidateCount}
                          </div>
                        </div>
                        <div className={styles.minerCircle}>
                          <RingProgress
                            {...{
                              height: 40,
                              width: 40,
                              autoFit: true,
                              percent: item.electionCount / item.totalNodeCount,
                              showInfo: false,
                              color: ["#1677ff", "#b3cdf1"],
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.records} style={{}}></div>

            <div style={{ minHeight: "650px" }}>
              <TableWithRequest
                styleSet={true}
                id={`nodePage-${nodeRole}`}
                rowKey="accountAddr"
                fetcher={async (body: any) => {
                  setPageInfo({ ...body });
                  const result = await nodePage({ ...body, nodeRole });
                  setTotal(formatBalance(result.totalCount));
                  return result;
                }}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Node;
