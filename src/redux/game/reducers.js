import {
    SET_WRONG_LETTERS,
    SET_CORRECT_LETTERS,
    SET_SELECTED_WORD
} from './actionTypes';

import { updateObject } from '../../helpers/helpers';
const initialState = {
    word: null,
    correctLetters: [],
    wrongLetters: [],
};

const setSeletecWord = (state, { word }) => {
    return updateObject(state, {
        word,
    });
};


const setWrongLetters = (state, { letters }) => {
    return updateObject(state, {
        wrongLetters: letters,
    });
};

const setCorrectLetters = (state, { letters }) => {
    return updateObject(state, {
        correctLetters: letters,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WRONG_LETTERS:
            return setWrongLetters(state, action.payload);
        case SET_CORRECT_LETTERS:
            return setCorrectLetters(state, action.payload);
        case SET_SELECTED_WORD:
            return setSeletecWord(state, action.payload);
        default:
            return state;
    }
};

export default reducer;