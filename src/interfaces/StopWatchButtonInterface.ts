import ButtonType from "../enums/ButtonType";

interface StopWatchButtonInterface {
  type: ButtonType;
  isRunning?: boolean;
  onClick: () => void;
}

export default StopWatchButtonInterface;
