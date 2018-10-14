import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { AsyncStatus, IAsync } from '../../helpers';
import { Fork, ForkStatus, IFork, IPhilosopher, Philosopher, PhilosopherStatus } from '../../models';
import './index.css';
/*interface IAsyncHocProps<T> {
    Success: IAsyncSuccess<T>,
    Error: IAsyncError,
    Loading: IAsyncLoading,
}*/
export interface IState {
    forks: Fork[];
    philosophers: Philosopher[];
    status: AsyncStatus;
}
export interface IProps<F extends IFork,
    P extends IPhilosopher,
    I extends IAsync<any>> {
    forks: F[];
    philosophers: P[];
    onAddFork?: any;
    onAddPhilosopher?: any;
    onUpdatePhilosopher?: any;
    onUpdateFork?: any;
    status?: I;
}

class Table<F extends Fork,
    P extends Philosopher,
    I extends IAsync<any>>
    extends React.Component<IProps<F, P, I>, IState> {
    public constructor(props: IProps<F, P, I>) {
        super(props);
        for (let i = 0; i < 5; i++) {
            this.props.onAddFork(new Fork(i + 1, ForkStatus.FREE));
            this.props.onAddPhilosopher(new Philosopher("Philosopher " + (i + 1), PhilosopherStatus.THINKING));
        }
        this.setState({
            status: AsyncStatus.LOADING
        });
        this.onClickTest = this.onClickTest.bind(this);
    }

    public onClickTest() {
        // actions.addFork(new Fork(5, ForkStatus.FREE));
        console.log(this.props);
        this.props.onAddFork(new Fork(5, ForkStatus.FREE));
    }

    public updateStore = async (fetchFunction: any) => {
        try {
            this.successUpdateStore(await fetchFunction());
        } catch (e) {
            this.errorUpdateStore();
        }
    }
    public loadingUpdateStore = () => {
        this.setState({ status: AsyncStatus.LOADING });
    }

    public successUpdateStore = (items: IPhilosopher[] | IFork[]) => {
        this.setState({ status: AsyncStatus.SUCCESS });
    }

    public errorUpdateStore = () => {
        this.setState({ status: AsyncStatus.ERROR});
    }
    public render() {
        const { philosophers, forks } = this.props;
        console.log(philosophers);
        console.log(forks);
        switch (this.state.status) {
            case AsyncStatus.LOADING: {
                console.log("success");
            };
            case AsyncStatus.SUCCESS: {
                console.log("Suc");
            };
            default: console.log("Error");
        }
        return (
            <>
                <p onClick={this.onClickTest}>AddFork</p>
                <div className="table">
                    {this.props.philosophers.map((el, index) =>
                        <div key={index} className={"philosopher p" +
                            (index + 1) +
                            (el.getStatus() === PhilosopherStatus.EATING ?
                                " eating" : " thinking")} />
                    )}
                    {this.props.forks.map((el, index) =>
                        <div key={index} className={"fork f" +
                            (index + 1) +
                            (
                                el.getStatus() === ForkStatus.FREE
                                    ? " free"
                                    : " in-use")} />
                    )}
                </div>
            </>
        );
    }
}

function mapStateToProps(store: any) {
    return {
        forks: store.forks || [],
        philosophers: store.philosophers || []
    }
}

// TODO : разобраться с тем как работает mapDispatchToProps

export default connect(mapStateToProps, dispatch => ({
    onAddFork(fork: IFork) {
        dispatch(actions.addFork(fork));
    },
    onAddPhilosopher(philosopher: IPhilosopher) {
        dispatch(actions.addPhilosopher(philosopher))
    },
    onUpdatePhilosopher(philosopher: IPhilosopher) {
        dispatch(actions.updatePhilosopher(philosopher))
    },
    onUpdateFork(philosopher: IFork) {
        dispatch(actions.updateFork(philosopher))
    }
}))(Table);
