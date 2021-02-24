import {
    SAVE_NEW_GAME,
} from './actionTypes';

import { updateObject } from '../../helpers/helpers';
const initialState = {
    games: [],
};

const saveNewGame = (state, { games }) => {
    return updateObject(state, {
        games: [...games],
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_NEW_GAME:
            return saveNewGame(state, action.payload);
        default:
            return state;
    }
};

export default reducer;