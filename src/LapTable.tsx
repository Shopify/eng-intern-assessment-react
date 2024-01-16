import React, { useEffect, useState } from "react";
import { Button, DataTable } from "@shopify/polaris";
import CsvDownloader from "react-csv-downloader"; // Import the CsvDownloader component

const LapDataTable = ({ laps }: { laps: Array<any> }) => {
    const [sortedLaps, setSortedLaps] = useState([]);

    // I noticed that it wouldn't render laps initially until I sorted, so i added the useeffect
    useEffect(() => {
        setSortedLaps(sortLaps(laps, "lapTime", true));
    }, [laps]);

    const handleSort = (column: string, ascending: boolean) => {
        setSortedLaps(sortLaps(laps, column, ascending));
    };

    const sortLaps = (laps: any[], column: string, ascending: boolean) => {
        return [...laps].sort((a, b) => {
            const valueA = a[column];
            const valueB = b[column];
            return ascending ? valueA - valueB : valueB - valueA;
        });
    };

    const formatTime = (time: string | number | Date) =>
        new Date(time).toISOString().substring(14, 22);

    // Convert laps data for CSV
    const csvData = laps.map((lap) => ({
        lapTime: formatTime(lap.lapTime),
        diff: formatTime(lap.diff),
    }));

    // Define columns for CSV
    const columns = [
        {
            id: "lapTime",
            displayName: "Lap Time",
        },
        {
            id: "diff",
            displayName: "Time Difference",
        },
    ];

    return (
        <>
            <CsvDownloader filename="laps" columns={columns} datas={csvData}>
                <Button variant="primary">Download as CSV</Button>
            </CsvDownloader>
            <DataTable
                columnContentTypes={["text", "text"]}
                headings={["Lap Time", "Time Difference"]}
                rows={sortedLaps.map((lap) => [
                    formatTime(lap.lapTime),
                    formatTime(lap.diff),
                ])}
                sortable={[true, true]}
                onSort={(index, direction) =>
                    handleSort(
                        index === 0 ? "lapTime" : "diff",
                        direction === "ascending"
                    )
                }
            />{" "}
        </>
    );
};

export default LapDataTable;
