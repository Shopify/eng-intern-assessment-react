// types.ts
export enum ButtonStatus {
  Play = "play",
  Pause = "pause",
}

export interface StatusChangeHandler {
  (status: ButtonStatus): void;
}
