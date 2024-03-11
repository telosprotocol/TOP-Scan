import type { NextPage } from "next";
import Link from "next/link";
import styles from "./index.module.scss";
type CProps = {
  links: any;
};
const Breadcrumbs: NextPage<CProps> = ({ links }: CProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <div className={`container`}>
        {/* {`Home >  Account > Account Detail`} */}
        <div className={styles.breadcrumbs_wrap}>
          {links.map((item: any, index: number) => {
            return (
              <div key={index} className={styles.breadcrumbs_item}>
                {item.link && (
                  <Link href={item.link}>
                    <a>{item.name}</a>
                  </Link>
                )}
                {item.link ? (
                  <span style={{ margin: "0 10px" }}>{" > "}</span>
                ) : (
                  <span>{item.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
