import {
    SAVE_NEW_GAME,
} from './actionTypes';

export const saveGame = games => ({
    type: SAVE_NEW_GAME,
    payload: { games }
});
