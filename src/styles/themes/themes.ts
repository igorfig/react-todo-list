import { darken, lighten, transparentize } from "polished"

export const Dark = {
    background: '#343333',
    modal_bg: darken(0.6, '#C4C4C4'),
    text: '#FFF',
    input_bg: darken(.5, '#C4C4C4'),
    input_text: transparentize(.5, '#C4C4C4'),
    switcher_bg: '#FBD38D'
}

export const Light = {
    background: darken(.05, '#f6f7fb'),
    modal_bg: lighten(.1, '#C4C4C4'),
    text: '#4C4766',
    input_bg: transparentize(.7, '#C4C4C4'),
    input_text: darken(.5, '#C4C4C4'),
    switcher_bg: '#4C4766'
}