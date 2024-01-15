import React from "react";

export default function Button({
  onClick,
  disabled,
  children,
  style,
}: {
  onClick: () => void;
  disabled: boolean;
  children: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        marginRight: "2px",
        padding: "10px",
        borderRadius: "5px",
        color: "white",
        border: "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
