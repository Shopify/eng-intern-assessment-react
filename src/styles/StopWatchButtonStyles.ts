import styled from "styled-components";

type StyledButtonProps = {
  isSecond?: boolean;
};

const ButtonContainer = styled.div`
  position: relative;
`;

const ButtonsGroup = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin: 5% auto;

  &:nth-child(2) {
    height: 50px;
    width: 50px;
    font-size: 20px;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  color: #eee;
  width: 100%;
  text-align: center;
  text-align: center;
  position: absolute;
  z-index: 1;
  margin: 15px 0;
  opacity: 0;
  transition: opacity 0.3s;

  ${ButtonContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 30px;
  margin: auto;
  text-align: center;
  text-decoration: none;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
  height: 100%;
  width: 100%;

  ${(props) =>
    props.isSecond &&
    `

    font-size: 50px;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

export { ButtonContainer, Tooltip, StyledButton, ButtonsGroup };
