import styled from 'styled-components';

export const Container = styled.header`
    max-width: 1110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 1.4rem;
    color: ${({theme}) => theme.text};

    div {
        display: flex;
        width: 100%;
        align-items: center;

        div {
            display: flex;
            align-items: center;

            h1 {
                margin-left: .6rem;
                font-size: 2rem;
                font-weight: 500;
            }
        }

        button {
            background: ${({ theme }) => theme.switcher_bg};
            border: 0;
            outline: none;
            width: 50px;
            height: 45px;
            border-radius: .25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: filter .2s;
            &:hover {
                filter: brightness(.9);
            }
            img {
                transition: transform 1s;
            }
            &:active {
                img {
                    transform: scale(2);
                }
            }
        }

        & + div {
            margin-top: 5rem;
            display: flex;
            justify-content: center;
        }
    }

    .input-container {
        display: flex;
        width: 100%;
        max-width: 480px;
        height:48px;
        align-items: center;
        background: ${({ theme }) => theme.input_bg };
        border-radius: 15px;
        padding: 1rem;
        transition: filter 1s;
        input {
            background: none;
            outline: none;
            border: none;
            margin-left: 1rem;
            font-size: 1.2rem;
            color: ${({ theme }) => theme.input_text };
            width: 100%;
            height: 48px;
        }
    }
`