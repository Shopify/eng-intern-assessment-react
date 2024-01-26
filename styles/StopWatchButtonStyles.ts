import styled from "styled-components";

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  opacity: 0;
  transition: opacity 0.3s;

  ${ButtonContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledButton = styled.button`
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 8px 12px;
  margin: 4px 2px;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export { ButtonContainer, Tooltip, StyledButton };
