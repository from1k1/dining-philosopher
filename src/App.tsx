import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Table from './components/table';
import rootReducer from './reducers';


const store = createStore(rootReducer);

class App extends React.Component {
  public render() {
    return (
      <Provider store={ store }>
        <Table />
      </Provider>
    );
  }
}

export default App;
