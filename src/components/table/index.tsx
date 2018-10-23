import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { AsyncStatus, IAsync } from '../../helpers';
import { Fork, ForkStatus, IFork, IPhilosopher, Philosopher, PhilosopherStatus } from '../../models';
import './index.css';
export interface IState {
    forks: Fork[];
    philosophers: Philosopher[];
    status: AsyncStatus;
    isWorking: boolean;
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

class Table<F extends Fork, P extends Philosopher, I extends IAsync<any>> extends React.Component<IProps<F, P, I>, IState> {
    public constructor(props: IProps<F, P, I>) {
        super(props);
        const tmpFork: Fork[] = Array(5).fill(0).map((el, index) =>
            new Fork(index + 1, ForkStatus.FREE)
        );
        const tmpPhilosopher: Philosopher[] = Array(5).fill(0).map((el, index) =>
            new Philosopher("P " + index + 1, PhilosopherStatus.THINKING)
        );
        this.props.onAddFork(tmpFork);
        this.props.onAddPhilosopher(tmpPhilosopher);
        this.state = {
            forks: this.props.forks,
            isWorking: false,
            philosophers: this.props.philosophers,
            status: AsyncStatus.LOADING

        };
        this.onClickTest = this.onClickTest.bind(this);
    }
    public sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    public eat(index: number) {
        this.props.philosophers[index].setStatus(PhilosopherStatus.EATING);
        this.props.onUpdatePhilosopher(this.props.philosophers[index]);
    }
    public async loop() {
        while (true) {
            await this.sleep(500);
            console.log("step");
            if (!this.state.isWorking){
                break;
            }
        }
    }
    public onClickTest() {
        this.setState({
            isWorking: !this.state.isWorking
        });
        this.loop();
    }
    public render() {
        console.log('State:');
        console.log(this.state);
        const philo = Object.keys(this.props.philosophers).map((k) => this.props.philosophers[k]);
        const forks = Object.keys(this.props.forks).map((k) => this.props.forks[k]);
        return (
            <>
                <p onClick={this.onClickTest}>Start</p>
                <div className="table">
                    {(philo.length === 5) ?
                        philo.map((el, index) =>
                            <div key={index} className={"philosopher p" +
                                (index + 1) +
                                (el.getStatus() === PhilosopherStatus.EATING ?
                                    " eating" : " thinking")} />
                        ) : <>YOU SUCK BITCH!</>}

                    {(forks.length === 5) ?
                        forks.map((el, index) =>
                            <div key={index} className={"fork f" +
                                (index + 1) +
                                (
                                    el.getStatus() === ForkStatus.FREE
                                        ? " free"
                                        : " in-use")} />
                        ) : <>YOU SUCK BITCH!</>}
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
