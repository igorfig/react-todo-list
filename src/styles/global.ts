import { darken, lighten, transparentize } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --green:  #fff;
        --dark-purple: #4C4766;
        --modal-background: ${lighten(0.1, "#C4C4C4")};
        --input-background: ${transparentize(0.7, "#C4C4C4")};
        --toastify-color-warning: #4C4766;
    }

    *  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }

        @media(max-width: 720px) {
            font-size: 87,5%;
        }
    }

    * html ul li { float: left; }
    * html ul li a { height: 1%; }

    body {
        background: ${darken(0.05, "#f6f7fb")};
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

    .delete-modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #e1e4ee;
        width: 448px;
        @media(max-width: 500px) {
            width: 350px;
        }
        transform: scale(0);
        border-radius: 1rem;
        padding: 1rem;
        color: var(--dark-purple);
        transition: all .2s ease;
        animation: fade .3s ease 1;
        &.active {
            @keyframes fade {
            from {
                opacity: 0;
                transform: translateY(100%)
            }

            to {
                opacity: 1;
            }
        }

        }

        .trash {
            margin: 1rem 0;
            img {
                width: 48px;
                height: 48px;
            }
        }

        .header {
            display: flex;
            flex-direction: column;
            max-width: 320px;
            margin: .8rem 0 1.4rem 0;
            h2 {
                font-size: 32px;
                margin-bottom: 15px
            }
            span + span {
                font-size: 1rem;
                margin-top: .4rem;
            }
        }

        div {
            display: flex;
            align-items: center;
            margin: 1rem;
            button {
                height: 50px;
                border-radius: 5px;
                font-size: 1rem;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

                transition: filter .2s ease;
                &:hover {
                    filter: brightness(.8);
                }
            }

            button.main_action {
                width: 150px;
                margin-left: 1rem;
                background: #4C4766;
                color: #fff;
                border: none;
                outline: transparent;
            }

            button {
                color: var(--dark-purple);
                padding: .3rem;
                width: 150px;
                background:  #e1e4ee;
                color: var(--dark-purple);
                
                border: none;
                outline: transparent;
            }
        }

    }

    .react-modal-overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        z-index: 1000;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .react-modal-content {
        width: 100vw;
        border: none;
        position: absolute;
        overflow-y: auto;
        outline: none; 
        bottom: 0; 
        padding: 2rem;
        max-height: 400px;
        background: var(--modal-background);
        border-radius: 2rem 2rem 0 0;
    }
    
    .ReactModal__Overlay {
        opacity: 0;
        transition: opacity .2s ease-in-out;

        .delete-modal-content {
            transition: transform .2s ease-in-out;
            transform: scale(0);
        }
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
        transform:scale(1);

        .delete-modal-content {
            transform: scale(1);
        }
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;

        .delete-modal-content {
            transform: scale(0);
        }
    }

    .checkbox {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        transition: filter 0.2s;
        @media(min-width: 768px) {
            &:hover {
                filter: brightness(0.8);
            }

        }
        animation: fade .2s 1 ease;

        @keyframes fade {
            from {
                opacity: 0;
            }

            to {
                opacity: 1
            }
        }
        div {
            margin-right: 10px;
            width: 1.3rem;
            height: 1.3rem;
            border: 2px solid ${darken(.08, '#c4c4c4')};
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
                @media(max-width: 500px) {
                    font-size: .6rem;
                } 
            }
        }
    }

    .Toastify__toast {
            border-radius: .5rem;
            margin: 0 .25rem;
    }
 `;
