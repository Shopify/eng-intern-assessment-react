type FormattedTime = {
  milliseconds: string;
  seconds: string;
  minutes: string;
  hours: string;
};

export function formatTime(milliseconds: number): FormattedTime {
  milliseconds = Math.max(0, milliseconds);

  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const remainingMinutes = milliseconds % (60 * 60 * 1000);
  const minutes = Math.floor(remainingMinutes / (60 * 1000));
  const remainingSeconds = remainingMinutes % (60 * 1000);
  const seconds = Math.floor(remainingSeconds / 1000);
  const remainingMilliseconds = remainingSeconds % 1000;

  const padWithZero = (value: number, padding: number = 2): string => {
    return value.toString().padStart(padding, "0");
  };

  return {
    hours: padWithZero(hours),
    minutes: padWithZero(minutes),
    seconds: padWithZero(seconds),
    milliseconds: padWithZero(remainingMilliseconds, 3),
  };
}

type FormattedTimeString = `${string}:${string}:${string}:${string}`;

export function formattedTimeToString(formattedTime: FormattedTime): FormattedTimeString {
  return `${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}:${formattedTime.milliseconds}`;
}
