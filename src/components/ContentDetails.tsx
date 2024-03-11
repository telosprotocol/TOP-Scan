import styles from "../styles/ContentDetails.module.scss";
import { Space } from "antd";
import QuestionTip from "./QuestionTip";

const ContentDetails: any = ({ children, style = {} }: any) => {
  return (
    <div className={styles.ContentDetails} style={style}>
      {children}
    </div>
  );
};

ContentDetails.Item = function ContentDetailsItem({
  label,
  children,
  tip,
  style = {},
}: any) {
  return (
    <div className={styles.Item}>
      <div className={styles.label} style={style}>
        <Space>
          <QuestionTip ml={0} text={tip}></QuestionTip>
          {label}
        </Space>
      </div>
      <div className={styles.value}>{children}</div>
    </div>
  );
};

export default ContentDetails;
