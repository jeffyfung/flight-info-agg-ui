import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import styles from "./layout.module.scss";
import { UserButton } from "../../components/user-button/user-button";
import React from "react";
import { LinearProgress } from "@mui/material";
// import { useViewTransition } from "@/utils/hooks/view-transition";
import { flushSync } from "react-dom";

const Layout: React.FC<{}> = () => {
  // const navigateWithTransition = useViewTransition();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const directToDashboard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // navigateWithTransition("/");
    document.startViewTransition(() => {
      flushSync(() => {
        navigate("/");
      });
    });
  };

  return (
    <div>
      <div className={styles.background} />
      {navigation.state !== "idle" && (
        <div className={styles.loadingContainer}>
          <LinearProgress className={styles.loading} />
        </div>
      )}
      <div className={styles.headerContainer}>
        <h2 className={styles.appTitle} onClick={directToDashboard}>
          852 Flight Deals
        </h2>
        <UserButton />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
