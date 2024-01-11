// Created a helper function to allow for reusability
export default function padNumber(num: number, pad: number) {
  return Math.floor(num).toString().padStart(pad, "0");
}
