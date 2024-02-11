import { Link, Outlet, useNavigation } from "react-router-dom";
import styles from "./layout.module.scss";
import { UserButton } from "../../components/user-button/user-button";
import React from "react";
import { LinearProgress } from "@mui/material";

const Layout: React.FC<{}> = () => {
  const navigation = useNavigation();

  return (
    <div>
      <div className={styles.background} />
      {navigation.state !== "idle" && (
        <div className={styles.loadingContainer}>
          <LinearProgress className={styles.loading} />
        </div>
      )}
      <div className={styles.headerContainer}>
        <Link unstable_viewTransition className={styles.appTitle} to={"/"}>
          852 Flight Deals
        </Link>
        <UserButton />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
