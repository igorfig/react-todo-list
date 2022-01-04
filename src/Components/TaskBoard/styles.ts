import styled from "styled-components";

export const Container = styled.section`
  padding-bottom: 80px;
  margin: 1rem 0;
  display: grid;
  justify-items: center;
  gap: 2rem;
  .without-tasks-message {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
      margin-bottom: 10px;
      font-size: 1.6rem;
      color: var(--dark-purple);
      font-weight: 300;
      opacity: 0.8;
    }

    span + span {
      margin-bottom: 30px;
    }
  }

  .without-pending-tasks-message, .without-done-tasks-message {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
      text-align: center;
      color: var(--dark-purple);
      font-size: 1.6rem;
      font-weight: 300;
      opacity: .9;
      margin-bottom: 30px;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem auto;
    padding: 0.8rem 0.8rem 80px 0.8rem;
  }
  .newTask {
    user-select: none;
    position: fixed;
    z-index: 3;
    bottom: 3rem;
    right: 2rem;
    background: var(--dark-purple);
    color: #fff;
    outline: none;
    border: none;
    width: 150px;
    height: 50px;
    border-radius: 100px;
    font-size: 1rem;
    padding: 0.4rem;

    box-shadow: rgba(0, 0, 0, 0.48) 0px 3px 8px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .top-bar {
    animation: show .3s 1 ease-in;

    @keyframes show {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
    
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e1e4ee;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 80px;
    padding: 0 20px;

    button {
      background: transparent;
      outline: none;
      border: none;
    }
    .close-btn {
      position: absolute;
      left: 20px;
    }
    span {
      font-size: 1.2rem;
      color: var(--dark-purple);
    }

    .multi-select {
      position: absolute;
      right: 20px;
    }
  }

  .bottom-bar {
    [disabled] {
      opacity: .6;
    }
    animation: show .3s 1 ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 999;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background: #e1e4ee;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    button {
      display: flex;
      flex-direction: column;
      background: transparent;
      border: none;
      outline: none;
      align-items: center;
      span {
        margin-top: .2rem;
        color: var(--dark-purple);
        font-size: 1rem;
      }
    }
  }

`;
