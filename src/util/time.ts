export const durationToString = (duration: number) => {
  const milliseconds = Math.floor(duration % 1000)
    .toFixed(0)
    .padStart(3, "0")
  const seconds = Math.floor((duration / 1000) % 60)
    .toFixed(0)
    .padStart(2, "0")
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
    .toFixed(0)
    .padStart(2, "0")
  const hours = Math.floor(duration / (1000 * 60 * 60))
    .toFixed(0)
    .padStart(2, "0")
  return `${hours}:${minutes}:${seconds}.${milliseconds}`
}
