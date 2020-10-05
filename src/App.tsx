import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/appReducer';
import Layout from './components/Layout'



function App(props) {

  return (
    <Provider store={store}>
      <div className="App" data-testid={'app-wrapper'}>
        <Layout />
      </div>


    </Provider>
  );
}

export default App;
