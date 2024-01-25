// import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import styles from "./input.module.scss";
import clsx from "clsx";

export interface InputProps {
  // label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  validation?: Record<
    string,
    {
      value: boolean;
      message: string;
    }
  >;
}

export const Input: React.FC<InputProps> = ({ type, id, placeholder, defaultValue, disabled }) => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useFormContext();

  // const isInvalid = errors[label];

  return (
    <div className={styles.container}>
      <div className={styles.inputHeader}>
        {/* <label htmlFor={id}>{label}</label> */}
        {/* <AnimatePresence mode="wait" initial={false}>
          {isInvalid && ( //
            <InputError message={errors[label]!.message as string} />
          )}
        </AnimatePresence> */}
      </div>
      <input
        className={clsx(styles.input, { [styles.disabled]: disabled })}
        id={id} //
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        // {...register(name, validation ?? {})}
      />
    </div>
  );
};

const InputError = ({ message }: { message: string }) => {
  const framerError = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
  };

  return (
    <motion.div className={styles.errorMsg} {...framerError}>
      <MdError />
      {message}
    </motion.div>
  );
};
