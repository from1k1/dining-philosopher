import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Fork, ForkStatus, IFork, Philosopher, PhilosopherStatus } from '../../models';
import './index.css';

interface IState {
    forks: Fork[],
    philosophers: Philosopher[]
}

class Table extends React.Component<IState, IState> {
    constructor(props: IState) {
        super(props);
        
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
        actions.addFork(new Fork(5, ForkStatus.FREE));
        console.log(this.props);
    }

    public render() {
        return (
            <>
                <p onClick={ this.onClickTest }>AddFork</p>
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
                            (el.getStatus() === ForkStatus.FREE ?
                                " free" : " in-use")} />
                    )}
                </div>
            </>
        );
    }
}

function mapStateToProps(state: IState) {
    console.log(state);
    return {
        forks: state.forks,
        philosophers: state.philosophers
    }
}

// TODO : разобраться с тем как работает mapDispatchToProps

export default connect(mapStateToProps, dispatch => ({
    onAddFork(fork: IFork) {
        dispatch(actions.addFork(fork));
    }
}))(Table);
