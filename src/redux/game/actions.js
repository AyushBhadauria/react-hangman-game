import {
    SET_WRONG_LETTERS,
    SET_CORRECT_LETTERS,
    SET_SELECTED_WORD
} from './actionTypes';

export const setCorrectLetters = letters => ({
    type: SET_CORRECT_LETTERS,
    payload: { letters }
});

export const setWrongLetters = letters => ({
    type: SET_WRONG_LETTERS,
    payload: { letters }
});

export const setSeletectWord = word => ({
    type: SET_SELECTED_WORD,
    payload: { word }
});