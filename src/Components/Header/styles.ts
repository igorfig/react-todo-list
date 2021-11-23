import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.header`
  max-width: 1110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 1.4rem;
  color: var(--dark-purple);

  div {
    display: flex;
    width: 100%;
    align-items: center;

    h1 {
      font-size: 2.4rem;
      font-weight: 300;
      margin-left: 1rem;
    }

    & + div {
      margin-top: 5rem;
      display: flex;
      justify-content: center;
    }
  }

  .input-container {
    display: flex;
    width: 100%;
    max-width: 480px;
    height: 48px;
    align-items: center;
    background: #e1e4ee;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 15px;
    padding: 1rem;
    transition: filter 1s;
    input {
      background: none;
      outline: none;
      border: none;
      margin-left: 1rem;
      font-size: 1.2rem;
      color: ${darken(.5, '#C4C4C4')};
      width: 100%;
      height: 48px;
    }
  }

  .days-of-week {
    max-width: 500px;
    align-self: center;
    min-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    & button {
      color: var(--dark-purple);
      background: transparent;
      border-radius: 0;
      font-size: 1.2rem;
      width: 9%;
      border-bottom: 3px solid transparent;
      opacity: .7;
      &.selected {
        border-bottom-color: var(--dark-purple);
        padding: 5px;
        font-weight: 500;
        opacity: 1;
      }
    }

    & button + button {
      margin-left: 1.6rem;
    }
  }
`;
