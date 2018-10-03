import { action } from 'typesafe-actions';
import { IFork, IPhilosopher } from '../models';

export enum actionType {
    ADD = 'ADD',
    UPDATE = 'UPDATE'
}
export const addPhilosopher = (philosopher: IPhilosopher) => {
    return action('ADD_PHILOSOPHER', philosopher);
}
export const addFork = (fork: IFork) => {
    return action('ADD_FORK', fork);
}
export const updatePhilosopher = (philosopher: IPhilosopher) => {
    return action('UPDATE_PHILOSOPHER', philosopher);
}
export const updateFork = (fork: IFork) => {
    return action('UPDATE_FORK', fork);
}