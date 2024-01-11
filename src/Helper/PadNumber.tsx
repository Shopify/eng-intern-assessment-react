// Created a helper function to allow for reusability
export default function PadNumber(num: number, pad: number) {
  return Math.floor(num).toString().padStart(pad, "0");
}
