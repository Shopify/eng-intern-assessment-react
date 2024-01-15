import React from "react";
import styles from "./StopWatchButton.module.css";

interface StopWatchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({
  children,
  onClick,
  disabled = false,
}: StopWatchButtonProps) {
  return (
    <button
      className={styles.stopWatchButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
