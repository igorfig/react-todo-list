import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  max-height: 300px; 
  padding: 1.8rem;
  border-radius: 1.2rem;
  background: ${transparentize(0.9, "#C4C4C4")};
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: fade-in .5s ease 1;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(100%)
    }

    to {
      opacity: 1;
    }
  }

  .task-actions {
    .dots {
      background: none;
      outline: none;
      border: none;
      top: 10px;
      position: absolute;
      right: 0.8rem;
    }

    ul {
      transform: scale(0);
      margin: 0;
      padding: 0;
      list-style: none;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      position: absolute;
      top: 2rem;
      right: 2.5rem;
      background: #e1e4ee;
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;
      z-index: 999;

      transition: transform 0.18s ease-in;
      &.active {
        transform: scale(1);
      }
      & li {
        position: relative;
        padding: 5px;
        width: 160px;
        height: 50px;
        padding: 0.8rem 0 0 1rem;

        & a {
          color: var(--dark-purple);
          text-decoration: none;
          font-size: 1.1rem;
          display: flex;
          opacity: .5;
          align-items: center;

          transition: opacity  0.2s ease;

          & img {
              margin-right: .6rem;
          }
          &:hover {
            opacity: 1;
          }
        }

        & + li {
          border-top: 1px solid ${transparentize(0.9, '#4C4766')};
        }
      }
    }
  }

  @media (min-width: 768px) {
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-5%);
    }
  }
`;
