import styles from "./sign-in-button.module.scss";

interface SignInButtonProps {
  providerID: string;
  providerName: string;
  icon: React.ReactNode;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ providerID, providerName, icon }) => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_ENDPOINT}/auth?provider=${providerID}`;
  };

  return (
    <button className={styles.button} onClick={handleLogin}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>Sign In With {providerName}</span>
    </button>
  );
};
