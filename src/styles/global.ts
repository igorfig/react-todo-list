import { createGlobalStyle } from "styled-components";

interface GlobalStylesProps {
  theme: {
    background: string;
    modal_bg: string;
    text: string;
    input_bg: string;
    input_text: string;
  };
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
    :root {
        --green:  #fff;
        --light-green: #4C4766;
        /* Dark theme */
        --background: #343333;
        --light-box-bg: #C4C4C4;
        /* Light Theme */
        --background-light: #F6F7FB;
        --dark-purple: #4C4766;
    }

    *  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media(max-width: 720px) {
            font-size: 87,5%;
        }
    }

    body {
        background: ${(props) => props.theme.background};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;    
    }

    .react-modal-overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        z-index: 1000;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }

    .react-modal-content {
        width: 100vw;
        border-radius: 1rem 1rem 0 0;
        background: ${({ theme }) => theme.modal_bg};
        max-height: 400px;
        border: none;
        position: absolute;
        overflow: auto;
        bottom: 0;
        padding: 1.4rem;
        color: #C4C4C4;
        outline: none;
    }

    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity 100ms ease-in-out;
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }

    .checkbox {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.8);
        }
        div {
            margin-right: 10px;
            width: 1.25rem;
            height: 1.25rem;
            border: 2px solid #c4c4c4;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: background 0.15s, border-color 0.15s;

            &.checked {
                background: var(--dark-purple);
                border-color: var(--dark-purple);
                &:after {
                    transform: scale(1);
                }
        }

            &:after {
                content: "✔";
                color: #fff;
                transform: scale(0);
                transition: transform 0.15s;
            }
        }
  }

 `;
