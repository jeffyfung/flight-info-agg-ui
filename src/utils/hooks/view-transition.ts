import { flushSync } from "react-dom";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

// not in use because https://github.com/remix-run/react-router/discussions/10276#discussioncomment-7248469
export const useViewTransition = () => {
  const navigate = useNavigate();

  if (!document.startViewTransition) {
    return (to: To, options?: NavigateOptions) => {
      navigate(to, options);
    };
  } else {
    return (to: To, options?: NavigateOptions) => {
      document.startViewTransition(() => {
        flushSync(() => {
          navigate(to, options);
        });
      });
    };
  }
};
