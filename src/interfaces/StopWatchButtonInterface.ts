import ButtonType from "../enums/ButtonType";

interface StopWatchButtonInterface {
  type: ButtonType;
  onClick: () => void;
}

export default StopWatchButtonInterface;
