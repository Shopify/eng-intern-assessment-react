// utility function to format time
export const formatTime = (time: number): string => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);
  
    return (
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2) +
      ":" +
      ("0" + milliseconds).slice(-2)
    );
};