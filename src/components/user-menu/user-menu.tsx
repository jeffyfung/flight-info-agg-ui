import { UserPublicInfo } from "@/interfaces/user.inferface";
import { useState } from "react";
import { OutsideClickHandler } from "../outside-click-handler/outside-click-handler";
import styles from "./user-menu.module.scss";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  userInfo: UserPublicInfo;
  handleLogout: (e: React.MouseEvent<HTMLElement>) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ userInfo, handleLogout }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  const handleProfile = () => {
    setShowMenu(false);
    navigate("/profile", { unstable_viewTransition: true });
  };

  return (
    <div className={styles.userButtonContainer}>
      {userInfo.avatar_url ? (
        <img
          className={styles.iconImg} //
          src={userInfo.avatar_url}
          referrerPolicy="no-referrer"
          alt={userInfo.name}
          width={30}
          height={30}
          onClick={handleClick}
        />
      ) : (
        <div onClick={handleClick}>Account</div>
      )}
      {showMenu && (
        <OutsideClickHandler onOutsideClick={handleMenuClose}>
          <ul className={styles.userMenuContainer}>
            <li className={styles.menuItem} onClick={handleProfile}>
              Profile
            </li>
            <li className={styles.menuItem} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </OutsideClickHandler>
      )}
    </div>
  );
};
