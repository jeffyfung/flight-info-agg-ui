import styles from "./form-block.module.scss";

interface FormBlockProps {
  title: string;
  titleIcon?: JSX.Element;
  subtitle?: string;
  schema: FormSchema[];
}

interface FormSchema {
  fieldName?: string;
  element: JSX.Element;
}

export const FormBlock: React.FC<FormBlockProps> = ({ title, titleIcon, subtitle, schema }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {titleIcon && <span className={styles.titleIcon}>{titleIcon}</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
      <div className={styles.contentContainer}>
        {schema.map((field, idx) => (
          <div key={idx} className={styles.fieldContainer}>
            {field.fieldName && <h4 className={styles.fieldName}>{field.fieldName}</h4>}
            <div className={styles.fieldElement}>{field.element}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
