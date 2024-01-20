export default function formatTime(time_value: number) {
  return [
    ("0" + Math.floor((time_value / 60000) % 60)).slice(-2),
    ("0" + Math.floor((time_value / 1000) % 60)).slice(-2),
    ("0" + ((time_value / 10) % 1000)).slice(-2),
  ];
}
