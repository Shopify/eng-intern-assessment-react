import styled from "styled-components";

type StyledButtonProps = {
  isSecond?: boolean;
};

/**
 * ButtonContainer
 * A container for individual stopwatch buttons, positioning them relatively.
 */
const ButtonContainer = styled.div`
  position: relative;
`;

/**
 * ButtonsGroup
 * A flex container grouping all stopwatch buttons, aligning them evenly.
 */
const ButtonsGroup = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin: 5% auto;
`;

/**
 * Tooltip
 * A hidden tooltip for buttons, shown on hover with a smooth transition.
 */
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

/**
 * StyledButton
 * A styled button for the stopwatch, with optional secondary styling.
 */
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
