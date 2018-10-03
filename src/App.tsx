import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';

const store = createStore(rootReducer);

class App extends React.Component {
  public render() {
    return (
      <Provider store={ store }>
        <div>lol</div>
      </Provider>
    );
  }
}

export default App;
