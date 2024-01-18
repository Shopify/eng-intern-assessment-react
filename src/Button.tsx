import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({ danger, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(styles.base, { [styles.danger]: danger })}
      {...props}
    />
  );
}
