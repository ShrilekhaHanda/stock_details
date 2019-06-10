import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


class Report extends React.Component {
  state = {
    buyDate: "2019-06-01",
    sellDate: "2019-06-05"
  }

  getMaxProfit = (arr) => {
  let minIdx = 0;
  let maxIdx = 1;
  let currMin = 0;
  let maxProfit = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[currMin]) {
      currMin = i;
    }

    if (arr[maxIdx] - arr[minIdx] < arr[i] - arr[currMin]) {
      maxIdx = i;
      minIdx = currMin;
    }

  }

    maxProfit = (arr[maxIdx] - arr[minIdx]) * 10;
    return maxProfit.toFixed(2);
  }

  render() {
    let { stockDate, stockPrice, allData } = this.props;
    let dateSplit = [], maxProArr = [];
    if (stockDate.length){
      dateSplit = stockDate[0].split('-');
    } 
    if (allData.length){
      let array = this.props.allData.filter(item => ((new Date(item.fields.stock_date) >= new Date(this.state.buyDate)) && (new Date(item.fields.stock_date) <= new Date(this.state.sellDate))))
    
      maxProArr = array.map(item => (item.fields.stock_price))
    }

    return (
      <div className="mt-4"> 
        <div className="container">
          <p>Rs. 500</p>
          <p>Max Profit: {(maxProArr.length >= 2) ? this.getMaxProfit(maxProArr) : '0'}</p>
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
                data: stockPrice,
                pointStart: Date.UTC(dateSplit[0], dateSplit[1], dateSplit[2]),
                pointInterval: 24 * 3600 * 1000
              }]
            }}
          />
        </div>
      
        <div className="row mt-4 text-center">

          <div className="buy__date col-6 mt-3">
              <input 
                type="date" 
                className="w-100" 
                value={this.state.buyDate} 
                onChange={e => this.setState({ buyDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Buy date</button>
          </div>


          <div className="sell__date col-6 mt-3">            
              <input 
                type="date" 
                className="w-100" 
                value={this.state.sellDate} 
                onChange={e => this.setState({ sellDate: e.target.value })}/>
              <button className="btn btn-success mt-3">Sell date</button>
          </div>

        </div>
      </div>
    )
  }
}

export default Report;