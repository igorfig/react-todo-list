import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    color: var(--dark-purple);
    .contentEditable-title {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
        color:var(--dark-purple);
        outline: none;
        &.checked {
            text-decoration: line-through;
            text-decoration-color: var(--dark-purple);
            text-decoration-thickness: 2px;
            opacity: .7;
        }
    }
        
`