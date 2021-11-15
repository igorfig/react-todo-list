import { darken, lighten, transparentize } from "polished"

export const Dark = {
    background: '#262626',
    modal_bg: darken(0.6, '#C4C4C4'),
    text: '#FFF',
    input_bg: darken(.5, '#C4C4C4'),
    input_text: transparentize(.5, '#C4C4C4'),
    switcher_bg: '#879aeb',
    main_action_button: '#5d76e3',
    box_bg: lighten(.1, '#262626'),
    button_text: '#787880'
}

export const Light = {
    background: darken(.05, '#f6f7fb'),
    modal_bg: lighten(.1, '#C4C4C4'),
    text: '#4C4766',
    input_bg: transparentize(.7, '#C4C4C4'),
    input_text: darken(.5, '#C4C4C4'),
    switcher_bg: '#4C4766',
    main_action_button: '#4C4766',
    box_bg: '#e1e4ee',
    button_text: '#4C4766'
}