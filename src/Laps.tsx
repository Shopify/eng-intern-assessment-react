import React from 'react';


interface LapsProps {
    lapList: {
        lapTime: string;
        overallTime: string;
    }[];
}

const styles: { [key: string]: React.CSSProperties } = {
    lapList: {
        textAlign: 'center',
        marginTop: '15px'
    },
    lapListTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px'
    },
    lapListTableCells: {
        padding: '10px',
        textAlign: 'center'
    }
};

const Laps: React.FC<LapsProps> = ({ lapList }) => {
    const listLaps = lapList.map((lap, index) => (
        <tr key={index + 1}>
            <td style={styles.lapListTableCells}>{index + 1}</td>
            <td style={styles.lapListTableCells}>{lap.lapTime}</td>
            <td style={styles.lapListTableCells}>{lap.overallTime}</td>
        </tr>
    ));
    return (
        <div style={styles.lapList}>
            <h3>Laps</h3>
            <table style={styles.lapListTable}>
                <thead>
                    <tr>
                        <th style={styles.lapListTableCells}>Lap</th>
                        <th style={styles.lapListTableCells}>Lap time</th>
                        <th style={styles.lapListTableCells}>Overall time</th>
                    </tr>
                </thead>
                <tbody>
                    {listLaps}
                </tbody>
            </table>
        </div>
    )
}

export default Laps;