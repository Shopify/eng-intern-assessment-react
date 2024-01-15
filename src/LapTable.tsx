import { BlockStack, Card, DataTable, TableData, Text } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";

interface LapTableProps {
  laps: Array<number[]>;
}

const LapTable = ({ laps }: LapTableProps) => {
  //data needs time to sort, so we store it in state
  const [sortedRows, setSortedRows] = useState<TableData[][] | null>(null);

  //format the laps into a format that the DataTable component can use
  const formattedLaps = laps.map((lap, index) => {
    return [
      index,
      new Date(lap[0]).toISOString().substring(11, 23),
      new Date(lap[1]).toISOString().substring(11, 23),
    ];
  });

  //if rows have been sorted, display that, otherwise display the formatted laps
  const rows = sortedRows ? sortedRows : formattedLaps;

  const handleRowSorting = useCallback(
    (index: number, direction: "ascending" | "descending") => {
      setSortedRows(sortNumbers(formattedLaps, index, direction));
    },
    [formattedLaps]
  );

  //reset the row sorting if the laps change
  useEffect(() => {
    setSortedRows(null);
  }, [laps]);

  return (
    <BlockStack gap={"200"}>
      <Text as="h3" variant="headingXl" tone="subdued">
        Laps
      </Text>
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text"]}
          headings={["Lap Number", "Lap Duration", "Total Elapsed"]}
          rows={rows}
          sortable={[true, true, true]}
          defaultSortDirection="descending"
          onSort={handleRowSorting}
          initialSortColumnIndex={0}
        ></DataTable>
      </Card>
    </BlockStack>
  );
};

function sortNumbers(
  rows: TableData[][],
  index: number,
  direction: "ascending" | "descending"
): TableData[][] {
  return [...rows].sort((rowA, rowB) => {
    //if we are sorting by the first column, we need to sort by the number, otherwise we sort lexographically because ISO strings are correctly sorted that way
    if (index === 0) {
      const amountA = parseInt(rowA[index].toString());
      const amountB = parseInt(rowB[index].toString());
      return direction === "descending" ? amountB - amountA : amountA - amountB;
    } else {
      const amountA = rowA[index].toString();
      const amountB = rowB[index].toString();
      return direction === "descending"
        ? amountB.localeCompare(amountA)
        : amountA.localeCompare(amountB);
    }
  });
}

export default LapTable;
