import styled from 'styled-components';

export const Container = styled.section`
    .btn-trash {
        display: flex;
        justify-content:center;
        button {
        display: flex;
        align-items: center;
        flex-direction: column;
        background: transparent;
        outline: none;
        border: none;
        position: fixed;
        bottom: 1rem;
        transition: filter .2s;

        img {
            margin-bottom: .5rem;
        }

        span {
            color: ${({ theme }) => theme.text};
            font-size: .8rem;
        }
        
        &:hover {
            filter: brightness(.7)
        }
    }
    }

    .newTask {
        position: fixed;
        z-index: 3;
        bottom: 2rem;
        right: 2rem;
        background: var(--light-green);
        color: var(--green);
        outline: none;
        border: none;
        width: 150px;
        height: 50px;
        border-radius: 100px;
        font-size: 1rem;
        padding: .4rem;

        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    
        transition: filter .2s;
        
        &:hover {
            filter: brightness(.8);
        }
    }

   
`