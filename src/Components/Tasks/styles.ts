import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    max-height: 300px;
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

    .row {
        position: relative;
        &.checked {
            opacity: .6;
            &::after {
                content: ' ';
                position: absolute;
                top: 50%;
                left: 0;
                height: 2px;
                width: 100%;
                background: var(--dark-purple);
                animation: strike .2s linear 1 forwards;
            }

            span {
                margin-left: 10px;
            }
        }
    
        @keyframes strike{
            from  { 
                width : 0;   
            }
            to { 
                width: 100%;
            }
        }
    }              


`