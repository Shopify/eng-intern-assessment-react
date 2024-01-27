import styled from "styled-components";

const darkBlue = "#0D1F2D";
const lightBlue = "#1B2E4B";
const lighterBlue = "#253B57";
const accentColor = "#4BA8FF";

const TimerContainer = styled.div`
  margin: 0 auto;
  background: ${darkBlue};
  width: 60%;
  border-radius: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
  background-color: ${lightBlue};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 110%;
  transform: translateX(-5%);
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
