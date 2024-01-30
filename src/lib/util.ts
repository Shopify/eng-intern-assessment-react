export function formatTime(timeElapsed: number): string {
  const milis: string = Math.floor((timeElapsed / 10) % 100)
    .toString()
    .padStart(2, "0");
  const seconds: string = (Math.floor(timeElapsed / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const mins: string = Math.floor(timeElapsed / (60 * 1000))
    .toString()
    .padStart(2, "0");
  return `${mins}:${seconds}.${milis}`;
}
