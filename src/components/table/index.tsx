import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Fork, ForkStatus, IFork, Philosopher, PhilosopherStatus } from '../../models';
import './index.css';

export interface IState {
    forks: Fork[];
    philosophers: Philosopher[];
}
export interface IProps<F extends Fork,P extends Philosopher> {
    forks: F[];
    philosophers: P[];
}

class Table<F extends Fork,P extends Philosopher> extends React.Component<IProps<F,P>, IState> {
    public constructor(props: IProps<F,P>) {
        super(props);
        const {forks,philosophers} = this.props;
        console.log(forks,philosophers);
        this.state = {
            forks: Array(5).fill(null).map((el, ind) =>
                new Fork(ind + 1, ForkStatus.FREE)
            ),
            philosophers: Array(5).fill(
                new Philosopher("Name", PhilosopherStatus.THINKING)
            )
        }
        this.onClickTest = this.onClickTest.bind(this);
    }

    public onClickTest() {
        // actions.addFork(new Fork(5, ForkStatus.FREE));
        console.log(this.props);
    }

    public render() {
        const { philosophers, forks } = this.props;
        console.log(philosophers);
        console.log(forks);
        return (
            <>
                <p onClick={this.onClickTest}>AddFork</p>
                <div className="table">
                    {this.state.philosophers.map((el, index) =>
                        <div key={index} className={"philosopher p" +
                            (index + 1) +
                            (el.getStatus() === PhilosopherStatus.EATING ?
                                " eating" : " thinking")} />
                    )}
                    {this.state.forks.map((el, index) =>
                        <div key={index} className={"fork f" +
                            (index + 1) +
                            (el.getStatus() === ForkStatus.FREE ?
                                " free" : " in-use")} />
                    )}
                </div>
            </>
        );
    }
}

function mapStateToProps(store: any) {
    console.log(store);
    return {
        forks: store.forks,
        philosophers: store.philosophers
    }
}

// TODO : разобраться с тем как работает mapDispatchToProps

export default connect(mapStateToProps, dispatch => ({
    onAddFork(fork: IFork) {
        dispatch(actions.addFork(fork));
    }
}))(Table);
