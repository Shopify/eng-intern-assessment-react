const getFormattedTime = (time: number) => {
   const hours = Math.floor(time / 360000);
   const minutes = Math.floor((time % 360000) / 6000);
   const seconds = Math.floor((time % 6000) / 100);
   const milliseconds = time % 100;

   const formattedHours = hours.toString().padStart(2, "0");
   const formattedMinutes = minutes.toString().padStart(2, "0");
   const formattedSeconds = seconds.toString().padStart(2, "0");
   const formattedMilliseconds = milliseconds.toString().padStart(2, "0");

   if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
   }
   return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

const getFormattedTimeObject = (time: number) => {
   const hours = Math.floor(time / 360000);
   const minutes = Math.floor((time % 360000) / 6000);
   const seconds = Math.floor((time % 6000) / 100);
   const milliseconds = time % 100;

   const formattedHours = hours.toString().padStart(2, "0");
   const formattedMinutes = minutes.toString().padStart(2, "0");
   const formattedSeconds = seconds.toString().padStart(2, "0");
   const formattedMilliseconds = milliseconds.toString().padStart(2, "0");

   return {
      hours: formattedHours,
      minutes: formattedMinutes,
      seconds: formattedSeconds,
      milliseconds: formattedMilliseconds,
   };
};

export { getFormattedTime, getFormattedTimeObject };
