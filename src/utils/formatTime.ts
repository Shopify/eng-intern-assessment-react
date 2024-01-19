export const formatTime = (time: number) => {
   let milliseconds = Math.floor((time % 1000) / 10); // Calculate milliseconds
   let seconds = Math.floor((time / 1000) % 60); // Calculate seconds
   let minutes = Math.floor((time / (1000 * 60)) % 60); // Calculate minutes
   let hours = Math.floor((time / (1000 * 60 * 60)) % 24); // Calculate hours (mod 24 for a standard day cycle, adjust if necessary)

   // Convert each part to a string and pad with zeros on the left to ensure 2 digits
   const msStr = String(milliseconds).padStart(2, "0");
   const secondsStr = String(seconds).padStart(2, "0");
   const minutesStr = String(minutes).padStart(2, "0");
   const hoursStr = String(hours).padStart(2, "0");

   return `${hoursStr}:${minutesStr}:${secondsStr}:${msStr}`;
};
