import { darken } from "polished";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 1rem 0 0.4rem 0.5rem;
    color: var(--dark-purple);
    transition: transform .2s;
    .contentEditable-container {
        outline: none;
        font-size: 1.125rem;
        color: var(--dark-purple);
        width: 100%;
        box-decoration-break: clone;
        &.checked {
            text-decoration: line-through;
            text-decoration-color: ${darken(.2, '#c4c4c4')};
            text-decoration-thickness: 1px;
            color:${darken(.3, '#c4c4c4')}
        }
    }
`;
