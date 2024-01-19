import classNames from "classnames";
import React from "react";
import styles from "./Stack.module.css";

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2;
}

export default function Stack({ size = 1, className, ...props }: StackProps) {
  return <div className={classNames(className, styles.base, styles[`size-${size}`])} {...props} />;
}
