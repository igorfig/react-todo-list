import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 1rem 0 0.6rem 0.5rem;
    color: var(--dark-purple);
    
    .contentEditable-container {
        outline: none;
        font-size: 1.125rem;
        color: var(--dark-purple);
        width: 100%;
        &.checked {
            text-decoration: line-through;
            text-decoration-color: var(--dark-purple);
            text-decoration-thickness: 1px;
            opacity: .7;
        }
    }
`;
