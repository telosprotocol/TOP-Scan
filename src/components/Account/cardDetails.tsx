import styles from "../../styles/cardDetail.module.scss";
import { Space } from "antd";
import QuestionTip from "../../components/QuestionTip";
const CardDetails: any = ({ children }: any) => {
  return <div className={styles.cardDetail}>{children}</div>;
};

CardDetails.Item = function CardDetailsItem({
  label,
  children,
  tip,
  paddingLeft = "24px",
}: any) {
  return (
    <div className={styles.Item}>
      <div className={styles.label} style={{ paddingLeft: paddingLeft }}>
        <Space>
          {tip && <QuestionTip ml={0} text={tip}></QuestionTip>}
          {label}
        </Space>
      </div>
      <div style={{ paddingLeft: paddingLeft }} className={styles.value}>
        {children}
      </div>
    </div>
  );
};

export default CardDetails;
