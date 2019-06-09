import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchRecords } from '../../actions';
const options = {
  title: {
    text: 'Stock price chart'
  },
  series: [{
    data: [1, 2, 3]
  }]  
}
// series: [{
//   data: [1, 2, 3]
// }]

class Report extends React.Component {
  state = {
    data: [],
    date: [],
    buyDate: "2019-06-01",
    sellDate: "2019-06-05"
  }

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async () => {
    const res = await fetchRecords(); 
    this.setState({ 
      data: res.map(item => item.fields.stock_price), 
      date: res.map(item => item.fields.stock_date) });  
  }
// O(n) time & O(1) space
maxProfit = (prices) => {
  let minPrice = prices[0];
  let maxProfit = prices[1] - prices[0];

  for (let i = 1; i < prices.length; i++) {
    let currentPrice = prices[i];
    let potentialProfit = currentPrice - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
    minPrice = Math.min(minPrice, currentPrice);
  }

  return maxProfit;
}
  render() {
    console.log(this.state.date)
    let dateSplit = null;
    if (this.state.date.length){
      dateSplit = this.state.date[0].split('-');
    }

    return this.state.data.length ? (
      <div className="mt-4"> 
        <div className="container">
          <p>Rs. 500</p>
          <p>Max Profit: {this.maxProfit(this.state.data.reverse().slice(1, 10))}</p>
        </div>

        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              title: {
                text: 'Stock price chart'
              },
              xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                  day: '%e. %b'
                }
              },
              series: [{
                data: this.state.data,
                pointStart: Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2]),
                pointInterval: 24 * 3600 * 1000
              }]
            }}
          />
        </div>
      
        <div className="row mt-4 text-center">

          <div className="buy__date col-6 mt-3">
              <input type="date" className="w-100" value={this.state.buyDate} onChange={e => this.setState({ buyDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Buy date</button>
          </div>


          <div className="sell__date col-6 mt-3">            
              <input type="date" className="w-100" value={this.state.sellDate} onChange={e => this.setState({ sellDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Sell date</button>
          </div>

        </div>
      </div>
    ) : null;
  }
}

export default Report;