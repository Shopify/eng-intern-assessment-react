import { saveAs } from 'file-saver';
import { formatBigTime } from './timeUtils';

export const exportLapsToCSV = (laps: number[]): void => {
    // Start CSV content without the MIME type
    let csvContent = "Lap,Time\n"; // Header row

    // Add each lap time to the CSV content
    laps.forEach((lapTime, index) => {
        const lapNumber = index + 1;
        const formattedTime = formatBigTime(lapTime);
        csvContent += `${lapNumber},${formattedTime}\n`;
    });

    // Convert the CSV string to a Blob with the correct MIME type
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    // Use the file-saver library to save the Blob as a CSV file
    saveAs(blob, "laps.csv");
};
