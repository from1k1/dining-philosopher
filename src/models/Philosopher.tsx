import { IPhilosopher, PhilosopherStatus } from './';

export class Philosopher implements IPhilosopher {
    public name: string;
    public status: PhilosopherStatus;
    public index: number;

    constructor(name: string, status: PhilosopherStatus, index: number) {
        this.name = name;
        this.status = status;
        this.index = index;
    }

    public getName(): string {
        return this.name;
    }
    public getStatus(): PhilosopherStatus {
        return this.status;
    }

    public setStatus(status: PhilosopherStatus) {
        this.status = status;
    }
}