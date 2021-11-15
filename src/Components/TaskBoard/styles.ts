import styled from 'styled-components';

export const Container = styled.section`
    margin: 3rem 0 1rem 2rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;

    @media(max-width: 500px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin: 2rem auto;
        padding: .8rem;
    }
    .newTask {
        position: fixed;
        z-index: 3;
        bottom: 2rem;
        right: 2rem;
        background: var(--dark-purple);
        color: #fff;
        outline: none;
        border: none;
        width: 150px;
        height: 50px;
        border-radius: 100px;
        font-size: 1rem;
        padding: .4rem;

        box-shadow: rgba(0, 0, 0, 0.48) 0px 3px 8px;
    
        transition: filter .2s;
        
        &:hover {
            filter: brightness(.8);
        }
    }

   
`