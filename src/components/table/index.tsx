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
            new Philosopher("P " + (index + 1), PhilosopherStatus.THINKING, index)
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
    public async eat(index: number) {
        while ((this.props.forks[index % 5].status !== ForkStatus.FREE)
            && (this.props.forks[(index + 1) % 5].status !== ForkStatus.FREE)) {
                console.log(this.props.forks[index % 5].status,this.props.forks[(index+1) % 5].status)
        }

        let tempFork = (this.props.forks[index % 5]);
        tempFork.setStatus(ForkStatus.IN_USE);
        this.props.onUpdateFork(tempFork);

        tempFork = (this.props.forks[(index + 1) % 5]);
        tempFork.setStatus(ForkStatus.IN_USE);
        this.props.onUpdateFork(tempFork);

        const philosopher = this.props.philosophers[index];
        philosopher.setStatus(PhilosopherStatus.EATING);
        this.props.onUpdatePhilosopher(philosopher);
        await this.sleep(2000);
        await this.think(index);
    }
    public async think(index: number) {

        let tempFork = (this.props.forks[index % 5]);
        tempFork.setStatus(ForkStatus.FREE);
        this.props.onUpdateFork(tempFork);

        tempFork = (this.props.forks[(index + 1) % 5]);
        tempFork.setStatus(ForkStatus.FREE);
        this.props.onUpdateFork(tempFork);

        const philosopher = this.props.philosophers[index];
        philosopher.setStatus(PhilosopherStatus.THINKING);
        this.props.onUpdatePhilosopher(philosopher);
        await this.sleep(2000);
        await this.eat(index);
    }
    public async loop() {
        for (let index = 0; index < 5; index++) {
            this.eat(index);
        }
    }
    public onClickTest() {
        this.setState({
            isWorking: !this.state.isWorking
        });
        this.loop();
    }
    public render() {
        console.log('RENDER');
        const philo = Object.keys(this.props.philosophers).map((k) => this.props.philosophers[k]);
        const forks = Object.keys(this.props.forks).map((k) => this.props.forks[k]);
        console.log(philo);

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
                        ) : <>PHILOSOPHER SUCK BITCH!</>}

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
