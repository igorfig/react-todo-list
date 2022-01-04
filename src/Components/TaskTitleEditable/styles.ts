import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    color: var(--dark-purple);
    .contentEditable-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0;
        color:var(--dark-purple);
        outline: none;
        width: 100%;
        &.checked {
            text-decoration: line-through;
            text-decoration-color: ${darken(.2, '#c4c4c4')};
            text-decoration-thickness: 2px;
            color: ${darken(.3, '#c4c4c4')};
        }
    }
        
`