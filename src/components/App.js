import React  from 'react';
import './App.css';

import Calendar from './calender/Calendar';
import Report from './report/Report';


class App extends React.Component {
  
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="App col-8">
            <Calendar />
          </div>

          <div className="col-4">
            <Report/>
          </div>
        </div>
      </div>
    );
  } 
}

export default App;