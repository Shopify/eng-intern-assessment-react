// Helper function to get top 3 laps with shortest times

export default function getWinningLaps(laps: number[]) {
  // Map each lap to its index in laps array sorted from most to least recent
  const mapLapToIndex: { [key: number]: number } = laps.reduce(
    (acc: { [key: number]: number }, lap, i) => {
      // Take lowest index (most recent) if lap time repeats
      if (!(lap in acc)) {
        acc[lap] = i;
      }
      return acc;
    },
    {}
  );
  const sortedLaps = [...new Set(laps)].sort((a, b) => a - b); // Sort laps in ascending order, remove duplicate times with Set
  const gold = mapLapToIndex[sortedLaps[0]]; // Shortest lap time
  const silver = mapLapToIndex[sortedLaps[1]]; // Second shortest lap time
  const bronze = mapLapToIndex[sortedLaps[2]]; // Third shortest lap time
  return { gold, silver, bronze };
}
