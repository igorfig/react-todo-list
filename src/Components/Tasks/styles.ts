import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    padding: 1rem 1.2rem;
    border-radius: .5rem;
    background: ${transparentize(.9, '#C4C4C4')};
    cursor: pointer;
    position: relative;
    word-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    @media(min-width: 768px) {
        transition: transform .2s;

        &:hover {
            transform: translateY(-5%);
        }
    } 

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
        border: 2px solid var(--light-box-bg);
        border-radius: .25rem;
        margin-right: 1rem;
        cursor: pointer;
    }
`