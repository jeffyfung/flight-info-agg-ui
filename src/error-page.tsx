import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import notFoundImgUrl from "@/assets/404.png";
import styles from "./error-page.module.scss";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;
  console.error(error);

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <img src={notFoundImgUrl}></img>
      <p>Page does not exist.</p>
      <p>
        <i>Error: {errorMessage}</i>
      </p>
    </div>
  );
}
