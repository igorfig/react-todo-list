import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
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
`
