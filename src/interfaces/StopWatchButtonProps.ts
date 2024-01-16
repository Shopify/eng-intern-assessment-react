import ButtonType from "../enums/ButtonType";

interface StopWatchButtonProps {
  type: ButtonType;
  isRunning?: boolean;
  onClick: () => void;
}

export default StopWatchButtonProps;
