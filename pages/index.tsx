import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import PrivateRoute from "../components/privateRoute";
const Home: NextPage = () => {

    return (
      <div className={styles.container}>
        <h1>Homepage</h1>

        <Link href="/api/auth/login">Auth0</Link>
      </div>
    );

};

export default PrivateRoute(Home);
