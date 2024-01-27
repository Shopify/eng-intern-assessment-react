import styled from "styled-components";

const TimerContainer = styled.div`
  margin: 0 auto;
  background-color: #00bcd4;
  // background: -webkit-linear-gradient(#4bfe85, #5fd5b6);
  // background: -o-linear-gradient(#4bfe85, #5fd5b6);

  width: 70%;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TimerHeader = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;

  h1 {
    color: #fff;
    text-align: left;
    margin: 0;
  }
`;

const TimeDisplay = styled.div`
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

const Colon = styled.span`
  font-size: 30px;
  color: #d3d3d3;
`;

export {
  TimerContainer,
  TimerHeader,
  TimeDisplay,
  TimeSection,
  TimeValue,
  TimeLabel,
  Colon,
};
