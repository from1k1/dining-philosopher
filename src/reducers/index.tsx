import { combineReducers } from 'redux';

import * as models from './../models';

export interface ITableState {
    philosophers: models.IPhilosopher[];
    forks: models.IFork[];
};

export interface ITableAction {
    type: string;
    payload: any;
}

export const rootReducer =  combineReducers<ITableState, ITableAction>({    
    forks: (state = [], action) => {
        switch (action.type) {
            case 'ADD_FORK':
                return {
                    ...state,
                    ...action.payload
                };
            case 'UPDATE_FORK':
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    },
    philosophers: (state = [], action) => {
        console.log('REDUCER PHILOSOPHERS');
        console.log(state);
        switch (action.type) {
            case 'ADD_PHILOSOPHER':
                return {
                    ...state,
                    ...action.payload
                };
            case 'UPDATE_PHILOSOPHER':{
                state[action.payload.index] = action.payload;
                return {
                    ...state
                }
            }
            default:
                return state;
        }
    }
});