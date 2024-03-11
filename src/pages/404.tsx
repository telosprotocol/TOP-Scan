import type { NextPage } from "next";
import Layout from "../components/Layout";
import Search from "../components/Search";
import styles from "../styles/Shard.module.scss";
import HtmlHead from "../components/HtmlHead";
import { metaInfo } from "../api/constant";


const Page404: NextPage = () => {

  return (
    <>
      <HtmlHead
        title={metaInfo.Shared.title}
        keyWords={metaInfo.Shared.keywords}
        description={metaInfo.Shared.description}
      />
      <Layout>
        <div className={styles.txlist}>
          <div className={`container`}>
            <div>
              <Search />
            </div>

            <div style={{minHeight: '500px', paddingTop: '250px', textAlign: 'center', fontSize: '24px'}}>
            404 page not found              
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
};

export default Page404;
