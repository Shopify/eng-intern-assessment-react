const getFormattedTime = (time: number) => {
   const hours = Math.floor(time / (3600 * 1000));
   const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000));
   const seconds = Math.floor((time % (60 * 1000)) / 1000);
   const milliseconds = Math.floor((time % 1000) / 10);

   return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
   };
}

export default getFormattedTime;
