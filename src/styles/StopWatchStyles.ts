import styled from "styled-components";

const lightBlue = "#1B2E4B";
const lighterBlue = "#253B57";
const accentColor = "#4BA8FF";

const TimerContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: rgba(255, 255, 255, 0.2); // fallback for old browsers
  background: -webkit-radial-gradient(
    circle,
    rgba(255, 255, 255, 0.15),
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.03)
  );
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const TimerHeader = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  h1 {
    color: ${accentColor};
    text-align: center;
    margin: 0;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const TimeValue = styled.div`
  font-size: 70px;
  color: #fff;
  width: 100px;
  margin: 0 10px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Colon = styled.span`
  font-size: 30px;
  color: #d3d3d3;
`;

const LapsContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  // background: ${lighterBlue};
  border-radius: 10px;
  color: #fff;
  h3 {
    margin-bottom: 10px;
    text-align: center;
  }
`;

const LapItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
`;
const TableRow = styled.tr`
  text-align: center;

  &:nth-child(even) {
    background-color: ${lightBlue};
  }
`;

const TableHeader = styled.th`
  text-align: center;
  padding: 8px;
  color: #fff;
`;

const TableCell = styled.td`
  padding: 8px;
  color: #fff;
  width: 33.33%;
`;

export {
  TimerContainer,
  TimerHeader,
  TimeDisplay,
  TimeValue,
  Colon,
  LapsContainer,
  LapItem,
  Table,
  TableRow,
  TableHeader,
  TableCell,
};
