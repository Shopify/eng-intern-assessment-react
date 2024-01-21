import { saveAs } from 'file-saver';
import { formatBigTime } from './timeUtils';

/**
 * Exports the given array of lap times to a CSV file.
 * 
 * @param {number[]} laps - An array of lap times in milliseconds.
 */
export const exportLapsToCSV = (laps: number[]): void => {
    // Start CSV content with headers
    // "Lap" column for lap number, "Time" column for formatted lap time
    let csvContent = "Lap,Time\n"; // Header row

    // Iterate over each lap time
    laps.forEach((lapTime, index) => {
        const lapNumber = index + 1; // Lap number (1-indexed)
        const formattedTime = formatBigTime(lapTime); // Format lap time for display

        // Append each lap as a new row in the CSV string
        // Format: "lap number,formatted lap time"
        csvContent += `${lapNumber},${formattedTime}\n`;
    });

    // Convert the CSV string to a Blob with the correct MIME type
    // This facilitates the correct handling of the CSV file format
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Use the file-saver library to prompt the user to save the Blob as a CSV file
    // Filename "laps.csv" is used for the saved file
    saveAs(blob, "laps.csv");
};
