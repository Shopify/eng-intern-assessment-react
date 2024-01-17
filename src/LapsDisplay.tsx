import React from 'react';
import styled from 'styled-components';

type LapsDisplayProps = {
  laps: String[];
};

const LapsDisplay: React.FC<LapsDisplayProps> = ({ laps }) => {
  return (
    <StyledLapsDisplay>
      <LapList>
        {laps.map((lap, index) => (
          <LapItem key={index}>
            <LapIndex>{`Lap #${index + 1}`}</LapIndex>
            <LapTime data-testid="lap-time">{lap}</LapTime>
          </LapItem>
        ))}
      </LapList>
    </StyledLapsDisplay>
  );
};

const StyledLapsDisplay = styled.div`
  padding: 10px;
  margin-top: 20px;
  width: 100%;
`;

const LapList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const LapItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 5px;
`;

const LapIndex = styled.div`
  font-weight: 400;
  font-size: 1rem;
`

const LapTime = styled.div`
  font-weight: 500;
  font-size: 1rem;
`

export default LapsDisplay;
