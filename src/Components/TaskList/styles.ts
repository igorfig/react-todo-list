import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 650px;
  
  @media(max-width: 500px) {
    min-width: 370px;
  }
  max-width: 650px;
  width: 100%;
  cursor: pointer;
  padding: 1.8rem;
  border-radius: 1.2rem;
  background: ${transparentize(0.9, "#C4C4C4")};
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
    
    @media (min-width: 768px) {
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-5%);
      }
    }
  }
  
  transition: backdrop-filter .3s;
  &.isSelected {
    backdrop-filter: brightness(95%);
  }
  .actions {
    display: flex;
    align-items: center;
    position: absolute;
    top: 1.8rem;
    right: 1rem;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.7);
    }
    button {
      outline: none;
      border: none;
      background: transparent;
      color: var(--dark-purple);
      display: flex;
      align-items: center;
      img {
        height: 22px;
        width: 22px;
        opacity: .8;
        &.show-more {
          transform: rotate(180deg);
          transition: transform .3s;
          &.active {
            transform: rotate(360deg);
            }
          }

        }
      }
      
    }
  }
`;
