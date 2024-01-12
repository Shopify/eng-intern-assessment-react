export interface StopWatchButtonProps {
  label: string;
  onClick: () => void;
  buttonType: "start" | "stop" | "reset" | "lap";
  disabled?: boolean;
}
