import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import Search from "../components/Search";
import CardList from "../components/home/Card";
import Transaction from "../components/home/Transaction";
import ScrollCard from "../components/home/ScrollCard";
import { Card, Space, Row, Col } from "antd";
import detailFilledIcon from "../assets/images/detail-filled.svg";
import userFillingIcon from "../assets/images/user-filling.svg";
import areachartOutlined from "../assets/images/areachart-outlined.svg";
import databaseFilled from "../assets/images/database-filled.svg";
import appstoreFilled from "../assets/images/appstore-filled.svg";
import QuestionTip from "../components/QuestionTip";
import AccountLineChart from "../components/home/AccountLineChart";
import StackStatisticBar from "../components/home/StackStatisticBar";
import HtmlHead from "../components/HtmlHead";
import { metaInfo } from "../api/constant";
import { useEffect } from "react";
import TopMap from "../components/TopMap/TopMap";
import Link from "next/link";
const Home: NextPage = () => {
  return (
    <>
      <HtmlHead
        title={metaInfo.Home.title}
        keyWords={metaInfo.Home.keywords}
        description={metaInfo.Home.description}
      />
      <Layout>
        <div className={styles.home}>
          <div className={styles.video}>
            <video
              autoPlay
              webkit-playsinline="true"
              playsInline={true}
              preload={"preload"}
              loop
              muted
            >
              <source type="video/mp4" src="/home.mp4"></source>
            </video>
            <div className={styles.mask}></div>
          </div>
          <div className={`container`}>
  
            <div className={styles.search}>
              <Search />
            </div>

            <div className={styles.part1}>
              <CardList></CardList>
            </div>
            {/* Transaction */}
            <div className={styles.part2}>
              <Card
                title={
                  <Space>
                    <img alt="txDetailsIcon" src={detailFilledIcon.src}></img>
                    Transaction details
                  </Space>
                }
                extra={
                  <Link href="/transactions">
                    <a style={{ color: "#1677FF" }}>{`MORE >>`}</a>
                  </Link>
                }
                bodyStyle={{ padding: 0 }}
              >
                <Transaction></Transaction>
              </Card>
            </div>
            {/* Block */}
            <div className={styles.part3}>
              <Card
                title={
                  <Space>
                    <img alt="txDetailsIcon" src={appstoreFilled.src}></img>
                    Block
                  </Space>
                }
                extra={
                  <Link href="/block">
                    <a style={{ color: "#1677FF" }}>{`MORE >>`}</a>
                  </Link>
                }
                bodyStyle={{ padding: 0 }}
              >
                <ScrollCard></ScrollCard>
              </Card>
            </div>
            {/* Account & Stake Statistics */}
            <div className={styles.part4}>
              <Row gutter={30}>
                <Col span={12}>
                  <Card
                    title={
                      <Space>
                        <img
                          alt="txDetailsIcon"
                          src={userFillingIcon.src}
                        ></img>
                        Account
                        <QuestionTip
                          ml={0}
                          text={
                            "The number of account addresses that have been activated on the TOP mainnet"
                          }
                        ></QuestionTip>
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div style={{ padding: "20px 0" }}>
                      <AccountLineChart></AccountLineChart>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    title={
                      <Space>
                        <img
                          alt="txDetailsIcon"
                          src={areachartOutlined.src}
                        ></img>
                        Stake Statistics
                        <QuestionTip
                          ml={0}
                          text={
                            "The comprehensive stake is an important indicator to measure the TOP ecology. It is the comprehensive data calculated from the total node stake value of each role in the node candidate pool."
                          }
                        ></QuestionTip>
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div style={{ padding: "76px 0 101px" }}>
                      <StackStatisticBar></StackStatisticBar>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div className={styles.part3}>
              <Card
                title={
                  <Space>
                    <img alt="TOP Mainnet" src={databaseFilled.src}></img>
                    TOP Mainnet
                  </Space>
                }
                bodyStyle={{ padding: 0 }}
              >
                <TopMap></TopMap>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
