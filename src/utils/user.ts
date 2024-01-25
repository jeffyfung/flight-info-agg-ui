import { UserPublicInfo } from "@/interfaces/user.inferface";
import { extractCookie } from "./cookie";

export const getUserInfo = (): UserPublicInfo | null => {
  const userInfoJSON = extractCookie("user_info");
  if (!userInfoJSON) return null;
  const userInfoString = atob(userInfoJSON);
  const user = JSON.parse(userInfoString) as UserPublicInfo;
  return user;
};
