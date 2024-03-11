import type { NextPage } from "next";
import styles from "../../styles/TransactionsDetail.module.scss";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { blockDetails } from "../../api";
import Search from "../../components/Search";
import { Card, Empty, Space, Spin, Typography } from "antd";
import txDetailsIcon from "../../assets/images/txDetailsIcon.svg";
import ContentDetails from "../../components/ContentDetails";
import { formatTime } from "../../utils";
import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import HtmlHead from "../../components/HtmlHead";
import { metaInfo } from "../../api/constant";
const { Paragraph } = Typography;

const BlockDetail: NextPage = () => {
  const router = useRouter();
  const { owner, height } = router.query;

  const { data, error }: any = useSWR(
    owner && height ? `${owner}-${height}-BlockDetail` : null,
    (path) => {
      const params = path.split("-");
      return blockDetails(params[0], params[1]);
    }
  );

  const loading = !error && !data;
  const tx = data?.message === "OK" ? data.result : {};
  return (
    <>
      <HtmlHead
        title={metaInfo.BlockDetail.title}
        keyWords={metaInfo.BlockDetail.keywords}
        description={metaInfo.BlockDetail.description}
      />
      <Layout>
        <div className={styles.txDetails}>
          <div className={styles.top}>
            <div className={`container`}>
              <Breadcrumbs
                links={[
                  {
                    name: "Home",
                    link: "/",
                  },
                  {
                    name: "Block",
                    link: "/block",
                  },
                  {
                    name: "Block details",
                    link: "",
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
              ) : tx.hash ? (
                <div>
                  <Card
                    title={
                      <Space>
                        <img alt="txDetailsIcon" src={txDetailsIcon.src}></img>
                        Block details
                      </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div>
                      <ContentDetails>
                        <ContentDetails.Item
                          label="Block height:"
                          tip="The height of the Table block of TOP Chain"
                        >
                          {tx.owner}#{tx.height}
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          label="Block hash:"
                          tip="The block header hash of the current block"
                        >
                          <Paragraph
                            copyable={{ text: tx.hash?.toString() || "" }}
                            style={{ marginBottom: "0" }}
                          >
                            {tx.hash}
                          </Paragraph>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          label="Time:"
                          tip="Date and time of block production"
                        >
                          {formatTime(tx.timestamp * 1000)}
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          label="Miner:"
                          tip="The miner who produced the block"
                        >
                          {tx.auditor !== "0" ? tx.auditor : tx.validator}
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          label="Last block hash:"
                          tip="The hash of the last block"
                        >
                          <Link
                            href={`/block/blockDetail?owner=${owner}&height=${
                              Number(height) - 1
                            }`}
                          >
                            <a className="link">{tx.prevHash}</a>
                          </Link>
                        </ContentDetails.Item>
                        <ContentDetails.Item
                          label="Transaction:"
                          tip="Transaction data contained in the block"
                        >
                          {tx.txs.map((item: any) => {
                            return (
                              <div key={item}>
                                <Link
                                  href={`/transactions/transactionsDetail?hash=${item}`}
                                >
                                  <a className="link">{item}</a>
                                </Link>
                              </div>
                            );
                          })}
                        </ContentDetails.Item>
                      </ContentDetails>
                    </div>
                  </Card>
                </div>
              ) : (
                <div style={{ marginTop: "100px" }}>
                  <Empty></Empty>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlockDetail;
