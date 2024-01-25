import { extractCookie } from "@/utils/cookie";
import styles from "./user-button.module.scss";
import { useLocation } from "react-router-dom";
import { UserPublicInfo } from "@/interfaces/user.inferface";
import { useState } from "react";
import { ax } from "@/utils/axios";
import { UserMenu } from "../user-menu/user-menu";
import { useViewTransition } from "@/utils/hooks/view-transition";

export const UserButton: React.FC<{}> = () => {
  const [_, render] = useState<boolean>(false);
  const navigateWithTransition = useViewTransition();
  const { pathname } = useLocation();

  const logoutHandler = async (_e: React.MouseEvent<HTMLElement>) => {
    await ax.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/logout`);
    render(true);
  };

  if (pathname === "/login") return <></>;
  const userInfoJSON = extractCookie("user_info");

  if (!userInfoJSON) {
    return (
      <div className={styles.signInButton} onClick={() => navigateWithTransition("/login")}>
        Sign In
      </div>
    );
  } else {
    const userInfoString = atob(userInfoJSON);
    const user = JSON.parse(userInfoString) as UserPublicInfo;
    return (
      <div className={styles.container}>
        <UserMenu userInfo={user} handleLogout={logoutHandler} />
      </div>
    );
  }
};
