export * from './Fork';
export * from './Philosopher';

export enum PhilosopherStatus {
    EATING, THINKING
}
export interface IPhilosopher {
    name: string,
    status: PhilosopherStatus,
    index: number
}
export enum ForkStatus {
    FREE, IN_USE
}
export interface IFork {
    index: number,
    status: ForkStatus
}
