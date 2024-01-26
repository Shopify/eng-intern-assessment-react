import styled from "styled-components";

type StyledButtonProps = {
  isSecond?: boolean;
};

const ButtonContainer = styled.div`
  position: relative;
`;

const ButtonsGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  transform: translateY(-50%);

  &:nth-child(2) {
    height: 50px;
    width: 50px;
    font-size: 20px;
  }
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
  margin-bottom: 5px;
  opacity: 0;
  transition: opacity 0.3s;

  ${ButtonContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  background-color: #00bcd4;
  color: white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  cursor: pointer;
  font-size: 25px;
  margin: auto;
  text-align: center;

  ${(props) =>
    props.isSecond &&
    `
    height: 100px;
    width: 100px;
    font-size: 40px;
    background-color: #007a87;
  `}

  &:focus {
    outline: none;
  }
`;

export { ButtonContainer, Tooltip, StyledButton, ButtonsGroup };
