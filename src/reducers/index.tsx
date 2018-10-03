import { combineReducers } from 'redux';

import * as models from './../models';

export interface ITableState {
    readonly philosophers: models.IPhilosopher[];
    readonly forks: models.IFork[];
};

export interface ITableAction {
    type: string;
    payload: any;
}

export default combineReducers<ITableState, ITableAction>({    
    forks: (state = [], action) => {
        switch (action.type) {
            case 'ADD_FORK':
                return [
                    ...state,
                    action.payload
                ];
            case 'UPDATE_FORK':
                return [
                    ...state,
                    action.payload
                ];
            default:
                return [];
        }
    },
    philosophers: (state = [], action) => {
        switch (action.type) {
            case 'ADD_PHILOSOPHER':
                return [
                    ...state,
                    action.payload
                ];
            case 'UPDATE_PHILOSOPHER':
                return [
                    ...state,
                    action.payload
                ];
            default:
                return [];
        }
    }
});