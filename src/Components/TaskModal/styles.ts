import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: .4rem 0 .4rem .5rem;
        color: ${({ theme }) => theme.text};
    }

    .title {
        margin-left: 0;
    }

    div div { /* Checkbox */
        min-width: 1.2rem;
        min-height: 1.2rem;
        border: 2px solid ${darken(.5, '#C4C4C4')};
        border-radius: .25rem;
        margin-right: 1rem;
        cursor: pointer;
    }
`