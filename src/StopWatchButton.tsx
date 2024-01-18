import React from "react";
import styles from "./StopWatchButton.module.css";

interface StopWatchButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export default function StopWatchButton(props: StopWatchButtonProps) {
  return <button className={styles.base} {...props} />;
}
