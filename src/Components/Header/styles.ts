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
      display: flex;
      justify-content: center;
    }
  }

  [disabled] {
    opacity: .6;
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
    margin: 3rem 0;
    transition: filter 1s;
    input {
      background: none;
      outline: none;
      border: none;
      margin-left: 1rem;
      font-size: 1.2rem;
      color: var(--dark-purple);
      width: 100%;
      height: 48px;
      &::placeholder {
        color: var(--dark-purple);
        opacity: .7;
      }
    }
    
  }


  div {
    margin-bottom: 2rem;
    button {
      background: transparent;
      border: none;
      opacity: .6;
      &.active {
        transition: opacity .8s;
        border-bottom: 2px solid var(--dark-purple);
        opacity: 1;
      }
      outline: none;
      
      & + button {
        margin-left: 10px;
      }
    }
  }
`;
