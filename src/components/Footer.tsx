import type { NextPage } from "next";
import styles from "../styles/Footer.module.scss";
// import logo from "../assets/images/logo.svg";
import logo from "../assets/images/logo.png";
import footer from "../assets/images/footer.png";
import shadow from "../assets/images/shadow.svg";
import twitter from "../assets/images/twitter.svg";

const year = new Date().getFullYear()

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.about}>
          <img className={styles.logo} src={footer.src} alt="logo"></img>
          <div style={{marginTop:'5px'}}>
            <span style={{ marginLeft: "43px", display: "inline-block" }}>
              Follow us：
            </span>
            <a href="https://t.me/topnetwork_top">
              <img className={styles.media} src={shadow.src} alt="shadow"></img>
            </a>
            <a href="https://twitter.com/topnetwork_top">
              <img
                className={styles.media}
                src={twitter.src}
                alt="twitter"
              ></img>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.Copyright}>
        Copyright © {year} TOPSCAN.IO © All rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
