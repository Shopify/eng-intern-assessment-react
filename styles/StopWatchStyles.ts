import styled from "styled-components";

const TimerContainer = styled.div`
  margin: 0 auto;
  background-color: #00bcd4;
  width: 70%;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TimerHeader = styled.div`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const TimeDisplay = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  padding: 40px 10px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TimeSection = styled.div`
  text-align: center;
  font-size: 20px;
`;

const TimeValue = styled.div`
  font-size: 70px;
  font-weight: 200;
  color: #333;
  width: 30%;
  text-align: center;
`;

const TimeLabel = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
`;

export {
  TimerContainer,
  TimerHeader,
  TimeDisplay,
  TimeSection,
  TimeValue,
  TimeLabel,
};
