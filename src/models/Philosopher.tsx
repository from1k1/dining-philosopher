import { IPhilosopher, PhilosopherStatus } from './';

export class Philosopher implements IPhilosopher {
    public name: string;
    public status: PhilosopherStatus;

    constructor(name: string, status: PhilosopherStatus) {
        this.name = name;
        this.status = status;
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