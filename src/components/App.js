import React  from 'react';
import './App.css';

import Calendar from './calender/Calendar';
import Report from './report/Report';

import { fetchRecords } from '../actions';

class App extends React.Component {
  state = {
    allData: [],
    stockPrice: [], 
    stockDate: []
  }
  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async () => {
    const data = await fetchRecords();
    this.setState({
      allData: data,
      stockPrice: data.map(item => item.fields.stock_price),
      stockDate: data.map(item => item.fields.stock_date) 
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="App col-8">
            <Calendar allData={this.state.allData} fetchRecords={this.fetchRecords}/>
          </div>

          <div className="col-4">
            <Report allData={this.state.allData} stockPrice={this.state.stockPrice} stockDate={this.state.stockDate}/>
          </div>
        </div>
      </div>
    );
  } 
}

export default App;