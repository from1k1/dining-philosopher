import { ForkStatus, IFork } from './';

export class Fork implements IFork {
    public index: number;
    public status: ForkStatus;

    constructor(index: number, status: ForkStatus) {
        this.index = index;
        this.status = status;
    }

    public getindex(): number {
        return this.index;
    }
    public getStatus(): ForkStatus {
        return this.status;
    }

    public setStatus(status: ForkStatus) {
        this.status = status;
    }
}