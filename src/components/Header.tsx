import type { NextPage } from "next";
import styles from "../styles/Header.module.scss";
// import logo from "../assets/images/logo.svg";
import logo from "../assets/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: NextPage = () => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={`container ${styles.hRow}`}>
        <Link href="/">
          <a>
            <img src={logo.src} alt="logo"></img>
          </a>
        </Link>
        <nav>
          <Link href="/">
            <a className={router.pathname === "/" ? styles.select : ""}>Home</a>
          </Link>
          {[
            "Shard",
            "Miner",
            "Block",
            "Transactions",
            "Account",
            "Contracts",
          ].map((item) => {
            return (
              <Link href={"/" + item.toLowerCase()} key={item}>
                <a
                  className={
                    router.pathname.startsWith("/" + item.toLowerCase())
                      ? styles.select
                      : ""
                  }
                >
                  {item}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
