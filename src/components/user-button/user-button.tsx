import { extractCookie } from "@/utils/cookie";
import styles from "./user-button.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserPublicInfo } from "@/interfaces/user.inferface";
import { useState } from "react";
import { ax } from "@/utils/axios";
import { UserMenu } from "../user-menu/user-menu";

export const UserButton: React.FC<{}> = () => {
  const [_, render] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = async (_e: React.MouseEvent<HTMLElement>) => {
    await ax.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/logout`);
    if (pathname === "/") {
      render(true);
    } else {
      navigate("/", { unstable_viewTransition: true });
    }
  };

  if (pathname === "/login") return <></>;
  const userInfoJSON = extractCookie("user_info");

  if (!userInfoJSON) {
    return (
      <Link unstable_viewTransition className={styles.signInButton} to={"/login"}>
        Sign In
      </Link>
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
