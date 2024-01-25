import styles from "./login.module.scss";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SignInButton } from "@/components/sign-in-button/sign-in-button";
import airplaneImgUrl from "@/assets/airplane.jpg";

const Login: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Stay In The Loop</h1>
      </div>
      <img src={airplaneImgUrl} alt="airplane" width={500} height={500} />
      <LoginSection />
    </div>
  );
};

const LoginSection: React.FC<{}> = () => {
  return (
    <div className={styles.credentialsContainer}>
      <SignInButton providerID="google" providerName="Google" icon={<FaGoogle />} />
      <SignInButton providerID="github" providerName="GitHub" icon={<FaGithub />} />
    </div>
  );
};

export default Login;
