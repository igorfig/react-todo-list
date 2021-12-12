import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 650px;
  width: 100%;
  cursor: pointer;
  max-height: 300px; 
  padding: 1.8rem;
  border-radius: 1.2rem;
  background: ${transparentize(0.9, "#C4C4C4")};
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: fade-in .5s ease 1;
  overflow: visible;
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(100%)
    }

    to {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5%);
    }
  }

  .delete {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    transition: filter .2s;
    &:hover {
        filter: brightness(.7);
    }
    button {
      outline: none;
      border: none;
      background: transparent;
      color: var(--dark-purple);
      display: flex;
      align-items: center;
      img {
        height: 24px;
        width: 24px;
      }

    }
  }
`;
