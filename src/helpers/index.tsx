export enum AsyncStatus {
    SUCCESS, ERROR, LOADING
}
export interface IAsyncSuccess<T> {
    status: AsyncStatus.SUCCESS,
    data: T,
}
export interface IAsyncError {
    status: AsyncStatus.ERROR
}

export interface IAsyncLoading {
    status: AsyncStatus.LOADING
}
export type IAsync<T> = IAsyncLoading | IAsyncError | IAsyncSuccess<T>