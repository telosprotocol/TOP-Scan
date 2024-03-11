import type { NextPage } from "next";
import styles from "../../styles/Account.module.scss";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { accountDetail, txPage } from "../../api";
import QuestionTip from "../../components/QuestionTip";
import TableWithRequest from "../../components/TableWithRequest";
import { Row, Col, Card, Space, Spin, Progress, Typography, Empty } from "antd";
import txDetailsIcon from "../../assets/images/txDetailsIcon.svg";
import ContentDetails from "../../components/ContentDetails";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import {
  accuracy,
  formatTime,
  formatAddress,
  isZero,
  defaultValue,
  formatBalance,
} from "../../utils";
import iconTop from "../../assets/images/TOP.svg";
import iconTops from "../../assets/images/iconTop.svg";
import MinerDetails from "../../components/Account/MinerDetails";
import { useEffect, useMemo, useState } from "react";
import HtmlHead from "../../components/HtmlHead";
import { metaInfo } from "../../api/constant";

const { Paragraph } = Typography;

const columns = [
  {
    title: <Space>Transaction hash</Space>,
    dataIndex: "txHash",
    key: "txHash",
    render(v: any) {
      return (
        <Paragraph
          copyable={{ text: v?.toString() || "" }}
          style={{ fontSize: "14px", color: "white" }}
        >
          <Link href={`/transactions/transactionsDetail?hash=${v}`}>
            <a className="link"> {formatAddress(v)} </a>
          </Link>
        </Paragraph>
      );
    },
  },
  {
    title: <Space>Transactions type</Space>,
    dataIndex: "txType",
    key: "txType",
  },
  {
    title: <Space>Timestamp</Space>,
    dataIndex: "sendTimestamp",
    key: "sendTimestamp",
    render(v: any, record: any) {
      return formatTime(v * 1000);
    },
  },
  {
    title: <Space>From</Space>,
    dataIndex: "senderAccount",
    key: "senderAccount",
    render(v: any) {
      return (
        <Link href={`/account/accountDetail?address=${v}`}>
          <a className="link"> {formatAddress(v)} </a>
        </Link>
      );
    },
  },
  {
    title: <Space>To</Space>,
    dataIndex: "receiverAccount",
    key: "receiverAccount",
    render(v: any) {
      return (
        <Link href={`/account/accountDetail?address=${v}`}>
          <a className="link"> {formatAddress(v)} </a>
        </Link>
      );
    },
  },
  {
    title: <Space>Amount</Space>,
    dataIndex: "amount",
    key: "amount",
    render(v: any, record: any) {
      return (
        <>
          {formatBalance(accuracy(v, 6, 6))} <img src={iconTop.src} alt="logo"></img> TOP
          (Native Token)
        </>
      );
    },
  },
  {
    title: <Space>Status</Space>,
    dataIndex: "txState",
    key: "txState",
  },
];

const AccountDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query)
  const { address } = router.query;
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, error }: any = useSWR(
    address ? `${address}-AccountDetail` : null,
    (path) => {
      const params = path.split("-");
      return accountDetail(params[0]);
    }
  );
  const loading = !error && !data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tx = data?.message === "OK" ? data.result : {};
  const tabs = useMemo(() => {
    if (tx?.nodeFlag) {
      return ["Account information", "Miner details"];
    } else {
      return ["Account information"];
    }
  }, [tx]);
  return (
    <>
      <HtmlHead
        title={metaInfo.AccountDetail.title}
        keyWords={metaInfo.AccountDetail.keywords}
        description={metaInfo.AccountDetail.description}
      />
      <Layout>
        <div className={styles.txDetails}>
          <div className={styles.banner}>
            <div>
              <Breadcrumbs
                links={[
                  {
                    name: "Home",
                    link: "/",
                  },
                  {
                    name: "Account",
                    link: "/account",
                  },
                  {
                    name: "Account Detail",
                    link: "",
                  },
                ]}
              ></Breadcrumbs>
              <div className={`container`}>
                <div className={styles.banner__detail}>
                  <Row>
                    <Col span={2}>
                      <div
                        style={{
                          height: "100%",
                        }}
                      >
                        <img src={iconTops.src} alt="head"></img>
                      </div>
                    </Col>
                    <Col span={22}>
                      <Paragraph
                        copyable={{ text: address?.toString() || "" }}
                        style={{ fontSize: "15px", color: "white", marginBottom: '5px' }}
                      >
                        {address}
                      </Paragraph>
                      <div style={{ fontSize: "15px", color: "white" }}>
                        Created on {formatTime(tx.createdTime * 1000)}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className={"container"}>
              <div className={styles.tabs}>
                {tabs.map((item, index) => {
                  return (
                    <div
                      className={
                        styles.tabs__item +
                        " " +
                        (index === activeIndex ? styles.active : "")
                      }
                      key={index * 2 + new Date().getTime()}
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={`container`}>
            <div
              className={styles.txContent}
              style={{ display: activeIndex === 0 ? "block" : "none" }}
            >
              {loading ? (
                <div className={styles.loading}>
                  <Spin />
                </div>
              ) : tx.accountAddr ? (
                <div>
                  <Card
                    title={
                      <Space>
                        <img alt="txDetailsIcon" src={txDetailsIcon.src}></img>
                        Account
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div>
                      <Row>
                        <Col span={12} className={styles.headLine}>
                          <ContentDetails>
                            <ContentDetails.Item
                              label="Shared:"
                              tip="TOP Chain is a sharded public chain. Currently, TOP has 4 physical shards and 64 virtual shards. The shards here refer to virtual shards."
                            >
                              Table {tx.tableId}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Balance(TOP):"
                              tip="The number of TOP Tokens in the account"
                            >
                              {formatBalance(accuracy(tx.balance, 6, 6))}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Locked amount(TOP):"
                              tip="The locked transfer amount in the transfer transaction consensus"
                            >
                              {formatBalance(accuracy(tx.lockBalance, 6, 6))}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Vote:"
                              tip="The number of tickets voted by the account. Locking TOP can get votes, and voting for nodes can get voting rewards"
                            >
                              {formatBalance(tx.unusedVoteAmount)}
                            </ContentDetails.Item>
                          </ContentDetails>
                        </Col>
                        <Col span={12}>
                          <ContentDetails>
                            <ContentDetails.Item
                              label="Transaction:"
                              tip="The number of transactions of the account, including all transaction types"
                            >
                              {formatBalance(tx.txNum)}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Destroy amount(TOP):"
                              tip="Including beacon, trading margin, and actively destroyed amount"
                            >
                              {formatBalance(accuracy(tx.burnedToken, 6, 6))}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Trading Margin(TOP):"
                              tip="The transaction margin will be locked during the transaction and will be automatically unlocked after the transaction is over"
                            >
                              {formatBalance(accuracy(tx.lockDepositBalance, 6, 6))}
                            </ContentDetails.Item>
                            <ContentDetails.Item
                              label="Lock Unlock(TOP):"
                              tip="The transaction margin will be locked during the transaction and will be automatically unlocked after the transaction is over"
                            >
                              {formatBalance(accuracy(tx.voteStakedToken, 6, 6))}|
                              {formatBalance(accuracy(tx.unlockDiskStaked, 6, 6))}
                            </ContentDetails.Item>
                          </ContentDetails>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12} className={styles.headLine}>
                          <ContentDetails>
                            <div className={styles.textContent}>
                              <span>
                                <QuestionTip
                                  ml={0}
                                  text="The amount of gas currently available in the account, in Tgas"
                                />
                                &nbsp;Gas(Tgas)
                                <span style={{ color: "#888888" }}>
                                  <span style={{ color: "#333333" }}>
                                    {defaultValue(tx.availableGas)}
                                  </span>
                                  &nbsp;/ &nbsp;{defaultValue(tx.totalGas)}
                                </span>
                              </span>
                              <Progress
                                percent={isZero(
                                  parseFloat(
                                    (
                                      (+tx.availableGas / +tx.totalGas) * 100 ||
                                      0
                                    ).toFixed(2)
                                  )
                                )}
                                format={(percent) => percent + "%"}
                                strokeColor={
                                  (+tx.availableGas / +tx.totalGas) * 100 <= 20
                                    ? "#FF2B2B"
                                    : "#007DE8"
                                }
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>Locking (TOP)</div>
                                <div>Unlocking (TOP)</div>
                              </div>
                            </div>
                          </ContentDetails>
                        </Col>
                        <Col span={12}>
                          <ContentDetails>
                            <div className={styles.textContent}>
                              <span>
                                <QuestionTip
                                  ml={0}
                                  text="The TOP tokens locked for exchanging disk space, the unit is TOP"
                                />
                                &nbsp;Disk(Byte) 25000 / 25000
                              </span>
                              <Progress
                                strokeWidth={10}
                                percent={100}
                                format={(percent) => percent + "%"}
                                strokeColor={"#007DE8"}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>Locking (TOP)</div>
                                <div>Unlocking (TOP)</div>
                              </div>
                            </div>
                          </ContentDetails>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                  <br />
                  <Card
                    title={
                      <Space>
                        <img alt="txDetailsIcon" src={txDetailsIcon.src}></img>
                        Transactions List
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div style={{ minHeight: "650px" }}>
                      <TableWithRequest
                        styleSet={true}
                        id={"accountTransactions" + address}
                        rowKey="txHash"
                        fetcher={(body: any) =>
                          txPage({ ...body, accountAddr: address })
                        }
                        columns={columns}
                      />
                    </div>
                  </Card>
                </div>
              ) : (
                <div style={{ marginTop: "100px" }}>
                  <Empty></Empty>
                </div>
              )}
            </div>
            <div style={{ display: activeIndex === 1 ? "block" : "none" }}>
              <MinerDetails nodeFlag={tx?.nodeFlag}></MinerDetails>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountDetail;
